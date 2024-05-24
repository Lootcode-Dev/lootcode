/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { fakeBuy, fakeEquip, getLevel } from "~/app/game/utility";
import encounters from "~/util/encounters";
import enemies, { Enemy } from "~/util/enemies";
import goldFile from "~/util/gold.json";
import indFile from "~/util/index.json";
import itemList from "~/util/items.json";
import regFile from "~/util/region.json";

export const gameRouter = createTRPCRouter({
  giveItem: protectedProcedure
    .input(z.object({ item: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      const oldItems = user?.items.split("");

      itemList.items.map((item, index) => {
        if (item.name == input.item && user?.items[index] == "0" && oldItems) {
          oldItems[index] = "1";
          user.problems = oldItems.join("");
        }
      });

      if (user)
        await db.user.update({
          where: { email: ctx.user.emailAddresses[0]?.emailAddress },
          data: user,
        });
    }),
  giveItemID: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      const oldItems = user?.items.split("");

      if (user?.items[input.item] != "1") {
        if (oldItems) oldItems[input.item] = "1";

        if (user)
          await db.user.update({
            where: { email: ctx.user.emailAddresses[0]?.emailAddress },
            data: user,
          });
      }
    }),
  equipItemID: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      if (!user) return;

      fakeEquip(user, input.item);

      await db.user.update({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
        data: user,
      });

      return user;
    }),
  addGold: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      if (!user) return;

      user.gold += input.amount;

      await db.user.update({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
        data: user,
      });

      return user;
    }),
  buyItem: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      if (!user) return;

      fakeBuy(user, input.item);

      await db.user.update({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
        data: user,
      });

      return user;
    }),
  getEncounter: protectedProcedure
    .input(z.object({ encounterid: z.string() }))
    .query(async ({ input, ctx }) => {
      // Get the entity names in the encounter with the encounterid
      const entList = encounters[input.encounterid];
      const entities: Enemy[] = [];
      // Access enemy object from list based on name in entList
      entList?.map((value) => {
        if (value) {
          const enemy = enemies[value];
          if (enemy) {
            entities.push(enemy);
          }
        }
      });
      return entities;
    }),
  beatEncounter: protectedProcedure
    .input(z.object({ encounterid: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      if (!user) return;

      // Add the reward to the user's gold

      // Check if they've already beaten the encounter
      const problems = user.problems.split("");
      if (problems[indFile.problems.indexOf(input.encounterid)] == "1") {
        return user;
      }

      problems[indFile.problems.indexOf(input.encounterid)] = "1";
      user.problems = problems.join("");

      // Add the gold to the user's account and solve the problem
      if (goldFile[input.encounterid as keyof typeof goldFile])
        user.gold += Math.floor(
          goldFile[input.encounterid as keyof typeof goldFile] * getLevel(user),
        );

      // Update their score
      user.score += 1;
      user.time = new Date();

      // Update the user's data
      await db.user.update({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
        data: user,
      });

      return user;
    }),
  getLoreCollection: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findFirst({
      where: { email: ctx.user.emailAddresses[0]?.emailAddress },
    });

    if (!user) return;

    const problems = user.problems.split("");
    const loreCollection = [];
    for (let i = 0; i < problems.length + 1; i++) {
      if (problems[i] === "1") {
        const problem = indFile.problems[i];
        if (problem) {
          const region = Object.keys(regFile).find((key: string) =>
            regFile[key as keyof typeof regFile].includes(problem),
          );

          if (existsSync(`./src/problems/${region}/${problem}/lore.md`)) {
            const loreContent = await readFile(
              `./src/problems/${region}/${problem}/lore.md`,
              "utf-8",
            );
            loreCollection.push(loreContent);
          }
        }
      }
    }
    return loreCollection;
  }),
});
