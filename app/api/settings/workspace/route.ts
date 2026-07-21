import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import WorkspaceSettings from "@/models/WorkspaceSettings";

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

    let settings = await WorkspaceSettings.findOne({
      userId,
    });

    if (!settings) {
      settings = await WorkspaceSettings.create({
        userId,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET Workspace Settings Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch workspace settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
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

    const settings =
      await WorkspaceSettings.findOneAndUpdate(
        { userId },
        {
          workspaceName: body.workspaceName,
          defaultPage: body.defaultPage,
          collapseSidebar: body.collapseSidebar,
          rememberSidebar: body.rememberSidebar,
          autosaveNotes: body.autosaveNotes,
          autosaveWhiteboard:
            body.autosaveWhiteboard,
          autosavePages: body.autosavePages,
        },
        {
          new: true,
          upsert: true,
        }
      );

    return NextResponse.json(settings);
  } catch (error) {
    console.error(
      "PATCH Workspace Settings Error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update workspace settings" },
      { status: 500 }
    );
  }
}