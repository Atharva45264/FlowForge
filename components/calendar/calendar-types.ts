export type TaskCategory =
  | "meeting"
  | "planning"
  | "project"
  | "personal"

export type CalendarTask = {
  id: string
  title: string
  description?: string
  date?: string
  startTime?: string
  endTime?: string
  category: TaskCategory
  color: string
  completed?: boolean
}

export type CalendarView = "month" | "week"