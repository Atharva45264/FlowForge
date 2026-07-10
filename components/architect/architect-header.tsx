"use client";

import {
  Sparkles,
  Cpu,
  History,
} from "lucide-react";

export function ArchitectHeader() {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-800
        bg-[#111827]
        px-6
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-violet-600/20
            text-violet-400
          "
        >
          <Sparkles size={22} />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">
            FlowForge Architect
          </h1>

          <p className="text-xs text-slate-400">
            AI Powered Architecture & Diagram Studio
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            hover:bg-slate-800
          "
        >
          <Cpu size={16} />
          Gemini 2.5 Flash
        </button>

        <button
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-2.5
            hover:bg-slate-800
          "
        >
          <History size={18} />
        </button>
      </div>
    </header>
  );
}