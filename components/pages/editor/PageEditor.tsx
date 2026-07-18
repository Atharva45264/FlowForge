"use client";

import { useEffect, useRef, useState } from "react";
import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { Loader2 } from "lucide-react";

import EditorToolbar from "./EditorToolbar";
import EditorHeader from "./EditorHeader";

import {
  usePage,
  useUpdatePage,
} from "@/hooks/usePages";

interface Props {
  pageId: string;
}

export default function PageEditor({
  pageId,
}: Props) {
  const { data: page, isLoading } = usePage(pageId);

  const updatePage = useUpdatePage();

  const [saving, setSaving] = useState(false);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    immediatelyRender: false,

    content: "",

    extensions: [
      StarterKit,

      Underline,

      Highlight,

      Placeholder.configure({
        placeholder:
          "Start writing something amazing...",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      TaskList,

      TaskItem.configure({
        nested: true,
      }),
    ],

    onUpdate({ editor }) {
      if (!page) return;

      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      saveTimeout.current = setTimeout(() => {
        const html = editor.getHTML();

        if (html === page.content) return;

        setSaving(true);

        updatePage.mutate(
          {
            id: pageId,
            data: {
              content: html,
            },
          },
          {
            onSettled() {
              setSaving(false);
            },
          }
        );
      }, 1200);
    },
  });

  useEffect(() => {
    if (!editor || !page) return;

    editor.commands.setContent(page.content || "");
  }, [editor, page]);

  if (isLoading || !editor) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-muted/20">

      {/* Header */}

      {page && (
        <div className="border-b bg-background">
          <EditorHeader
            page={page}
            saving={saving}
          />
        </div>
      )}

      {/* Sticky Toolbar */}

      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <EditorToolbar editor={editor} />
      </div>

      {/* Editor */}

      <div className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-6xl px-8 py-10">

          <div className="rounded-3xl border bg-background shadow-sm">

            <div className="min-h-[calc(100vh-260px)] px-14 py-12">

              <EditorContent
                editor={editor}
                className="
                  prose
                  prose-neutral
                  dark:prose-invert
                  max-w-none
                  focus:outline-none
                "
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}