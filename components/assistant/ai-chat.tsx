"use client";

import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";

import useChat from "@/hooks/use-chat";
import useChats from "@/hooks/use-chats";

import AIInput from "./ai-input";
import AIMessage from "./ai-message";
import PromptCards from "./prompt-cards";

interface AIChatProps {
  conversationId: string | null;
  onSelectConversation: (id: string | null) => void;
}

export default function AIChat({
  conversationId,
  onSelectConversation,
}: AIChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { refreshChats } = useChats();

  const {
    messages,
    loading,
    loadingChat,
    error,
    sendMessage,
  } = useChat({
    chatId: conversationId,
    onChatCreated: (id) => {
      onSelectConversation(id);
      refreshChats();
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}

      <div className="flex-1 overflow-y-auto">
        {loadingChat ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Loading conversation...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-8">
            <div className="mb-6 rounded-full bg-primary/10 p-5">
              <Bot className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-3xl font-bold">
              FlowForge AI
            </h1>

            <p className="mt-3 max-w-xl text-center text-muted-foreground">
              Ask questions, summarize documents, analyze
              images, chat with PDFs, generate emails,
              create meeting notes and schedule calendar
              events.
            </p>

            <div className="mt-8 w-full">
              <PromptCards />
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
            {messages.map((message) => (
              <AIMessage
                key={message.id}
                message={message}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Bot className="h-5 w-5 animate-pulse" />
                Gemini is thinking...
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950">
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}

      <AIInput
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  );
}