"use client";

import { useEffect, useRef, useState } from "react";
import {
  Edit3,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";

import { useArchitectProject } from "@/hooks/use-architect-project";
import { ArchitectProject } from "@/types/architect";

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
  } =
    useArchitectProject();

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
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-lg p-1.5 hover:bg-slate-800"
      >
        <MoreHorizontal
          size={16}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-10
            z-50
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
            icon={
              <Edit3 size={16} />
            }
            label="Rename"
            onClick={rename}
          />

          <MenuItem
            icon={
              <Star size={16} />
            }
            label={
              project.favorite
                ? "Remove Favorite"
                : "Add Favorite"
            }
            onClick={favorite}
          />

          <div className="my-2 border-t border-slate-700" />

          <MenuItem
            danger
            icon={
              <Trash2 size={16} />
            }
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
        h-10
        w-full
        items-center
        gap-3
        rounded-lg
        px-3
        text-sm
        transition-colors

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