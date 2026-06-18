import { create } from "zustand"

import { boards as initialBoards } from "@/components/kanban/sample-data"
import {
  KanbanBoard,
  KanbanTask,
  TaskComment,
} from "@/components/kanban/kanban-types"

type KanbanStore = {
  // State
  boards: KanbanBoard[]
  activeBoardId: string

  // State Actions
  setActiveBoardId: (
    id: string
  ) => void

  // Board Actions
  createBoard: (
    name: string,
    color: string
  ) => void

  renameBoard: (
    boardId: string,
    newName: string
  ) => void

  deleteBoard: (
    boardId: string
  ) => void

  // Column Actions
  createColumn: (
    boardId: string,
    name: string
  ) => void

  renameColumn: (
    boardId: string,
    columnId: string,
    newName: string
  ) => void

  deleteColumn: (
    boardId: string,
    columnId: string
  ) => void

  // Task Actions
  createTask: (
    boardId: string,
    task: Omit<KanbanTask, "id">
  ) => void

  updateTask: (
    taskId: string,
    updates: Partial<KanbanTask>
  ) => void

  deleteTask: (
    taskId: string
  ) => void

  moveTask: (
    taskId: string,
    targetColumnId: string
  ) => void

  addComment: (
  taskId: string,
  comment: Omit<TaskComment, "id">
) => void

deleteComment: (
  taskId: string,
  commentId: string
) => void
}

export const useKanbanStore =
  create<KanbanStore>((set) => ({
    boards: initialBoards,

    activeBoardId:
      initialBoards[0]?.id ?? "",

    setActiveBoardId: (id) =>
      set({
        activeBoardId: id,
      }),
  createBoard: (
  name,
  color
) =>
  set((state) => {
    const newBoardId =
      crypto.randomUUID()

    return {
      boards: [
        ...state.boards,
        {
          id: newBoardId,
          name,
          color,

          columns: [
            {
              id: "todo",
              name: "Todo",
            },
            {
              id: "in-progress",
              name: "In Progress",
            },
            {
              id: "done",
              name: "Done",
            },
          ],

          tasks: [],
        },
      ],

      activeBoardId:
        newBoardId,
    }
  }),

renameBoard: (
  boardId,
  newName
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) =>
        board.id === boardId
          ? {
              ...board,
              name: newName,
            }
          : board
    ),
  })),

deleteBoard: (
  boardId
) =>
  set((state) => {
    const boards =
      state.boards.filter(
        (board) =>
          board.id !== boardId
      )

    return {
      boards,

      activeBoardId:
        state.activeBoardId ===
          boardId &&
        boards.length > 0
          ? boards[0].id
          : state.activeBoardId,
    }
  }),
  createColumn: (
  boardId,
  name
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [
                ...board.columns,
                {
                  id: crypto.randomUUID(),
                  name,
                },
              ],
            }
          : board
    ),
  })),

renameColumn: (
  boardId,
  columnId,
  newName
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) =>
        board.id === boardId
          ? {
              ...board,
              columns:
                board.columns.map(
                  (column) =>
                    column.id ===
                    columnId
                      ? {
                          ...column,
                          name: newName,
                        }
                      : column
                ),
            }
          : board
    ),
  })),

deleteColumn: (
  boardId,
  columnId
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => {
        if (
          board.id !== boardId
        ) {
          return board
        }

        const fallbackColumn =
          board.columns.find(
            (column) =>
              column.id ===
              "todo"
          ) ??
          board.columns[0]

        return {
          ...board,

          columns:
            board.columns.filter(
              (column) =>
                column.id !==
                columnId
            ),

          tasks: board.tasks.map(
            (task) =>
              task.columnId ===
              columnId
                ? {
                    ...task,
                    columnId:
                      fallbackColumn.id,
                  }
                : task
          ),
        }
      }
    ),
  })),
  createTask: (
  boardId,
  task
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: crypto.randomUUID(),
                  ...task,
                },
              ],
            }
          : board
    ),
  })),

updateTask: (
  taskId,
  updates
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => ({
        ...board,
        tasks: board.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...updates,
                }
              : task
        ),
      })
    ),
  })),

deleteTask: (
  taskId
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => ({
        ...board,
        tasks: board.tasks.filter(
          (task) =>
            task.id !== taskId
        ),
      })
    ),
  })),
  moveTask: (
  taskId,
  targetColumnId
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => ({
        ...board,

        tasks: board.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,
                  columnId:
                    targetColumnId,
                }
              : task
        ),
      })
    ),
  })),
  addComment: (
  taskId,
  comment
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => ({
        ...board,

        tasks: board.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,

                  comments: [
                    ...(task.comments ??
                      []),

                    {
                      id:
                        crypto.randomUUID(),
                      ...comment,
                    },
                  ],
                }
              : task
        ),
      })
    ),
  })),
  deleteComment: (
  taskId,
  commentId
) =>
  set((state) => ({
    boards: state.boards.map(
      (board) => ({
        ...board,

        tasks: board.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,

                  comments:
                    (
                      task.comments ??
                      []
                    ).filter(
                      (comment) =>
                        comment.id !==
                        commentId
                    ),
                }
              : task
        ),
      })
    ),
  })),
  }))