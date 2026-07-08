import { NextRequest, NextResponse } from "next/server";

import { groq } from "@/lib/ai/groq";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { parseDiagram } from "@/lib/ai/diagram-parser";
import { generateExcalidrawElements } from "@/lib/ai/excalidraw-generator";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt required",
        },
        {
          status: 400,
        }
      );
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        temperature: 0.2,

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const text =
      completion.choices[0]?.message?.content ?? "";

    const diagram =
      parseDiagram(text);

    const elements =
      generateExcalidrawElements(
        diagram
      );

    return NextResponse.json({
      diagram,
      elements,
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