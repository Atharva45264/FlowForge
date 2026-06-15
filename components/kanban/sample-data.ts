import { KanbanBoard } from "./kanban-types"

export const boards: KanbanBoard[] = [
  {
    id: "board-1",
    name: "Product Roadmap",
    color: "#6366F1",

    columns: [
      {
        id: "todo",
        name: "Todo",
      },
      {
        id: "in-progress",
        name: "In Progress",
      },
      {
        id: "done",
        name: "Done",
      },
    ],

    tasks: [
      {
        id: "task-1",
        title: "Design Dashboard",
        priority: "high",
        labels: [
          {
            id: "frontend",
            name: "Frontend",
            color: "#8B5CF6",
          },
        ],
        columnId: "todo",
      },

      {
        id: "task-2",
        title: "Setup Calendar Sync",
        priority: "medium",
        labels: [
          {
            id: "feature",
            name: "Feature",
            color: "#10B981",
          },
        ],
        columnId: "in-progress",
      },

      {
        id: "task-3",
        title: "Authentication Flow",
        priority: "low",
        labels: [],
        columnId: "done",
      },
    ],
  },

  {
    id: "board-2",
    name: "Personal",
    color: "#EC4899",

    columns: [
      {
        id: "todo",
        name: "Todo",
      },
      {
        id: "in-progress",
        name: "In Progress",
      },
      {
        id: "done",
        name: "Done",
      },
    ],

    tasks: [],
  },
]