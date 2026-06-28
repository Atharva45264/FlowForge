"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import { Toolbar } from "./toolbar";

export function TipTapEditor() {
  const editor = useEditor({
    extensions: editorExtensions,
    content: `
      <h1>Welcome to FlowForge</h1>
      <p>
        Start writing here...
      </p>
    `,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="flex h-full flex-col">

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="
          flex-1
          overflow-y-auto
          px-10
          py-8
          prose
          prose-invert
          max-w-none
          focus:outline-none
        "
      />

    </div>
  );
}