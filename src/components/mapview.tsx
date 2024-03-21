/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: EXTRACT TO COMPONENT TO WRAP WITH AUTH CALLBACK
"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

import mapFile from "~/app/map/map.json";
import indFile from "~/problems/index.json";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NodeGraph from "~/components/nodegraph";
import { api } from "~/trpc/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface Node {
  pos: number[];
  name: string;
  next: string[];
}

type IUser = {
  id: string | undefined;
  email: string | undefined;
  problems: string | undefined;
};

let dummyProblems =
  "00000000000000000000000000000000000000000000000000000000000000000000000000";

export default function MapView({ id, email, problems }: IUser) {
  const [chapter, setChapter] = useState(-1);
  const [selNode, setSelNode] = useState(-1);

  //I know this is goofy but I don't want to query the user
  //here and in the getColor functions, and I think having to pass
  //a user string to the node graph for completion functions is
  //dumb if we want to make the node graph component reusable.
  if (problems) dummyProblems = problems;

  const { data: problem, refetch: getProblem } = api.code.getProblem.useQuery(
    {
      name: nameToFileName(getNodeName(chapter, selNode)),
    },
    { enabled: false, retry: false },
  );

  const { data: desc, refetch: getChDesc } = api.map.getDescription.useQuery(
    {
      name: nameToFileName(mapFile.chapters[chapter]?.name ?? "failure"),
    },
    { enabled: false, retry: false },
  );

  useEffect(() => {
    void getProblem();
  }, [chapter, getProblem, selNode]);

  useEffect(() => {
    void getChDesc();
  }, [chapter, getChDesc]);

  if (chapter != -1 && !mapFile.chapters[0])
    return (
      <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-red-800 to-red-900 text-white">
        <div className="flex size-full items-center justify-center p-4 text-3xl">
          No map was found.
        </div>
      </main>
    );

  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="w-full bg-red-700 py-2 text-center font-bold text-white shadow-xl">
        {email + " " + id + " " + problems}
      </div>
      <div className="flex size-full items-center justify-center p-4">
        {chapter != -1 ? (
          <div className="grow">
            <div className="grid justify-items-center">
              <Dialog>
                <DialogTrigger>
                  <Button className="mb-4 bg-purple-700 text-center text-2xl font-bold">
                    {mapFile.chapters[chapter]?.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[50vh] overflow-auto bg-zinc-800 text-white sm:max-w-[50vw]">
                  <DialogHeader>
                    {/* <DialogTitle>{mapFile.chapters[chapter]?.name}</DialogTitle> */}
                    <DialogDescription className="w-full">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className=" prose w-auto  max-w-none 
                         scroll-smooth text-white prose-headings:text-white"
                      >
                        {desc}
                      </ReactMarkdown>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex h-[75vh] w-full justify-center">
              <div className="items-top mx-2 flex flex-col rounded-xl bg-[#15162c] p-4">
                <Button
                  className="mt-2 bg-purple-700"
                  onClick={() => {
                    setSelNode(-1);
                    setChapter(-1);
                    console.log(selNode);
                  }}
                >
                  Back
                </Button>
              </div>
              <NodeGraph
                nodes={mapFile.chapters[chapter]?.nodes}
                nodeRadius={25}
                nodeColor={setNodeColor}
                getNode={selNode}
                setNode={setSelNode}
              />

              <div className="flex w-[20vw] flex-col">
                <div className="mb-2 rounded-xl bg-[#15162c] p-2 text-center font-bold text-white">
                  {problem?.solved ? "Completed" : "Not Completed"}
                </div>

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose grow overflow-auto scroll-smooth 
                    rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
                >
                  {selNode != -1 ? problem?.description : desc}
                </ReactMarkdown>

                {selNode != -1 && problem != undefined ? (
                  <a
                    href={
                      "/" +
                      (mapFile.chapters[chapter]?.nodes[selNode]?.type ==
                      "problem"
                        ? "map"
                        : "game") +
                      "/" +
                      nameToFileName(getNodeName(chapter, selNode))
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
        ) : (
          <div className="flex h-[80vh] w-full justify-center">
            <NodeGraph
              nodes={mapFile.chapters}
              nodeRadius={30}
              nodeColor={setNodeChapterColor}
              getNode={chapter}
              setNode={setChapter}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function getNode(ch: number, i: number): Node | undefined {
  return mapFile.chapters[ch]?.nodes[i];
}

function getNodeName(ch: number, i: number): string {
  const n: Node | undefined = getNode(ch, i);
  if (n == undefined) return "";

  return n.name;
}

export function nameToFileName(name: string): string {
  return name.split(" ").join("-").toLowerCase();
}

//Restoring this to determine node colors
//I know this was implemented into the getProblem query,
//but I'd rather not run a TRPC query to get completion
//for each node on mount just to change colors
function checkCompletion(problem: string, user: string): boolean {
  let res = false;
  indFile.problems.map((prob, index) => {
    if (nameToFileName(problem) === prob) {
      res = user[index] === "1";
      return;
    }
  });
  return res;
}

//Returns true only if all problems in a chapter are completed
function checkChapterCompletion(name: string, user: string): boolean {
  let res = true;
  mapFile.chapters.map((chapter, index) => {
    if (chapter.name === name) {
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

function setNodeColor(name: string): string {
  if (checkCompletion(name, dummyProblems)) return "#10b981";
  else return "#ef4444";
}

function setNodeChapterColor(name: string): string {
  if (checkChapterCompletion(name, dummyProblems)) return "#10b981";
  else return "#ef4444";
}
