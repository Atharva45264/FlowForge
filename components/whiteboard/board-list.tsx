"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { BoardCard } from "./board-card";
import { useWhiteboard } from "@/hooks/use-whiteboard";

export function BoardList() {
  const router = useRouter();

  const {
    boards,
    loading,
    search,
    selectedBoard,
    setSelectedBoard,
  } = useWhiteboard();

  const filteredBoards = useMemo(() => {
    if (!search.trim()) return boards;

    return boards.filter((board) =>
      board.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [boards, search]);

  const favoriteBoards = useMemo(
    () =>
      filteredBoards.filter(
        (board) => board.favorite
      ),
    [filteredBoards]
  );

  const recentBoards = useMemo(
    () =>
      filteredBoards.filter(
        (board) => !board.favorite
      ),
    [filteredBoards]
  );

  useEffect(() => {
    if (!selectedBoard && boards.length > 0) {
      setSelectedBoard(boards[0]);
    }
  }, [
    boards,
    selectedBoard,
    setSelectedBoard,
  ]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="
              h-28
              animate-pulse
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
            "
          />
        ))}
      </div>
    );
  }

  if (!filteredBoards.length) {
    return (
      <div
        className="
          flex
          h-52
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-slate-800
          bg-slate-900/40
          px-6
          text-center
        "
      >
        <div>
          <p className="text-sm font-medium text-slate-300">
            No whiteboards found
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Create a new whiteboard to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {/* Favorites */}
      {favoriteBoards.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-yellow-500/30" />

            <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
              ⭐ Favorites
            </span>

            <div className="h-px flex-1 bg-yellow-500/30" />
          </div>

          <div className="space-y-3">
            {favoriteBoards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                active={
                  selectedBoard?._id === board._id
                }
                onClick={() => {
                  setSelectedBoard(board);

                  router.push(
                    `/whiteboard/${board._id}`
                  );
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Recent */}
      {recentBoards.length > 0 && (
        <>
          <div className="mt-5 flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-700" />

            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Recent
            </span>

            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <div className="space-y-3">
            {recentBoards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                active={
                  selectedBoard?._id === board._id
                }
                onClick={() => {
                  setSelectedBoard(board);

                  router.push(
                    `/whiteboard/${board._id}`
                  );
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}