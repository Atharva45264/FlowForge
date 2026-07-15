import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import Chat, { type IChatMessage } from "@/models/Chat";

import { detectTool } from "@/lib/assistant/tools/router";

import { runChatTool } from "@/lib/assistant/tools/chat";
import { runPDFTool } from "@/lib/assistant/tools/pdf";
import { runImageTool } from "@/lib/assistant/tools/image";
import { runCalendarTool } from "@/lib/assistant/tools/calendar";

interface Params {
  params: Promise<{
    chatId: string;
  }>;
}

export async function GET(
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
        {
          status: 401,
        }
      );
    }

    const { chatId } = await params;

    await connectDB();

    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Chat not found.",
          },
        },
        {
          status: 404,
        }
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
          message: "Failed loading chat.",
        },
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
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
        {
          status: 401,
        }
      );
    }

    const { chatId } = await params;

    const body = await req.json();

    const message: string = body.message;

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Message is required.",
          },
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Chat not found.",
          },
        },
        {
          status: 404,
        }
      );
    }

    const userMessage: IChatMessage = {
  id: crypto.randomUUID(),
  role: "user",
  content: message,
  createdAt: new Date(),
};

    chat.messages.push(userMessage);

 const uploadedFile = body.uploadedFile;

const tool = detectTool(
  message,
  uploadedFile
);

let assistantResponse = "";

let metadata = null;

switch (tool) {
  case "calendar": {
    const result =
      await runCalendarTool(
        userId,
        message
      );

    assistantResponse =
      result.response;

    metadata =
      result.metadata;

    break;
  }

  case "pdf": {
    assistantResponse =
      await runPDFTool(
        message,
        uploadedFile
      );

    break;
  }

  case "image": {
    assistantResponse =
      await runImageTool(
        message,
        uploadedFile
      );

    break;
  }

  default: {
    assistantResponse =
      await runChatTool(
        message
      );
  }
}

const assistantMessage: IChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  content: assistantResponse,
  createdAt: new Date(),
};

    chat.messages.push(assistantMessage);

    if (
      chat.title === "New Chat" &&
      message.length > 0
    ) {
      chat.title =
        message.length > 40
          ? `${message.substring(0, 40)}...`
          : message;
    }

    await chat.save();

    return NextResponse.json({
      success: true,
      data: {
        assistantMessage,
        chat,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to send message.",
        },
      },
      {
        status: 500,
      }
    );
  }
}