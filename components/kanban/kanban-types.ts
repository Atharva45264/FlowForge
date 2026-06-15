export type Priority =
  | "low"
  | "medium"
  | "high"

export type TaskLabel = {
  id: string
  name: string
  color: string
}

export type KanbanTask = {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: Priority
  labels: TaskLabel[]
  columnId: string
}

export type KanbanColumn = {
  id: string
  name: string
}

export type KanbanBoard = {
  id: string
  name: string
  color: string

  columns: KanbanColumn[]
  tasks: KanbanTask[]
}