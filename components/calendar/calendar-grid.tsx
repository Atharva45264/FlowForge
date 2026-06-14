"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { CalendarTask } from "./calendar-types";

type CalendarGridProps = {
  currentDate: Date;
  tasks: CalendarTask[];
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarCell({
  day,
  children,
}: {
  day: Date;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id: format(day, "yyyy-MM-dd"),
  });

  return (
    <div ref={setNodeRef} className="min-h-30 border border-slate-700/40 p-2">
      {children}
    </div>
  );
}

function DraggableCalendarTask({ task }: { task: CalendarTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
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
      className={`cursor-grab rounded-md px-2 py-1 text-xs text-white active:cursor-grabbing ${task.color}`}
    >
      {task.title}
    </div>
  );
}

export function CalendarGrid({ currentDate, tasks }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-4 shadow-lg shadow-slate-950/10">
      <div className="grid grid-cols-7 border-b border-slate-700/70">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayTasks = tasks.filter(
            (task) => task.date && isSameDay(new Date(task.date), day),
          );

          const isToday = isSameDay(day, new Date());

          return (
            <CalendarCell key={day.toISOString()} day={day}>
              <div
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  isToday ? "bg-indigo-500 text-white" : "text-slate-300"
                }`}
              >
                {format(day, "d")}
              </div>

              <div className="space-y-1">
                {dayTasks.map((task) => (
                  <DraggableCalendarTask key={task.id} task={task} />
                ))}
              </div>
            </CalendarCell>
          );
        })}
      </div>
    </div>
  );
}
