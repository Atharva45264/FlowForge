import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Whiteboard from "@/models/Whiteboard";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const board = await Whiteboard.findOne({
    _id: id,
    ownerId: userId,
  });

  return NextResponse.json(board);
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const body = await req.json();

  const { id } = await params;

  const board = await Whiteboard.findOneAndUpdate(
    {
      _id: id,
      ownerId: userId,
    },
    body,
    {
      new: true,
    }
  );

  return NextResponse.json(board);
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  await Whiteboard.findOneAndDelete({
    _id: id,
    ownerId: userId,
  });

  return NextResponse.json({
    success: true,
  });
}

export async function POST(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const board = await Whiteboard.findOne({
    _id: id,
    ownerId: userId,
  });

  if (!board) {
    return NextResponse.json(
      { error: "Board not found" },
      { status: 404 }
    );
  }

  const duplicate =
    await Whiteboard.create({
      title: `${board.title} Copy`,
      ownerId: userId,

      favorite: board.favorite,

      excalidrawData:
        board.excalidrawData,

      archived: false,
    });

  return NextResponse.json(
    duplicate
  );
}