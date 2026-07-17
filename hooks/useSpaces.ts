"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Space {
  _id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  archived: boolean;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

async function getSpaces(): Promise<Space[]> {
  const res = await fetch("/api/spaces");

  if (!res.ok) {
    throw new Error("Failed to fetch spaces");
  }

  return res.json();
}

async function createSpace(data: {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}) {
  const res = await fetch("/api/spaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create space");
  }

  return res.json();
}

async function updateSpace({
  id,
  data,
}: {
  id: string;
  data: Partial<Space>;
}) {
  const res = await fetch(`/api/spaces/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update space");
  }

  return res.json();
}

async function archiveSpace(id: string) {
  const res = await fetch(`/api/spaces/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to archive space");
  }

  return res.json();
}

export function useSpaces() {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });
}

export function useCreateSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

export function useUpdateSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSpace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}

export function useArchiveSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveSpace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    },
  });
}