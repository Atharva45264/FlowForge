import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function GET() {
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
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const chats = await Chat.find({
      userId,
    })
      .select("_id title updatedAt createdAt")
      .sort({
        updatedAt: -1,
      });

    return NextResponse.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to fetch chats.",
        },
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
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
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    await connectDB();

    const chat = await Chat.create({
      userId,
      title: body.title || "New Chat",
      messages: [],
    });

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
          message: "Failed to create chat.",
        },
      },
      {
        status: 500,
      }
    );
  }
}