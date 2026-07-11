"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Save, X } from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { useArchitectProject } from "@/hooks/use-architect-project";

import { useArchitectStore } from "@/store/architect-store";

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;
}

export function SaveDialog({
  open,
  onOpenChange,
}: Props) {
  const [title, setTitle] =
    useState("");

  const {
    createProject,
    updateProject,
  } = useArchitectProject();

  const {
    currentProjectId,
    prompt,
    mermaid,
    setCurrentProject,
  } = useArchitectStore();

  useEffect(() => {
    if (open && !title) {
      setTitle(
        "Untitled Architecture"
      );
    }
  }, [open]);

  async function handleSave() {
    if (
      !title.trim()
    )
      return;

    if (
      currentProjectId
    ) {
      await updateProject({
        id: currentProjectId,

        data: {
          title,

          prompt,

          mermaid,
        },
      });
    } else {
      const project =
        await createProject({
          title,

          prompt,

          mermaid,
        });

      setCurrentProject(
        project._id
      );
    }

    onOpenChange(false);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            z-50
          "
        />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-105
            -translate-x-1/2
            -translate-y-1/2
            rounded-2xl
            border
            border-slate-700
            bg-[#111827]
            p-6
            shadow-2xl
          "
        >
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              Save Project
            </Dialog.Title>

            <Dialog.Close>
              <X
                size={18}
                className="text-slate-400"
              />
            </Dialog.Close>
          </div>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Project Name"
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
              outline-none
              focus:border-violet-500
            "
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() =>
                onOpenChange(
                  false
                )
              }
              className="
                rounded-xl
                border
                border-slate-700
                px-5
                py-2.5
                hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              onClick={
                handleSave
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-violet-600
                px-5
                py-2.5
                hover:bg-violet-500
              "
            >
              <Save size={18} />

              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}