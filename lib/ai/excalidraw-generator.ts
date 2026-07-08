import { Diagram } from "./diagram-parser";

const id = () => crypto.randomUUID();
const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;

const START_X = 100;
const START_Y = 100;

const GAP_X = 260;
const GAP_Y = 160;

export function generateExcalidrawElements(
  diagram: Diagram
) {
  const elements: any[] = [];

  const positions = new Map<
    string,
    {
      x: number;
      y: number;
    }
  >();

  diagram.nodes.forEach((node, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;

    const x = START_X + col * GAP_X;
    const y = START_Y + row * GAP_Y;

    positions.set(node.id, {
      x,
      y,
    });

    const rectangleId = id();

    elements.push({
      id: rectangleId,

      type: "rectangle",

      x,

      y,

      width: NODE_WIDTH,

      height: NODE_HEIGHT,

      strokeColor: "#8B5CF6",

      backgroundColor: "#1E1B4B",

      fillStyle: "solid",

      strokeWidth: 2,

      roughness: 1,

      opacity: 100,

      angle: 0,

      seed: Math.floor(Math.random() * 1000000),

      version: 1,

      versionNonce: Math.floor(
        Math.random() * 1000000
      ),

      isDeleted: false,

      groupIds: [],

      frameId: null,

      roundness: {
        type: 3,
      },

      boundElements: [],

      updated: Date.now(),

      link: null,

      locked: false,
    });

    elements.push({
      id: id(),

      type: "text",

      x: x + 20,

      y: y + 28,

      text: node.label,

      fontSize: 24,

      fontFamily: 1,

      textAlign: "center",

      verticalAlign: "middle",

      width: NODE_WIDTH - 40,

      height: 30,

      strokeColor: "#FFFFFF",

      backgroundColor: "transparent",

      fillStyle: "solid",

      strokeWidth: 1,

      roughness: 0,

      opacity: 100,

      angle: 0,

      seed: Math.floor(Math.random() * 1000000),

      version: 1,

      versionNonce: Math.floor(
        Math.random() * 1000000
      ),

      isDeleted: false,

      groupIds: [],

      frameId: null,

      updated: Date.now(),

      link: null,

      locked: false,
    });
  });

  diagram.edges.forEach((edge) => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);

    if (!from || !to) return;

    elements.push({
      id: id(),

      type: "arrow",

      x: from.x + NODE_WIDTH,

      y: from.y + NODE_HEIGHT / 2,

      points: [
        [0, 0],
        [
          to.x - from.x - NODE_WIDTH,
          to.y - from.y,
        ],
      ],

      strokeColor: "#CBD5E1",

      backgroundColor: "transparent",

      fillStyle: "solid",

      strokeWidth: 2,

      roughness: 0,

      opacity: 100,

      angle: 0,

      seed: Math.floor(Math.random() * 1000000),

      version: 1,

      versionNonce: Math.floor(
        Math.random() * 1000000
      ),

      isDeleted: false,

      groupIds: [],

      frameId: null,

      updated: Date.now(),

      link: null,

      locked: false,

      endArrowhead: "triangle",

      startArrowhead: null,
    });
  });

  return elements;
}