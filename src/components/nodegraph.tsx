/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { nameToFileName } from "./mapview";

interface Node {
  pos: number[];
  name: string;
  next: string[];
}

interface Graph {
  nodes: Node[] | undefined;
  nodeRadius: number;
  nodeColor: any;
  getNode: number;
  setNode: any;
  bgImg: string;
}

const mapRes = [1280, 720];

export default function NodeGraph({
  nodes,
  nodeRadius,
  nodeColor,
  getNode,
  setNode,
  bgImg,
}: Graph) {
  if (nodes == undefined)
    return (
      <div className="rounded-xl border border-[#15162c] bg-indigo-950 p-4">
        Error in finding node list
      </div>
    );

  return (
    <svg
      viewBox={"0 0 " + mapRes[0] + " " + mapRes[1]}
      className="aspect-video rounded-xl border-4 border-[#15162c] bg-[url('/test_bg.png')] bg-cover bg-center p-4"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 30 20"
          refX="15"
          refY="10"
          markerWidth="18"
          markerHeight="18"
          stroke="white"
          fill="white"
          orient="auto-start-reverse"
        >
          <path d="M 30 0 L 0 10 L 30 20 z" />
        </marker>
      </defs>

      {nodes.map((node: Node, index) => (
        //bg-indigo-950
        //rip runtime a lil ig but its better than the lines
        //rendering on top of the nodes
        //plus it would be like 20 iterations instead of 10 at most?
        <g key={index} id={"node1-" + nameToFileName(node.name)}>
          {node.next.map((depend, index) => (
            <g key={index}>
              <line
                x1={getNodeX(node.pos[0] ?? 0)}
                y1={getNodeY(node.pos[1] ?? 0)}
                x2={
                  getNodeX(
                    findNodePos(nodes, nameToFileName(depend))?.[0] ?? 0,
                  ) -
                  (getNodeX(
                    findNodePos(nodes, nameToFileName(depend))?.[0] ?? 0,
                  ) -
                    getNodeX(node.pos[0] ?? 0)) /
                    2
                }
                y2={
                  getNodeY(
                    findNodePos(nodes, nameToFileName(depend))?.[1] ?? 0,
                  ) -
                  (getNodeY(
                    findNodePos(nodes, nameToFileName(depend))?.[1] ?? 0,
                  ) -
                    getNodeY(node.pos[1] ?? 0)) /
                    2
                }
                stroke="none"
                marker-end="url(#arrow)"
              ></line>
              <line
                x1={getNodeX(node.pos[0] ?? 0)}
                y1={getNodeY(node.pos[1] ?? 0)}
                x2={getNodeX(
                  findNodePos(nodes, nameToFileName(depend))?.[0] ?? 0,
                )}
                y2={getNodeY(
                  findNodePos(nodes, nameToFileName(depend))?.[1] ?? 0,
                )}
                stroke="white"
              ></line>
            </g>
          ))}
        </g>
      ))}

      {nodes.map((node: Node, index) => (
        <g key={index} id={"node2-" + nameToFileName(node.name)}>
          <circle
            onClick={() => {
              getNode != index ? setNode(index) : setNode(-1);
              console.log(getNode);
            }}
            r={"" + nodeRadius}
            cx={"" + getNodeX(node.pos[0] ?? 0)}
            cy={"" + getNodeY(node.pos[1] ?? 0)}
            stroke={getNode == index ? "#7E22CE" : "white"}
            strokeWidth={getNode == index ? "4" : "1"}
            fill={nodeColor(node.name)}
            className={"cursor-pointer duration-150 hover:stroke-[4px]"}
          ></circle>
          <text
            id={"nodeText" + index}
            x={"" + getNodeX(node.pos[0] ?? 0)}
            y={"" + (getNodeY(node.pos[1] ?? 0) + nodeRadius * 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            className="border fill-white stroke-black stroke-1 text-xl font-bold"
          >
            {node.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function getNodeX(x: number): number {
  return (mapRes[0] ?? 0) * (x / 100);
}

function getNodeY(y: number): number {
  return (mapRes[1] ?? 0) * (y / 100);
}

//Finds a node's position by its name
function findNodePos(list: Node[], name: string): number[] | undefined {
  let pos: number[];
  pos = [-1, -1]; // Default value for typescript
  list.map((node: Node) => {
    if (nameToFileName(node.name) === nameToFileName(name)) {
      // console.log("inside: " + node.pos);
      pos = node.pos;
      return;
    }
  });

  return pos;
}

function getNode(list: Node[], i: number): Node | undefined {
  return list[i];
}
