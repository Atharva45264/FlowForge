"use client";

import { useState } from "react";

import { Bot, Check, Copy, User } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";

import type { AIMessage } from "@/types/ai";

interface AIMessageProps {
  message: AIMessage;
}

export default function AIMessage({
  message,
}: AIMessageProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl border px-5 py-4 shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ children }) {
              return (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              );
            },

            pre({ children }) {
              return (
                <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  {children}
                </pre>
              );
            },

            a({ href, children }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <span className="text-xs opacity-70">
            {message.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyMessage}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
          <User className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}