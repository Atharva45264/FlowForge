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

        if (!activeChatId) {
          const createRes = await fetch(
            "/api/assistant/chats",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                title: "New Chat",
              }),
            }
          );

          const createData =
            await createRes.json();

          if (
            !createRes.ok ||
            !createData.success
          ) {
            throw new Error(
              createData.error?.message
            );
          }

          activeChatId =
            createData.data._id;

          setCurrentChatId(activeChatId);

          if (activeChatId) {
  onChatCreated?.(activeChatId);
}
        }

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