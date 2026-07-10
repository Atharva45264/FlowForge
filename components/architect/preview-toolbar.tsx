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

export function PreviewToolbar() {
  const mermaid =
    useArchitectStore(
      (state) => state.mermaid
    );

  return (
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
  );
}