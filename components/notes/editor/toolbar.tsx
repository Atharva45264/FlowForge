"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Code2,
} from "lucide-react";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        transition-all
        duration-200

        ${
          active
            ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div
      className="
        sticky
        top-0
        z-20
        flex
        items-center
        gap-2
        border-b
        border-white/10
        bg-[#111827]/90
        px-6
        py-4
        backdrop-blur-xl
      "
    >
      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        active={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={18} />
      </ToolbarButton>

      <div className="mx-2 h-6 w-px bg-slate-700" />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        active={editor.isActive("bold")}
      >
        <Bold size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        active={editor.isActive("italic")}
      >
        <Italic size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleUnderline().run()
        }
        active={editor.isActive("underline")}
      >
        <UnderlineIcon size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHighlight().run()
        }
        active={editor.isActive("highlight")}
      >
        <Highlighter size={18} />
      </ToolbarButton>

      <div className="mx-2 h-6 w-px bg-slate-700" />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        active={editor.isActive("bulletList")}
      >
        <List size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        active={editor.isActive("blockquote")}
      >
        <Quote size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
        active={editor.isActive("codeBlock")}
      >
        <Code2 size={18} />
      </ToolbarButton>

      <div className="mx-2 h-6 w-px bg-slate-700" />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().undo().run()
        }
      >
        <Undo2 size={18} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().redo().run()
        }
      >
        <Redo2 size={18} />
      </ToolbarButton>
    </div>
  );
}