"use client";

import { Plus } from "lucide-react";
import { useWhiteboard } from "@/hooks/use-whiteboard";

export function NewBoardButton() {
  const {
    createBoard,
    setSelectedBoard,
  } = useWhiteboard();

  async function handleCreate() {
    try {
      const board = await createBoard();

      setSelectedBoard(board);

      // We'll navigate to /whiteboard/[id]
      // once dynamic routing is added.
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleCreate}
      className="
        group
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-linear-to-r
        from-violet-600
        to-indigo-600
        font-medium
        text-white
        transition-all
        duration-200
        hover:scale-[1.02]
        hover:shadow-lg
        hover:shadow-violet-500/25
        active:scale-[0.98]
      "
    >
      <Plus
        className="
          h-5
          w-5
          transition-transform
          duration-200
          group-hover:rotate-90
        "
      />

      <span>New Whiteboard</span>
    </button>
  );
}