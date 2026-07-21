import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import CalendarSettings from "@/models/CalendarSettings";

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

    let settings = await CalendarSettings.findOne({
      userId,
    });

    if (!settings) {
      settings = await CalendarSettings.create({
        userId,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET Calendar Settings Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch calendar settings",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    const settings =
      await CalendarSettings.findOneAndUpdate(
        { userId },
        {
          googleConnected: body.googleConnected,
          defaultReminder: body.defaultReminder,
          defaultDuration: body.defaultDuration,

          workingHours: {
            start: body.workingHours.start,
            end: body.workingHours.end,
          },

          timezone: body.timezone,
        },
        {
          new: true,
          upsert: true,
        }
      );

    return NextResponse.json(settings);
  } catch (error) {
    console.error("PATCH Calendar Settings Error:", error);

    return NextResponse.json(
      {
        error: "Failed to update calendar settings",
      },
      {
        status: 500,
      }
    );
  }
}