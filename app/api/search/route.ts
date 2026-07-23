import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { searchWorkspace } from "@/lib/search/search-service";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const query =
      req.nextUrl.searchParams.get("q")?.trim() ?? "";

    if (!query) {
      return NextResponse.json({
        results: [],
      });
    }

    const results = await searchWorkspace(
      userId,
      query
    );

    return NextResponse.json({
      results,
    });
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to search workspace.",
      },
      {
        status: 500,
      }
    );
  }
}