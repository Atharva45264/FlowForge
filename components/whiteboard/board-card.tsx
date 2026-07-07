"use client";

import { motion } from "framer-motion";
import { FileText, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Whiteboard } from "@/types/whiteboard";
import { cn } from "@/lib/utils";
import { BoardMenu } from "./board-menu";

interface BoardCardProps {
  board: Whiteboard;
  active?: boolean;
  onClick: () => void;
}

export function BoardCard({
  board,
  active = false,
  onClick,
}: BoardCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
  "group relative z-0 cursor-pointer rounded-2xl border p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50",
  active
    ? "z-20 border-violet-500 bg-violet-500/15 shadow-lg shadow-violet-500/10"
    : "border-slate-800 bg-slate-900/70 hover:z-20 hover:border-slate-700 hover:bg-slate-900"
)}
    >
      {/* Active Indicator */}
      {active && (
        <div className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-violet-500" />
      )}

      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
            active
              ? "bg-violet-500/20"
              : "bg-slate-800"
          )}
        >
          <FileText
            className={cn(
              "h-5 w-5",
              active
                ? "text-violet-400"
                : "text-slate-400"
            )}
          />
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2"
        >
          {board.favorite && (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          )}

          <BoardMenu board={board} />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 line-clamp-1 font-semibold text-white">
        {board.title}
      </h3>

      {/* Updated */}
      <p className="mt-1 text-xs text-slate-400">
        Edited{" "}
        {formatDistanceToNow(
          new Date(board.updatedAt),
          {
            addSuffix: true,
          }
        )}
      </p>
    </motion.div>
  );
}