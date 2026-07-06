import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Whiteboard from "@/models/Whiteboard";

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

    const boards = await Whiteboard.find({
      ownerId: userId,
      archived: false,
    }).sort({
      updatedAt: -1,
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const board = await Whiteboard.create({
      title: "Untitled Whiteboard",
      ownerId: userId,
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed creating board" },
      { status: 500 }
    );
  }
}