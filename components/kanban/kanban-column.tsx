"use client"

import { useDroppable } from "@dnd-kit/core"

import { KanbanCard } from "./kanban-card"
import { CreateTaskDialog } from "./create-task-dialog"
import { ColumnActions } from "./column-actions"
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

  onUpdateTask: (
    taskId: string,
    updates: Record<string, any>
  ) => void

  onDeleteTask: (
    taskId: string
  ) => void

  onRenameColumn: (
  columnId: string,
  newName: string
) => void

onDeleteColumn: (
  columnId: string
) => void
}

export function KanbanColumn({
  column,
  tasks,
  boardId,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onRenameColumn,
  onDeleteColumn,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      className="w-80 shrink-0 rounded-xl border border-slate-700 bg-[#111827] p-4"
    >
      <div className="mb-4">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-semibold text-white">
      {column.name}
    </h2>

    <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
      {tasks.length}
    </span>
  </div>

  <div className="mt-2">
    <ColumnActions
      columnName={column.name}
      onRename={(newName) =>
        onRenameColumn(
          column.id,
          newName
        )
      }
      onDelete={() =>
        onDeleteColumn(
          column.id
        )
      }
    />
  </div>
</div>

      <div className="space-y-3">
        {tasks.map((task) => (
  <KanbanCard
    key={task.id}
    task={task}
    onUpdateTask={onUpdateTask}
    onDeleteTask={onDeleteTask}
  />
))}

        <CreateTaskDialog
          columnId={column.id}
          onCreateTask={(task) =>
            onCreateTask(boardId, task)
          }
        />
      </div>
    </div>
  )
}