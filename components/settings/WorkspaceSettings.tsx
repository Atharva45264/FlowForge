"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Save,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWorkspaceSettings } from "@/hooks/useWorkspaceSettings";

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
        checked
          ? "bg-primary"
          : "bg-gray-400"
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

export default function WorkspaceSettings() {
  const {
    data,
    isLoading,
    saveSettings,
    isSaving,
  } = useWorkspaceSettings();

  const [settings, setSettings] = useState({
    workspaceName: "",
    defaultPage: "dashboard",

    collapseSidebar: false,
    rememberSidebar: true,

    autosaveNotes: true,
    autosaveWhiteboard: true,
    autosavePages: true,
  });

  useEffect(() => {
    if (!data) return;

    setSettings(data);
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
    if (
      key === "workspaceName" ||
      key === "defaultPage"
    )
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
          Workspace Settings
        </h2>

        <p className="mt-2 text-muted-foreground">
          Personalize your FlowForge workspace.
        </p>
      </div>

      <Card className="p-6 space-y-5">
        <label className="text-sm font-medium">
          Workspace Name
        </label>

        <input
          value={settings.workspaceName}
          onChange={(e) =>
            setSettings((p) => ({
              ...p,
              workspaceName:
                e.target.value,
            }))
          }
          className="w-full rounded-lg border bg-background p-3"
        />

        <label className="text-sm font-medium">
          Default Landing Page
        </label>

        <select
          value={settings.defaultPage}
          onChange={(e) =>
            setSettings((p) => ({
              ...p,
              defaultPage:
                e.target.value,
            }))
          }
          className="rounded-lg border bg-background p-3"
        >
          <option value="dashboard">
            Dashboard
          </option>

          <option value="calendar">
            Calendar
          </option>

          <option value="kanban">
            Kanban
          </option>

          <option value="notes">
            Notes
          </option>

          <option value="pages">
            Pages
          </option>

          <option value="whiteboard">
            Whiteboard
          </option>

          <option value="assistant">
            AI Assistant
          </option>
        </select>
      </Card>

      <Card className="p-6 space-y-5">
        {[
          [
            "collapseSidebar",
            "Collapse Sidebar by Default",
          ],
          [
            "rememberSidebar",
            "Remember Sidebar State",
          ],
          [
            "autosaveNotes",
            "Autosave Notes",
          ],
          [
            "autosaveWhiteboard",
            "Autosave Whiteboard",
          ],
          [
            "autosavePages",
            "Autosave Pages",
          ],
        ].map(([key, label]) => (
          <div
            key={key}
            className="flex items-center justify-between"
          >
            <span>{label}</span>

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

      <Card className="border-red-500 p-6">
        <div className="flex items-center gap-3">
          <RotateCcw className="text-red-500" />

          <div>
            <h3 className="font-semibold">
              Reset Workspace
            </h3>

            <p className="text-sm text-muted-foreground">
              Restore all workspace
              preferences to default.
            </p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="mt-5"
          onClick={() => {
            setSettings({
              workspaceName:
                "My Workspace",
              defaultPage:
                "dashboard",
              collapseSidebar: false,
              rememberSidebar: true,
              autosaveNotes: true,
              autosaveWhiteboard: true,
              autosavePages: true,
            });

            toast.success(
              "Workspace reset locally. Click Save to apply."
            );
          }}
        >
          Reset Preferences
        </Button>
      </Card>

      <div className="flex justify-end">
        <Button
          disabled={isSaving}
          onClick={() =>
            saveSettings(settings, {
              onSuccess: () =>
                toast.success(
                  "Workspace settings saved."
                ),
              onError: () =>
                toast.error(
                  "Failed to save settings."
                ),
            })
          }
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}