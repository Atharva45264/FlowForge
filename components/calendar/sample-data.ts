import { CalendarTask } from "./calendar-types"

export const draftTasks: CalendarTask[] = [
  {
    id: "1",
    title: "Design Review",
    category: "planning",
    color: "bg-violet-500",
  },
  {
    id: "2",
    title: "Client Call",
    category: "meeting",
    color: "bg-blue-500",
  },
  {
    id: "3",
    title: "Sprint Planning",
    category: "project",
    color: "bg-emerald-500",
  },
]

export const scheduledTasks: CalendarTask[] = [
  {
    id: "4",
    title: "Content Shoot",
    date: "2026-06-18",
    category: "project",
    color: "bg-amber-500",
  },
]