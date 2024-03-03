import { z } from "zod";
import { $ } from "bun";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const getProblemContents = async (name: string): Promise<string> => {
  const data = await $`cat ./.././../problems/${name}/${name}.md`.text();
  console.log("INSIDE TRPC" + data);
  return data;
};

export const codeRouter = createTRPCRouter({
  getProblem: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async () => {
      // Get the problem description
      const contents = await getProblemContents("trial");

      // Error Check
      if (contents === "-1") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Problem not found",
        });
      }

      // Return file contents
      return contents;
    }),
});
