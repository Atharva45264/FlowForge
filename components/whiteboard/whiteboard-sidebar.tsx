"use client";

import { LayoutGrid } from "lucide-react";

import { NewBoardButton } from "./new-board-button";
import { SearchBoards } from "./search-boards";
import { BoardList } from "./board-list";

export function WhiteboardSidebar() {
  return (
    <aside
      className="
        flex
        h-full
        w-80
        shrink-0
        flex-col
        border-r
        border-slate-800
        bg-[#020817]
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-violet-600/20
            "
          >
            <LayoutGrid className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Whiteboards
            </h2>

            <p className="text-sm text-slate-400">
              Infinite collaborative workspace
            </p>
          </div>
        </div>
      </div>

      {/* Create */}

      <div className="px-5 pt-5">
        <NewBoardButton />
      </div>

      {/* Search */}

      <div className="px-5 pt-5">
        <SearchBoards />
      </div>

      {/* Divider */}

      <div className="my-5 border-t border-slate-800" />

      {/* Section */}

      <div className="px-5 pb-3">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-slate-500
          "
        >
          Recent Boards
        </p>
      </div>

      {/* List */}

      <div
        className="
          flex-1
          relative
          overflow-y-auto
          px-5
          pb-5
        "
      >
        <BoardList />
      </div>
    </aside>
  );
}