import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import { jsonToMermaid } from "@/lib/architect/json-to-mermaid";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, template } = await req.json();

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
You are an expert Software Architect.

Return ONLY valid JSON.

Never return Mermaid.

Never return Markdown.

Never explain anything.

Schema:

{
  "direction":"LR",
  "nodes":[
    {
      "id":"client",
      "label":"Client"
    }
  ],
  "edges":[
    {
      "from":"client",
      "to":"gateway",
      "label":"Request"
    }
  ]
}

Rules:

- id can only contain letters, numbers and underscore.
- label can contain spaces.
- direction must be LR or TD.
- Return ONLY JSON.

Diagram Style:
${template}

User Prompt:
${prompt}
`,
      });

    const text = response.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("========== AI JSON ==========");
    console.log(cleaned);
    console.log("============================");

    let json;

    try {
      json = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error:
            "Gemini returned invalid JSON. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    const mermaid =
      jsonToMermaid(json);

    return NextResponse.json({
      mermaid,
    });
  } catch (error: any) {
    console.error(
      "Error in POST /api/architect/generate:",
      error
    );

    // Gemini busy
    if (error?.status === 503) {
      return NextResponse.json(
        {
          error:
            "Gemini is currently busy. Please try again in a few seconds.",
        },
        {
          status: 503,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Failed to generate diagram.",
      },
      {
        status: 500,
      }
    );
  }
}