import { create } from "zustand"

import { boards as initialBoards } from "@/components/kanban/sample-data"
import { KanbanBoard } from "@/components/kanban/kanban-types"

type KanbanStore = {
  boards: KanbanBoard[]

  activeBoardId: string

  setActiveBoardId: (
    id: string
  ) => void

  setBoards: (
  boards:
    | KanbanBoard[]
    | ((
        prev: KanbanBoard[]
      ) => KanbanBoard[])
) => void
}

export const useKanbanStore =
  create<KanbanStore>((set) => ({
    boards: initialBoards,

    activeBoardId:
      initialBoards[0]?.id ?? "",

    setActiveBoardId: (id) =>
      set({
        activeBoardId: id,
      }),

    setBoards: (boards) =>
  set((state) => ({
    boards:
      typeof boards === "function"
        ? boards(state.boards)
        : boards,
  })),
  }))