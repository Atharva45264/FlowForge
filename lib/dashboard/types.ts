export interface DashboardStats {
  notes: number;
  pages: number;
  boards: number;
  chats: number;
  architectProjects: number;
  eventsToday: number;

  favoritePages: number;
  archivedPages: number;
}

export interface DashboardActivity {
  type:
    | "note"
    | "page"
    | "board"
    | "chat"
    | "architect"
    | "calendar";

  title: string;
  updatedAt: Date;
  href?: string;
}

export interface TodayEvent {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  description?: string;
}

export interface ProductivityMetrics {
  score: number;
  totalItems: number;
  focusHours: number;
  completionRate: number;
}

export interface DashboardResponse {
  stats: DashboardStats;

  today: {
    events: TodayEvent[];
  };

  recentActivity: DashboardActivity[];

  productivity: ProductivityMetrics;

  insight: string;
}