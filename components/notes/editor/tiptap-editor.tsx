"use client";

import { useEffect, useState } from "react";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import { editorExtensions } from "./extensions";
import { Toolbar } from "./toolbar";

import { useNotesStore } from "@/store/notes-store";
import { useUpdateNote } from "@/hooks/notes/use-update-note";
import { useEditorAutosave } from "./use-editor-autosave";

export function TipTapEditor() {

  const { selectedNote } =
    useNotesStore();

  const updateMutation =
    useUpdateNote();

  const [saving, setSaving] =
    useState(false);

  const editor = useEditor({
    extensions: editorExtensions,

    content:
      "<h1>Welcome to FlowForge</h1>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-full",
      },
    },
  });

  /*
  ------------------------------------
  LOAD NOTE
  ------------------------------------
  */

  useEffect(() => {

    if (!editor) return;

    if (!selectedNote) {

      editor.commands.setContent("");

      return;

    }

    if (
      editor.getHTML() !==
      selectedNote.content
    ) {
      editor.commands.setContent(
        selectedNote.content || ""
      );
    }

  }, [
    selectedNote,
    editor,
  ]);

  /*
  ------------------------------------
  AUTOSAVE
  ------------------------------------
  */

  useEditorAutosave({

    enabled:
      !!selectedNote && !!editor,

    dependencies: [
      editor?.getHTML(),
      selectedNote?._id,
    ],

    callback: async () => {

      if (
        !editor ||
        !selectedNote?._id
      )
        return;

      const html =
        editor.getHTML();

      if (
        html ===
        selectedNote.content
      )
        return;

      setSaving(true);

      try {

        await updateMutation.mutateAsync({

          id: selectedNote._id,

          note: {

            content: html,

            title:
              editor
                .getText()
                .split("\n")[0]
                .slice(0, 50) ||
              "Untitled Note",

          },

        });

      } finally {

        setSaving(false);

      }

    },

  });

  if (!editor) return null;

  return (

    <div className="flex h-full flex-col">

      <Toolbar
        editor={editor}
        saving={saving}
      />

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

          [&_.ProseMirror]:min-h-225
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:text-lg
          [&_.ProseMirror]:leading-8
          [&_.ProseMirror]:caret-violet-500
        "
      />

    </div>

  );

}