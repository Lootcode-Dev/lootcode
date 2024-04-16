/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

import itemList from "~/gameinfo/items.json";
import { fakeBuy, fakeEquip } from "~/app/game/utility";
import enemies from "~/util/enemies";
import encounters from "~/util/encounters";
import { Enemy } from "~/util/enemies";

export const gameRouter = createTRPCRouter({
  giveItem: protectedProcedure
    .input(z.object({ item: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { id: ctx.userId },
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
          where: { id: ctx.userId },
          data: user,
        });
    }),

  giveItemID: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { id: ctx.userId },
      });

      const oldItems = user?.items.split("");

      if (user?.items[input.item] != "1") {
        if (oldItems) oldItems[input.item] = "1";

        if (user)
          await db.user.update({
            where: { id: ctx.userId },
            data: user,
          });
      }
    }),

  equipItemID: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { id: ctx.userId },
      });

      if (!user) return;

      fakeEquip(user, input.item);

      await db.user.update({
        where: { id: ctx.userId },
        data: user,
      });

      return user;
    }),

  addGold: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { id: ctx.userId },
      });

      if (!user) return;

      user.gold += input.amount;

      await db.user.update({
        where: { id: ctx.userId },
        data: user,
      });

      return user;
    }),

  buyItem: protectedProcedure
    .input(z.object({ item: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await db.user.findFirst({
        where: { id: ctx.userId },
      });

      if (!user) return;

      fakeBuy(user, input.item);

      await db.user.update({
        where: { id: ctx.userId },
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
});
