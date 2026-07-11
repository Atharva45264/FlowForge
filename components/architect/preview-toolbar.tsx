"use client";

import {
  Copy,
  Download,
  Image,
  Save,
} from "lucide-react";

import {
  copyMermaid,
  downloadPNG,
  downloadSVG,
} from "@/lib/architect/export";

import { useArchitectStore } from "@/store/architect-store";

import { SaveDialog } from "./save-dialog";

import { useState } from "react";

export function PreviewToolbar() {
  const mermaid =
    useArchitectStore(
      (state) => state.mermaid
    );

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <button
          onClick={() =>
            copyMermaid(
              mermaid
            )
          }
          className="
            rounded-lg
            border
            border-slate-700
            p-2
            hover:bg-slate-800
          "
        >
          <Copy size={18} />
        </button>

        <button
          onClick={downloadSVG}
          className="
            rounded-lg
            border
            border-slate-700
            p-2
            hover:bg-slate-800
          "
        >
          <Download size={18} />
        </button>

        <button
          onClick={downloadPNG}
          className="
            rounded-lg
            border
            border-slate-700
            p-2
            hover:bg-slate-800
          "
        >
          <Image size={18} />
        </button>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
            rounded-lg
            border
            border-slate-700
            p-2
            hover:bg-slate-800
          "
        >
          <Save size={18} />
        </button>
      </div>

      <SaveDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}