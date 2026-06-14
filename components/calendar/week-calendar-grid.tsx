"use client"

import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns"

import { CalendarTask } from "./calendar-types"

type WeekCalendarGridProps = {
  currentDate: Date
  tasks: CalendarTask[]
}

export function WeekCalendarGrid({
  currentDate,
  tasks,
}: WeekCalendarGridProps) {
  const start = startOfWeek(currentDate)

  const days = Array.from({ length: 7 }, (_, index) =>
    addDays(start, index)
  )

  return (
    <div className="rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-4">
      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dayTasks = tasks.filter(
            (task) =>
              task.date &&
              isSameDay(new Date(task.date), day)
          )

          return (
            <div
              key={day.toISOString()}
              className="min-h-75 rounded-lg border border-slate-700/50 p-3"
            >
              <div className="mb-3">
                <p className="text-xs text-slate-400">
                  {format(day, "EEE")}
                </p>

                <p className="text-lg font-semibold text-white">
                  {format(day, "d")}
                </p>
              </div>

              <div className="space-y-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-md px-2 py-1 text-xs text-white ${task.color}`}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}