"use client";

import {
  Bot,
  User,
} from "lucide-react";

import MarkdownRenderer from "./markdown-renderer";
import MessageActions from "./message-actions";

import type { AIMessage } from "@/types/ai";

interface AIMessageProps {
  message: AIMessage;
}

export default function AIMessage({
  message,
}: AIMessageProps) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`group flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mr-4 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">

          <Bot className="h-5 w-5" />

        </div>
      )}

      <div
        className={`max-w-[82%] ${
          isUser
            ? "order-1"
            : ""
        }`}
      >
        <div
          className={`overflow-hidden rounded-3xl border shadow-sm transition-all duration-200 hover:shadow-md ${
            isUser
              ? "rounded-tr-lg border-primary bg-linear-to-br from-primary to-primary/90 text-primary-foreground"
              : "rounded-tl-lg bg-card"
          }`}
        >
          <div className="px-6 py-5">

            {isUser ? (
              <div className="whitespace-pre-wrap wrap-break-word text-[15px] leading-7">
                {message.content}
              </div>
            ) : (
              <MarkdownRenderer
                content={message.content}
              />
            )}

          </div>
        </div>

        <div
          className={`mt-2 flex items-center ${
            isUser
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {!isUser && (
            <span className="ml-2 text-xs text-muted-foreground">
              FlowForge AI
            </span>
          )}

          <div className="flex items-center gap-3">

            <span className="text-xs text-muted-foreground">
              {message.createdAt.toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>

            {!isUser && (
              <MessageActions
                content={message.content}
              />
            )}
                      </div>

        </div>

      </div>

      {isUser && (
        <div className="ml-4 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md">

          <User className="h-5 w-5" />

        </div>
      )}

    </div>
  );
}