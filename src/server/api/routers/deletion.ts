import { currentUser, clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const deletionRouter = createTRPCRouter({
  deleteAccount: protectedProcedure
    .mutation(async () => {
        const user = await currentUser();
        if (!user?.id) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
            });
        }
        try {
            //Delete User from DB
            console.log(user);
            await db.user.delete({
                where: {email: user.emailAddresses[0]!.emailAddress}
            });

            //Delete User from Clerk
            await clerkClient.users.deleteUser(user.id);
        } catch (error) {
            throw new TRPCError({
                code: "BAD_REQUEST",
            });
        }
        return {success: true};
    }),
});
