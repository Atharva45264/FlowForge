export type AssistantTool =
  | "chat"
  | "calendar"
  | "pdf"
  | "image";

export interface ToolResult {
  tool: AssistantTool;

  response: string;

  metadata?: any;
}