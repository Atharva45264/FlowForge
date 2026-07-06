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

    onSuccess: () => {
      toast.success("Renamed");

      queryClient.invalidateQueries({
        queryKey: ["whiteboards"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: WhiteboardAPI.deleteBoard,

    onSuccess: () => {
      toast.success("Deleted");

      queryClient.invalidateQueries({
        queryKey: ["whiteboards"],
      });
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
};
}