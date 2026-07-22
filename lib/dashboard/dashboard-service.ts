import connectDB from "@/lib/mongodb";

import { DashboardResponse } from "./types";
import { getDashboardStats } from "./stats";
import { getTodayEvents } from "./today";
import { getRecentActivity } from "./activity";
import { calculateProductivity } from "./productivity";

export async function getDashboardData(
  userId: string
): Promise<DashboardResponse> {
  await connectDB();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [stats, todayEvents, recentActivity] = await Promise.all([
    getDashboardStats(userId, startOfToday, endOfToday),
    getTodayEvents(userId, startOfToday, endOfToday),
    getRecentActivity(userId),
  ]);

  const productivity = calculateProductivity(stats);

  return {
    stats,
    today: {
      events: todayEvents,
    },
    recentActivity,
    productivity,
  };
}