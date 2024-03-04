import { writeFile } from "fs/promises";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { $ } from "zx";

export const codeRouter = createTRPCRouter({
  getProblem: protectedProcedure
    .input(z.object({ name: z.string(), code: z.string() }))
    .query(async ({ input, ctx }) => {
      $.verbose = false;

      // Get the problem description
      console.log("Getting problem description");

      // Write the code to a temp file
      await writeFile(`./temp/${ctx.userId}${input.name}.c`, input.code);

      // Compile and run the code
      try {
        const complilation =
          await $`gcc ./temp/${ctx.userId}${input.name}.c -o ${ctx.userId}${input.name}.out`.quiet(); // This would probably be UserID.c so there can be multiple submissions happening
        console.log("Compiled successfully");
        console.log(complilation);
      } catch (error) {
        console.log("ERROR DETECTED");
        console.log("", error);
        process.exit();
      }

      await $`./${ctx.userId}${input.name}.out < ./src/problems/${input.name}/input/b.in > ./temp/${ctx.userId}${input.name}.txt`;
      const output = await $`cat ./temp/${ctx.userId}${input.name}.txt`;
      const expected = await $`cat ./src/problems/${input.name}/output/b.out`;
      console.log("Output: " + output.stdout);
      console.log("Expected: " + expected.stdout);
      if (output.stdout === expected.stdout) {
        console.log("Correct answer");
      } else {
        console.log("Wrong answer");
      }

      console.log("Ran successfully");

      return 0;
    }),
});
