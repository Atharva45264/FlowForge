export interface DiagramNode {
  id: string;
  label: string;
  type: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export interface Diagram {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export function parseDiagram(
  text: string
): Diagram {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "Invalid AI response."
    );
  }
}