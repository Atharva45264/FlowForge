"use client";

import { useCallback, useEffect, useState } from "react";

import type { AIMessage } from "@/types/ai";

interface ChatResponse {
  _id: string;
  title: string;
  messages: AIMessage[];
}

export default function useChat(chatId: string | null) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load selected chat
  useEffect(() => {
    async function loadChat() {
      if (!chatId) {
        setMessages([]);
        return;
      }

      try {
        setLoadingChat(true);

        const res = await fetch(`/api/assistant/chats/${chatId}`);

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.error?.message || "Failed loading chat."
          );
        }

        setMessages(
          data.data.messages.map((message: AIMessage) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          }))
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unexpected error"
        );
      } finally {
        setLoadingChat(false);
      }
    }

    loadChat();
  }, [chatId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!chatId || !content.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/assistant/chats/${chatId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: content,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error?.message || "Something went wrong."
          );
        }

        setMessages(
          data.data.chat.messages.map((message: AIMessage) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          }))
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unexpected error"
        );
      } finally {
        setLoading(false);
      }
    },
    [chatId]
  );

  return {
    messages,
    loading,
    loadingChat,
    error,
    sendMessage,
  };
}