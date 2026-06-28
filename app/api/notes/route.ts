import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import { Note } from "@/models/Note";

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

    const notes = await Note.find({
      ownerId: userId,
    }).sort({
      updatedAt: -1,
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load notes" },
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

    const note = await Note.create({
      title: "Untitled Note",
      content: "",
      ownerId: userId,
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}