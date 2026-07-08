"use client";

import {
  Download,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";

import { useWhiteboard } from "@/hooks/use-whiteboard";
import { ExportMenu } from "./export-menu";
import { useWhiteboardStore } from "@/store/whiteboard-store";

export function WhiteboardTopbar() {
  const {
  selectedBoard,
} = useWhiteboard();

const saving = useWhiteboardStore(
  (state) => state.saving
);

  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-[#111827]
        px-6
        py-4
      "
    >
      <div>
        <h1 className="text-2xl font-bold text-white">
          {selectedBoard?.title ?? "Untitled Whiteboard"}
        </h1>

        <p className="text-sm text-slate-400">
          {saving ? "Saving..." : "Saved"}
        </p>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800">
          <Star size={18} />
        </button>

        <button className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800">
          <Sparkles size={18} />
        </button>

        <button className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800">
          <Share2 size={18} />
        </button>

        <ExportMenu />
      </div>
    </header>
  );
}