"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createNote } from "@/lib/notes";

import { useNotesStore } from "@/store/notes-store";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { setSelectedNote } =
    useNotesStore();

  return useMutation({
    mutationFn: createNote,

    onSuccess: (note) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      setSelectedNote(note);
    },
  });
}