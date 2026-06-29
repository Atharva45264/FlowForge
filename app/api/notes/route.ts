import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import { Note } from "@/models/Note";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const notes = await Note.find({
      ownerId: userId,
    })
      .sort({
        updatedAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        notes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
  console.error("[GET_NOTES]", error);

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",

      stack:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.stack
            : null
          : undefined,
    },
    {
      status: 500,
    }
  );
}
}

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const note = await Note.create({
      title: "Untitled Note",
      content: "",
      ownerId: userId,
      isFavorite: false,
    });

    return NextResponse.json(
      {
        success: true,
        note,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "[CREATE_NOTE]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create note",
      },
      {
        status: 500,
      }
    );
  }
}