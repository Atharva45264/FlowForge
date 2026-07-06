"use client";

import { Plus, Search } from "lucide-react";

export function WhiteboardSidebar() {
  return (
    <aside
      className="
        flex
        w-72
        flex-col
        border-r
        border-slate-800
        bg-slate-950
      "
    >
      <div className="border-b border-slate-800 p-6">

        <h2 className="text-2xl font-bold text-white">
          Whiteboards
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Infinite workspace
        </p>

      </div>

      <div className="p-4">

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            py-3
            font-medium
            text-white
          "
        >
          <Plus size={18} />

          New Whiteboard

        </button>

      </div>

      <div className="px-4">

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-3
            py-2
          "
        >
          <Search size={16} />

          <input
            placeholder="Search..."
            className="
              w-full
              bg-transparent
              outline-none
              text-sm
            "
          />

        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        <div className="rounded-xl border border-violet-500 bg-violet-500/20 p-3">

          Project Brainstorm

        </div>

      </div>

    </aside>
  );
}