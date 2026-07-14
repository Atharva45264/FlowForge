import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";

interface Params {
  params: Promise<{
    chatId: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const { chatId } = await params;

    const { title } = await req.json();

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Title is required.",
          },
        },
        { status: 400 }
      );
    }

    await connectDB();

    const chat = await Chat.findOneAndUpdate(
      {
        _id: chatId,
        userId,
      },
      {
        title: title.trim(),
      },
      {
        new: true,
      }
    );

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Chat not found.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to rename chat.",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const { chatId } = await params;

    await connectDB();

    await Chat.findOneAndDelete({
      _id: chatId,
      userId,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed deleting chat.",
        },
        status: 500,
      },
      { status: 500 }
    );
  }
}