"use client"

import { useState } from "react"

type BoardActionsProps = {
  boardName: string

  onRename: (
    newName: string
  ) => void

  onDelete: () => void
}

export function BoardActions({
  boardName,
  onRename,
  onDelete,
}: BoardActionsProps) {
  const [editing, setEditing] =
    useState(false)

  const [name, setName] =
    useState(boardName)

  if (editing) {
    return (
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white"
        />

        <button
          onClick={() => {
            onRename(name)
            setEditing(false)
          }}
          className="text-xs text-indigo-300"
        >
          Save
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          setEditing(true)
        }
        className="text-xs text-slate-400 hover:text-white"
      >
        Rename
      </button>

      <button
        onClick={onDelete}
        className="text-xs text-red-400 hover:text-red-300"
      >
        Delete
      </button>
    </div>
  )
}