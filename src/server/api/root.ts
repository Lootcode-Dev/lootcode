import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { codeRouter } from "./routers/code";
import { deletionRouter } from "./routers/deletion";
import { dockerRouter } from "./routers/docker";
import { gameRouter } from "./routers/game";
import { leaderRouter } from "./routers/leaderboard";
import { mapRouter } from "./routers/map";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  code: codeRouter,
  deletion: deletionRouter,
  docker: dockerRouter,
  leaderboard: leaderRouter,
  map: mapRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
