import mapFile from "./map.json";
import Image from "next/image";

const nodeRad: number = 25;
const mapRes: number[] = [1280, 720]; // (w, h)

export default function Page() {
  return (
    <main className="z-10 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex size-full items-center justify-center p-4">
        <svg
          viewBox={"0 0 " + mapRes[0] + " " + mapRes[1]}
          className="rounded-xl border-2 border-yellow-200 p-4 shadow-xl"
        >
          {mapFile.nodes.map((node, index) => (
            <g key={index}>
              <circle
                r={"" + nodeRad}
                cx={"" + getNodeX(node[0] || 0)}
                cy={"" + getNodeY(node[1] || 0)}
                className="fill-yellow-200 stroke-black hover:fill-yellow-400"
              ></circle>
              <text
                x={"" + getNodeX(node[0] || 0)}
                y={"" + getNodeY(node[1] || 0)}
                className="text-white"
              >
                My
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
