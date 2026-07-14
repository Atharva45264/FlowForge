"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface ChatItem {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchChats(): Promise<ChatItem[]> {
  const res = await fetch("/api/assistant/chats");

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.error?.message ??
        "Failed to fetch chats."
    );
  }

  return data.data;
}

async function renameChat({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  const res = await fetch(
    `/api/assistant/chats/${chatId}/manage`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.error?.message ??
        "Failed renaming chat."
    );
  }

  return data.data;
}

async function deleteChat(chatId: string) {
  const res = await fetch(
    `/api/assistant/chats/${chatId}/manage`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.error?.message ??
        "Failed deleting chat."
    );
  }

  return true;
}

export default function useChats() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["assistant-chats"],
    queryFn: fetchChats,
  });

  const renameMutation = useMutation({
    mutationFn: renameChat,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["assistant-chats"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteChat,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["assistant-chats"],
      });
    },
  });

  const refreshChats = () =>
    queryClient.invalidateQueries({
      queryKey: ["assistant-chats"],
    });

  return {
    chats: query.data ?? [],
    loading: query.isLoading,
    error: query.error,

    refreshChats,

    renameChat:
      renameMutation.mutateAsync,

    deleteChat:
      deleteMutation.mutateAsync,

    renaming:
      renameMutation.isPending,

    deleting:
      deleteMutation.isPending,
  };
}