"use client";

import type { Editor } from "@tiptap/react";
import { Sparkles } from "lucide-react";
import { ListTodo } from "lucide-react";

import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({
  editor,
}: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur">

      <Button
        size="icon"
        variant={editor.isActive("bold") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={editor.isActive("italic") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={editor.isActive("underline") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={editor.isActive("highlight") ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="h-4 w-4" />
      </Button>

      <div className="mx-2 h-6 w-px bg-border" />

      <Button
        size="icon"
        variant={
          editor.isActive("heading", { level: 1 })
            ? "default"
            : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={
          editor.isActive("heading", { level: 2 })
            ? "default"
            : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <div className="mx-2 h-6 w-px bg-border" />

      <Button
        size="icon"
        variant={editor.isActive("bulletList") ? "default" : "ghost"}
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
  size="icon"
  variant={editor.isActive("taskList") ? "default" : "ghost"}
  onClick={() =>
    editor.chain().focus().toggleTaskList().run()
  }
>
  <ListTodo className="h-4 w-4" />
</Button>

      <Button
        size="icon"
        variant={editor.isActive("orderedList") ? "default" : "ghost"}
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={editor.isActive("blockquote") ? "default" : "ghost"}
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={editor.isActive("codeBlock") ? "default" : "ghost"}
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
      >
        <Code2 className="h-4 w-4" />
      </Button>

      <div className="ml-auto flex items-center gap-2">

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <Button
  variant="outline"
  size="sm"
  className="ml-auto"
>
  <Sparkles className="mr-2 h-4 w-4" />
  AI
</Button>

      </div>

    </div>
  );
}