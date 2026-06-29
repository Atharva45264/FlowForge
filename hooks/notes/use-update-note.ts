"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateNote } from "@/lib/notes";

import { Note } from "@/types/note";

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      note,
    }: {
      id: string;
      note: Partial<Note>;
    }) =>
      updateNote(id, note),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}