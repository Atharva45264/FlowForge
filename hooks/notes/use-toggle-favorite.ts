"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateNote } from "@/lib/notes";
import { Note } from "@/types/note";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isFavorite,
    }: {
      id: string;
      isFavorite: boolean;
    }) =>
      updateNote(id, {
        isFavorite,
      }),

    onSuccess: (updatedNote) => {
      queryClient.setQueryData<Note[]>(
        ["notes"],
        (old = []) =>
          old.map((note) =>
            note._id === updatedNote._id
              ? updatedNote
              : note
          )
      );
    },
  });
}