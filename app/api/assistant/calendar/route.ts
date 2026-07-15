import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import CalendarEvent from "@/models/CalendarEvent";

import { ai, GEMINI_MODEL } from "@/lib/assistant/client";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Prompt is required.",
          },
        },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const systemPrompt = `
You are an AI Calendar Assistant.

Today's date is ${today}.

Extract calendar event information from the user's request.

Return ONLY valid JSON.

Schema:

{
  "title":"",
  "description":"",
  "date":"YYYY-MM-DD",
  "startTime":"HH:mm",
  "endTime":"HH:mm",
  "color":"#3b82f6"
}

Rules:

- If no description, use ""
- Use 24-hour format
- Default duration is 1 hour
- Never return markdown
- Never explain anything
- Return only JSON
`;

    const response =
      await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: `
${systemPrompt}

User:

${prompt}
`,
      });

    const text = response.text ?? "";

    let event;

    try {
      event = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Gemini returned invalid JSON.",
          },
        },
        {
          status: 500,
        }
      );
    }

    await connectDB();

    const created =
      await CalendarEvent.create({
        ownerId: userId,

        ...event,

        createdBy: "ai",
      });

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            "Failed creating AI event.",
        },
      },
      {
        status: 500,
      }
    );
  }
}