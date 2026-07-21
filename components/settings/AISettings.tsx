"use client";

import { useEffect, useState } from "react";
import { Brain, Mic, FileText, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAISettings } from "@/hooks/useAISettings";

type ResponseLength = "short" | "medium" | "long";

export default function AISettings() {
  const { data, isLoading, saveSettings, isSaving } = useAISettings();

  const [model, setModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState(0.7);
  const [responseLength, setResponseLength] =
    useState<ResponseLength>("medium");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [imageUnderstanding, setImageUnderstanding] = useState(true);
  const [pdfChat, setPdfChat] = useState(true);

  useEffect(() => {
    if (!data) return;

    setModel(data.model);
    setTemperature(data.temperature);
    setResponseLength(data.responseLength);
    setVoiceEnabled(data.voiceEnabled);
    setImageUnderstanding(data.imageUnderstanding);
    setPdfChat(data.pdfChat);
  }, [data]);

  const handleSave = () => {
    saveSettings(
      {
        model,
        temperature,
        responseLength,
        voiceEnabled,
        imageUnderstanding,
        pdfChat,
      },
      {
        onSuccess: () => {
          toast.success("AI settings saved successfully.");
        },
        onError: () => {
          toast.error("Failed to save AI settings.");
        },
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
        <h2 className="text-2xl font-bold">AI Settings</h2>

        <p className="mt-2 text-muted-foreground">
          Configure how FlowForge AI responds and behaves.
        </p>
      </div>

      {/* Model */}

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="text-primary" />
          <h3 className="font-semibold">AI Model</h3>
        </div>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-lg border bg-background p-3"
        >
          <option value="gemini-2.5-flash">
            Gemini 2.5 Flash
          </option>

          <option value="gemini-2.5-pro" disabled>
            Gemini 2.5 Pro (Coming Soon)
          </option>
        </select>
      </Card>

      {/* Temperature */}

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">
          Creativity ({temperature.toFixed(1)})
        </h3>

        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={temperature}
          onChange={(e) =>
            setTemperature(Number(e.target.value))
          }
          className="w-full"
        />

        <p className="text-sm text-muted-foreground">
          Lower values give precise answers. Higher values
          produce more creative responses.
        </p>
      </Card>

      {/* Response Length */}

      <Card className="p-6">
        <h3 className="mb-4 font-semibold">
          Default Response Length
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {(["short", "medium", "long"] as ResponseLength[]).map(
            (length) => (
              <button
                key={length}
                onClick={() =>
                  setResponseLength(length)
                }
                className={`rounded-xl border p-4 capitalize transition ${
                  responseLength === length
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary"
                }`}
              >
                {length}
              </button>
            )
          )}
        </div>
      </Card>

      {/* Toggles */}

      <Card className="p-6 space-y-5">
        <ToggleRow
          icon={<Mic size={18} />}
          title="Voice Responses"
          checked={voiceEnabled}
          onChange={() =>
            setVoiceEnabled(!voiceEnabled)
          }
        />

        <ToggleRow
          icon={<ImageIcon size={18} />}
          title="Image Understanding"
          checked={imageUnderstanding}
          onChange={() =>
            setImageUnderstanding(
              !imageUnderstanding
            )
          }
        />

        <ToggleRow
          icon={<FileText size={18} />}
          title="PDF Chat"
          checked={pdfChat}
          onChange={() => setPdfChat(!pdfChat)}
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
            "Save Preferences"
          )}
        </Button>
      </div>
    </div>
  );
}

type ToggleRowProps = {
  icon: React.ReactNode;
  title: string;
  checked: boolean;
  onChange: () => void;
};

function ToggleRow({
  icon,
  title,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}

        <span>{title}</span>
      </div>

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
    </div>
  );
}