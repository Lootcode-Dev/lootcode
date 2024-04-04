/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TRPCError } from "@trpc/server";
import { readdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { boolean, string, z } from "zod";
import { $ } from "zx";
import indFile from "~/problems/index.json";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { spawn } from 'child_process';


export const codeRouter = createTRPCRouter({
  getProblem: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const contents = { description: "", loot: "", solved: false };

      if (input.name !== "") {
        contents.description = await readFile(
          `./src/problems/${input.name}/problem.md`,
          "utf-8",
        );

        contents.loot = await readFile(
          `./src/problems/${input.name}/loot.md`,
          "utf-8",
        );

        const currentProblems = indFile.problems;
        const index = currentProblems.findIndex(
          (problem) => problem === input.name,
        );
        if (index !== -1) {
          const user = await db.user.findFirst({
            where: { id: ctx.userId },
          });
          if (user?.problems[index] === "1") {
            contents.solved = true;
          }
        }
      }

      return contents;
    }),

  runProblem: protectedProcedure
    .input(z.object({ name: z.string(), code: z.string(), lang: z.string() }))
    .query(async ({ input, ctx }) => {
      // Zx setup
      $.verbose = false;

      // Prepare the output
      interface caseRes {
        num: number;
        input: string;
        expected: string;
        output: string;
        result: boolean;
        runtimeError?: string;
      } //Case Interface for cases in the Code Grade Interface
      interface codeGradeResult {
        compileError?: string;
        numPassed: number;
        numFailed: number;
        cases: caseRes[];
        time: string;
        reward: boolean;
        solved: boolean;
      } //Code Grade Interface
      const codeGradeResponse: codeGradeResult = {
        numPassed: 0,
        numFailed: 0,
        time: JSON.stringify(new Date()),
        cases: [],
        reward: false,
        solved: false,
      }; //OUR RESPONSE BACK TO OUR CLIENT

      interface langType {
        ext: string;
        compile?: string;
        run: string;
      } //Our Interface for our dictionary

      await $`mkdir -p ./temp/${ctx.userId}${input.name}`; //Create a temp folder for the user in the temp space
      const codePathFolder = `./temp/${ctx.userId}${input.name}/`; //This is the temp user folder where we store code
      const codePath = `./temp/${ctx.userId}${input.name}/${ctx.userId}${input.name}`; //The path is based on the users id and problem name
      const problemPathInput = `./src/problems/${input.name}/input/`; //The path is based on the problem name

      const langSearch: Record<string, langType> = {
        python: { ext: "py", run: `python3 ${ctx.userId}${input.name}.py` },
        java: {
          ext: "java",
          compile: `javac ${codePath}.java`,
          run: `java ${ctx.userId}${input.name}`,
        },
        c: {
          ext: "c",
          compile: `gcc ${codePath}.c -o ${codePath}.out -lm`,
          run: `./${ctx.userId}${input.name}.out`,
        },
        cpp: {
          ext: "cpp",
          compile: `g++ ${codePath}.cpp -o ${codePath}.out -lm`,
          run: `./${ctx.userId}${input.name}.out`,
        },
      };
      const langObject = langSearch[input.lang] ?? "Error"; //We have the appropriate necessities for our language stored in this object
      if (langObject == "Error") {
        console.log("Invalid language");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid language",
        });
      }

      // Get all of our input files
      const filenames = readdirSync(`${problemPathInput}`);
      // console.log(filenames);

      //Make sure the java class name is appropriate for our file system
      if (langObject.ext == "java") {
        const regex = /public\s+class\s+_?\w+/; //Regex to look for main class
        if (input.code.search(regex) == -1) {
          //Simulate a compile time error in the case there is no main class
          codeGradeResponse.compileError = "Compile Time Error";
          await $`rm -rf ${codePathFolder}`; //Clean Up
          return codeGradeResponse;
        }
        input.code = input.code.replace(
          regex,
          `public class ${ctx.userId}${input.name}`,
        ); //Replace the name of the main class with what we want it to be
      }
      // Write the code to a temp file with the correct extension
      await writeFile(`${codePath}.${langObject.ext}`, input.code);

      // START COMPILE PIPELINE
      if (langObject.compile) {
        try {
          await $withoutEscaping`${langObject.compile}`; //Compile our code
          // console.log("Compiled Successfully");
        } catch (error: any) {
          codeGradeResponse.compileError = "Compile Time Error";
          // console.log(error);

          await $`rm -rf ${codePathFolder}`; //Clean Up
          return codeGradeResponse; //Our code didn't compile no need to test the cases
        }
      } // END COMPILE PIPELINE

      // Iterate through the input files
      let i = 1;
      for (const file of filenames) {
        // Declare our case object
        const thisCase: caseRes = {
          num: i, //Case Number
          input: "", //Input
          expected: "", //Expected Result
          output: "", //Our program output
          result: false, //Did we pass all cases?
          runtimeError: "", //We had an error during runtime
        };

        // START RUNTIME ERROR PIPELINE
        // Run the code with the input and write the output to a temp file
        try {

          //Start a promise so we can wait for our docker instance to response
          await new Promise((resolve, reject) => {

            //Spwan a docker process for security reasons
            const dockerProcess = spawn('docker', [
              'run', //Run process
              '--rm', //Remove process after use
              '-v', `${codePathFolder}:/app/`, //Mount codePathFolder directory
              '-v', `${problemPathInput}${file}:/app/input.in`, //Mount Input
              'code-runner', //code-runner docker image
              '-c', `timeout 1s ${langObject.run} < input.in`,
            ]);
            let wroteData = false; //Track if we wrote a users output

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            dockerProcess.stdout.on('data', async (data) => {
              console.log(`Container output: ${data}`);
              await writeFile(`${codePath}.txt`, data as string);
              wroteData = true;
            });

            dockerProcess.stderr.on('data', (data) => {
              console.error(`Container error: ${data}`);
            });

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            dockerProcess.on('close', async (code) => {
              console.log(`Container exited with code ${code}`);

              //User didn't output anything in their program
              if (!wroteData) await writeFile(`${codePath}.txt`, "Hey you! Yeah you! Output something :(");

              //Resolve or Reject the promise
              if (code != 0) reject(Object.assign(new Error('Error'), { exitCode: code }));
              else resolve(code);
            });

          }).catch(error => {
            throw error;
          });
        } catch (error: any) {
          //Error with running the code
          if (error.exitCode === 143) {
            //Time Limit Exceeded
            //TLE exist code is 124
            // console.log("Time limit exceeded");
            thisCase.runtimeError = "Time limit exceeded";
            thisCase.output = "Time limit exceeded";
            codeGradeResponse.numFailed++;
            i++;
          } else {
            //Runtime error
            // console.log("Runtime error");
            // console.log(error.stderr);
            thisCase.runtimeError = error.stderr;
            thisCase.output = "Runtime error";
            codeGradeResponse.numFailed++;
            i++;
          }

          // Get the input
          const inputFile =
            await $`cat ./src/problems/${input.name}/input/${file}`;
          thisCase.input = inputFile.stdout;

          //Get the expected output
          const expectedFile = file.replace(".in", ".out");
          const expected =
            await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
          thisCase.expected = expected.stdout;

          codeGradeResponse.cases.push(thisCase);
          continue;
        } // END RUNTIME ERROR PIPELINE

        // Get the input
        const inputFile =
          await $`cat ./src/problems/${input.name}/input/${file}`;
        thisCase.input = inputFile.stdout;

        // Test the output against the expected output
        const expectedFile = file.replace(".in", ".out");
        const output = await $`cat ${codePath}.txt`;
        const expected =
          await $`cat ./src/problems/${input.name}/output/${expectedFile}`;

        // console.log("Output: " + output.stdout);
        // console.log("Expected: " + expected.stdout);
        const expectedOutput = expected.stdout.replace(/\s+$/, "");
        const userOutput = output.stdout.replace(/\s+$/, "");

        thisCase.expected = expectedOutput;
        thisCase.output = userOutput;
        if (userOutput === expectedOutput) {
          // console.log("Correct answer\n");
          thisCase.result = true;
          codeGradeResponse.numPassed++;
        } else {
          // console.log("Wrong answer\n");
          codeGradeResponse.numFailed++;
        }
        codeGradeResponse.cases.push(thisCase);
        i++;
      }

      // Cleanup
      await $`rm -rf ${codePathFolder}`; //Remove all the user files in temp

      // Check if the user has fully passed the problem for the first time, if so, reward them
      function checkCompletion(): number {
        const currentProblems = indFile.problems;
        const index = currentProblems.findIndex(
          (problem) => problem === input.name,
        );
        return index;
      }

      // Check if the user has fully passed the problem for the first time, if so, reward them
      if (codeGradeResponse.numFailed === 0) {
        console.log(checkCompletion());
        if (checkCompletion() !== -1) {
          const index = checkCompletion();
          const user = await db.user.findFirst({
            where: { id: ctx.userId },
          });
          if (user?.problems[index] === "0") {
            const currentProblems = user.problems.split("");
            console.log(currentProblems);
            currentProblems[index] = "1";

            // Join the array back into a string
            user.problems = currentProblems.join("");
            console.log(user.problems);
            await db.user.update({
              where: { id: ctx.userId },
              data: user,
            });
            codeGradeResponse.reward = true;
          } else {
            codeGradeResponse.reward = true;
            console.log("User has already completed this problem");
          }
        }
      }

      if (checkCompletion() !== -1) {
        const index = checkCompletion();
        const user = await db.user.findFirst({
          where: { id: ctx.userId },
        });
        if (user?.problems[index] === "1") {
          console.log("User has already completed this problem");
          codeGradeResponse.solved = true;
        }
      }

      console.log(codeGradeResponse);
      return codeGradeResponse;
    }),
});

export function $withoutEscaping(
  pieces: TemplateStringsArray,
  ...args: unknown[]
): any {
  const origQuote = $.quote; //ZX shell escapes using this quote function
  try {
    $.quote = (unescapedCmd) => unescapedCmd; //Change the quote function to not esacape
    return $(pieces, args); //Return the result of our shell command without escaping
  } finally {
    $.quote = origQuote; //Set the functionality of quote back to being able to escape (without changing our return, so our return returned an unescaped sequence fixing our compilation problems)
  }
}
