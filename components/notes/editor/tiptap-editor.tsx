"use client";

import { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import { editorExtensions } from "./extensions";
import { Toolbar } from "./toolbar";

import { Note } from "@/types/note";
import { useUpdateNote } from "@/hooks/notes/use-update-note";
import { useEditorAutosave } from "./use-editor-autosave";

type Props = {
  note: Note;
};

export function TipTapEditor({
  note,
}: Props) {
  const updateMutation = useUpdateNote();

  const [saving, setSaving] =
    useState(false);

  const editor = useEditor(
    {
      extensions: editorExtensions,

      content: note.content || "",

      immediatelyRender: false,

      editorProps: {
        attributes: {
          class:
            "focus:outline-none h-full",
        },
      },
    },
    // ⭐ THIS IS THE IMPORTANT FIX
    [note._id]
  );

  useEffect(() => {
  if (!editor || editor.isDestroyed) return;

  requestAnimationFrame(() => {
    if (!editor || editor.isDestroyed) return;

    const current = editor.getHTML();

    if (current !== note.content) {
      editor.commands.setContent(note.content || "");
    }
  });
}, [note._id, note.content, editor]);

  useEditorAutosave({
    enabled: !!editor,

    dependencies: [
      note._id,
      editor?.getHTML(),
    ],

    callback: async () => {
      if (!editor) return;

      const html =
        editor.getHTML();

      if (
        html === note.content
      )
        return;

      setSaving(true);

      try {
        await updateMutation.mutateAsync({
          id: note._id!,
          note: {
            content: html,
          },
        });
      } finally {
        setSaving(false);
      }
    },
  });

  if (!editor) return null;

  return (
    <div className="flex h-full w-full flex-col">

      <Toolbar
        editor={editor}
        saving={saving}
      />

      <div className="flex-1 overflow-hidden">

        <EditorContent
          editor={editor}
          className="
            prose
            prose-invert
            max-w-none
            h-full
            overflow-y-auto
            px-10
            py-10
            lg:px-14
            xl:px-20

            [&_.ProseMirror]:min-h-full
            [&_.ProseMirror]:h-full
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:text-lg
            [&_.ProseMirror]:leading-8
          "
        />

      </div>

    </div>
  );
}