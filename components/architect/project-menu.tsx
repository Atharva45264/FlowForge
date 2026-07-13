"use client";

import { useState, useRef, useEffect } from "react";

import {
  Edit3,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";

import { ArchitectProject } from "@/types/architect";
import { useArchitectProject } from "@/hooks/use-architect-project";

interface Props {
  project: ArchitectProject;
}

export function ProjectMenu({
  project,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const {
    updateProject,
    deleteProject,
  } = useArchitectProject();

  useEffect(() => {
    function handleClick(
      e: MouseEvent
    ) {
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

  async function rename() {
    const title = prompt(
      "Rename Project",
      project.title
    );

    if (!title) return;

    await updateProject({
      id: project._id,
      data: {
        title,
      },
    });

    setOpen(false);
  }

  async function favorite() {
    await updateProject({
      id: project._id,
      data: {
        favorite:
          !project.favorite,
      },
    });

    setOpen(false);
  }

  async function remove() {
    if (
      !confirm(
        `Delete "${project.title}"?`
      )
    )
      return;

    await deleteProject(
      project._id
    );

    setOpen(false);
  }

  return (
    <div
      ref={menuRef}
      className="relative"
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-lg p-1.5 hover:bg-slate-800"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-10
          z-50
          w-48
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-2
        "
        >
          <MenuItem
            icon={<Edit3 size={16} />}
            label="Rename"
            onClick={rename}
          />

          <MenuItem
            icon={<Star size={16} />}
            label={
              project.favorite
                ? "Remove Favorite"
                : "Favorite"
            }
            onClick={
              favorite
            }
          />

          <div className="my-2 border-t border-slate-700" />

          <MenuItem
            danger
            icon={<Trash2 size={16} />}
            label="Delete"
            onClick={remove}
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