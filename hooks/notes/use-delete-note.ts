"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "@/lib/notes";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}