export function buildPrompt(
  template: string,
  userPrompt: string
) {
  const commonRules = `
Return ONLY valid Mermaid syntax.

Do NOT use:

- C4Container
- C4Context
- C4Component
- architecture-beta
- journey
- mindmap
- gitGraph
- requirementDiagram
- timeline

No explanation.
No markdown.
No \`\`\`.
`;

  switch (template) {
    case "Flowchart":
      return `
${commonRules}

Generate ONLY a Mermaid flowchart.

Start with:

flowchart TD

User Request:

${userPrompt}
`;

    case "Sequence":
      return `
${commonRules}

Generate ONLY a Mermaid sequenceDiagram.

Start with:

sequenceDiagram

User Request:

${userPrompt}
`;

    case "ER Diagram":
      return `
${commonRules}

Generate ONLY a Mermaid erDiagram.

Start with:

erDiagram

User Request:

${userPrompt}
`;

    case "AWS Cloud":
      return `
${commonRules}

Represent the AWS architecture using a Mermaid flowchart.

Use:

flowchart LR

Do NOT use C4.

User Request:

${userPrompt}
`;

    case "Microservices":
      return `
${commonRules}

Represent the microservices using Mermaid flowchart LR.

Each service should be a node.

Databases should be cylinders.

Connections should be arrows.

User Request:

${userPrompt}
`;

    case "System Design":
      return `
${commonRules}

Generate a high-level software architecture.

Use ONLY:

flowchart TD

No C4.

User Request:

${userPrompt}
`;

    default:
      return `
${commonRules}

Use flowchart TD.

${userPrompt}
`;
  }
}