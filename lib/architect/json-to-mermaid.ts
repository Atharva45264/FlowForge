interface Node {
  id: string;
  label: string;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface Diagram {
  type?: string;
  direction?: "TD" | "LR" | "BT" | "RL";
  nodes: Node[];
  edges: Edge[];
}

function safeId(id: string) {
  return id.replace(/[^A-Za-z0-9_]/g, "_");
}

function safeLabel(label: string) {
  return label.replace(/"/g, "'");
}

export function jsonToMermaid(
  diagram: Diagram
) {
  const direction =
    diagram.direction ?? "TD";

  let output =
    `flowchart ${direction}\n\n`;

  for (const node of diagram.nodes) {
    output += `${safeId(node.id)}["${safeLabel(
      node.label
    )}"]\n`;
  }

  output += "\n";

  for (const edge of diagram.edges) {
    if (edge.label) {
      output += `${safeId(edge.from)} -->|${safeLabel(
        edge.label
      )}| ${safeId(edge.to)}\n`;
    } else {
      output += `${safeId(edge.from)} --> ${safeId(
        edge.to
      )}\n`;
    }
  }

  return output;
}