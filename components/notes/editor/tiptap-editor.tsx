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
    prose
    prose-invert
    prose-headings:text-white
    prose-p:text-slate-300
    prose-strong:text-white
    prose-code:text-violet-300
    prose-blockquote:border-violet-500
    max-w-none
    flex-1
    overflow-y-auto
    px-12
    py-10
    focus:outline-none

    [&_.ProseMirror]:min-h-200
    [&_.ProseMirror]:outline-none
    [&_.ProseMirror]:text-lg
    [&_.ProseMirror]:leading-8
    [&_.ProseMirror]:caret-violet-500
  "
/>

    </div>
  );
}