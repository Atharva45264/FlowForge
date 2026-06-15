"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { KanbanCard } from "./kanban-card"
import { CreateTaskDialog } from "./create-task-dialog"
import {
  KanbanColumn as ColumnType,
  KanbanTask,
} from "./kanban-types"

type KanbanColumnProps = {
  column: ColumnType
  tasks: KanbanTask[]

  boardId: string

  onCreateTask: (
    boardId: string,
    task: {
      title: string
      description?: string
      priority: "low" | "medium" | "high"
      labels: any[]
      columnId: string
    }
  ) => void
}

export function KanbanColumn({
  column,
  tasks,
  boardId,
  onCreateTask,
}: KanbanColumnProps) {
  const [showCreateTask, setShowCreateTask] =
    useState(false)

  return (
    <div className="w-80 shrink-0 rounded-xl border border-slate-700 bg-[#111827] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">
          {column.name}
        </h2>

        <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
          />
        ))}

        {!showCreateTask ? (
          <button
            type="button"
            onClick={() => setShowCreateTask(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 py-3 text-sm text-slate-400 transition hover:border-indigo-400 hover:text-indigo-300"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        ) : (
          <CreateTaskDialog
            columnId={column.id}
            onCreateTask={(task) => {
              onCreateTask(boardId, task)
              setShowCreateTask(false)
            }}
          />
        )}
      </div>
    </div>
  )
}