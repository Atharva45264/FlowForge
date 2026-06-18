"use client"

import { useDraggable } from "@dnd-kit/core"
import { GripVertical } from "lucide-react";
import { KanbanTask } from "./kanban-types"
import { TaskDetailsDialog } from "./task-details-dialog"

type KanbanCardProps = {
  task: KanbanTask

  onUpdateTask: (
    taskId: string,
    updates: Record<string, any>
  ) => void

  onDeleteTask: (
    taskId: string
  ) => void
}

export function KanbanCard({
  task,
  onUpdateTask,
  onDeleteTask,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
  <TaskDetailsDialog
    task={task}
    onUpdateTask={onUpdateTask}
    onDeleteTask={onDeleteTask}
  >
    <div
    suppressHydrationWarning
      ref={setNodeRef}
      style={style}
      className="cursor-grab rounded-xl border border-slate-700 bg-slate-800/70 p-3 shadow-sm transition hover:border-indigo-400/40 active:cursor-grabbing"
    >
      <div className="mb-2 flex items-center justify-between">
  <h3 className="text-sm font-medium text-white">
    {task.title}
  </h3>

  <button
    type="button"
    {...listeners}
    {...attributes}
    className="cursor-grab text-slate-400 hover:text-white active:cursor-grabbing"
  >
    <GripVertical className="h-4 w-4" />
  </button>
</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {task.labels.map((label) => (
          <span
            key={label.id}
            className="rounded-full px-2 py-1 text-[10px] font-medium text-white"
            style={{
              backgroundColor: label.color,
            }}
          >
            {label.name}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-medium ${
            task.priority === "high"
              ? "bg-red-500/20 text-red-300"
              : task.priority === "medium"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-emerald-500/20 text-emerald-300"
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  </TaskDetailsDialog>
)
}