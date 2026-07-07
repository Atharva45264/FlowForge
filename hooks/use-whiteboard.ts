"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { WhiteboardAPI } from "@/lib/whiteboard";
import { useWhiteboardStore } from "@/store/whiteboard-store";

export function useWhiteboard() {
  const queryClient = useQueryClient();

  const store = useWhiteboardStore();

  const boardsQuery = useQuery({
    queryKey: ["whiteboards"],
    queryFn: WhiteboardAPI.getBoards,
  });

  const createMutation = useMutation({
  mutationFn: WhiteboardAPI.createBoard,

  onSuccess: (board) => {
    store.setSelectedBoard(board);

    queryClient.invalidateQueries({
      queryKey: ["whiteboards"],
    });

    toast.success("Whiteboard created");
  },
});

  const renameMutation = useMutation({
    mutationFn: ({
      id,
      title,
    }: {
      id: string;
      title: string;
    }) =>
      WhiteboardAPI.updateBoard(id, {
        title,
      }),

    onSuccess: (board) => {
  store.setSelectedBoard(board);

  toast.success("Whiteboard renamed");

  queryClient.invalidateQueries({
    queryKey: ["whiteboards"],
  });
},
  });

const favoriteMutation = useMutation({
  mutationFn: ({
    id,
    favorite,
  }: {
    id: string;
    favorite: boolean;
  }) =>
    WhiteboardAPI.toggleFavorite(
      id,
      favorite
    ),

  onSuccess: (board) => {
    if (
      store.selectedBoard?._id === board._id
    ) {
      store.setSelectedBoard(board);
    }

    queryClient.invalidateQueries({
      queryKey: ["whiteboards"],
    });

    toast.success(
      board.favorite
        ? "Added to favorites"
        : "Removed from favorites"
    );
  },
});

  const deleteMutation = useMutation({
  mutationFn: WhiteboardAPI.deleteBoard,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["whiteboards"],
    });

    store.setSelectedBoard(null);

    toast.success(
      "Whiteboard deleted"
    );
  },
});

  return {
  boards: boardsQuery.data ?? [],

  loading: boardsQuery.isLoading,

  error: boardsQuery.error,

  createBoard: createMutation.mutateAsync,

  renameBoard: renameMutation.mutateAsync,

  deleteBoard: deleteMutation.mutateAsync,

  selectedBoard: store.selectedBoard,

  setSelectedBoard: store.setSelectedBoard,

  search: store.search,

  setSearch: store.setSearch,

  saving: store.saving,

  setSaving: store.setSaving,

  toggleFavorite:favoriteMutation.mutateAsync,
};
}