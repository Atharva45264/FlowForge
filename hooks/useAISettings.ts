"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface AISettings {
  model: string;
  temperature: number;
  responseLength: "short" | "medium" | "long";
  voiceEnabled: boolean;
  imageUnderstanding: boolean;
  pdfChat: boolean;
}

async function fetchSettings(): Promise<AISettings> {
  const res = await fetch("/api/settings/ai");

  if (!res.ok) {
    throw new Error("Failed to fetch AI settings");
  }

  return res.json();
}

export function useAISettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["ai-settings"],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: async (settings: AISettings) => {
      const res = await fetch("/api/settings/ai", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error("Failed to save AI settings");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-settings"],
      });
    },
  });

  return {
    ...query,
    saveSettings: mutation.mutate,
    isSaving: mutation.isPending,
  };
}