"use client";
import {
  ArrowLeft,
  CloverIcon,
  HeartIcon,
  Loader2,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { type GUser, getLevel, getUserStats } from "~/app/game/utility";
import { api } from "~/trpc/react";
import mapFile from "~/util/map.json";
import { nameToFileName } from "./mapview";
import { Card } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Mobile from "./safari";
import GameRules from "./gamerules";

interface Entity {
  name: string;
  health: number;
  maxHealth: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
  dead: boolean;
  critHit: boolean;
}

interface Enemy {
  name: string;
  health: number;
  critChance: number;
  strength: number;
  armor: number;
  magic: number;
  resist: number;
}

interface Props {
  name: string;
  user: GUser;
  enc: string;
  reg: string;
}

export default function Testgame({ user, name, enc, reg }: Props) {
  const [enemies, setEnemies] = useState<Entity[] | null>(null);
  const [player, setPlayer] = useState<Entity | null>(null);
  const [originalPlayer, setOriginalPlayer] = useState<Entity | null>(null);
  const [originalEnemies, setOriginalEnemies] = useState<Entity[] | null>(null);
  const [loopRunning, setLoopRunning] = useState<boolean>(false);
  const [encounterLabel, setEncounterLabel] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const userStats = getUserStats(user);

  const { data } = api.code.getProblem.useQuery({
    name: enc,
    region: reg,
  });

  const { mutate: beatGame } = api.game.beatEncounter.useMutation({});

  useEffect(() => {
    mapFile.chapters.map((val, index) => {
      if (nameToFileName(val.name) == reg) {
        mapFile.chapters[index]?.nodes.map((value) => {
          if (nameToFileName(value.name) == enc) {
            setEncounterLabel(value.name);
            return;
          }
        });
        return;
      }
    });

    if (data?.enemies) {
      const convertedEnemies = (data.enemies as Enemy[]).map((encounter) => ({
        name: encounter.name,
        health: Math.floor(
          encounter.health * (1 + 0.25 * (getLevel(user) - 1)),
        ),
        maxHealth: Math.floor(
          encounter.health * (1 + 0.25 * (getLevel(user) - 1)),
        ),
        critChance: encounter.critChance,
        strength: Math.round(
          encounter.strength * (1 + 0.25 * (getLevel(user) - 1)),
        ),
        armor: encounter.armor * 4,
        magic: Math.round(encounter.magic * (1 + 0.25 * (getLevel(user) - 1))),
        resist: encounter.resist * 4,
        dead: false,
        critHit: false,
      }));

      setEnemies(convertedEnemies);
      setOriginalEnemies(convertedEnemies);
    }
  }, [data, enc, reg, user]);

  useEffect(() => {
    const convertedPlayer = {
      name: name,
      health: userStats.health,
      maxHealth: userStats.health,
      critChance: userStats.critChance,
      strength: userStats.strength,
      armor: userStats.armor,
      magic: userStats.magic,
      resist: userStats.resist,
      dead: false,
      critHit: false,
    };

    setPlayer(convertedPlayer);
    setOriginalPlayer(convertedPlayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intervalRef = useRef<number | null>(null);

  function gameLoop() {
    // Check if player is dead

    if (enemies && !loopRunning) {
      let currentEnemyIndex = 0;
      setLoopRunning(true);
      intervalRef.current = setInterval(() => {
        // Update Enemy health for each player attack
        setEnemies((prevEnemies) => {
          if (prevEnemies) {
            const updatedEnemies = [...prevEnemies];
            const currentEnemy = updatedEnemies[currentEnemyIndex];

            // Enemy incoming damage updates
            if (currentEnemy) {
              let damage =
                Math.max(
                  0,
                  userStats.strength -
                    (userStats.strength >= 0
                      ? userStats.strength * currentEnemy.armor * 0.025
                      : 0),
                  //if strength is negative, let it count against your total damage
                  //there should not be a scenario where your attacks heal the enemy
                  //if we make the items correctly
                ) +
                Math.max(
                  0,
                  userStats.magic -
                    (userStats.magic >= 0
                      ? userStats.magic * currentEnemy.resist * 0.025
                      : 0),
                  //same with magical damage
                );

              if (Math.random() * 100 <= userStats.critChance) {
                damage *= 3;
                if (damage > 0) {
                  currentEnemy.critHit = true;
                }
              } else {
                currentEnemy.critHit = false;
              }

              const newHealth = currentEnemy.health - damage;
              const health = newHealth < 0 ? 0 : newHealth;

              if (health <= 0) {
                currentEnemy.dead = true;
              }

              updatedEnemies[currentEnemyIndex] = {
                ...currentEnemy,
                health,
              };
            }

            if (currentEnemy && currentEnemy.health <= 0) {
              currentEnemyIndex++;
              if (currentEnemyIndex >= updatedEnemies.length) {
                clearInterval(intervalRef.current!);
              }
            }

            // Check if all enemies are dead
            const allEnemiesDead = updatedEnemies.every((enemy) => enemy.dead);
            if (allEnemiesDead) {
              clearInterval(intervalRef.current ?? 0);
              setLoopRunning(false);

              // Handle win
              beatGame({ encounterid: enc });

              // Dialog to show loot
              setDialogOpen(true);
            }

            return updatedEnemies;
          }

          return prevEnemies;
        });

        // Update Player health for each enemy attack that is still alive
        setPlayer((prevPlayer) => {
          if (prevPlayer) {
            const updatedPlayer = { ...prevPlayer };
            updatedPlayer.critHit = false;

            let totaldmg = 0;
            for (const currentEnemy of enemies) {
              if (currentEnemy) {
                let damage =
                  Math.max(
                    0,
                    currentEnemy.strength -
                      currentEnemy.strength * userStats.armor * 0.025,
                  ) +
                  Math.max(
                    0,
                    currentEnemy.magic -
                      currentEnemy.magic * userStats.resist * 0.025,
                  );

                if (Math.random() * 100 <= currentEnemy.critChance) {
                  damage *= 3;
                  if (damage > 0) {
                    updatedPlayer.critHit = true;
                  }
                }

                totaldmg += damage;
              }
            }

            const newHealth = updatedPlayer.health - totaldmg;
            const health = newHealth < 0 ? 0 : newHealth;

            if (health <= 0) {
              updatedPlayer.dead = true;
            }

            // Check if player is dead
            if (updatedPlayer.health <= 0) {
              clearInterval(intervalRef.current ?? 0);
              setLoopRunning(false);
            }

            return {
              ...updatedPlayer,
              health,
            };
          }

          return prevPlayer;
        });
      }, 400) as unknown as number;
    }
  }

  function reset() {
    clearInterval(intervalRef.current ?? 0);
    setPlayer(originalPlayer);
    setEnemies(originalEnemies);
    // Remove the critHit condition
    setPlayer((prevPlayer) => {
      if (prevPlayer) {
        return {
          ...prevPlayer,
          critHit: false,
        };
      }
      return prevPlayer;
    });

    // Remove the critHit condition
    setEnemies((prevEnemies) => {
      if (prevEnemies) {
        return prevEnemies.map((enemy) => ({
          ...enemy,
          critHit: false,
        }));
      }
      return prevEnemies;
    });

    setLoopRunning(false);
  }

  return (
    <TooltipProvider>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-800">
          {reg === "the_tower" ? (
            <ReactMarkdown className="prose max-h-[425px] max-w-[600px] overflow-auto p-4 text-white prose-headings:text-purple-500 prose-strong:font-medium prose-strong:text-gray-400 prose-strong:text-opacity-30 prose-em:text-yellow-200">
              {`${data?.lore}\n\n` + `${`*Reward: ${data?.gold} gold*`}`}
            </ReactMarkdown>
          ) : (
            <ReactMarkdown className="prose p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200">
              {`# You earned...\n` +
                `${data?.lore ? `*Collectible: ${data.lore}*\n\n` : ""}` +
                `${`*Reward: ${data?.gold} gold*`}`}
            </ReactMarkdown>
          )}
        </DialogContent>
      </Dialog>
      <div className="h-[92.5vh] bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="justify-center pt-8 md:flex md:space-x-4">
          <div className="size-full flex-col md:flex md:items-center md:justify-center">
            <div className="grid w-[100vw] grid-cols-2 items-center  justify-between bg-[#15162c] text-end font-bold md:w-[80vw] md:grid-cols-3 md:rounded-xl md:p-2 md:pr-4 md:text-3xl">
              {!data ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-yellow-200" />
                </div>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  <a href={`/map/${reg}`}>
                    <ArrowLeft className="m-1 size-8 cursor-pointer rounded bg-purple-700 duration-150 hover:bg-[#15162c] md:size-10"></ArrowLeft>
                  </a>
                  <div>{encounterLabel}</div>
                </div>
              )}

              <div className="grid grid-cols-2 items-center justify-between space-x-2 p-2 md:grid-cols-3 md:gap-8">
                <div
                  onClick={() => {
                    reset();
                    gameLoop();
                  }}
                  className="cursor-pointer rounded-lg bg-purple-700 p-1 text-center text-base font-bold duration-150 hover:bg-[#15162c] md:m-2"
                >
                  Start
                </div>
                <div className="hidden h-full items-center justify-center md:flex">
                  <GameRules />
                </div>
                <div
                  onClick={reset}
                  className="cursor-pointer rounded-lg bg-purple-700 p-1 text-center text-base font-bold duration-150 hover:bg-[#15162c] md:m-2"
                >
                  Reset
                </div>
              </div>
              <div className="hidden md:block">{"Level " + getLevel(user)}</div>
            </div>

            {!data ? (
              <div className="flex h-[75vh] w-[100vw] items-center justify-center border-4 border-[#15162c] bg-indigo-950 md:m-4 md:w-[80vw] md:rounded-xl">
                <Loader2 className="h-32 w-32 animate-spin text-yellow-200" />
              </div>
            ) : (
              <div className="grid h-[75vh] w-[100vw] grid-cols-3 border-4 border-[#15162c] bg-indigo-950 md:m-4 md:w-[80vw] md:rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-start space-y-12">
                    <Tooltip>
                      <TooltipTrigger>
                        <Card
                          className={`${
                            player?.dead ?? !loopRunning
                              ? player?.dead
                                ? "border-red-700 bg-red-950"
                                : "border-purple-700 bg-purple-950"
                              : player?.critHit
                                ? "animate-wiggle-more bg-purple-950 animate-infinite"
                                : "animate-wiggle border-purple-700 bg-purple-950 animate-infinite"
                          } border-4 text-white shadow-lg md:w-[250px] md:text-2xl`}
                        >
                          <div
                            style={{
                              color: player?.dead
                                ? "inherit"
                                : player?.critHit
                                  ? "red"
                                  : "inherit",
                            }}
                          >
                            <div className="grid grid-cols-3 justify-between p-2">
                              <div className="col-span-2 flex flex-row items-center justify-center p-2 font-bold">
                                {player?.name}
                              </div>
                              <div className="flex flex-row items-center justify-center gap-1 p-2">
                                <HeartIcon></HeartIcon>
                                {Math.floor(player?.health ?? 0)}
                              </div>
                            </div>

                            {!player?.dead ? (
                              <Progress
                                value={
                                  ((player?.health ?? 0) /
                                    (player?.maxHealth ?? 1)) *
                                  100
                                }
                              ></Progress>
                            ) : (
                              <div />
                            )}
                          </div>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent className="animate-jump-in bg-[#282A36] text-white">
                        <div className="flex flex-col justify-center">
                          <div className="grid grid-cols-3 grid-rows-2">
                            <div className="flex flex-col items-center justify-center p-2">
                              <HeartIcon></HeartIcon>
                              {player?.maxHealth}
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                              <SwordIcon></SwordIcon>
                              {player?.strength}
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                              <ShieldIcon></ShieldIcon>
                              {player?.armor}
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                              <CloverIcon></CloverIcon>
                              {player?.critChance}
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                              <Wand2></Wand2>
                              {player?.magic}
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                              <SparkleIcon></SparkleIcon>
                              {player?.resist}
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="col-span-2 flex flex-col items-center justify-center md:p-16">
                  <div className="grid items-center gap-4 md:grid-cols-3 md:gap-12">
                    {enemies?.map((enemy, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger>
                          <Card
                            className={`${
                              enemy.dead || !loopRunning
                                ? enemy.dead
                                  ? "border-red-700 bg-red-950"
                                  : "border-purple-700 bg-purple-950"
                                : enemy.critHit
                                  ? "animate-wiggle-more bg-purple-950 animate-infinite"
                                  : "animate-wiggle border-purple-700 bg-purple-950 animate-infinite"
                            } border-4 text-white shadow-lg md:w-[250px] md:text-2xl`}
                          >
                            <div
                              style={{
                                color: enemy.dead
                                  ? "inherit"
                                  : enemy.critHit
                                    ? "red"
                                    : "inherit",
                              }}
                            >
                              <div className="grid grid-cols-3 p-2">
                                <div className="col-span-2 flex flex-row items-center justify-center break-words p-2 text-sm font-bold md:text-base">
                                  {enemy.name}
                                </div>
                                <div className="flex flex-row items-center justify-center gap-1 p-2">
                                  <HeartIcon className="hidden md:block"></HeartIcon>
                                  {Math.floor(enemy.health)}
                                </div>
                              </div>
                              {!enemy.dead ? (
                                <Progress
                                  value={(enemy.health / enemy.maxHealth) * 100}
                                ></Progress>
                              ) : (
                                <div />
                              )}
                            </div>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent className="animate-jump-in bg-[#282A36] text-white">
                          <div className="flex flex-col ">
                            <div className="grid grid-cols-3 grid-rows-2">
                              <div className="flex flex-col items-center justify-center p-2">
                                <HeartIcon></HeartIcon>
                                {enemy.maxHealth}
                              </div>
                              <div className="flex flex-col items-center justify-center p-2">
                                <SwordIcon></SwordIcon>
                                {enemy.strength}
                              </div>
                              <div className="flex flex-col items-center justify-center p-2">
                                <ShieldIcon></ShieldIcon>
                                {enemy.armor * 4}
                              </div>
                              <div className="flex flex-col items-center justify-center p-2">
                                <CloverIcon></CloverIcon>
                                {enemy.critChance}
                              </div>
                              <div className="flex flex-col items-center justify-center p-2">
                                <Wand2></Wand2>
                                {enemy.magic}
                              </div>
                              <div className="flex flex-col items-center justify-center p-2">
                                <SparkleIcon></SparkleIcon>
                                {enemy.resist * 4}
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
