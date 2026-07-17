"use client";

import { useState } from "react";

import {
  Check,
  Copy,
  Square,
  Volume2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import useSpeech from "@/hooks/use-speech";

interface Props {
  content: string;
}

export default function MessageActions({
  content,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const {
    speak,
    stopSpeaking,
    speaking,
  } = useSpeech();

  async function copyMessage() {
    await navigator.clipboard.writeText(
      content
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg hover:bg-muted"
        onClick={() => {
          if (speaking) {
            stopSpeaking();
          } else {
            speak(content);
          }
        }}
      >
        {speaking ? (
          <Square className="h-4 w-4 text-red-500" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg hover:bg-muted"
        onClick={copyMessage}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>

    </div>
  );
}