"use client";

import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        border-b
        border-white/10
        px-6
        py-4
      "
    >
      <span className="text-sm text-slate-400">
        Toolbar (Coming Next)
      </span>
    </div>
  );
}