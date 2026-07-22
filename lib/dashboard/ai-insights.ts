import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL = "gemini-2.5-flash";

export async function generateDashboardInsight(data: {
  notes: number;
  pages: number;
  boards: number;
  chats: number;
  architectProjects: number;
  eventsToday: number;
  productivityScore: number;
}) {
  try {
    const prompt = `
You are an AI productivity coach.

Write exactly ONE short paragraph (max 60 words).

Dashboard Data:
- Notes: ${data.notes}
- Pages: ${data.pages}
- Whiteboards: ${data.boards}
- AI Chats: ${data.chats}
- Architect Projects: ${data.architectProjects}
- Events Today: ${data.eventsToday}
- Productivity Score: ${data.productivityScore}

Be encouraging.
Do not use markdown.
Do not use bullet points.
`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return (
      response.text ??
      "Keep building your workspace and maintain your productivity."
    );
  } catch {
    return "Keep building your workspace and maintain your productivity.";
  }
}