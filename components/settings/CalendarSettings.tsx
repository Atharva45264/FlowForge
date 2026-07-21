"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Globe,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCalendarSettings } from "@/hooks/useCalendarSettings";

export default function CalendarSettings() {
  const { data, isLoading, saveSettings, isSaving } =
    useCalendarSettings();

  const [googleConnected, setGoogleConnected] =
    useState(false);

  const [defaultReminder, setDefaultReminder] =
    useState(30);

  const [defaultDuration, setDefaultDuration] =
    useState(60);

  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");

  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    if (!data) return;

    setGoogleConnected(data.googleConnected);
    setDefaultReminder(data.defaultReminder);
    setDefaultDuration(data.defaultDuration);
    setStart(data.workingHours.start);
    setEnd(data.workingHours.end);
    setTimezone(data.timezone);
  }, [data]);

  useEffect(() => {
    if (!timezone) {
      setTimezone(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    }
  }, [timezone]);

  const handleSave = () => {
    saveSettings(
      {
        googleConnected,
        defaultReminder,
        defaultDuration,
        workingHours: {
          start,
          end,
        },
        timezone,
      },
      {
        onSuccess: () =>
          toast.success("Calendar settings saved."),
        onError: () =>
          toast.error("Failed to save settings."),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">
          Calendar Settings
        </h2>

        <p className="mt-2 text-muted-foreground">
          Configure Google Calendar and your
          scheduling preferences.
        </p>
      </div>

      {/* Google Calendar */}

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" />

            <div>
              <h3 className="font-semibold">
                Google Calendar
              </h3>

              <p className="text-sm text-muted-foreground">
                {googleConnected
                  ? "Connected"
                  : "Not Connected"}
              </p>
            </div>
          </div>

          {googleConnected ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <XCircle className="text-red-500" />
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            onClick={() =>
              window.open(
                "/api/google/connect",
                "_blank"
              )
            }
          >
            {googleConnected
              ? "Reconnect"
              : "Connect"}
          </Button>

          {googleConnected && (
            <Button
              variant="outline"
              onClick={() =>
                setGoogleConnected(false)
              }
            >
              Disconnect
            </Button>
          )}
        </div>
      </Card>

      {/* Reminder */}

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">
          Default Reminder
        </h3>

        <select
          className="w-full rounded-lg border bg-background p-3"
          value={defaultReminder}
          onChange={(e) =>
            setDefaultReminder(Number(e.target.value))
          }
        >
          <option value={0}>None</option>
          <option value={10}>10 Minutes</option>
          <option value={30}>30 Minutes</option>
          <option value={60}>1 Hour</option>
        </select>
      </Card>

      {/* Duration */}

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">
          Default Event Duration
        </h3>

        <select
          className="w-full rounded-lg border bg-background p-3"
          value={defaultDuration}
          onChange={(e) =>
            setDefaultDuration(Number(e.target.value))
          }
        >
          <option value={30}>30 Minutes</option>
          <option value={60}>1 Hour</option>
          <option value={90}>90 Minutes</option>
          <option value={120}>2 Hours</option>
        </select>
      </Card>

      {/* Working Hours */}

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Clock className="text-primary" />
          <h3 className="font-semibold">
            Working Hours
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">
              Start
            </label>

            <input
              type="time"
              value={start}
              onChange={(e) =>
                setStart(e.target.value)
              }
              className="w-full rounded-lg border bg-background p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              End
            </label>

            <input
              type="time"
              value={end}
              onChange={(e) =>
                setEnd(e.target.value)
              }
              className="w-full rounded-lg border bg-background p-3"
            />
          </div>
        </div>
      </Card>

      {/* Timezone */}

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Globe className="text-primary" />
          <h3 className="font-semibold">
            Time Zone
          </h3>
        </div>

        <input
          value={timezone}
          onChange={(e) =>
            setTimezone(e.target.value)
          }
          className="w-full rounded-lg border bg-background p-3"
        />
      </Card>

      {/* Save */}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </div>
  );
}