export type AIAction =
  | "summarize"
  | "improve"
  | "continue"
  | "ask";

export function buildPrompt(
  action: AIAction,
  note: string,
  question?: string
) {
  switch (action) {
    case "summarize":
      return `
Summarize the following note.

Return markdown.

Note:

${note}
`;

    case "improve":
      return `
Rewrite this note professionally.

Keep the meaning exactly the same.

Return markdown only.

${note}
`;

    case "continue":
      return `
Continue writing this note.

Keep the same tone.

Return only the continuation.

${note}
`;

    case "ask":
      return `
You are helping the user understand this note.

Current Note:

${note}

Question:

${question}

Answer using markdown.
`;

    default:
      return note;
  }
}