"use client";

import { Bot } from "lucide-react";

import PromptCards from "./prompt-cards";
import AIInput from "./ai-input";

interface AIChatProps {
  conversationId: string | null;
}

export default function AIChat({
  conversationId,
}: AIChatProps) {
  return (
    <div className="flex h-full flex-col">

      {/* Messages */}

      <div className="flex-1 overflow-y-auto">

        <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-8">

          <div className="mb-6 rounded-full bg-primary/10 p-5">

            <Bot className="h-10 w-10 text-primary" />

          </div>

          <h1 className="text-3xl font-bold">
            FlowForge AI
          </h1>

          <p className="mt-3 max-w-xl text-center text-muted-foreground">

            Ask questions, summarize documents, analyze images,
            chat with PDFs, generate emails, create meeting
            notes and schedule calendar events.

          </p>

          <PromptCards />

        </div>

      </div>

      {/* Input */}

      <div className="border-t bg-background">

        <div className="mx-auto max-w-5xl">

          <AIInput />

        </div>

      </div>

    </div>
  );
}