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
    }) => updateNote(id, note),

    onMutate: async ({ id, note }) => {
      await queryClient.cancelQueries({
        queryKey: ["notes"],
      });

      const previousNotes =
        queryClient.getQueryData<Note[]>([
          "notes",
        ]);

      queryClient.setQueryData<Note[]>(
        ["notes"],
        (old = []) =>
          old.map((n) =>
            n._id === id
              ? {
                  ...n,
                  ...note,
                  updatedAt: new Date(),
                }
              : n
          )
      );

      return { previousNotes };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(
          ["notes"],
          context.previousNotes
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}