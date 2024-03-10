/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { writeFile } from "fs/promises";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { $, ProcessOutput } from "zx";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { TRPCError } from "@trpc/server";

export const codeRouter = createTRPCRouter({
  getProblem: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const contents = await readFile(
        `./src/problems/${input.name}/${input.name}.md`,
        "utf-8",
      );

      return contents;
    }),
  runProblem: protectedProcedure
    .input(z.object({ name: z.string(), code: z.string(), lang: z.string() }))
    .query(async ({ input, ctx }) => {
      // Zx setup
      $.verbose = false;

      // Prepare the output
      interface caseRes {
        expected: string;
        output: string;
        result: string;
        error?: string;
      }
      interface codeGradeResult {
        numPassed: number;
        numFailed: number;
        cases: caseRes[];
      }

      const codeGradeResponse: codeGradeResult = {
        numPassed: 0,
        numFailed: 0,
        cases: [],
      };

      // Log the request
      console.log("Getting problem description");

      // Get all of our input files
      const filenames = readdirSync(`./src/problems/${input.name}/input`);
      console.log(filenames);

      switch (input.lang) {
        case "python":
          console.log("Python detected");

          // Write the code to a temp file with the correct extension
          await writeFile(`./temp/${ctx.userId}${input.name}.py`, input.code);

          // Iterate through the input files
          for (const file of filenames) {
            // Run the code with the input and write the output to a temp file
            await $`python3 ./temp/${ctx.userId}${input.name}.py < ./src/problems/${input.name}/input/${file} > ./temp/${ctx.userId}${input.name}.txt`;

            // Test the output against the expected output
            const expectedFile = file.replace(".in", ".out");
            const output = await $`cat ./temp/${ctx.userId}${input.name}.txt`;
            const expected =
              await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
            console.log("Output: " + output.stdout);
            console.log("Expected: " + expected.stdout);
            if (output.stdout === expected.stdout) {
              console.log("Correct answer\n");
            } else {
              console.log("Wrong answer\n");
            }
          }

          // Cleanup
          await $`rm ./temp/${ctx.userId}${input.name}.py`;
          await $`rm ./temp/${ctx.userId}${input.name}.txt`;

          break;

        case "java":
          console.log("Java detected");

          //Write the code to a temp file with the correct extension
          await writeFile(`./temp/${ctx.userId}${input.name}.java`, input.code);
          try {
            await $`javac ./temp/${ctx.userId}${input.name}.java`;
            console.log("Compiled Successfully");
          } catch (error: any) {
            console.log("COMPILATION ERROR DETECTED");
            console.log(error.stderr);
          }

          for (const file of filenames) {
            await $`java ./temp/${ctx.userId}${input.name} < ./src/problems/${input.name}/input/${file} > ./temp/${ctx.userId}${input.name}.txt`;

            const expectedFile = file.replace(".in", ".out");
            const output = await $`cat ./temp/${ctx.userId}${input.name}.txt`;
            const expected =
              await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
            console.log("Output: " + output.stdout);
            console.log("Expected: " + expected.stdout);
            if (output.stdout === expected.stdout) {
              console.log("Correct answer\n");
            } else {
              console.log("Wrong answer\n");
            }
          }

          // Cleanup
          await $`rm ./temp/${ctx.userId}${input.name}.java`;
          await $`rm ./temp/${ctx.userId}${input.name}.class`;
          await $`rm ./temp/${ctx.userId}${input.name}.txt`;

          break;

        case "c":
          console.log("C detected");

          // Write the code to a temp file with the correct extension, and compile
          await writeFile(`./temp/${ctx.userId}${input.name}.c`, input.code);
          try {
            await $`gcc ./temp/${ctx.userId}${input.name}.c -o ./temp/${ctx.userId}${input.name}.out`;
            console.log("Compiled Successfully");
          } catch (error: any) {
            console.log("COMPILATION ERROR DETECTED");
            console.log(error.stderr);
          }

          // Iterate through the input files
          for (const file of filenames) {
            // Run the code with the input and write the output to a temp file
            await $`./temp/${ctx.userId}${input.name}.out < ./src/problems/${input.name}/input/${file} > ./temp/${ctx.userId}${input.name}.txt`;

            // Test the output against the expected output
            const expectedFile = file.replace(".in", ".out");
            const output = await $`cat ./temp/${ctx.userId}${input.name}.txt`;
            const expected =
              await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
            console.log("Output: " + output.stdout);
            console.log("Expected: " + expected.stdout);
            if (output.stdout === expected.stdout) {
              console.log("Correct answer\n");
            } else {
              console.log("Wrong answer\n");
            }
          }

          // Cleanup
          await $`rm ./temp/${ctx.userId}${input.name}.c`;
          await $`rm ./temp/${ctx.userId}${input.name}.out`;
          await $`rm ./temp/${ctx.userId}${input.name}.txt`;

          break;

        case "cpp":
          console.log("C++ detected");

          //Write the code to a temp file with the correct extension
          await writeFile(`./temp/${ctx.userId}${input.name}.cpp`, input.code);
          try {
            await $`g++ ./temp/${ctx.userId}${input.name}.cpp -o ./temp/${ctx.userId}${input.name}.out`;
            console.log("Compiled Successfully");
          } catch (error: any) {
            console.log("COMPILATION ERROR DETECTED");
            console.log(error.stderr);
          }

          for (const file of filenames) {
            // Time limit
            try {
              await $`timeout 1s ./temp/${ctx.userId}${input.name}.out < ./src/problems/${input.name}/input/${file} > ./temp/${ctx.userId}${input.name}.txt`;
            } catch (error: any) {
              if (error.exitCode === 124) {
                //TLE exist code is 124
                console.log("Time limit exceeded");
              } else {
                console.log("Runtime error");
              }
            }

            const expectedFile = file.replace(".in", ".out");
            const output = await $`cat ./temp/${ctx.userId}${input.name}.txt`;
            const expected =
              await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
            console.log("Output: " + output.stdout);
            console.log("Expected: " + expected.stdout);
            if (output.stdout === expected.stdout) {
              console.log("Correct answer\n");
            } else {
              console.log("Wrong answer\n");
            }
          }

          // Cleanup
          await $`rm ./temp/${ctx.userId}${input.name}.cpp`;
          await $`rm ./temp/${ctx.userId}${input.name}.out`;
          await $`rm ./temp/${ctx.userId}${input.name}.txt`;

          break;
        default:
          console.log("Invalid language");
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid language",
          });
      }
    }),
    testTemplate: protectedProcedure
    .input(z.object({ name: z.string(), code: z.string(), lang: z.string() }))
    .query(async ({ input }) => {
      const contents = await readFile(
        `./src/problems/${input.name}/${input.name}.md`,
        "utf-8",
      );

      return contents;
    }),
});
