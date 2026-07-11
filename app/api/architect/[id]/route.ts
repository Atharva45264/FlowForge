import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import ArchitectProject from "@/models/ArchitectProject";

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
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  await connectDB();

  const { id } =
    await params;

  const project =
    await ArchitectProject.findOne({
      _id: id,
      userId,
    });

  return NextResponse.json(
    project
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  await connectDB();

  const body =
    await req.json();

  const { id } =
    await params;

  const project =
    await ArchitectProject.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      body,
      {
        returnDocument:
          "after",
      }
    );

  return NextResponse.json(
    project
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  await connectDB();

  const { id } =
    await params;

  await ArchitectProject.findOneAndDelete(
    {
      _id: id,
      userId,
    }
  );

  return NextResponse.json({
    success: true,
  });
}