"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CalendarView } from "./calendar-types"

type CalendarHeaderProps = {
  currentMonth: string
  view: CalendarView
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (view: CalendarView) => void
}

export function CalendarHeader({
  currentMonth,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-700/70 bg-[#1F2937]/75 p-5 shadow-lg shadow-slate-950/10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="min-w-45 text-xl font-semibold text-white">
          {currentMonth}
        </h2>

        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={onToday}
        >
          Today
        </Button>

        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          <button
            onClick={() => onViewChange("month")}
            className={`px-4 py-2 text-sm transition ${
              view === "month"
                ? "bg-indigo-500 text-white"
                : "bg-transparent text-slate-400"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => onViewChange("week")}
            className={`px-4 py-2 text-sm transition ${
              view === "week"
                ? "bg-indigo-500 text-white"
                : "bg-transparent text-slate-400"
            }`}
          >
            Week
          </button>
        </div>
      </div>
    </div>
  )
}