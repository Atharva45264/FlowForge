"use client";

import { useNotesStore } from "@/store/notes-store";
import { TipTapEditor } from "./editor/tiptap-editor";

export function NotesEditor() {
  const { selectedNote } = useNotesStore();

  return (
    <div
      className="
        flex-1
        overflow-hidden
        bg-[#111827]
        p-8
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          max-w-5xl
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
          <TipTapEditor/>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                No Note Selected
              </h2>

              <p className="mt-2 text-slate-400">
                Create a new note or select one from the sidebar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}