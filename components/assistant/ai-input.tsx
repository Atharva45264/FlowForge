"use client";

import { useState } from "react";

import {
  ImageIcon,
  Loader2,
  Mic,
  Paperclip,
  SendHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface AIInputProps {
  onSend: (message: string) => Promise<void>;
  loading: boolean;
}

export default function AIInput({
  onSend,
  loading,
}: AIInputProps) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!message.trim() || loading) return;

    const text = message;

    setMessage("");

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

        {/* PDF Upload */}

        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Image Upload */}

        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>

        {/* Voice */}

        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <Mic className="h-5 w-5" />
        </Button>

        {/* Input */}

        <textarea
          rows={1}
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask FlowForge AI anything..."
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 outline-none"
        />

        {/* Send */}

        <Button
          onClick={handleSend}
          disabled={loading || !message.trim()}
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
        Press <span className="font-medium">Enter</span> to send ·{" "}
        <span className="font-medium">Shift + Enter</span> for a new line
      </p>

    </div>
  );
}