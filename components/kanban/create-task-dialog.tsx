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
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  const [priority, setPriority] =
    useState<"low" | "medium" | "high">(
      "medium"
    )

  const [syncCalendar, setSyncCalendar] =
    useState(false)

  const [syncNotes, setSyncNotes] =
    useState(false)

  const handleCreate = () => {
    if (!title.trim()) return

    onCreateTask({
      title,
      description,
      dueDate: dueDate || undefined,

      priority,

      labels: [],

      syncCalendar,
      syncNotes,

      columnId,
    })

    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("medium")

    setSyncCalendar(false)
    setSyncNotes(false)

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 py-3 text-sm text-slate-400 transition hover:border-indigo-400 hover:text-indigo-300"
        >
          + Add Task
        </button>
      </DialogTrigger>

      <DialogContent className="border-slate-700 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>
            Create Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Task title"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
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
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
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

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={syncCalendar}
              onChange={(e) =>
                setSyncCalendar(
                  e.target.checked
                )
              }
            />
            Sync with Calendar
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={syncNotes}
              onChange={(e) =>
                setSyncNotes(
                  e.target.checked
                )
              }
            />
            Sync with Notes
          </label>

          <button
            onClick={handleCreate}
            className="w-full rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          >
            Create Task
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}