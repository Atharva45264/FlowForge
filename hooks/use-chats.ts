"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ChatItem {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

async function getChats(): Promise<ChatItem[]> {
  const res = await fetch("/api/assistant/chats");

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.error?.message || "Failed to fetch chats."
    );
  }

  return data.data;
}

async function createChat(title: string): Promise<ChatItem> {
  const res = await fetch("/api/assistant/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.error?.message || "Failed to create chat."
    );
  }

  return data.data;
}

export default function useChats() {
  const queryClient = useQueryClient();

  const chatsQuery = useQuery({
    queryKey: ["assistant-chats"],
    queryFn: getChats,
  });

  const createMutation = useMutation({
    mutationFn: createChat,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["assistant-chats"],
      });
    },
  });

  return {
    chats: chatsQuery.data ?? [],
    loading: chatsQuery.isLoading,
    error: chatsQuery.error,
    refetch: chatsQuery.refetch,

    createChat: createMutation.mutateAsync,
    creating: createMutation.isPending,
  };
}