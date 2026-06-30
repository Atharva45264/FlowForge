"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onDelete: () => void;
  loading?: boolean;
};

export function DeleteNoteDialog({
  open,
  onOpenChange,
  title,
  onDelete,
  loading = false,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-slate-900 border-slate-700 text-white">
        <DialogHeader>

          <DialogTitle>
            Delete Note
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Are you sure you want to delete
            <span className="font-semibold text-white">
              {" "}
              {title}
            </span>
            ?
            <br />
            This action cannot be undone.
          </DialogDescription>

        </DialogHeader>

        <DialogFooter>

          <button
            onClick={() =>
              onOpenChange(false)
            }
            className="rounded-lg border border-slate-700 px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}