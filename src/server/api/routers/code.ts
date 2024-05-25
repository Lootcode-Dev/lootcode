/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TRPCError } from "@trpc/server";
import umami from "@umami/node";
import { existsSync, readdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { z } from "zod";
import { $ } from "zx";
import { getLevel } from "~/app/game/utility";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import goldFile from "~/util/gold.json";
import indFile from "~/util/index.json";
import mapFile from "~/util/map.json";

export interface Enemy {
  name: string;
  health: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
}

export const codeRouter = createTRPCRouter({
  getProblem: protectedProcedure
    .input(z.object({ name: z.string(), region: z.string() }))
    .query(async ({ input, ctx }) => {
      const contents = {
        description: "",
        lore: "",
        gold: 0,
        solved: false,
        type: "",
        enemies: [] as Enemy[],
      };
      const region = input.region;

      const user = await db.user.findFirst({
        where: { email: ctx.user.emailAddresses[0]?.emailAddress },
      });

      if (!user) return;

      // Add lore if it exists
      if (existsSync(`./src/problems/${region}/${input.name}/lore.md`)) {
        const loreContent = await readFile(
          `./src/problems/${region}/${input.name}/lore.md`,
          "utf-8",
        );
        if (input.region != "the_tower") {
          contents.lore = loreContent.split("\n")[0]?.replace("#", "") ?? "";
        } else {
          contents.lore = loreContent;
        }
      }

      if (goldFile[input.name as keyof typeof goldFile] != 0) {
        contents.gold =
          goldFile[input.name as keyof typeof goldFile] * getLevel(user);
      }

      const type = findNodeType(region ?? "", input.name);

      // Detect if the node is of type problem
      if (type === "problem") {
        if (input.name !== "") {
          contents.type = "problem";

          const problemPath = `./src/problems/${region}/${input.name}/problem.md`;
          if (existsSync(problemPath)) {
            contents.description = await readFile(problemPath, "utf-8");
          } else {
            contents.description = "DNE";
          }

          const currentProblems = indFile.problems;
          const index = currentProblems.findIndex(
            (problem) => problem === input.name,
          );
          if (index !== -1) {
            if (user?.problems[index] === "1") {
              contents.solved = true;
            }
          }
        }
        // Game
      } else {
        if (input.name !== "") {
          contents.type = "game";

          const problemPath = `./src/problems/${region}/${input.name}/problem.md`;
          if (existsSync(problemPath)) {
            contents.description = await readFile(problemPath, "utf-8");
          } else {
            contents.description = "DNE";
          }

          const enemies = await api.game.getEncounter.query({
            encounterid: input.name,
          });
          contents.enemies = enemies;

          const currentProblems = indFile.problems;
          const index = currentProblems.findIndex(
            (problem) => problem === input.name,
          );
          if (index !== -1) {
            if (user?.problems[index] === "1") {
              contents.solved = true;
            }
          }
        }
      }

      return contents;
    }),

  runProblem: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        code: z.string(),
        lang: z.string(),
        region: z.string(),
      }),
    )
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

      // Umami
      umami.init({
        websiteId: "d99d0840-a8c0-4343-9f5f-c5195ded000c",
        hostUrl: "https://dormdevs-analytics.vercel.app",
      });

      // Send analytics
      await umami.track({ title: "Problem Ran" });

      const region = input.region;

      await $`mkdir -p ./temp/${ctx.userId}${input.name}`; //Create a temp folder for the user in the temp space
      const codePathFolder = `./temp/${ctx.userId}${input.name}/`; //This is the temp user folder where we store code
      const codePath = `./temp/${ctx.userId}${input.name}/${ctx.userId}${input.name}`; //The path is based on the users id and problem name
      const problemPathInput = `./src/problems/${region}/${input.name}/input/`; //The path is based on the problem name
      const MAXTRANSMIT = 2000; //Bytes of data

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
        csharp: {
          ext: "cs",
          compile: `mcs ${codePath}.cs`,
          run: `mono ${ctx.userId}${input.name}.exe`,
        },
        rust: {
          ext: "rs",
          compile: `rustc --out-dir ${codePathFolder} ${codePath}.rs`,
          run: `./${ctx.userId}${input.name}`,
        },
        go: {
          ext: "go",
          run: `go run ${ctx.userId}${input.name}.go`,
        },
      };
      const langObject = langSearch[input.lang] ?? "Error"; //We have the appropriate necessities for our language stored in this object
      if (langObject == "Error") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid language",
        });
      }

      console.log(langObject);

      // Get all of our input files
      const filenames = readdirSync(`${problemPathInput}`);

      //Make sure the java class name is appropriate for our file system
      if (langObject.ext == "java") {
        const regex = /public\s+class\s+_?\w+/; //Regex to look for main class
        if (input.code.search(regex) == -1) {
          //Simulate a compile time error in the case there is no main class
          codeGradeResponse.compileError = "A public class is required!";

          //Clean Up
          await $`docker rm ${ctx.userId}${input.name} -f`;
          await $`rm -rf ${codePathFolder}`;
          return codeGradeResponse;
        }
        input.code = input.code.replace(
          regex,
          `public class ${ctx.userId}${input.name}`,
        ); //Replace the name of the main class with what we want it to be
      }

      //Add special exceptions for certain problems
      let timeout = input.name === "the_pebble" ? 5 : 1;
      switch (input.name) {
        case "the_pebble":
          timeout = 5;
          break;
        case "merger":
          input.code = input.code.replaceAll(/[+\-*/]/g, "");
          break;
        case "gargantuan":
          input.code = input.code.replaceAll(
            /set_int_max_str_digits|BigInteger/g,
            "",
          );
          break;
      }
      // Write the code to a temp file with the correct extension
      await writeFile(`${codePath}.${langObject.ext}`, input.code);

      // START COMPILE PIPELINE
      if (langObject.compile) {
        try {
          await $withoutEscaping`${langObject.compile}`; //Compile our code
        } catch (error: any) {
          codeGradeResponse.compileError = cutData(
            (error.stderr as string).replaceAll(ctx.userId, ""),
            MAXTRANSMIT,
          );

          //Clean Up
          await $`docker rm ${ctx.userId}${input.name} -f`;
          await $`rm -rf ${codePathFolder}`;

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
          await writeFile(
            `${codePath}.sh`,
            `timeout ${timeout}s ${langObject.run} < inputs/${file}`,
          );
          await $`docker exec -i ${ctx.userId}${input.name} /bin/bash < ${codePath}.sh > ${codePath}.txt`;
        } catch (error: any) {
          //Error with running the code
          if (error.exitCode === 124) {
            //Time Limit Exceeded
            //TLE exist code is 124
            thisCase.runtimeError = "Time limit exceeded";
            thisCase.output = "Time limit exceeded";
            codeGradeResponse.numFailed++;
            i++;
          } else {
            //Runtime error

            thisCase.runtimeError = cutData(
              error.stderr as string,
              MAXTRANSMIT,
            );

            thisCase.output = cutData(
              thisCase.runtimeError.replaceAll(ctx.userId, ""),
              MAXTRANSMIT,
            );
            codeGradeResponse.numFailed++;
            i++;
          }

          // Get the input
          const inputFile =
            await $`cat ./src/problems/${region}/${input.name}/input/${file}`;
          thisCase.input = cutData(inputFile.stdout, MAXTRANSMIT);

          //Get the expected output
          const expectedFile = file.replace(".in", ".out");
          const expected =
            await $`cat ./src/problems/${region}/${input.name}/output/${expectedFile}`;
          thisCase.expected = cutData(expected.stdout, MAXTRANSMIT);

          codeGradeResponse.cases.push(thisCase);
          continue;
        } // END RUNTIME ERROR PIPELINE

        // Get the input
        const inputFile =
          await $`cat ./src/problems/${region}/${input.name}/input/${file}`;
        thisCase.input = cutData(inputFile.stdout, MAXTRANSMIT);

        // Test the output against the expected output
        const expectedFile = file.replace(".in", ".out");
        const output = await $`cat ${codePath}.txt`;
        const expected =
          await $`cat ./src/problems/${region}/${input.name}/output/${expectedFile}`;

        const expectedOutput = expected.stdout.replace(/\s+$/, "");
        const userOutput = output.stdout.replace(/\s+$/, "");

        thisCase.expected = cutData(expectedOutput, MAXTRANSMIT);
        thisCase.output = cutData(userOutput, MAXTRANSMIT);

        if (
          expected.stdout.replaceAll(/\s+/g, "") ===
          output.stdout.replaceAll(/\s+/g, "")
        ) {
          thisCase.result = true;
          codeGradeResponse.numPassed++;
        } else {
          codeGradeResponse.numFailed++;
        }
        codeGradeResponse.cases.push(thisCase);
        i++;
      }

      // Cleanup
      await $`docker rm ${ctx.userId}${input.name} -f`;
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
        if (checkCompletion() !== -1) {
          const index = checkCompletion();
          const user = await db.user.findFirst({
            where: { email: ctx.user.emailAddresses[0]?.emailAddress },
          });
          if (user?.problems[index] === "0") {
            user.score += 1;
            user.time = new Date();

            const currentProblems = user.problems.split("");
            currentProblems[index] = "1";

            // Join the array back into a string
            user.problems = currentProblems.join("");

            // Add the gold to the user's account and solve the problem
            if (goldFile[input.name as keyof typeof goldFile])
              user.gold += Math.floor(
                goldFile[input.name as keyof typeof goldFile] * getLevel(user),
              );

            await db.user.update({
              where: { email: ctx.user.emailAddresses[0]?.emailAddress },
              data: user,
            });
            codeGradeResponse.reward = true;
          } else {
            codeGradeResponse.reward = true;
          }
        }
      }

      if (checkCompletion() !== -1) {
        const index = checkCompletion();
        const user = await db.user.findFirst({
          where: { email: ctx.user.emailAddresses[0]?.emailAddress },
        });
        if (user?.problems[index] === "1") {
          codeGradeResponse.solved = true;
        }
      }

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

function cutData(data: string, cutoff: number) {
  if (data.length > cutoff)
    return (
      data.substring(0, cutoff) +
      "... " +
      (data.length - cutoff) +
      " MORE CHARACTERS."
    );
  else return data;
}

function findNodeType(regionName: string, problemName: string) {
  // Convert inputs to lowercase to make comparison case-insensitive
  const lowerRegionName = regionName.toLowerCase().replace(/ /g, "_");
  const lowerProblemName = problemName.toLowerCase().replace(/ /g, "_");

  // Iterate through each chapter
  for (const chapter of mapFile.chapters) {
    if (chapter.name.toLowerCase().replace(/ /g, "_") === lowerRegionName) {
      // Iterate through each node in the chapter
      for (const node of chapter.nodes) {
        if (node.name.toLowerCase().replace(/ /g, "_") === lowerProblemName) {
          return node.type; // Return the type of the node
        }
      }
    }
  }
  return null; // Return null if no match is found
}
