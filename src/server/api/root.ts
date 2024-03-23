import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { codeRouter } from "./routers/code";
import { mapRouter } from "./routers/map";
import { gameRouter } from "./routers/game"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  code: codeRouter,
  map: mapRouter,
  game: gameRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
