/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isRegionUnlocked, nameToFileName } from "./mapview";

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
  bgImg: number;
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
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svgElement = event.currentTarget;
    const svgRect = svgElement.getBoundingClientRect();
    const mouseX = ((event.clientX - svgRect.left) / svgRect.width) * 100;
    const mouseY = ((event.clientY - svgRect.top) / svgRect.height) * 100;
  };

  if (nodes == undefined)
    return (
      <div className="rounded-xl border border-[#15162c] bg-indigo-950 p-4">
        Error in finding node list
      </div>
    );

  return (
    <svg
      viewBox={"0 0 " + mapRes[0] + " " + mapRes[1]}
      className={`aspect-video rounded-xl border-4 border-[#15162c] ${
        bgImg == 1
          ? "bg-[url('/maps/map1.png')]"
          : bgImg == 2
            ? "bg-[url('/maps/map2.png')]"
            : bgImg == 3
              ? "bg-[url('/maps/map3.png')]"
              : "bg-[url('/maps/board.png')]"
      } bg-cover bg-center p-[1vw]`}
      onMouseMove={handleMouseMove}
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

      {nodes.map((node: Node, index) =>
        //bg-indigo-950
        //rip runtime a lil ig but its better than the lines
        //rendering on top of the nodes
        //plus it would be like 20 iterations instead of 10 at most?
        nameToFileName(node.name) != "the_tower" ? (
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
                  markerEnd="url(#arrow)"
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
        ) : (
          <g key={index} />
        ),
      )}

      {nodes.map((node: Node, index) => {
        if (nameToFileName(node.name) == "the_tower")
          if (!isRegionUnlocked(node.name)) return <g key={index} />;

        // Position for the node text label
        const textX = getNodeX(node.pos[0] ?? 0);
        const textY = getNodeY(node.pos[1] ?? 0) + nodeRadius * 2;

        // Approximate background size
        const padding = 8; // Adjust padding as needed
        let rectWidth = node.name.length * 14; // Adjust multiplier as needed based on your font size
        if (node.name.length < 9) {
          rectWidth = node.name.length * 16;
        }
        if (
          node.name == "Vectara" ||
          node.name == "Lexica" ||
          node.name == "Findara"
        ) {
          rectWidth = node.name.length * 13;
        }
        if (node.name.length > 10) {
          rectWidth = node.name.length * 12;
        }
        const rectHeight = 20; // Adjust height as needed

        return (
          <g key={index} id={"node2-" + nameToFileName(node.name)}>
            <circle
              onClick={() => {
                getNode != index ? setNode(index) : setNode(-1);
              }}
              r={"" + nodeRadius}
              cx={"" + getNodeX(node.pos[0] ?? 0)}
              cy={"" + getNodeY(node.pos[1] ?? 0)}
              stroke={getNode == index ? "#7E22CE" : "white"}
              strokeWidth={getNode == index ? "4" : "1"}
              fill={nodeColor(node.name)}
              className={"cursor-pointer duration-150 hover:stroke-[4px]"}
            ></circle>
            <rect
              x={textX - rectWidth / 2 - padding / 2}
              y={textY - rectHeight / 2 - padding / 2}
              width={rectWidth + padding}
              height={rectHeight + padding}
              fill="#15162C" // The color for the background rectangle
              rx="5" // Adjust for rounded corners if desired
              stroke="#a855f7"
              strokeWidth={getNode == index ? "3" : "2"}
              opacity={0.9}
            />
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
        );
      })}
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
      pos = node.pos;
      return;
    }
  });

  return pos;
}

function getNode(list: Node[], i: number): Node | undefined {
  return list[i];
}
