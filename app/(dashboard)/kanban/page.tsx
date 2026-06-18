"use client";

import { useMemo } from "react";
import { KanbanSidebar } from "@/components/kanban/kanban-sidebar";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { useKanbanStore } from "@/store/kanban-store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useCalendarStore } from "@/store/calendar-store";
import { RoomProvider } from "@liveblocks/react";
import { Settings } from "lucide-react";
import { CollaborationDialog }
from "@/components/kanban/collaboration-dialog";
import {
  LiveCollaborators,
} from "@/components/kanban/live-collaborators";


export default function KanbanPage() {
  const boards = useKanbanStore((state) => state.boards);

  const activeBoardId = useKanbanStore((state) => state.activeBoardId);

  const setActiveBoardId = useKanbanStore((state) => state.setActiveBoardId);

  const createTask = useKanbanStore((state) => state.createTask);

  const updateTask = useKanbanStore((state) => state.updateTask);

  const deleteTask = useKanbanStore((state) => state.deleteTask);

  const createColumn = useKanbanStore((state) => state.createColumn);

  const renameColumn = useKanbanStore((state) => state.renameColumn);

  const deleteColumn = useKanbanStore((state) => state.deleteColumn);

  const createBoard = useKanbanStore((state) => state.createBoard);

  const renameBoard = useKanbanStore((state) => state.renameBoard);

  const deleteBoard = useKanbanStore((state) => state.deleteBoard);

  const moveTask = useKanbanStore((state) => state.moveTask);

  const createScheduledTask = useCalendarStore(
    (state) => state.createScheduledTask,
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    moveTask(String(active.id), String(over.id));
  };

  const activeBoard = useMemo(
    () => boards.find((board) => board.id === activeBoardId),
    [boards, activeBoardId],
  );

  const roomId = `kanban:board:${activeBoardId}`;

  return (
    <RoomProvider id={roomId}>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          <KanbanSidebar
            boards={boards}
            activeBoardId={activeBoardId}
            onSelectBoard={setActiveBoardId}
            onCreateBoard={createBoard}
            onRenameBoard={renameBoard}
            onDeleteBoard={deleteBoard}
          />

          <div className="flex-1 rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white">
                {activeBoard?.name}
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Kanban board workspace
              </p>

              <div className="mt-2">
              </div>
              <LiveCollaborators />
              <CollaborationDialog />
            </div>

            {activeBoard && (
              <KanbanBoard
                board={activeBoard}
                onCreateTask={(boardId, task) => {
                  createTask(boardId, task);

                  if (task.syncCalendar && task.dueDate) {
                    createScheduledTask(task.title, task.dueDate, "work");
                  }
                }}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onCreateColumn={(name) => createColumn(activeBoardId, name)}
                onRenameColumn={(columnId, newName) =>
                  renameColumn(activeBoardId, columnId, newName)
                }
                onDeleteColumn={(columnId) =>
                  deleteColumn(activeBoardId, columnId)
                }
              />
            )}
          </div>
        </div>
      </DndContext>
    </RoomProvider>
  );
}
