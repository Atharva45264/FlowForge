import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import Space from "@/models/Space";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const spaceId = searchParams.get("spaceId");

    const query: any = {
      userId,
      archived: false,
    };

    if (spaceId) {
      query.spaceId = spaceId;
    }

    const pages = await Page.find(query).sort({
      updatedAt: -1,
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("GET Pages Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch pages" },
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
      spaceId,
      title,
      icon,
      content,
      tags,
    } = body;

    if (!spaceId) {
      return NextResponse.json(
        { error: "Space ID is required" },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const page = await Page.create({
      userId,
      spaceId,
      title: title.trim(),
      icon: icon || "📄",
      content: content || "",
      tags: tags || [],
    });

    await Space.findByIdAndUpdate(spaceId, {
      $inc: {
        pageCount: 1,
      },
    });

    return NextResponse.json(page, {
      status: 201,
    });
  } catch (error) {
    console.error("POST Page Error:", error);

    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}