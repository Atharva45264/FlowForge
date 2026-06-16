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

const handleUpdateTask = (
  taskId: string,
  updates: Record<string, any>
) => {
  setBoards((prev) =>
    prev.map((board) => ({
      ...board,
      tasks: board.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
            }
          : task
      ),
    }))
  )
}

const handleDeleteTask = (
  taskId: string
) => {
  setBoards((prev) =>
    prev.map((board) => ({
      ...board,
      tasks: board.tasks.filter(
        (task) => task.id !== taskId
      ),
    }))
  )
}

const handleCreateColumn = (
  name: string
) => {
  setBoards((prev) =>
    prev.map((board) => {
      if (board.id !== activeBoardId) {
        return board
      }

      return {
        ...board,
        columns: [
          ...board.columns,
          {
            id: crypto.randomUUID(),
            name,
          },
        ],
      }
    })
  )
}

const handleRenameColumn = (
  columnId: string,
  newName: string
) => {
  setBoards((prev) =>
    prev.map((board) => {
      if (board.id !== activeBoardId) {
        return board
      }

      return {
        ...board,
        columns: board.columns.map((column) =>
          column.id === columnId
            ? {
                ...column,
                name: newName,
              }
            : column
        ),
      }
    })
  )
}

const handleDeleteColumn = (
  columnId: string
) => {
  setBoards((prev) =>
    prev.map((board) => {
      if (board.id !== activeBoardId) {
        return board
      }

      const fallbackColumn =
        board.columns.find(
          (column) => column.id === "todo"
        ) ?? board.columns[0]

      if (!fallbackColumn) {
        return board
      }

      return {
        ...board,

        columns: board.columns.filter(
          (column) => column.id !== columnId
        ),

        tasks: board.tasks.map((task) =>
          task.columnId === columnId
            ? {
                ...task,
                columnId: fallbackColumn.id,
              }
            : task
        ),
      }
    })
  )
}

const handleCreateBoard = (
  name: string,
  color: string
) => {
  const newBoardId =
    crypto.randomUUID()

  const newBoard = {
    id: newBoardId,
    name,
    color,

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
  }

  setBoards((prev) => [
    ...prev,
    newBoard,
  ])

  setActiveBoardId(newBoardId)
}

const handleRenameBoard = (
  boardId: string,
  newName: string
) => {
  setBoards((prev) =>
    prev.map((board) =>
      board.id === boardId
        ? {
            ...board,
            name: newName,
          }
        : board
    )
  )
}

const handleDeleteBoard = (
  boardId: string
) => {
  setBoards((prev) => {
    const updatedBoards =
      prev.filter(
        (board) =>
          board.id !== boardId
      )

    if (
      activeBoardId === boardId &&
      updatedBoards.length > 0
    ) {
      setActiveBoardId(
        updatedBoards[0].id
      )
    }

    return updatedBoards
  })
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
        onCreateBoard={handleCreateBoard}
        onRenameBoard={handleRenameBoard}
        onDeleteBoard={handleDeleteBoard}
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
  onUpdateTask={handleUpdateTask}
  onDeleteTask={handleDeleteTask}
  onCreateColumn={handleCreateColumn}
  onRenameColumn={handleRenameColumn}
  onDeleteColumn={handleDeleteColumn}
/>
)}
      </div>
    </div>
  </DndContext>
  )
}
