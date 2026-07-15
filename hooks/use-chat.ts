"use client";

import { useCallback, useEffect, useState } from "react";

import type { AIMessage } from "@/types/ai";
import type { UploadedFile } from "@/components/assistant/ai-layout";

interface UseChatProps {
  chatId: string | null;
  onChatCreated?: (chatId: string) => void;
}

export default function useChat({
  chatId,
  onChatCreated,
}: UseChatProps) {
  const [currentChatId, setCurrentChatId] =
    useState<string | null>(chatId);

  const [messages, setMessages] = useState<
    AIMessage[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingChat, setLoadingChat] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    setCurrentChatId(chatId);
  }, [chatId]);

  useEffect(() => {
    async function loadChat() {
      if (!currentChatId) {
        setMessages([]);
        return;
      }

      try {
        setLoadingChat(true);

        const res = await fetch(
          `/api/assistant/chats/${currentChatId}`
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.error?.message ??
              "Failed loading chat."
          );
        }

        setMessages(
          data.data.messages.map(
            (message: AIMessage) => ({
              ...message,
              createdAt: new Date(
                message.createdAt
              ),
            })
          )
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
  }, [currentChatId]);

  const sendMessage = useCallback(
  async (
    content: string,
    uploadedFile?: UploadedFile | null
  ) => {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let activeChatId = currentChatId;

      // Create chat if none exists
      if (!activeChatId) {
        const createRes = await fetch(
          "/api/assistant/chats",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "New Chat",
            }),
          }
        );

        const createData = await createRes.json();

        if (
          !createRes.ok ||
          !createData.success
        ) {
          throw new Error(
            createData.error?.message ??
              "Failed creating chat."
          );
        }

        activeChatId = createData.data._id;

        setCurrentChatId(activeChatId);

        if (activeChatId) {
          onChatCreated?.(activeChatId);
        }
      }

      // -------------------------
      // Calendar Intent Detection
      // -------------------------

      const lowerMessage =
        content.toLowerCase();

      const isCalendarRequest =
        lowerMessage.includes("schedule") ||
        lowerMessage.includes("meeting") ||
        lowerMessage.includes("appointment") ||
        lowerMessage.includes("calendar") ||
        lowerMessage.includes("remind") ||
        lowerMessage.includes("event");

      if (isCalendarRequest) {
        const calendarRes = await fetch(
          "/api/assistant/calendar",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              prompt: content,
            }),
          }
        );

        const calendarData =
          await calendarRes.json();

        if (
          !calendarRes.ok ||
          !calendarData.success
        ) {
          throw new Error(
            calendarData.error?.message ??
              "Failed creating calendar event."
          );
        }

        const userMessage: AIMessage = {
          id: crypto.randomUUID(),
          role: "user",
          content,
          createdAt: new Date(),
        };

        const assistantMessage: AIMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `## ✅ Event Created Successfully

**Title:** ${calendarData.data.title}

**Date:** ${calendarData.data.date}

**Time:** ${calendarData.data.startTime} - ${calendarData.data.endTime}`,
          createdAt: new Date(),
        };

        setMessages((prev) => [
          ...prev,
          userMessage,
          assistantMessage,
        ]);

        return;
      }

      // -------------------------
      // Normal Chat / PDF / Image
      // -------------------------

      const response = await fetch(
        `/api/assistant/chats/${activeChatId}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: content,
            uploadedFile,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message ??
            "Something went wrong."
        );
      }

      setMessages(
        data.data.chat.messages.map(
          (message: AIMessage) => ({
            ...message,
            createdAt: new Date(
              message.createdAt
            ),
          })
        )
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
  [currentChatId, onChatCreated]
);

  return {
    messages,
    loading,
    loadingChat,
    error,
    sendMessage,
  };
}