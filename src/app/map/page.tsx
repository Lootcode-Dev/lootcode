"use client";

import mapFile from "./map.json";
import Image from "next/image";

const nodeRad = 25;
const mapRes = [1280, 720]; // (w, h)

export default function Page() {
  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex size-full items-center justify-center p-4">
        <svg
          viewBox={"0 0 " + mapRes[0] + " " + mapRes[1]}
          className="rounded-xl border-2 border-yellow-200 p-4 shadow-xl"
        >
          {mapFile.nodes.map((node, index) => (
            <g key={index} id={"node-" + node.name}>
              {node.next.map((depend, index) => (
                <line
                  x1={getNodeX(node.pos[0] || 0)}
                  y1={getNodeY(node.pos[1] || 0)}
                  x2={getNodeX(findNodePos(depend)[0] || 0)}
                  y2={getNodeY(findNodePos(depend)[1] || 0)}
                  stroke="white"
                ></line>
              ))}
              <circle
                r={"" + nodeRad}
                cx={"" + getNodeX(node.pos[0] || 0)}
                cy={"" + getNodeY(node.pos[1] || 0)}
                className="fill-yellow-200 stroke-black hover:fill-yellow-400"
              ></circle>
              <text
                x={"" + getNodeX(node.pos[0] || 0)}
                y={"" + getNodeY(node.pos[1] || 0)}
                className="text-white"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </main>
  );
}

function getNodeX(x: number): number {
  return (mapRes[0] || 0) * (x / 100);
}

function getNodeY(y: number): number {
  return (mapRes[1] || 0) * (y / 100);
}

//Finds a node's position by its name
function findNodePos(name: string): number[] | undefined {
  let pos: number[];
  mapFile.nodes.map((node, index) => {
    if (node.name === name) {
      console.log("inside: " + node.pos);
      pos = node.pos;
      return;
    }
  });

  return pos;
}
