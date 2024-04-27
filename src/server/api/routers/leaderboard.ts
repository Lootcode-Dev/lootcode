import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { GUser } from "~/app/game/utility";

export const leaderRouter = createTRPCRouter({
  grabUsers: protectedProcedure
    .input(z.object({ page: z.number(), perPage: z.number() }))
    .query(async ({ input, ctx }) => {
        const topUsers = await db.user.findMany({
            orderBy: [
                {score: 'desc'}, //Sort by score
                {time: 'asc'} //In ties sort by earliest solve
            ],
            skip: input.page*input.perPage,
            take: input.perPage
        });
        return topUsers as GUser[];
    }),
});
