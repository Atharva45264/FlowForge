"use client";

import {
  useMutation,
} from "@tanstack/react-query";

export function useAI() {
  return useMutation({
    mutationFn: async ({
      action,
      note,
      question,
    }: {
      action:
        | "summarize"
        | "improve"
        | "continue"
        | "ask";

      note: string;

      question?: string;
    }) => {
      const res = await fetch(
        "/api/ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            action,
            note,
            question,
          }),
        }
      );

      return res.json();
    },
  });
}