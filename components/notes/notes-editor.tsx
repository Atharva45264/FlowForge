"use client";

import { TipTapEditor } from "./editor/tiptap-editor";

export function NotesEditor() {
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
        <TipTapEditor />
      </div>
    </div>
  );
}