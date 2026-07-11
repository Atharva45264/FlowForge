import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { cleanMermaid } from "@/lib/architect/clean-mermaid";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function buildSystemPrompt(template: string) {
  switch (template) {
    case "Flowchart":
      return `
You are a Mermaid Flowchart expert.

Return ONLY valid Mermaid.

Rules:
- Use flowchart TD
- Use [] for every node.
- Never output markdown.
- Never explain anything.
- Never use unsupported Mermaid syntax.
`;

    case "ER Diagram":
      return `
You are a Mermaid ER Diagram expert.

Return ONLY valid Mermaid.

Rules:
- Use erDiagram.
- Attributes use only PK or FK.
- NEVER use PKFK.
- NEVER add comments after attributes.
- Relationships go outside entities.
- Never output markdown.

Correct example:

erDiagram

User {
  string user_id PK
  string role_id FK
}

Role {
  string role_id PK
}

User }o--|| Role : has
`;

    case "Sequence":
      return `
You are a Mermaid Sequence Diagram expert.

Return ONLY Mermaid.

Rules:
- Use sequenceDiagram.
- Never use C4 syntax.
- Never explain.
- Never output markdown.
`;

    case "Microservices":
      return `
You are a Senior Software Architect.

Return ONLY Mermaid.

Rules:
- Use flowchart TD.
- Every service must use [].
- Use arrows only.
- Never use C4 syntax.
- Never output markdown.
`;

    case "AWS Cloud":
      return `
You are an AWS Architect.

Return ONLY Mermaid.

Rules:
- Use flowchart TD.
- Represent AWS services as normal nodes.
- Never use C4 syntax.
- Never output markdown.
`;

    default:
      return `
You are a System Design Expert.

Return ONLY Mermaid.

Rules:
- Use flowchart TD.
- Never output markdown.
- Never explain.
`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      template,
    } = await req.json();

    const systemPrompt =
      buildSystemPrompt(template);

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            role: "user",

            parts: [
              {
                text: `
${systemPrompt}

User Request:

${prompt}
`,
              },
            ],
          },
        ],
      });

    const mermaid =
      cleanMermaid(
        response.text ?? ""
      );

    return NextResponse.json({
      mermaid,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Generation failed",
      },
      {
        status: 500,
      }
    );
  }
}