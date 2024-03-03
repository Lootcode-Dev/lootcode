import { $ } from "bun";

const data = await $`cat ./../problems/trial/trial.md`.text();
console.log(data);
