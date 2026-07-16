import { google } from "googleapis";

import connectDB from "@/lib/mongodb";
import GoogleAccount from "@/models/GoogleAccount";

export async function createGoogleCalendarEvent(
  userId: string,
  event: {
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
  }
) {
  try {
    await connectDB();

    const account = await GoogleAccount.findOne({
      userId,
    });

    if (!account) {
      console.log("❌ Google account not connected");
      return;
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      process.env.GOOGLE_REDIRECT_URI!
    );

    oauth2Client.setCredentials({
      refresh_token: account.refreshToken,
    });

    // 🔥 Force refresh of access token
    const accessToken =
      await oauth2Client.getAccessToken();

    console.log(
      "✅ Fresh Access Token:",
      !!accessToken.token
    );

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const response =
      await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: event.title,

          description:
            event.description ?? "",

          start: {
            dateTime: `${event.date}T${event.startTime}:00`,
            timeZone: "Asia/Kolkata",
          },

          end: {
            dateTime: `${event.date}T${event.endTime}:00`,
            timeZone: "Asia/Kolkata",
          },
        },
      });

    console.log(
      "🎉 Google Calendar Event Created"
    );

    console.log(response.data.htmlLink);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Google Calendar Sync Failed"
    );

    console.error(error);
  }
}