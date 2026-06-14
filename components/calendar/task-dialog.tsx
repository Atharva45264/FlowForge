"use client"

import { useState } from "react"

type TaskDialogProps = {
  onAddTask: (task: {
    title: string
    category: string
  }) => void
}

export function TaskDialog({
  onAddTask,
}: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("planning")

  const handleSubmit = () => {
    if (!title.trim()) return

    onAddTask({
      title,
      category,
    })

    setTitle("")
  }

  return (
    <div className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5">
      <h2 className="mb-4 text-sm font-semibold text-white">
        Create Task
      </h2>

      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
        >
          <option value="planning">Planning</option>
          <option value="meeting">Meeting</option>
          <option value="project">Project</option>
          <option value="personal">Personal</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
        >
          Add Draft Task
        </button>
      </div>
    </div>
  )
}