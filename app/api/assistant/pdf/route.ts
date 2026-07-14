import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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

    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "No PDF selected.",
          },
        },
        {
          status: 400,
        }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Only PDF files are supported.",
          },
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    const base64 = Buffer.from(arrayBuffer).toString(
      "base64"
    );

    return NextResponse.json({
      success: true,
      data: {
        type: "pdf",
        fileName: file.name,
        mimeType: file.type,
        base64,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed uploading PDF.",
        },
      },
      {
        status: 500,
      }
    );
  }
}