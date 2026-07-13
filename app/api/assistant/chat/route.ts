import { NextRequest, NextResponse } from "next/server";

import { ai, GEMINI_MODEL } from "@/lib/assistant/client";
import { SYSTEM_PROMPT } from "@/lib/assistant/prompts";

interface ChatRequest {
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
  {
    success: false,
    error: {
      message: "Message is required.",
    },
  },
  {
    status: 400,
  }
);
    }

    const prompt = `
${SYSTEM_PROMPT}

User:
${body.message}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const text = response.text;

    return NextResponse.json({
  success: true,
  data: {
    role: "assistant",
    content: text,
    createdAt: new Date().toISOString(),
  },
});
  } catch (error) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
  {
    success: false,
    error: {
      message: "Something went wrong while generating the response.",
    },
  },
  {
    status: 500,
  }
);
  }
}