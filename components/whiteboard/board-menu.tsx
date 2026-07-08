"use client";

import { useEffect, useRef, useState } from "react";
import {
  Archive,
  Edit3,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";

import { useWhiteboard } from "@/hooks/use-whiteboard";
import { Whiteboard } from "@/types/whiteboard";


interface BoardMenuProps {
  board: Whiteboard;
}

export function BoardMenu({
  board,
}: BoardMenuProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const {
    renameBoard,
    deleteBoard,
    toggleFavorite,
    archiveBoard,
  } = useWhiteboard();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  async function handleRename() {
    const title = prompt(
      "Rename Whiteboard",
      board.title
    );

    if (!title) return;

    await renameBoard({
      id: board._id,
      title,
    });

    setOpen(false);
  }

  async function handleDelete() {
    const confirmed = confirm(
      `Delete "${board.title}"?`
    );

    if (!confirmed) return;

    await deleteBoard(board._id);

    setOpen(false);
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-lg p-1.5 hover:bg-slate-800"
      >
        <MoreHorizontal
          className="h-4 w-4 text-slate-400"
        />
      </button>

      {open && (
        <div
  className="
    absolute
    right-0
    top-10
    z-9999
    w-52
    rounded-xl
    border
    border-slate-700
    bg-[#111827]
    p-2
    shadow-2xl
  "
>
          <MenuItem
            icon={<Edit3 size={16} />}
            label="Rename"
            onClick={handleRename}
          />

          <MenuItem
  icon={<Star size={16} />}
  label={
    board.favorite
      ? "Remove Favorite"
      : "Add to Favorites"
  }
  onClick={async () => {
    await toggleFavorite({
      id: board._id,
      favorite: !board.favorite,
    });

    setOpen(false);
  }}
/>

          <MenuItem
  icon={<Archive size={16} />}
  label={
    board.archived
      ? "Restore"
      : "Archive"
  }
  onClick={async () => {
    await archiveBoard({
      id: board._id,
      archived: !board.archived,
    });

    setOpen(false);
  }}
/>

          <div className="my-2 border-t border-slate-700" />

          <MenuItem
            danger
            icon={<Trash2 size={16} />}
            label="Delete"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}

function MenuItem({
  icon,
  label,
  danger,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-lg
        px-3
        py-2
        text-sm
        transition

        ${
          danger
            ? "text-red-400 hover:bg-red-500/10"
            : "text-slate-300 hover:bg-slate-800"
        }
      `}
    >
      {icon}

      {label}
    </button>
  );
}