"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "@/lib/notes";
import { Note } from "@/types/note";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Note[]>(
        ["notes"],
        (old = []) =>
          old.filter(
            (note) => note._id !== deletedId
          )
      );

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}