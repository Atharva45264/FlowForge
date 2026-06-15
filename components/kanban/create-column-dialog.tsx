"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type CreateColumnDialogProps = {
  onCreateColumn: (
    name: string
  ) => void
}

export function CreateColumnDialog({
  onCreateColumn,
}: CreateColumnDialogProps) {
  const [open, setOpen] =
    useState(false)

  const [name, setName] =
    useState("")

  const handleCreate = () => {
    if (!name.trim()) return

    onCreateColumn(name)

    setName("")
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button
          className="flex h-full min-h-45 w-72 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-600 text-slate-400 transition hover:border-indigo-400 hover:text-indigo-300"
        >
          + Add Column
        </button>
      </DialogTrigger>

      <DialogContent className="border-slate-700 bg-[#111827] text-white">
        <DialogHeader>
          <DialogTitle>
            Create Column
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Column name"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />

          <button
            onClick={handleCreate}
            className="w-full rounded-lg bg-indigo-500 px-3 py-2 text-white"
          >
            Create Column
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}