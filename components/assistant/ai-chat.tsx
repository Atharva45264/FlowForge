"use client";

import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";

import useChat from "@/hooks/use-chat";
import useChats from "@/hooks/use-chats";

import AIInput from "./ai-input";
import AIMessage from "./ai-message";
import PromptCards from "./prompt-cards";

import type { UploadedFile } from "./ai-layout";

interface AIChatProps {
  conversationId: string | null;
  onSelectConversation: (id: string | null) => void;

  uploadedFile: UploadedFile | null;
  setUploadedFile: React.Dispatch<
    React.SetStateAction<UploadedFile | null>
  >;
}

export default function AIChat({
  conversationId,
  onSelectConversation,
  uploadedFile,
  setUploadedFile,
}: AIChatProps) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

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

  async function handleSend(message: string) {
    await sendMessage(message, uploadedFile);
    setUploadedFile(null);
  }

  return (
    <div className="flex h-full w-full flex-col bg-linear-to-b from-background via-background to-muted/10">

      {/* CHAT AREA */}

      <div className="flex-1 overflow-y-auto">

        {loadingChat ? (

          <div className="flex h-full items-center justify-center">

            <div className="space-y-5 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 shadow-xl">

                <Bot className="h-10 w-10 text-primary animate-pulse" />

              </div>

              <p className="text-muted-foreground">
                Loading conversation...
              </p>

            </div>

          </div>

        ) : messages.length === 0 ? (

          <div className="flex h-full w-full flex-col items-center justify-center px-10 py-10">

            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-primary/20 bg-primary/10 shadow-xl">

              <Bot className="h-16 w-16 text-primary" />

            </div>

            <div className="flex items-center gap-3">

              <Sparkles className="h-6 w-6 text-primary" />

              <h1 className="text-5xl font-bold tracking-tight">

                FlowForge AI

              </h1>

            </div>

            <p className="mt-6 max-w-3xl text-center text-lg leading-8 text-muted-foreground">

              Your intelligent productivity assistant.
              Ask questions, upload PDFs, analyze images,
              schedule meetings, sync Google Calendar,
              organize projects, and automate repetitive work.

            </p>

            <div className="mt-14 w-full max-w-7xl">

              <PromptCards />

            </div>

          </div>

        ) : (

          <div className="flex w-full flex-col gap-8 px-8 py-8 xl:px-12 2xl:px-16">

            {messages.map((message) => (

              <AIMessage
                key={message.id}
                message={message}
              />

            ))}

            {loading && (

              <div className="flex w-fit items-center gap-3 rounded-2xl border bg-card px-5 py-4 shadow-md">

                <div className="flex gap-1">

                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />

                  <span
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"
                    style={{
                      animationDelay: "0.15s",
                    }}
                  />

                  <span
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"
                    style={{
                      animationDelay: "0.3s",
                    }}
                  />

                                  </div>

                <span className="text-sm font-medium text-muted-foreground">
                  FlowForge AI is thinking...
                </span>

              </div>

            )}

            {error && (

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400 shadow-sm">

                {error}

              </div>

            )}

            <div ref={bottomRef} />

          </div>

        )}

      </div>

      <div className="border-t border-border/40 bg-background/50 backdrop-blur-xl">

        <div className="w-full px-6 py-5">

          <AIInput
            loading={loading}
            onSend={handleSend}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />

        </div>

      </div>

    </div>
  );
}