import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import NotificationSettings from "@/models/NotificationSettings";

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

    let settings = await NotificationSettings.findOne({
      userId,
    });

    if (!settings) {
      settings = await NotificationSettings.create({
        userId,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET Notification Settings Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch notification settings" },
      { status: 500 }
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
      await NotificationSettings.findOneAndUpdate(
        { userId },
        {
          emailAI: body.emailAI,
          emailCalendar: body.emailCalendar,
          emailWorkspace: body.emailWorkspace,
          weeklyReport: body.weeklyReport,
          desktopNotifications:
            body.desktopNotifications,
          soundAlerts: body.soundAlerts,

          doNotDisturb: {
            start: body.doNotDisturb.start,
            end: body.doNotDisturb.end,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );

    return NextResponse.json(settings);
  } catch (error) {
    console.error(
      "PATCH Notification Settings Error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update notification settings" },
      { status: 500 }
    );
  }
}