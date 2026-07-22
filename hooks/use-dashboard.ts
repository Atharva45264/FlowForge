"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  stats: {
    notes: number;
    pages: number;
    boards: number;
    chats: number;
    architectProjects: number;
    eventsToday: number;
    favoritePages: number;
    archivedPages: number;
  };

  today: {
    events: any[];
  };

  recentActivity: any[];

  productivity: {
    score: number;
    totalItems: number;
    focusHours: number;
    completionRate: number;
  };
}

async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch("/api/dashboard", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return response.json();
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,

    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}