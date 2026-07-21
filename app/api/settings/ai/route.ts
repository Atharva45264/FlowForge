import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import AISettings from "@/models/AISettings";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    let settings = await AISettings.findOne({ userId });

    if (!settings) {
      settings = await AISettings.create({
        userId,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET AI Settings Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch AI settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    const settings = await AISettings.findOneAndUpdate(
      { userId },
      {
        model: body.model,
        temperature: body.temperature,
        responseLength: body.responseLength,
        voiceEnabled: body.voiceEnabled,
        imageUnderstanding: body.imageUnderstanding,
        pdfChat: body.pdfChat,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(settings);
  } catch (error) {
    console.error("PATCH AI Settings Error:", error);

    return NextResponse.json(
      { error: "Failed to update AI settings" },
      { status: 500 }
    );
  }
}