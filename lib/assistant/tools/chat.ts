import { ai, GEMINI_MODEL } from "../client";
import { SYSTEM_PROMPT } from "../prompts";

export async function runChatTool(
  message: string
) {
  const response =
    await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `
${SYSTEM_PROMPT}

User:

${message}
`,
    });

  return response.text ?? "";
}