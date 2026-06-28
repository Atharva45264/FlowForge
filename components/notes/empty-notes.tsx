"use client";

import {
  FilePenLine,
  Plus,
  Sparkles,
} from "lucide-react";

export function EmptyNotes() {
  return (
    <div className="flex h-full flex-col">

      {/* Fake Document Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-8
          py-5
        "
      >
        <div>

          <h2 className="text-xl font-semibold text-white">
            Untitled Note
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Ready to write...
          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-3
            py-1
            text-xs
            text-emerald-300
          "
        >
          <Sparkles size={14} />

          AI Ready

        </div>

      </div>

      {/* Center */}

      <div className="flex flex-1 items-center justify-center">

        <div className="max-w-md text-center">

          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-3xl
              bg-linear-to-br
              from-violet-500/20
              to-cyan-500/20
              text-violet-300
            "
          >
            <FilePenLine size={44} />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-white">
            Start Writing
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            Capture meeting notes,
            brainstorm ideas,
            write documentation
            or let AI help you create
            content instantly.
          </p>

          <button
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-500
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:scale-105
              hover:bg-indigo-600
            "
          >
            <Plus size={18} />

            Create Note

          </button>

        </div>

      </div>

    </div>
  );
}