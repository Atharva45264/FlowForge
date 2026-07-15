import { ai, GEMINI_MODEL } from "../client";
import { SYSTEM_PROMPT } from "../prompts";

export async function runImageTool(
  message: string,
  uploadedFile: {
    mimeType: string;
    base64: string;
  }
) {
  const result =
    await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType:
                  uploadedFile.mimeType,
                data: uploadedFile.base64,
              },
            },
            {
              text: `${SYSTEM_PROMPT}

Analyze the uploaded image.

Question:

${message}`,
            },
          ],
        },
      ],
    });

  return result.text ?? "";
}