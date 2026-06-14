"use client"

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns"

import { CalendarTask } from "./calendar-types"

type CalendarGridProps = {
  currentDate: Date
  tasks: CalendarTask[]
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarGrid({
  currentDate,
  tasks,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

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
            (task) =>
              task.date &&
              isSameDay(new Date(task.date), day)
          )

          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={day.toISOString()}
              className="min-h-30 border border-slate-700/40 p-2"
            >
              <div
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  isToday
                    ? "bg-indigo-500 text-white"
                    : "text-slate-300"
                }`}
              >
                {format(day, "d")}
              </div>

              <div className="space-y-1">
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