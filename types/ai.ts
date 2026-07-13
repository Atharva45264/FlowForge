export type AIMessageRole = "user" | "assistant";

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  createdAt: Date;
}

export interface AIConversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  enabled: boolean;
}