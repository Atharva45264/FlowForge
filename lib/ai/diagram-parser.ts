export type NodeType =
  | "user"
  | "process"
  | "database"
  | "api"
  | "decision"
  | "cloud";

export interface DiagramNode {
  id: string;
  label: string;
  type: NodeType;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Diagram {
  direction?: "vertical" | "horizontal";
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const VALID_NODE_TYPES: NodeType[] = [
  "user",
  "process",
  "database",
  "api",
  "decision",
  "cloud",
];

export function parseDiagram(
  text: string
): Diagram {
  let parsed: any;

  try {
    const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const jsonStart =
  cleaned.indexOf("{");

const jsonEnd =
  cleaned.lastIndexOf("}");

if (
  jsonStart === -1 ||
  jsonEnd === -1
) {
  throw new Error(
    "No JSON found."
  );
}

parsed = JSON.parse(
  cleaned.slice(
    jsonStart,
    jsonEnd + 1
  )
);
  } catch {
    throw new Error("Invalid AI response.");
  }

  if (!Array.isArray(parsed.nodes)) {
    throw new Error("Nodes missing.");
  }

  if (!Array.isArray(parsed.edges)) {
    parsed.edges = [];
  }

  parsed.nodes = parsed.nodes.map(
    (node: any, index: number) => ({
      id: String(node.id ?? index + 1),

      label: String(node.label ?? "Node"),

      type: VALID_NODE_TYPES.includes(node.type)
        ? node.type
        : "process",
    })
  );

  parsed.edges = parsed.edges.map(
    (edge: any) => ({
      from: String(edge.from),

      to: String(edge.to),

      label: edge.label
        ? String(edge.label)
        : undefined,
    })
  );

  parsed.direction =
    parsed.direction === "horizontal"
      ? "horizontal"
      : "vertical";

  return parsed;
}