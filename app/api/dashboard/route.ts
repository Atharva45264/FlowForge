import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getDashboardData } from "@/lib/dashboard";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dashboard = await getDashboardData(userId);

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}