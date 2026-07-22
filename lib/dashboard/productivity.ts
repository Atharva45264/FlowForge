import { DashboardStats, ProductivityMetrics } from "./types";

export function calculateProductivity(
  stats: DashboardStats
): ProductivityMetrics {
  const totalItems =
    stats.notes +
    stats.pages +
    stats.boards +
    stats.chats +
    stats.architectProjects;

  // Simple scoring algorithm (easy to improve later)
  let score = 0;

  score += Math.min(stats.notes * 2, 20);
  score += Math.min(stats.pages * 2, 20);
  score += Math.min(stats.boards * 5, 20);
  score += Math.min(stats.chats, 20);
  score += Math.min(stats.eventsToday * 5, 20);

  score = Math.min(score, 100);

  return {
    score,
    totalItems,
    focusHours: Number((score / 18).toFixed(1)),
    completionRate: score,
  };
}