"use client";

import { useEffect, useState } from "react";
import mapFile from "./map.json";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { map } from "@trpc/server/observable";

import { api } from "~/trpc/react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Link } from "lucide-react";
import NodeGraph from "~/components/nodegraph";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

interface Node {
  pos: number[];
  name: string;
  next: string[];
}

export default function Page() {
  const [chapter, setChapter] = useState(-1);
  const [selNode, setSelNode] = useState(-1);

  const {data: problem, refetch: getProblem } = api.code.getProblem.useQuery(
    {
      name: nameToFileName(getNodeName(chapter, selNode)),
    },
    { enabled: false, retry: false },
  );

  const {data: desc, refetch: getChDesc } = api.map.getDescription.useQuery(
    {
      name: nameToFileName(mapFile.chapters[chapter]?.name ?? "failure"),
    },
    { enabled: false, retry: false },
  );

  useEffect(() => {
    getProblem();
  }, [chapter, selNode]);

  useEffect(() => {
    getChDesc();
  }, [chapter])

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
      <div className="flex size-full items-center justify-center p-4">
        {chapter != -1 ? (
            <div className="grow">
            
              <div className="grid justify-items-center">
                <Dialog>
                  <DialogTrigger>
                    <Button className="mb-4 bg-purple-700 text-2xl text-center font-bold">{mapFile.chapters[chapter]?.name}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{mapFile.chapters[chapter]?.name}</DialogTitle>
                      <DialogDescription>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose grow overflow-auto scroll-smooth 
                        rounded-xl p-4"
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
                  getNode={selNode}
                  setNode={setSelNode}
                />

                <div className="flex w-[20vw] flex-col">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose grow overflow-auto scroll-smooth 
                    rounded-xl bg-[#15162c] p-4 text-white prose-headings:text-purple-500 prose-em:text-yellow-200"
                  >
                    {selNode != -1
                      ? problem
                      : desc}
                  </ReactMarkdown>

                  {selNode != -1 && problem != undefined ? (
                    <a
                      href={"/map/" + nameToFileName(getNodeName(chapter, selNode))}
                    >
                      <Button className="mt-2 w-full bg-purple-700">Embark</Button>
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
              nodeRadius={50}
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

function nameToFileName(name: string): string {
  return name.split(" ").join("-").toLowerCase();
}
