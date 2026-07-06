"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useWhiteboard } from "@/hooks/use-whiteboard";

export function NewBoardButton() {
  const router = useRouter();

  const {
    createBoard,
    setSelectedBoard,
  } = useWhiteboard();

  async function handleCreate() {
  try {
    const board = await createBoard();

    console.log("===========");
    console.log(board);
    console.log("ID:", board?._id);
    console.log("===========");

    if (!board?._id) {
      alert("Board ID is undefined");
      return;
    }

    router.push(`/whiteboard/${board._id}`);
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
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-linear-to-r
        from-violet-600
        to-purple-600
        px-4
        py-3
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
        size={18}
        className="transition-transform duration-200 group-hover:rotate-90"
      />

      <span>New Whiteboard</span>
    </button>
  );
}