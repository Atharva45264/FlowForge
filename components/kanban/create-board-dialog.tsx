"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type CreateBoardDialogProps = {
  onCreateBoard: (
    name: string,
    color: string
  ) => void
}

const colors = [
  "#6366F1",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
]

export function CreateBoardDialog({
  onCreateBoard,
}: CreateBoardDialogProps) {
  const [open, setOpen] =
    useState(false)

  const [name, setName] =
    useState("")

  const [color, setColor] =
    useState(colors[0])

  const handleCreate = () => {
    if (!name.trim()) return

    onCreateBoard(name, color)

    setName("")
    setColor(colors[0])

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className="w-full rounded-lg border border-dashed border-slate-600 py-3 text-sm text-slate-400 transition hover:border-indigo-400 hover:text-indigo-300">
          + New Board
        </button>
      </DialogTrigger>

      <DialogContent className="border-slate-700 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>
            Create Board
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Board name"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />

          <div className="flex gap-2">
            {colors.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setColor(item)
                }
                className="h-8 w-8 rounded-full border-2"
                style={{
                  backgroundColor: item,
                  borderColor:
                    color === item
                      ? "white"
                      : "transparent",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleCreate}
            className="w-full rounded-lg bg-indigo-500 px-3 py-2 text-white"
          >
            Create Board
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}