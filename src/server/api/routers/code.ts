/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { writeFile } from "fs/promises";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { $ } from "zx";
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
      interface caseRes {num: number; expected: string; output: string; result: boolean; runtimeError?: string} //Case Interface for cases in teh Code Grade Interface
      interface codeGradeResult {compileError?: string; numPassed: number; numFailed: number; cases: caseRes[]} //Code Grade Interface

      const codeGradeResponse: codeGradeResult = {numPassed: 0, numFailed: 0, cases: []}; //OUR RESPONSE BACK TO OUR CLINET


      interface langType {ext: string; compile ?: string; run : string} //Our Interface for our dictionary 
      const codePath = `./temp/${ctx.userId}${input.name}`; //The path is based on the users id and problem name
      const problemPathInput = `./src/problems/${input.name}/input/` //The path is based on the problem name

      const langSearch: Record<string, langType> = {
        "python": {ext: "py", run: `python3 ${codePath}.py`},
        "java": {ext: "java", compile: `javac ${codePath}.java`, run: `java -classpath ./temp/ ${ctx.userId}${input.name}`},
        "c": {ext: "c", compile: `gcc ${codePath}.c -o ${codePath}.out -lm`, run: `${codePath}.out`},
        "cpp": {ext: "cpp", compile: `g++ ${codePath}.cpp -o ${codePath}.out -lm`, run: `${codePath}.out`}
      }
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
      console.log(filenames);

      // Write the code to a temp file with the correct extension
      await writeFile(`${codePath}.${langObject.ext}`, input.code);

      if (langObject.compile) {
        try {
          await $withoutEscaping`${langObject.compile}` //Compile our code
          console.log("Compiled Successfully");
        } catch(error) {
          codeGradeResponse.compileError = "Compile Time Error";
          console.log(error);

          await $withoutEscaping`${codePath}.${langObject.ext}`; //Clean Up
          return codeGradeResponse; //Our code didn't compile no need to test the cases 
        }
      }

      // Iterate through the input files
      let i = 1;
      for (const file of filenames) {
        // Declare our case object
        const thisCase: caseRes = {
          num: i, //Case Number
          expected: "", //Expected Result
          output: "", //Our program output
          result: false, //Did we pass all cases?
          runtimeError: "", //We had an error during runtime
        };

        // Run the code with the input and write the output to a temp file
        try {
          const IO = `< ${problemPathInput}${file} > ${codePath}.txt`;
          await $withoutEscaping`timeout 1s ${langObject.run} ${IO}`;
        } catch (error: any) { //Error with running the code
          if (error.exitCode === 124) { //Time Limit Exceeded
            //TLE exist code is 124
            console.log("Time limit exceeded");
            thisCase.runtimeError = "Time limit exceeded";
            thisCase.output = "Time limit exceeded";
          } else { //Runtime error
            console.log("Runtime error");
            console.log(error.stderr);
            thisCase.runtimeError = error.stderr;
            thisCase.output = "Runtime error";
          }

          //Get the expected output
          const expectedFile = file.replace(".in", ".out");
          const expected = await $`cat ./src/problems/${input.name}/output/${expectedFile}`;
          thisCase.expected = expected.stdout;
          
          codeGradeResponse.cases.push(thisCase);
          continue;
        }

        // Test the output against the expected output
        const expectedFile = file.replace(".in", ".out");
        const output = await $`cat ${codePath}.txt`;
        const expected = await $`cat ./src/problems/${input.name}/output/${expectedFile}`;

        console.log("Output: " + output.stdout);
        console.log("Expected: " + expected.stdout);
        thisCase.expected = expected.stdout;
        thisCase.output = output.stdout;
        if (output.stdout === expected.stdout) {
          console.log("Correct answer\n");
          thisCase.result = true;
          codeGradeResponse.numPassed++;
        } else {
          console.log("Wrong answer\n");
          codeGradeResponse.numFailed++;
        }
        codeGradeResponse.cases.push(thisCase);
        i++;
      }

      // Cleanup
      await $`rm ${codePath}.*`; //Remove all the user files in temp

      console.log(codeGradeResponse);
      return codeGradeResponse;
    }),
});

export function $withoutEscaping(pieces: TemplateStringsArray, ...args: unknown[]): any {
  const origQuote = $.quote //ZX shell escapes using this quote function
  try {
      $.quote = unescapedCmd => unescapedCmd //Change the quote function to not esacape
      return $(pieces, args) //Return the result of our shell command without escaping
  } finally {
      $.quote = origQuote //Set the functionality of quote back to being able to escape (without changing our return, so our return returned an unescaped sequence fixing our compilation problems)
  }
}
