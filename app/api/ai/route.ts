import { NextResponse } from "next/server";

import { groq } from "@/lib/groq";
import { buildPrompt } from "@/lib/ai-prompts";

export async function POST(req: Request) {
  try {
    const {
      action,
      note,
      question,
    } = await req.json();

    const prompt = buildPrompt(
      action,
      note,
      question
    );

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.4,
      });

    const content =
      completion.choices[0].message.content ?? "";

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
            message:
              "AI returned invalid JSON.",
          },
          {
            status: 500,
          }
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
      {
        status: 500,
      }
    );
  }
}