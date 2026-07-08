import { NextRequest, NextResponse } from "next/server";

import { ai } from "@/lib/ai/gemini";

import { SYSTEM_PROMPT } from "@/lib/ai/prompt";

import { parseDiagram } from "@/lib/ai/diagram-parser";

export async function POST(
  req: NextRequest
) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        {
          error: "Prompt is required",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
${SYSTEM_PROMPT}

User Request:

${prompt}
`,
      });

    const text =
      response.text ?? "";

    console.log(
      "========== GEMINI =========="
    );

    console.log(text);

    console.log(
      "============================"
    );

    const diagram =
      parseDiagram(text);



    return NextResponse.json({
      diagram,

    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed generating diagram",
      },
      {
        status: 500,
      }
    );
  }
}