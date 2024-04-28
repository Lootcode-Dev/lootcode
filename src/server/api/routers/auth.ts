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
        id: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.firstName ?? "",
          problems: "0".repeat(191),
          items: "0".repeat(100),
          gold: 0,
          armor: -1,
          accessory: -1,
          weapon: -1,
          focus: -1,
          skill1: -1,
          skill2: -1,
          skill3: -1,
          score: 0,
          time: new Date(),
        },
      });
    }

    return { success: true };
  }),
});
