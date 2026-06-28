"use client";

import {
  FileText,
  Plus,
  Search,
  Star,
} from "lucide-react";

const notes = [
  {
    id: 1,
    title: "Project Roadmap",
    active: true,
  },
  {
    id: 2,
    title: "Meeting Notes",
    active: false,
  },
  {
    id: 3,
    title: "AI Ideas",
    active: false,
  },
];

export function NotesSidebar() {
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
      {/* Header */}

      <div className="border-b border-slate-800 p-6">

        <h2 className="text-2xl font-bold text-white">
          Notes
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Organize your ideas
        </p>

      </div>

      {/* Search */}

      <div className="p-4">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-3
            py-2
          "
        >
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            placeholder="Search notes..."
            className="
              w-full
              bg-transparent
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
            "
          />

        </div>

      </div>

      {/* Favorites */}

      <div className="px-5">

        <div className="mb-3 flex items-center gap-2">

          <Star
            size={16}
            className="text-yellow-400"
          />

          <p className="text-sm font-medium text-slate-400">
            Favorites
          </p>

        </div>

      </div>

      {/* Notes List */}

      <div className="flex-1 space-y-2 overflow-y-auto px-3">

        {notes.map((note) => (
          <button
            key={note.id}
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              transition

              ${
                note.active
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }
            `}
          >
            <FileText size={18} />

            <span className="text-sm font-medium">
              {note.title}
            </span>

          </button>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-500
            py-3
            font-medium
            text-white
            transition
            hover:bg-indigo-600
          "
        >
          <Plus size={18} />

          New Note

        </button>

      </div>

    </aside>
  );
}