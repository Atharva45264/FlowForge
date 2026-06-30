"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "@/lib/notes";
import { useNotesStore } from "@/store/notes-store";
import { Note } from "@/types/note";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { setSelectedNote } = useNotesStore();

  return useMutation({
    mutationFn: (id: string) =>
      deleteNote(id),

    onSuccess: (_data, id) => {
      queryClient.setQueryData<Note[]>(
        ["notes"],
        (old = []) => {
          const updated = old.filter(
            (note) => note._id !== id
          );

          setSelectedNote(
            updated.length
              ? updated[0]
              : null
          );

          return updated;
        }
      );
    },
  });
}