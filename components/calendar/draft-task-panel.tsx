import { Plus } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

import { CalendarTask } from "./calendar-types";

type DraftTaskPanelProps = {
  tasks: CalendarTask[];
};

function DraggableTask({ task }: { task: CalendarTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg border border-slate-700 bg-slate-800/60 p-3 transition hover:border-slate-600 active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2.5 w-2.5 rounded-full ${task.color}`} />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">{task.title}</p>

          <p className="mt-1 text-xs capitalize text-slate-400">
            {task.category}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DraftTaskPanel({ tasks }: DraftTaskPanelProps) {
  return (
    <div className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Draft Tasks</h2>

          <p className="mt-1 text-xs text-slate-400">
            Unscheduled tasks ready to be planned.
          </p>
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
