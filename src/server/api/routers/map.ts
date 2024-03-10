import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { readFile } from "fs/promises";

export const mapRouter = createTRPCRouter({
  getDescription: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const contents = await readFile(
        `./src/problems/descriptions/${input.name}.md`,
        "utf-8",
      );
      return contents;
    })
});
