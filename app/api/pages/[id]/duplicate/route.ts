import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import Space from "@/models/Space";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const page = await Page.findOne({
      _id: id,
      userId,
    });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    const duplicate = await Page.create({
      userId,
      spaceId: page.spaceId,
      title: `${page.title} (Copy)`,
      icon: page.icon,
      content: page.content,
      tags: page.tags,
      favorite: false,
      archived: false,
      lastOpenedAt: new Date(),
    });

    await Space.findByIdAndUpdate(page.spaceId, {
      $inc: {
        pageCount: 1,
      },
    });

    return NextResponse.json(duplicate, {
      status: 201,
    });
  } catch (error) {
    console.error("Duplicate Page Error:", error);

    return NextResponse.json(
      {
        error: "Failed to duplicate page",
      },
      {
        status: 500,
      }
    );
  }
}