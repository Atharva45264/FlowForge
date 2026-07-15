import connectDB from "@/lib/mongodb";
import CalendarEvent from "@/models/CalendarEvent";

import { ai, GEMINI_MODEL } from "../client";

export async function runCalendarTool(
  userId: string,
  prompt: string
) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const systemPrompt = `
You are an AI calendar assistant.

Today's date is ${today}.

Extract the event from the user's request.

Return ONLY valid JSON.

Schema:

{
"title":"",
"description":"",
"date":"YYYY-MM-DD",
"startTime":"HH:mm",
"endTime":"HH:mm",
"color":"#3b82f6"
}

Rules:

- Use 24-hour time.
- Default duration is 1 hour.
- If description is unknown use "".
- Never return markdown.
- Never explain.
- Return JSON only.
`;

  const result =
    await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `${systemPrompt}

User:

${prompt}`,
    });

  const text = result.text ?? "";

  let event;

  try {
    event = JSON.parse(text);
  } catch {
    throw new Error(
      "Gemini returned invalid event JSON."
    );
  }

  await connectDB();

  const created =
    await CalendarEvent.create({
      ownerId: userId,
      ...event,
      createdBy: "ai",
    });

  return {
    response: `✅ **Event Created Successfully**

**Title:** ${created.title}

**Date:** ${created.date}

**Time:** ${created.startTime} - ${created.endTime}`,
    metadata: created,
  };
}