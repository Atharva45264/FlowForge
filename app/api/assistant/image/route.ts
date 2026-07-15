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
            message: "Image is required.",
          },
        },
        {
          status: 400,
        }
      );
    }

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Only PNG, JPG, JPEG and WEBP images are supported.",
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
        type: "image",
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
          message: "Image upload failed.",
        },
      },
      {
        status: 500,
      }
    );
  }
}