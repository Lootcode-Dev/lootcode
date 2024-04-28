import { z } from "zod";
import { type GUser } from "~/app/game/utility";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const leaderRouter = createTRPCRouter({
  grabUsers: protectedProcedure
    .input(z.object({ page: z.number(), perPage: z.number() }))
    .query(async ({ input }) => {
        const topUsers = await db.user.findMany({
            where: {
                email: {
                    notIn: ['leogofman23@gmail.com', 'dylanvidal1204@gmail.com', 'lukeculleninc@gmail.com']
                }
            },
            orderBy: [
                {score: 'desc'}, //Sort by score
                {time: 'asc'}, //In ties sort by earliest solve
                {email: 'desc'}
            ],
            skip: input.page*input.perPage,
            take: input.perPage
        });
        return topUsers as GUser[];
    }),
});
