"use client"

import { useState } from "react"

import { KanbanTask } from "./kanban-types"

type CreateTaskDialogProps = {
  columnId: string

  onCreateTask: (
    task: Omit<KanbanTask, "id">
  ) => void
}

export function CreateTaskDialog({
  columnId,
  onCreateTask,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] =
    useState<"low" | "medium" | "high">(
      "medium"
    )

  const handleCreate = () => {
    if (!title.trim()) return

    onCreateTask({
      title,
      description,
      priority,
      labels: [],
      columnId,
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-3">
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Task title"
        className="mb-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        rows={3}
        className="mb-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as
              | "low"
              | "medium"
              | "high"
          )
        }
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={handleCreate}
        className="w-full rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
      >
        Create Task
      </button>
    </div>
  )
}