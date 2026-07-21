import { NextResponse } from "next/server";

import { gemini, GEMINI_MODEL } from "@/lib/assistant/gemini";
import { buildPrompt } from "@/lib/ai-prompts";

export async function POST(req: Request) {
  try {
    const { action, note, question } = await req.json();

    const prompt = buildPrompt(action, note, question);

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const content = response.text ?? "";

    if (action === "generateTasks") {
      try {
        const tasks = JSON.parse(content);

        return NextResponse.json({
          success: true,
          type: "tasks",
          tasks,
        });
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: "AI returned invalid JSON.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      type: "text",
      result: content,
    });
  } catch (error) {
    console.error("[AI]", error);

    return NextResponse.json(
      {
        success: false,
        message: "AI request failed.",
      },
      { status: 500 }
    );
  }
}