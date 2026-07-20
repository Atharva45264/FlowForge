import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // Older pages won't have a shareId
    if (!page.shareId) {
      page.shareId = crypto.randomUUID();
    }

    page.isPublic = !page.isPublic;

    await page.save();

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ??
      "http://localhost:3000";

    return NextResponse.json({
      success: true,

      isPublic: page.isPublic,

      shareId: page.shareId,

      shareUrl: `${origin}/share/${page.shareId}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update sharing.",
      },
      {
        status: 500,
      }
    );
  }
}