import { KanbanColumn } from "./kanban-column"
import { KanbanBoard as BoardType } from "./kanban-types"
import { CreateColumnDialog } from "./create-column-dialog"
import { KanbanTask } from "./kanban-types"

type KanbanBoardProps = {
  board: BoardType

  onCreateTask: (
  boardId: string,
  task: Omit<KanbanTask, "id">
) => void

  onUpdateTask: (
    taskId: string,
    updates: Record<string, any>
  ) => void

  onDeleteTask: (
    taskId: string
  ) => void

  onCreateColumn: (
    name: string
  ) => void

  onRenameColumn: (
  columnId: string,
  newName: string
) => void

onDeleteColumn: (
  columnId: string
) => void
}



export function KanbanBoard({
  board,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onCreateColumn,
  onRenameColumn,
  onDeleteColumn,
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
            onRenameColumn={onRenameColumn}
onDeleteColumn={onDeleteColumn}
          />
        )
      })}
      <CreateColumnDialog
  onCreateColumn={onCreateColumn}
/>
    </div>
  )
}