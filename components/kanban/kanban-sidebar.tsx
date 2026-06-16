"use client";

import { CreateBoardDialog } from "./create-board-dialog";
import { KanbanBoard } from "./kanban-types";
import { BoardActions } from "./board-actions";

type KanbanSidebarProps = {
  boards: KanbanBoard[];
  activeBoardId: string;

  onSelectBoard: (id: string) => void;

  onCreateBoard: (name: string, color: string) => void;

  onRenameBoard: (boardId: string, newName: string) => void;

  onDeleteBoard: (boardId: string) => void;
};

export function KanbanSidebar({
  boards,
  activeBoardId,
  onSelectBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
}: KanbanSidebarProps) {
  return (
    <div className="w-72 rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Boards</h2>

        <CreateBoardDialog onCreateBoard={onCreateBoard} />
      </div>

      <div className="space-y-2">
        {boards.map((board) => (
          <div
  key={board.id}
  className={`rounded-lg p-3 transition ${
    activeBoardId === board.id
      ? "border border-indigo-500/20 bg-indigo-500/20"
      : "hover:bg-slate-800"
  }`}
>
  <button
  type="button"
  onClick={() => onSelectBoard(board.id)}
  className="flex w-full items-center gap-3 text-left"
>
  <div
    className="h-3 w-3 rounded-full"
    style={{
      backgroundColor: board.color,
    }}
  />

  <span className="text-sm text-white">
    {board.name}
  </span>
</button>

              <div className="mt-2">
                <BoardActions
                  boardName={board.name}
                  onRename={(newName) => onRenameBoard(board.id, newName)}
                  onDelete={() => onDeleteBoard(board.id)}
                />
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
