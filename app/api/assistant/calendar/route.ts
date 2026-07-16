import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { runCalendarTool } from "@/lib/assistant/tools/calendar";

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
        {
          status: 401,
        }
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
        {
          status: 400,
        }
      );
    }

    const result = await runCalendarTool(
      userId,
      prompt
    );

    return NextResponse.json({
      success: true,
      data: result.metadata,
      response: result.response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed creating calendar event.",
        },
      },
      {
        status: 500,
      }
    );
  }
}