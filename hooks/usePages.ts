"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Page {
  _id: string;
  userId: string;
  spaceId: string;

  title: string;
  icon: string;
  emoji: string;
  cover: string;
  content: string;

  tags: string[];

  favorite: boolean;
  archived: boolean;

  lastOpenedAt: string;

  createdAt: string;
  updatedAt: string;
}

// ----------------------
// Fetch Pages
// ----------------------

async function getPages(spaceId?: string): Promise<Page[]> {
  const url = spaceId
    ? `/api/pages?spaceId=${spaceId}`
    : "/api/pages";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  return res.json();
}

// ----------------------
// Fetch Single Page
// ----------------------

async function getPage(id: string): Promise<Page> {
  const res = await fetch(`/api/pages/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  return res.json();
}

// ----------------------
// Create Page
// ----------------------

async function createPage(data: {
  spaceId: string;
  title: string;
  icon?: string;
  emoji?: string;
  cover?: string;
  content?: string;
  tags?: string[];
}) {
  const res = await fetch("/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create page");
  }

  return res.json();
}

// ----------------------
// Update Page
// ----------------------

async function updatePage({
  id,
  data,
}: {
  id: string;
  data: Partial<Page>;
}) {
  const res = await fetch(`/api/pages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update page");
  }

  return res.json();
}

// ----------------------
// Archive Page
// ----------------------

async function archivePage(id: string) {
  const res = await fetch(`/api/pages/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to archive page");
  }

  return res.json();
}

// ======================
// Hooks
// ======================

export function usePages(spaceId?: string) {
  return useQuery({
    queryKey: ["pages", spaceId],
    queryFn: () => getPages(spaceId),
  });
}

async function duplicatePage(id: string) {
  const res = await fetch(`/api/pages/${id}/duplicate`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to duplicate page");
  }

  return res.json();
}

// ----------------------
// Move Page
// ----------------------

async function movePage({
  id,
 spaceId,
}: {
  id: string;
  spaceId: string;
}) {
  const res = await fetch(`/api/pages/${id}/move`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spaceId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to move page");
  }

  return res.json();
}

export function usePage(id: string) {
  return useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id),
    enabled: !!id,
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

export function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePage,

    onSuccess: (updatedPage) => {
      // Update single page cache immediately
      queryClient.setQueryData(
        ["page", updatedPage._id],
        updatedPage
      );

      // Refresh page lists
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
    },
  });
}

export function useArchivePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archivePage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

export function useDuplicatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: duplicatePage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

// ======================
// Move Page Hook
// ======================

export function useMovePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movePage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

export function usePagesBySpace(spaceId?: string) {
  return useQuery({
    queryKey: ["pages", spaceId],
    queryFn: async () => {
      if (!spaceId) return [];

      const res = await fetch(
        `/api/pages?spaceId=${spaceId}`
      );

      return res.json();
    },
    enabled: !!spaceId,
  });
}