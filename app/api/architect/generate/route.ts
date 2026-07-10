import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert Software Architect.

Return ONLY Mermaid code.

No markdown.
No explanation.
No \`\`\`.
No extra text.

User Request:

${prompt}
`,
    });

    return NextResponse.json({
      mermaid: response.text,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Generation failed",
      },
      {
        status: 500,
      }
    );
  }
}