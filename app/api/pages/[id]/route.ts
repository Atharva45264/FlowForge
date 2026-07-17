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

export async function GET(
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

    // Update recently opened
    page.lastOpenedAt = new Date();
    await page.save();

    return NextResponse.json(page);
  } catch (error) {
    console.error("GET Page Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
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

    const body = await req.json();

    const page = await Page.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("PATCH Page Error:", error);

    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    // Archive page
    page.archived = true;
    await page.save();

    // Decrement page count
    await Space.findByIdAndUpdate(page.spaceId, {
      $inc: {
        pageCount: -1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Page archived successfully",
    });
  } catch (error) {
    console.error("DELETE Page Error:", error);

    return NextResponse.json(
      { error: "Failed to archive page" },
      { status: 500 }
    );
  }
}