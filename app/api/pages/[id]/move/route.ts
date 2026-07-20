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

export async function PATCH(
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

    const { spaceId } = await req.json();

    if (!spaceId) {
      return NextResponse.json(
        {
          error: "Space ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const page = await Page.findOne({
      _id: id,
      userId,
    });

    if (!page) {
      return NextResponse.json(
        {
          error: "Page not found",
        },
        {
          status: 404,
        }
      );
    }

    if (page.spaceId.toString() === spaceId) {
      return NextResponse.json(page);
    }

    await Space.findByIdAndUpdate(page.spaceId, {
      $inc: {
        pageCount: -1,
      },
    });

    await Space.findByIdAndUpdate(spaceId, {
      $inc: {
        pageCount: 1,
      },
    });

    page.spaceId = spaceId;

    await page.save();

    return NextResponse.json(page);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to move page",
      },
      {
        status: 500,
      }
    );
  }
}