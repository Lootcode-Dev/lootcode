import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { codeRouter } from "./routers/code";
import { mapRouter } from "./routers/map";
import { dockerRouter } from "./routers/docker";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  code: codeRouter,
  docker: dockerRouter,
  map: mapRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
