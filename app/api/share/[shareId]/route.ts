import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    await connectDB();

    const { shareId } = await params;

    const page = await Page.findOne({
      shareId,
      isPublic: true,
    }).lean();

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch {
    return NextResponse.json(
      { error: "Failed to load page" },
      { status: 500 }
    );
  }
}