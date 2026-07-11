import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import ArchitectProject from "@/models/ArchitectProject";

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

    const projects =
      await ArchitectProject.find({
        userId,
      }).sort({
        updatedAt: -1,
      });

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
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

    const body =
      await req.json();

    const project =
      await ArchitectProject.create({
        userId,

        title:
          body.title ??
          "Untitled Architecture",

        prompt:
          body.prompt ?? "",

        mermaid:
          body.mermaid ?? "",
      });

    return NextResponse.json(
      project
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed creating project",
      },
      {
        status: 500,
      }
    );
  }
}