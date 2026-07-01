import { NextResponse } from "next/server";

import { groq } from "@/lib/groq";
import {
  buildPrompt,
} from "@/lib/ai-prompts";

export async function POST(
  req: Request
) {
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
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.4,
      });

    return NextResponse.json({
      success: true,
      result:
        completion.choices[0].message
          .content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}