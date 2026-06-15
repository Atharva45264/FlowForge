"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { KanbanTask } from "./kanban-types"

type TaskDetailsDialogProps = {
  task: KanbanTask

  onUpdateTask: (
    taskId: string,
    updates: Partial<KanbanTask>
  ) => void

  onDeleteTask: (
    taskId: string
  ) => void

  children: React.ReactNode
}

export function TaskDetailsDialog({
  task,
  onUpdateTask,
  onDeleteTask,
  children,
}: TaskDetailsDialogProps) {
  const [title, setTitle] = useState(task.title)

  const [description, setDescription] =
    useState(task.description ?? "")

  const [priority, setPriority] =
    useState(task.priority)

  const [dueDate, setDueDate] =
    useState(task.dueDate ?? "")

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="border-slate-700 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>
            Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
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
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdateTask(task.id, {
                  title,
                  description,
                  priority,
                  dueDate,
                })
              }
              className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-white"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() =>
                onDeleteTask(task.id)
              }
              className="rounded-lg bg-red-500 px-3 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}