import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import { Note } from "@/models/Note";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: Props
) {
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

    const { id } = await params;

    const body = await req.json();

    await connectDB();

    // Only allow editable fields
    const updateData = {
      title: body.title,
      content: body.content,
      isFavorite: body.isFavorite,
    };

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        ownerId: userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "Note not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        note,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[UPDATE_NOTE]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update note",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
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

    const { id } = await params;

    await connectDB();

    const note = await Note.findOneAndDelete({
      _id: id,
      ownerId: userId,
    });

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "Note not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Note deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[DELETE_NOTE]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete note",
      },
      {
        status: 500,
      }
    );
  }
}