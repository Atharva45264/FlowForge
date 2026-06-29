"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/notes";

export function useNotes() {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return {
    notes: query.data ?? [],
    ...query,
  };
}