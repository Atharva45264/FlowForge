import { KanbanColumn } from "./kanban-column"
import { KanbanBoard as BoardType } from "./kanban-types"

type KanbanBoardProps = {
  board: BoardType

  onCreateTask: (
    boardId: string,
    task: {
      title: string
      description?: string
      priority: "low" | "medium" | "high"
      labels: any[]
      columnId: string
    }
  ) => void

  onUpdateTask: (
    taskId: string,
    updates: Record<string, any>
  ) => void

  onDeleteTask: (
    taskId: string
  ) => void
}

export function KanbanBoard({
  board,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {board.columns.map((column) => {
        const columnTasks = board.tasks.filter(
          (task) => task.columnId === column.id
        )

        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            boardId={board.id}
            onCreateTask={onCreateTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        )
      })}
    </div>
  )
}