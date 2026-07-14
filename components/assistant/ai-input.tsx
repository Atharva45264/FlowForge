"use client";

import { useEffect, useState } from "react";

import {
  ImageIcon,
  Loader2,
  Mic,
  Paperclip,
  SendHorizontal,
  Square,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import useVoice from "@/hooks/use-voice";

interface AIInputProps {
  onSend: (message: string) => Promise<void>;
  loading: boolean;
}

export default function AIInput({
  onSend,
  loading,
}: AIInputProps) {
  const [message, setMessage] = useState("");

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoice();

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  async function handleSend() {
    if (!message.trim() || loading) return;

    const text = message;

    setMessage("");
    clearTranscript();

    await onSend(text);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="flex items-end gap-3 rounded-2xl border bg-card p-3">

        {/* PDF */}

        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Image */}

        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>

        {/* Voice */}

        <Button
          variant={listening ? "destructive" : "ghost"}
          size="icon"
          disabled={loading}
          onClick={() => {
            if (listening) {
              stopListening();
            } else {
              clearTranscript();
              startListening();
            }
          }}
        >
          {listening ? (
            <Square className="h-4 w-4" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        {/* Text Area */}

        <textarea
          rows={1}
          value={message}
          disabled={loading}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={
            listening
              ? "Listening..."
              : "Ask FlowForge AI anything..."
          }
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 outline-none"
        />

        {/* Send */}

        <Button
          onClick={handleSend}
          disabled={
            loading || !message.trim()
          }
          size="icon"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>

      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        {listening
          ? "🎤 Listening..."
          : "Press Enter to send • Shift + Enter for new line"}
      </p>
    </div>
  );
}