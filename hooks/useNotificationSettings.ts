"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface NotificationSettings {
  emailAI: boolean;
  emailCalendar: boolean;
  emailWorkspace: boolean;
  weeklyReport: boolean;
  desktopNotifications: boolean;
  soundAlerts: boolean;

  doNotDisturb: {
    start: string;
    end: string;
  };
}

async function fetchSettings(): Promise<NotificationSettings> {
  const res = await fetch(
    "/api/settings/notifications"
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch notification settings"
    );
  }

  return res.json();
}

export function useNotificationSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notification-settings"],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: async (
      settings: NotificationSettings
    ) => {
      const res = await fetch(
        "/api/settings/notifications",
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
          "Failed to save notification settings"
        );
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "notification-settings",
        ],
      });
    },
  });

  return {
    ...query,
    saveSettings: mutation.mutate,
    isSaving: mutation.isPending,
  };
}