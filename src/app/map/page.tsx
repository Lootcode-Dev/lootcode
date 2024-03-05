"use client";

import { useState } from "react";
import mapFile from "./map.json";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { map } from "@trpc/server/observable";

const nodeRad = 25;
const mapRes = [1280, 720];
const sidebarW = 300;

export default function Page() {
  const [chapter, setChapter] = useState(-1);
  const [selNode, setSelNode] = useState(-1);

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
          <div className="flex h-[80vh] w-full justify-center">
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
            <svg
              viewBox={"0 0 " + mapRes[0] + " " + mapRes[1]}
              className="mx-2 rounded-xl border-2 border-yellow-200 p-4 shadow-xl"
            >
              {mapFile.chapters[chapter]?.nodes.map((node, index) => (
                <g key={index} id={"node-" + node.name}>
                  {node.next.map((depend, index) => (
                    <line
                      key={index}
                      x1={getNodeX(node.pos[0] ?? 0)}
                      y1={getNodeY(node.pos[1] ?? 0)}
                      x2={getNodeX(findNodePos(depend, chapter)?.[0] ?? 0)}
                      y2={getNodeY(findNodePos(depend, chapter)?.[1] ?? 0)}
                      stroke="white"
                    ></line>
                  ))}
                  <circle
                    onClick={() => {
                      selNode != index ? setSelNode(index) : setSelNode(-1);
                      console.log(selNode);
                    }}
                    r={"" + nodeRad}
                    cx={"" + getNodeX(node.pos[0] ?? 0)}
                    cy={"" + getNodeY(node.pos[1] ?? 0)}
                    stroke={selNode == index ? "orange" : "black"}
                    strokeWidth={selNode == index ? "4" : "1"}
                    className="fill-yellow-200 hover:fill-yellow-400"
                  ></circle>
                  <text
                    id={"nodeText" + index}
                    x={"" + (getNodeX(node.pos[0] ?? 0) - node.name.length * 5)}
                    y={"" + (getNodeY(node.pos[1] ?? 0) + nodeRad * 2)}
                    className="border fill-white stroke-black stroke-1 text-xl font-bold"
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
            {selNode != -1 ? (
              <div className="mx-2 w-[20vw] rounded-xl bg-[#15162c] p-4 text-3xl">
                {selNode != -1 ? getNode(chapter, selNode).name : ""}
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-[60px]">Select a chapter...</div>
            <div className="flex flex-row items-center">
              {mapFile.chapters.map((ch, value) => (
                <div
                  key={value}
                  className="m-4 rounded-xl border-2 border-yellow-200 bg-[#15162c] p-4 text-3xl hover:bg-[#2e026d]"
                  onClick={() => setChapter(value)}
                >
                  {ch.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function getNodeX(x: number): number {
  return (mapRes[0] ?? 0) * (x / 100);
}

function getNodeY(y: number): number {
  return (mapRes[1] ?? 0) * (y / 100);
}

//Finds a node's position by its name
function findNodePos(name: string, ch: number): number[] | undefined {
  let pos: number[];
  pos = [-1, -1]; // Default value for typescript
  mapFile.chapters[ch]?.nodes.map((node) => {
    if (node.name === name) {
      // console.log("inside: " + node.pos);
      pos = node.pos;
      return;
    }
  });

  return pos;
}

function getNode(ch: number, i: number): any {
  return mapFile.chapters[ch]?.nodes[i];
}
