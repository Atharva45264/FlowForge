"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface CalendarSettings {
  googleConnected: boolean;
  defaultReminder: number;
  defaultDuration: number;

  workingHours: {
    start: string;
    end: string;
  };

  timezone: string;
}

async function fetchSettings(): Promise<CalendarSettings> {
  const res = await fetch("/api/settings/calendar");

  if (!res.ok) {
    throw new Error(
      "Failed to fetch calendar settings"
    );
  }

  return res.json();
}

export function useCalendarSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["calendar-settings"],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: async (
      settings: CalendarSettings
    ) => {
      const res = await fetch(
        "/api/settings/calendar",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to save calendar settings"
        );
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar-settings"],
      });
    },
  });

  return {
    ...query,
    saveSettings: mutation.mutate,
    isSaving: mutation.isPending,
  };
}