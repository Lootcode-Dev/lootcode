import { z } from "zod";
import { $ } from "zx";
import regFile from "~/util/region.json";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dockerRouter = createTRPCRouter({
  createDockerContainer: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      $.verbose = false;

      const region = Object.keys(regFile).find((key: string) =>
        regFile[key as keyof typeof regFile].includes(input.name),
      );

      await $`mkdir -p ./temp/${ctx.userId}${input.name}`; //Create a temp folder for the user in the temp space
      const codePathFolder = `./temp/${ctx.userId}${input.name}/`; //This is the temp user folder where we store code
      const problemPathInput = `./src/problems/${region}/${input.name}/input/`; //The path is based on the problem name

      //Spwan a docker process for security reasons
      await $`docker run --name ${ctx.userId}${input.name} --rm -i -d -v ${codePathFolder}:/app/ -v ${problemPathInput}:/app/inputs/:ro code-runner`;

      return { success: true };
    }),
});
