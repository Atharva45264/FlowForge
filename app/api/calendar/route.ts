import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import connectDB from "@/lib/mongodb";
import CalendarEvent from "@/models/CalendarEvent";

export async function GET() {
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

    await connectDB();

    const events = await CalendarEvent.find({
      ownerId: userId,
    }).sort({
      date: 1,
      startTime: 1,
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed fetching events.",
        },
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: NextRequest
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

    const body = await req.json();

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      color,
      createdBy,
    } = body;

    if (
      !title ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Missing required fields.",
          },
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const event =
      await CalendarEvent.create({
        ownerId: userId,

        title,

        description,

        date,

        startTime,

        endTime,

        color:
          color ??
          "#3b82f6",

        createdBy:
          createdBy ??
          "manual",
      });

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            "Failed creating event.",
        },
      },
      {
        status: 500,
      }
    );
  }
}