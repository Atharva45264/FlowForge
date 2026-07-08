import dagre from "@dagrejs/dagre";
import { Diagram } from "./diagram-parser";

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

export interface PositionedNode {
  id: string;
  x: number;
  y: number;
}

export function generateLayout(
  diagram: Diagram
): Map<string, PositionedNode> {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir:
      diagram.direction === "horizontal"
        ? "LR"
        : "TB",

    ranksep: 120,

    nodesep: 80,

    edgesep: 40,

    marginx: 80,

    marginy: 80,
  });

  diagram.nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  diagram.edges.forEach((edge) => {
    graph.setEdge(edge.from, edge.to);
  });

  dagre.layout(graph);

  const positions = new Map<
    string,
    PositionedNode
  >();

  diagram.nodes.forEach((node) => {
    const p = graph.node(node.id);

    positions.set(node.id, {
      id: node.id,

      x: p.x - NODE_WIDTH / 2,

      y: p.y - NODE_HEIGHT / 2,
    });
  });

  return positions;
}