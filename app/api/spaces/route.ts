import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Space from "@/models/Space";

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

    const spaces = await Space.find({
      userId,
      archived: false,
    }).sort({
      updatedAt: -1,
    });

    return NextResponse.json(spaces);
  } catch (error) {
    console.error("GET Spaces Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch spaces" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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

    const {
      name,
      description,
      icon,
      color,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Space name is required" },
        { status: 400 }
      );
    }

    const space = await Space.create({
      userId,
      name: name.trim(),
      description: description || "",
      icon: icon || "📁",
      color: color || "#7C3AED",
    });

    return NextResponse.json(space, {
      status: 201,
    });
  } catch (error) {
    console.error("POST Space Error:", error);

    return NextResponse.json(
      { error: "Failed to create space" },
      { status: 500 }
    );
  }
}