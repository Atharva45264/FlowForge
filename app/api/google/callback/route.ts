import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import GoogleAccount from "@/models/GoogleAccount";

import { oauth2Client } from "@/lib/google/client";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(
        new URL("/sign-in", req.url)
      );
    }

    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing authorization code.",
        },
        {
          status: 400,
        }
      );
    }

    const { tokens } =
      await oauth2Client.getToken(code);

    await connectDB();

    await GoogleAccount.findOneAndUpdate(
      {
        userId,
      },
      {
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.redirect(
      new URL("/assistant", req.url)
    );
  } catch (error) {
    console.error("Google OAuth Error");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed connecting Google Calendar.",
      },
      {
        status: 500,
      }
    );
  }
}