import { AssistantTool } from "../type";

export function detectTool(
  message: string,
  uploadedFile?: {
    type: string;
  } | null
): AssistantTool {
  if (uploadedFile?.type === "pdf") {
    return "pdf";
  }

  if (uploadedFile?.type === "image") {
    return "image";
  }

  const lower =
    message.toLowerCase();

  if (
    lower.includes("schedule") ||
    lower.includes("meeting") ||
    lower.includes("appointment") ||
    lower.includes("calendar") ||
    lower.includes("remind") ||
    lower.includes("event")
  ) {
    return "calendar";
  }

  return "chat";
}