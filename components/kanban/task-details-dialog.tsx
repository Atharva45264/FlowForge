"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useKanbanStore } from "@/store/kanban-store"
import { LiveTaskThread }
from "./live-task-thread";
import { LiveTaskComments }
from "./live-task-comments";

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

  const { user } = useUser()

const addComment =
  useKanbanStore(
    (state) => state.addComment
  )

const [commentText, setCommentText] =
  useState("")

const handleAddComment = () => {
  if (!commentText.trim()) {
    return
  }

  addComment(task.id, {
    userId:
      user?.id ?? "unknown",

    userName:
      user?.fullName ??
      user?.firstName ??
      "User",

    message: commentText,

    createdAt:
      new Date().toISOString(),
  })

  setCommentText("")
}

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
            <div className="border-t border-slate-700 pt-4">
  <h3 className="mb-3 text-sm font-medium text-slate-300">
    Comments
  </h3>

  <div className="space-y-3">
    <div className="rounded-lg border border-slate-700 p-3">
      <div className="space-y-3">
  {(task.comments ?? []).map(
    (comment) => (
      <div
        key={comment.id}
        className="
          rounded-lg border
          border-slate-700 p-3
        "
      >
        <p className="text-sm font-medium text-white">
          {comment.userName}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {comment.message}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {new Date(
            comment.createdAt
          ).toLocaleString()}
        </p>
      </div>
    )
  )}
</div>

      <p className="mt-2 text-xs text-slate-500">
        Just now
      </p>
    </div>
  </div>

  <div className="mt-4 flex gap-2">
    <input
  value={commentText}
  onChange={(e) =>
    setCommentText(
      e.target.value
    )
  }
  placeholder="Write a comment..."
  className="
    flex-1 rounded-lg
    border border-slate-700
    bg-slate-900 px-3 py-2
    text-sm
  "
/>

    <button
  onClick={handleAddComment}
  className="
    rounded-lg bg-indigo-500
    px-4 py-2 text-sm
    text-white
  "
>
  Send
</button>
  </div>
</div>
          </div>
        </div>
        <LiveTaskThread
  taskId={task.id}
/>
      </DialogContent>
    </Dialog>
  )
}