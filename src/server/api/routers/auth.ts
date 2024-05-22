import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user?.id || !user?.emailAddresses[0]?.emailAddress) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const dbUser = await db.user.findFirst({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    // Check if the username is valid
    let username = user.firstName?.toString() ?? "Lootcoder";
    for (const c of username) {
      const charCode = c.charCodeAt(0);
      if (charCode < 32 || charCode > 126) {
        username = "Lootcoder";
        break;
      }
    }

    // New user, lets instantiate
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: username,
          problems: "0".repeat(191),
          items: "1111" + "0".repeat(96),
          gold: 0,
          armor: 0,
          accessory: 3,
          weapon: 1,
          focus: 2,
          skill1: -1,
          skill2: -1,
          skill3: -1,
          score: 0,
          time: new Date(),
        },
      });
    }

    // Migration from dev to prod, only update the user id
    if (
      dbUser?.email === user.emailAddresses[0].emailAddress &&
      dbUser?.id !== user.id
    ) {
      await db.user.update({
        where: {
          email: user.emailAddresses[0].emailAddress,
        },
        data: {
          id: user.id,
        },
      });
    }

    return { success: true };
  }),
});
