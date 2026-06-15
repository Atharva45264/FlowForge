"use client"

import { useMemo, useState } from "react"

import { boards as initialBoards } from "@/components/kanban/sample-data"
import { KanbanSidebar } from "@/components/kanban/kanban-sidebar"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core"

export default function KanbanPage() {
  const [boards, setBoards] = useState(initialBoards)

  const [activeBoardId, setActiveBoardId] = useState(
    initialBoards[0].id
  )

  const handleCreateTask = (
  boardId: string,
  task: {
    title: string
    description?: string
    priority: "low" | "medium" | "high"
    labels: any[]
    columnId: string
  }
) => {
  setBoards((prev) =>
    prev.map((board) => {
      if (board.id !== boardId) {
        return board
      }

      return {
        ...board,
        tasks: [
          ...board.tasks,
          {
            id: crypto.randomUUID(),
            ...task,
          },
        ],
      }
    })
  )
}

const handleDragEnd = (
  event: DragEndEvent
) => {
  const { active, over } = event

  if (!over) return

  setBoards((prev) =>
    prev.map((board) => {
      if (board.id !== activeBoardId) {
        return board
      }

      return {
        ...board,
        tasks: board.tasks.map((task) =>
          task.id === active.id
            ? {
                ...task,
                columnId: String(over.id),
              }
            : task
        ),
      }
    })
  )
}

  const activeBoard = useMemo(
    () =>
      boards.find(
        (board) => board.id === activeBoardId
      ),
    [boards, activeBoardId]
  )

  return (
    <DndContext
    onDragEnd={handleDragEnd}
  >
    <div className="flex gap-6">
      <KanbanSidebar
        boards={boards}
        activeBoardId={activeBoardId}
        onSelectBoard={setActiveBoardId}
      />

      <div className="flex-1 rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            {activeBoard?.name}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Kanban board workspace
          </p>
        </div>

        {activeBoard && (
  <KanbanBoard
  board={activeBoard}
  onCreateTask={handleCreateTask}
/>
)}
      </div>
    </div>
  </DndContext>
  )
}