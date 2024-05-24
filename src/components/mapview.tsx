/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: EXTRACT TO COMPONENT TO WRAP WITH AUTH CALLBACK
"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type GUser } from "~/app/game/utility";
import NodeGraph from "~/components/nodegraph";
import { api } from "~/trpc/react";
import indFile from "~/util/index.json";
import mapFile from "~/util/map.json";
import { isSafari } from "react-device-detect";

import {
  ArrowLeft,
  CloverIcon,
  HeartIcon,
  InfoIcon,
  Loader2,
  ShieldIcon,
  SparkleIcon,
  SwordIcon,
  Wand2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { isMobile } from "react-device-detect";
import Safari from "./safari";

interface Node {
  pos: number[];
  name: string;
  next: string[];
}

interface IParams {
  user: GUser;
  chapterid: string;
}

let dummyProblems = "0".repeat(191);

export default function MapView({ user, chapterid }: IParams) {
  const chapter = chapterToIndex(chapterid);
  const [selNode, setSelNode] = useState(-1);
  const [progress, setProgress] = useState(-1);
  const [mapChoice, setMapChoice] = useState(4);
  const [end, setEnd] = useState(false);

  //I know this is goofy but I don't want to query the user
  //here and in the getColor functions, and I think having to pass
  //a user string to the node graph for completion functions is
  //dumb if we want to make the node graph component reusable.
  if (user.problems) dummyProblems = user.problems;

  const { data: problem, refetch: getProblem } = api.code.getProblem.useQuery(
    {
      name: nameToFileName(getNodeName(chapter, selNode)),
      region: chapterid,
    },
    { enabled: false, retry: false },
  );

  const { data: desc, refetch: getChDesc } = api.map.getDescription.useQuery(
    {
      name: nameToFileName(mapFile.chapters[chapter]?.name ?? "failure"),
    },
    { enabled: false, retry: false },
  );

  const { data: homedesc, refetch: getHomeChDesc } =
    api.map.getDescription.useQuery(
      {
        name: nameToFileName(mapFile.chapters[selNode]?.name ?? "failure"),
      },
      { enabled: false, retry: false },
    );

  const { data: algdesc } = api.map.getDescription.useQuery(
    {
      name: nameToFileName("algorion"),
    },
    { enabled: true, retry: false },
  );

  useEffect(() => {
    void getProblem();
  }, [chapter, getProblem, selNode]);

  useEffect(() => {
    void getChDesc();
  }, [chapter, getChDesc]);

  useEffect(() => {
    if (chapter == -1) {
      void getHomeChDesc();
      setProgress(completionsInChapter(indexToChapter(selNode), user.problems));
    }
  }, [selNode, getHomeChDesc, chapter, user.problems]);

  useEffect(() => {
    // Determine which map to use
    let map = 1;

    // Check for the Tower pre Requisites.
    if (isRegionUnlocked("the_tower")) {
      map = 2;
    }

    // Check if the user has completed the Tower
    if (checkChapterCompletion("the_tower", user.problems)) {
      map = 3;
      setEnd(chapter == -1);
    }

    setMapChoice(map);
  }, [user.problems]);

  function setNodeColor(name: string): string {
    let ntype = "";
    mapFile.chapters[chapter]?.nodes.map((value) => {
      if (nameToFileName(value.name) == nameToFileName(name)) {
        ntype = value.type;
        return;
      }
    });

    if (!isNodeUnlocked(name, chapter)) return "#374151";
    if (checkCompletion(name, user.problems)) return "#10b981";
    else if (ntype == "game") return "#FACC15";
    return "#ef4444";
  }

  function setNodeChapterColor(name: string): string {
    if (!isRegionUnlocked(name)) return "#374151";
    if (checkChapterCompletion(name, user.problems)) return "#10b981";
    else return "#ef4444";
  }

  if (chapter != -1 && !mapFile.chapters[0])
    return (
      <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-red-800 to-red-900 text-white">
        <div className="flex size-full items-center justify-center p-4 text-3xl">
          No map was found.
        </div>
      </main>
    );

  if (isSafari) return <Safari></Safari>;

  return (
    <TooltipProvider>
      <main className="z-10 min-h-screen w-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white md:flex md:h-[92.5vh] md:w-full">
        {/* <div className="w-full bg-red-700 py-2 text-center font-bold text-white shadow-xl">
        {user.email + " " + user.id + " " + user.problems}
      </div> */}
        <Dialog open={end} onOpenChange={setEnd}>
          <DialogContent className="max-h-[500px] overflow-auto bg-zinc-800 sm:max-w-[625px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose p-4 text-white prose-headings:text-purple-500 prose-strong:font-medium prose-strong:text-gray-400 prose-strong:text-opacity-30 prose-em:text-yellow-200"
            >
              {`# Thank you for embarking on this journey with us!\n\nCongratulations on beating Lootcode.\n\nFeel free to retry and upsolve any former encounters or problems, or join our Discord server to discuss your journey with other adventurers!\n\nAnd in case it wasn't obvious - this was all a dream you made in your head while prepping for your next coding interview. Regardless of how real they are, the people of Algorion thank you too.`}
            </ReactMarkdown>
          </DialogContent>
        </Dialog>
        <div className="flex md:mt-[-2.5vh] md:size-full md:items-center md:justify-center">
          {chapter != -1 ? (
            <div className="flex w-[100vw] flex-col justify-center md:h-[85vh] md:w-[85vw]">
              <div className="my-4 flex justify-between rounded-xl bg-[#15162c] p-2 text-center text-2xl font-bold md:grid md:grid-cols-3">
                <a href="/map/home">
                  <ArrowLeft className="m-2 size-10 cursor-pointer rounded bg-purple-700 duration-150 hover:bg-[#15162c]"></ArrowLeft>
                </a>
                <Dialog>
                  <DialogTrigger>
                    <div className="m-2 cursor-pointer rounded-lg bg-purple-700 p-2 text-center text-2xl font-bold duration-150 hover:bg-[#15162c]">
                      {mapFile.chapters[chapter]?.name}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[50vh] max-w-[80vw] overflow-auto rounded-xl bg-zinc-800 text-white sm:max-w-[50vw]">
                    <DialogHeader>
                      {/* <DialogTitle>{mapFile.chapters[chapter]?.name}</DialogTitle> */}
                      <DialogDescription className="w-full">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          className=" prose w-auto  max-w-none 
                        p-4 text-white prose-headings:text-purple-500 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                        >
                          {desc}
                        </ReactMarkdown>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex h-fit w-full shrink flex-col justify-center md:flex-row">
                <div className="flex h-fit w-full shrink">
                  <NodeGraph
                    nodes={mapFile.chapters[chapter]?.nodes}
                    nodeRadius={20}
                    nodeColor={setNodeColor}
                    getNode={selNode}
                    setNode={setSelNode}
                    bgImg={4}
                  />
                </div>
                {/*fixing height for now*/}
                <div className="mt-4 flex grow md:ml-4 md:mt-0 md:h-[71.5vh] md:w-[20vw]">
                  <div className="flex w-full shrink flex-col md:w-[20vw]">
                    <div className="mb-2 w-full rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
                      {problem ? (
                        problem?.solved ||
                        checkChapterCompletion(
                          mapFile.chapters[chapter]?.name,
                          user.problems,
                        ) ? (
                          <span className="text-yellow-200">Completed</span>
                        ) : (
                          <span className="text-red-500">Not Completed</span>
                        )
                      ) : selNode != -1 ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-yellow-200" />
                        </div>
                      ) : checkChapterCompletion(chapterid, user.problems) ? (
                        <span className="text-yellow-200">Completed</span>
                      ) : (
                        <span className="text-red-500">Not Completed</span>
                      )}
                    </div>

                    {selNode != -1 && problem && problem.type === "problem" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose grow overflow-auto scroll-smooth 
                      rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-700 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                      >
                        {isNodeUnlocked(getNodeName(chapter, selNode), chapter)
                          ? problem?.description
                          : "*This problem is not revealed yet...*"}
                      </ReactMarkdown>
                    ) : selNode != -1 && problem && problem.type === "game" ? (
                      <div className="flex h-full flex-col overflow-auto rounded-xl bg-[#15162c]">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          className="prose grow scroll-smooth  
                      rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-700 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                        >
                          {isNodeUnlocked(
                            getNodeName(chapter, selNode),
                            chapter,
                          )
                            ? problem?.description
                            : "*This encounter is not revealed yet...*"}
                        </ReactMarkdown>
                        {!isNodeUnlocked(
                          getNodeName(chapter, selNode),
                          chapter,
                        ) ? (
                          <div />
                        ) : (
                          problem.enemies?.map((enemy, index) => (
                            <Tooltip key={index}>
                              <TooltipTrigger>
                                <div className="m-4 rounded-xl bg-purple-700 p-4 text-white">
                                  <div className="flex items-center justify-center">
                                    <div>{enemy.name}</div>
                                    <InfoIcon className="m-2 h-4 w-4"></InfoIcon>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="animate-jump-in bg-[#282A36] text-white">
                                <div className="flex flex-col ">
                                  <div className="grid grid-cols-3 grid-rows-2">
                                    <div className="flex flex-col items-center justify-center p-2">
                                      <HeartIcon></HeartIcon>
                                      {enemy.health}
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
                          ))
                        )}
                      </div>
                    ) : selNode != -1 && !problem ? (
                      <div className="flex h-full items-center justify-center rounded-xl bg-[#15162c]">
                        <Loader2 className="h-6 w-6 animate-spin text-yellow-200" />
                      </div>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose h-full overflow-auto scroll-smooth 
                      rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-700 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                      >
                        {desc}
                      </ReactMarkdown>
                    )}

                    {selNode != -1 && problem != undefined ? (
                      !isNodeUnlocked(
                        getNodeName(chapter, selNode),
                        chapter,
                      ) ? (
                        <Button className="mt-2 w-full bg-gray-700">
                          Locked
                        </Button>
                      ) : (
                        <a
                          href={
                            "/" +
                            (mapFile.chapters[chapter]?.nodes[selNode]?.type ==
                            "problem"
                              ? "map"
                              : "game") +
                            "/" +
                            chapterid +
                            "/" +
                            nameToFileName(getNodeName(chapter, selNode))
                          }
                        >
                          <Button className="mt-2 w-full bg-purple-700">
                            Embark
                          </Button>
                        </a>
                      )
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-[100vw] flex-col justify-center md:h-[85vh] md:w-[85vw]">
              <div className="my-4 grid rounded-xl bg-[#15162c] p-2 text-center text-2xl font-bold md:grid-cols-3">
                <div />
                <Dialog>
                  <DialogTrigger>
                    <div className="m-2 cursor-pointer rounded-lg bg-purple-700 p-1 text-center text-2xl font-bold duration-150 hover:bg-[#15162c]">
                      Algorion
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[50vh] overflow-auto bg-zinc-800 text-white sm:max-w-[50vw]">
                    <DialogHeader>
                      {/* <DialogTitle>{mapFile.chapters[chapter]?.name}</DialogTitle> */}
                      <DialogDescription className="w-full">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          className=" prose w-auto  max-w-none 
                        p-4 text-white prose-headings:text-purple-500 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                        >
                          {algdesc}
                        </ReactMarkdown>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex h-fit w-full shrink flex-col justify-center md:flex-row">
                <div className="flex h-fit w-full shrink">
                  <NodeGraph
                    nodes={mapFile.chapters}
                    nodeRadius={15}
                    nodeColor={setNodeChapterColor}
                    getNode={selNode}
                    setNode={setSelNode}
                    bgImg={mapChoice}
                  />
                </div>
                <div>
                  <div className="flex grow md:ml-4 md:h-[71.5vh] md:w-[20vw]">
                    <div className="mt-4 flex w-[100vw] flex-col md:mt-0 md:w-[20vw]">
                      {selNode != -1 ? (
                        <div className="mb-2 rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
                          {!homedesc ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-6 w-6 animate-spin text-yellow-200" />
                            </div>
                          ) : progress >=
                            (mapFile.chapters[selNode]?.nodes.length ?? 0) ? (
                            <span className="text-yellow-200">Completed</span>
                          ) : (
                            <span className="text-red-500">
                              {"" +
                                progress +
                                " / " +
                                (mapFile.chapters[selNode]?.nodes.length ?? 0)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div />
                      )}

                      {!algdesc || !homedesc ? (
                        <div className="flex h-full items-center justify-center rounded-xl bg-[#15162c]">
                          <Loader2 className="h-6 w-6 animate-spin text-yellow-200" />
                        </div>
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          className="prose h-full overflow-auto scroll-smooth 
                          rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-700 prose-strong:font-bold prose-strong:text-yellow-200 prose-em:text-yellow-200"
                        >
                          {selNode != -1 ? homedesc : algdesc}
                        </ReactMarkdown>
                      )}

                      {selNode != -1 ? (
                        <a
                          href={
                            "/map/" + nameToFileName(indexToChapter(selNode))
                          }
                        >
                          <Button className="mt-2 w-full bg-purple-700">
                            Embark
                          </Button>
                        </a>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNode(ch: number, i: number): any {
  return mapFile.chapters[ch]?.nodes[i];
}

function getNodeName(ch: number, i: number): string {
  const n: Node | undefined = getNode(ch, i);
  if (n == undefined) return "";

  return n.name;
}

export function nameToFileName(name: string): string {
  return name.split(" ").join("_").toLowerCase();
}

//Restoring this to determine node colors
//I know this was implemented into the getProblem query,
//but I'd rather not run a TRPC query to get completion
//for each node on mount just to change colors
function checkCompletion(problem: string, user: string): boolean {
  let res = false;
  indFile.problems.map((prob, index) => {
    if (nameToFileName(problem) === nameToFileName(prob)) {
      res = user[index] === "1";
      return;
    }
  });
  return res;
}

//Returns true only if all problems in a chapter are completed
function checkChapterCompletion(
  name: string | undefined,
  user: string,
): boolean {
  if (name == undefined) return false;

  let res = true;
  mapFile.chapters.map((chapter, index) => {
    if (nameToFileName(chapter.name) === nameToFileName(name)) {
      mapFile.chapters[index]?.nodes.map((problem) => {
        if (!checkCompletion(problem.name, user)) {
          res = false;
          return;
        }
      });
    }
  });
  return res;
}

function completionsInChapter(name: string, user: string): number {
  let res = 0;
  mapFile.chapters.map((chapter, index) => {
    if (chapter.name === name) {
      mapFile.chapters[index]?.nodes.map((problem) => {
        if (checkCompletion(problem.name, user)) {
          res++;
          return;
        }
      });
    }
  });
  return res;
}

export function indexToChapter(id: number): string {
  return mapFile.chapters[id]?.name ?? "error";
}

export function chapterToIndex(name: string): number {
  let ret = -1;
  mapFile.chapters.map((value, index) => {
    if (nameToFileName(value.name) == nameToFileName(name)) ret = index;
  });

  return ret;
}

export function isRegionUnlocked(name: string): boolean {
  //make a fake node so the linter stops being pissy
  let n: Node = { name: "null", pos: [0, 0], next: [] };
  mapFile.chapters.map((value) => {
    if (nameToFileName(value.name) == nameToFileName(name)) {
      n = value;
      return;
    }
  });

  if (n.name == "null") return false; //if for whatever reason we pass a false node

  let ret = true;
  n.next.map((value) => {
    if (!checkChapterCompletion(value, dummyProblems)) {
      ret = false;
      return;
    }
  });

  return ret;
}

export function isNodeUnlocked(name: string, ch: number): boolean {
  //make a fake node so the linter stops being pissy
  let n: Node = { name: "null", pos: [0, 0], next: [] };
  mapFile.chapters[ch]?.nodes.map((value) => {
    if (nameToFileName(value.name) == nameToFileName(name)) {
      n = value;
      return;
    }
  });

  if (n.name == "null") return false; //if for whatever reason we pass a false node

  let ret = true;
  n.next.map((value) => {
    if (!checkCompletion(nameToFileName(value), dummyProblems)) {
      ret = false;
      return;
    }
  });

  return ret;
}
