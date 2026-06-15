"use client"

import { Plus } from "lucide-react"

import { KanbanBoard } from "./kanban-types"

type KanbanSidebarProps = {
  boards: KanbanBoard[]
  activeBoardId: string

  onSelectBoard: (id: string) => void
}

export function KanbanSidebar({
  boards,
  activeBoardId,
  onSelectBoard,
}: KanbanSidebarProps) {
  return (
    <div className="w-72 rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">
          Boards
        </h2>

        <button
          className="rounded-lg border border-slate-700 p-2 text-slate-300"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => onSelectBoard(board.id)}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
              activeBoardId === board.id
                ? "bg-indigo-500/20 border border-indigo-500/20"
                : "hover:bg-slate-800"
            }`}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: board.color,
              }}
            />

            <span className="text-sm text-white">
              {board.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}