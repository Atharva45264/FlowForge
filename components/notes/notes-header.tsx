"use client";

import {
  CheckCircle2,
  Share2,
  Star,
  Trash2,
} from "lucide-react";

export function NotesHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-[#111827]
        px-8
        py-5
      "
    >
      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-white">
          Project Roadmap
        </h1>

        <div className="mt-2 flex items-center gap-2">

          <CheckCircle2
            size={16}
            className="text-emerald-400"
          />

          <p className="text-sm text-slate-400">
            Auto Saved
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-2.5
            transition
            hover:border-yellow-400
          "
        >
          <Star size={18} />
        </button>

        <button
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-2.5
            transition
            hover:border-indigo-400
          "
        >
          <Share2 size={18} />
        </button>

        <button
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-2.5
            transition
            hover:border-red-500
          "
        >
          <Trash2 size={18} />
        </button>

      </div>

    </header>
  );
}