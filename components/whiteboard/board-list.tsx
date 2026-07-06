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

  useEffect(() => {
  if (!selectedBoard && boards.length > 0) {
    setSelectedBoard(boards[0]);
  }
}, [boards, selectedBoard, setSelectedBoard]);

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
    <div className="space-y-3">
      {filteredBoards.map((board) => (
        <BoardCard
          key={board._id}
          board={board}
          active={selectedBoard?._id === board._id}
          onClick={() => {
            setSelectedBoard(board);

            //router.push(
             // `/whiteboard/${board._id}`
           // );
          }}
        />
      ))}
    </div>
  );
}