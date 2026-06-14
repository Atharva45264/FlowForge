"use client"

import { useState } from "react"
import { format } from "date-fns"

import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarView } from "@/components/calendar/calendar-types"
import { DraftTaskPanel } from "@/components/calendar/draft-task-panel"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<CalendarView>("month")

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentMonth={format(currentDate, "MMMM yyyy")}
        view={view}
        onPrevious={() => {}}
        onNext={() => {}}
        onToday={() => setCurrentDate(new Date())}
        onViewChange={setView}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
  <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-500">
    Calendar Grid Coming Next
  </div>

  <DraftTaskPanel />
</div>
    </div>
  )
}