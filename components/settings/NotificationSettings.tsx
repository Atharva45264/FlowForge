"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Mail,
  Volume2,
  Moon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`h-7 w-14 rounded-full transition ${
        checked ? "bg-primary" : "bg-gray-400"
      }`}
    >
      <div
        className={`h-6 w-6 rounded-full bg-white transition ${
          checked
            ? "translate-x-7"
            : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const {
    data,
    isLoading,
    saveSettings,
    isSaving,
  } = useNotificationSettings();

  const [settings, setSettings] = useState({
    emailAI: true,
    emailCalendar: true,
    emailWorkspace: true,
    weeklyReport: true,
    desktopNotifications: true,
    soundAlerts: true,
    start: "22:00",
    end: "07:00",
  });

  useEffect(() => {
    if (!data) return;

    setSettings({
      emailAI: data.emailAI,
      emailCalendar: data.emailCalendar,
      emailWorkspace: data.emailWorkspace,
      weeklyReport: data.weeklyReport,
      desktopNotifications:
        data.desktopNotifications,
      soundAlerts: data.soundAlerts,
      start: data.doNotDisturb.start,
      end: data.doNotDisturb.end,
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const toggle = (
    key: keyof typeof settings
  ) => {
    if (key === "start" || key === "end")
      return;

    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>
        <p className="text-muted-foreground mt-2">
          Manage how FlowForge keeps you
          updated.
        </p>
      </div>

      <Card className="p-6 space-y-5">
        {[
          ["emailAI", "AI Assistant Updates", Mail],
          ["emailCalendar", "Calendar Reminders", Bell],
          ["emailWorkspace", "Workspace Invitations", Bell],
          ["weeklyReport", "Weekly Productivity Report", Mail],
          ["desktopNotifications", "Desktop Notifications", Bell],
          ["soundAlerts", "Sound Alerts", Volume2],
        ].map(([key, label, Icon]) => (
          <div
            key={String(key)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {(() => {
  const Lucide = Icon as LucideIcon;
  return <Lucide size={18} className="text-primary" />;
})()}
              <span>{label as string}</span>
            </div>

            <Toggle
              checked={
                settings[
                  key as keyof typeof settings
                ] as boolean
              }
              onChange={() =>
                toggle(
                  key as keyof typeof settings
                )
              }
            />
          </div>
        ))}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <Moon className="text-primary" />
          <h3 className="font-semibold">
            Do Not Disturb
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="time"
            value={settings.start}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                start: e.target.value,
              }))
            }
            className="rounded-lg border p-3 bg-background"
          />

          <input
            type="time"
            value={settings.end}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                end: e.target.value,
              }))
            }
            className="rounded-lg border p-3 bg-background"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          disabled={isSaving}
          onClick={() =>
            saveSettings(
              {
                emailAI: settings.emailAI,
                emailCalendar:
                  settings.emailCalendar,
                emailWorkspace:
                  settings.emailWorkspace,
                weeklyReport:
                  settings.weeklyReport,
                desktopNotifications:
                  settings.desktopNotifications,
                soundAlerts:
                  settings.soundAlerts,
                doNotDisturb: {
                  start: settings.start,
                  end: settings.end,
                },
              },
              {
                onSuccess: () =>
                  toast.success(
                    "Notification settings saved."
                  ),
                onError: () =>
                  toast.error(
                    "Failed to save settings."
                  ),
              }
            )
          }
        >
          {isSaving
            ? "Saving..."
            : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}