import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Space from "@/models/Space";
import Page from "@/models/Page";

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

    const body = await req.json();

    const space = await Space.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: {
          ...body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!space) {
      return NextResponse.json(
        { error: "Space not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(space);
  } catch (error) {
    console.error("PATCH Space Error:", error);

    return NextResponse.json(
      { error: "Failed to update space" },
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

    const space = await Space.findOne({
      _id: id,
      userId,
    });

    if (!space) {
      return NextResponse.json(
        { error: "Space not found" },
        { status: 404 }
      );
    }

    // Archive the space
    space.archived = true;
    await space.save();

    // Archive all pages inside the space
    await Page.updateMany(
      {
        spaceId: id,
        userId,
      },
      {
        archived: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Space archived successfully",
    });
  } catch (error) {
    console.error("DELETE Space Error:", error);

    return NextResponse.json(
      { error: "Failed to archive space" },
      { status: 500 }
    );
  }
}