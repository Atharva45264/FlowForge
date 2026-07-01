"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Loader2,
  Share2,
  Star,
  Trash2,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNotes } from "@/lib/notes";
import { useNotesStore } from "@/store/notes-store";
import { useUpdateNote } from "@/hooks/notes/use-update-note";
import { useToggleFavorite } from "@/hooks/notes/use-toggle-favorite";
import { useDeleteNote } from "@/hooks/notes/use-delete-note";
import { DeleteNoteDialog } from "./delete-note-dialog";

export function NotesHeader() {
  const { selectedNoteId } = useNotesStore();

  const updateMutation = useUpdateNote();

  const favoriteMutation =
  useToggleFavorite();

  const deleteMutation =
  useDeleteNote();

const [deleteOpen, setDeleteOpen] =
  useState(false);

  const { data: notes = [] } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const selectedNote = notes.find(
    (note) => note._id === selectedNoteId
  );

  const [title, setTitle] = useState("");

  useEffect(() => {
  if (selectedNote) {
    setTitle(selectedNote.title);
  }
}, [selectedNote?._id]);

  const saveTitle = async () => {
  console.log("=== SAVE TITLE ===");

  console.log("selectedNote:", selectedNote);

  console.log("title state:", title);

  if (!selectedNote?._id) {
    console.log("No selected note");
    return;
  }

  const newTitle = title.trim() || "Untitled Note";

  console.log("old:", selectedNote.title);
  console.log("new:", newTitle);

  if (newTitle === selectedNote.title) {
    console.log("Same title");
    return;
  }

  console.log("Calling PATCH...");

  try {
    const result =
      await updateMutation.mutateAsync({
        id: selectedNote._id,
        note: {
          title: newTitle,
        },
      });

    console.log("PATCH SUCCESS", result);
  } catch (err) {
    console.error("PATCH ERROR", err);
  }
};

  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-[#111827]
        px-8
        py-5
      "
    >
      {/* Left */}

      <div className="flex flex-col">

        <input
          value={title}
          onChange={(e) => {
  console.log("Typing:", e.target.value);
  setTitle(e.target.value);
}}
          onKeyDown={async (e) => {
  if (e.key !== "Enter") return;

  e.preventDefault();

  if (!selectedNote) return;

  const newTitle =
    title.trim() || "Untitled Note";

  console.log("Saving:", newTitle);

  await updateMutation.mutateAsync({
    id: selectedNote._id!,
    note: {
      title: newTitle,
    },
  });
}}
          placeholder="Untitled Note"
          className="
            bg-transparent
            text-3xl
            font-bold
            text-white
            outline-none
            placeholder:text-slate-500
          "
        />

        <div className="mt-2 flex items-center gap-2">

          {updateMutation.isPending ? (
            <>
              <Loader2
                size={16}
                className="animate-spin text-violet-400"
              />

              <p className="text-sm text-slate-400">
                Saving...
              </p>
            </>
          ) : (
            <>
              <CheckCircle2
                size={16}
                className="text-emerald-400"
              />

              <p className="text-sm text-slate-400">
                Saved
              </p>
            </>
          )}

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
  onClick={() => {
    if (!selectedNote) return;

    favoriteMutation.mutate({
      id: selectedNote._id!,
      isFavorite:
        !selectedNote.isFavorite,
    });
  }}
  className="
    rounded-xl
    border
    border-slate-700
    bg-slate-900
    p-2.5
    transition
    hover:border-yellow-400
  "
>
  <Star
    size={18}
    className={
      selectedNote?.isFavorite
        ? "fill-yellow-400 text-yellow-400"
        : ""
    }
  />
</button>
        <button
  onClick={async () => {
    if (!selectedNote) return;

    const url =
      `${window.location.origin}/notes/${selectedNote._id}`;

    await navigator.clipboard.writeText(url);

    toast.success(
      "Note link copied!"
    );
  }}
  className="
    rounded-xl
    border
    border-slate-700
    bg-slate-900
    p-2.5
    transition
    hover:border-indigo-400
  "
>
  <Share2 size={18} />
</button>

        <button
  onClick={() => setDeleteOpen(true)}
  className="
    rounded-xl
    border
    border-slate-700
    bg-slate-900
    p-2.5
    transition
    hover:border-red-500
  "
>
  <Trash2 size={18} />
</button>
<DeleteNoteDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  title={selectedNote?.title || "Untitled Note"}
  loading={deleteMutation.isPending}
  onDelete={async () => {
    if (!selectedNote?._id) return;

    await deleteMutation.mutateAsync(
      selectedNote._id
    );

    setDeleteOpen(false);
  }}
/>

      </div>

    </header>
  );
}