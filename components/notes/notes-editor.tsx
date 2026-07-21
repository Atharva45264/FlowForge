"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotes } from "@/lib/notes";
import { useNotesStore } from "@/store/notes-store";

import { TipTapEditor } from "./editor/tiptap-editor";

export function NotesEditor() {
  const { selectedNoteId } =
    useNotesStore();

  const { data: notes = [] } =
    useQuery({
      queryKey: ["notes"],
      queryFn: getNotes,
    });

  const selectedNote = notes.find(
    (note) => note._id === selectedNoteId
  );

  return (
    <div
      className="
        flex-1
        overflow-hidden
        bg-[#111827]
        px-8
        py-6
        pr-5
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/3
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,.35)]
        "
      >
        {selectedNote ? (
          <TipTapEditor
  key={selectedNote._id}
  note={selectedNote}
/>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">
                No Note Selected
              </h2>

              <p className="mt-3 text-slate-400">
                Create a new note or select one from the sidebar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}