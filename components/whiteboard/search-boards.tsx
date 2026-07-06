"use client";

import { Search, X } from "lucide-react";
import { useWhiteboard } from "@/hooks/use-whiteboard";

export function SearchBoards() {
  const {
    search,
    setSearch,
  } = useWhiteboard();

  return (
    <div className="relative">
      <Search
        className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-500
        "
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search whiteboards..."
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-800
          bg-slate-900/80
          pl-10
          pr-10
          text-sm
          text-white
          outline-none
          transition
          placeholder:text-slate-500
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/20
        "
      />

      {search.length > 0 && (
        <button
          onClick={() => setSearch("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-slate-500
            transition
            hover:bg-slate-800
            hover:text-white
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}