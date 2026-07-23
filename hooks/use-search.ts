"use client";

import { useQuery } from "@tanstack/react-query";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type:
    | "note"
    | "page"
    | "whiteboard"
    | "calendar"
    | "chat"
    | "architect";
  href: string;
  updatedAt: string;
}

async function searchWorkspace(
  query: string
): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const res = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to search");
  }

  const data = await res.json();

  return data.results;
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["workspace-search", query],

    queryFn: () => searchWorkspace(query),

    enabled: query.trim().length > 0,

    staleTime: 1000 * 30,
  });
}