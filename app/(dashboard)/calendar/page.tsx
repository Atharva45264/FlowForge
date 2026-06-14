"use client";

import { useState } from "react";
import { format } from "date-fns";
import { addMonths, subMonths } from "date-fns";

import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarView } from "@/components/calendar/calendar-types";
import { DraftTaskPanel } from "@/components/calendar/draft-task-panel";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import {
  scheduledTasks,
  draftTasks as initialDraftTasks,
} from "@/components/calendar/sample-data";
import { TaskDialog } from "@/components/calendar/task-dialog";
import { WeekCalendarGrid } from "@/components/calendar/week-calendar-grid";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("month");
  const [tasks] = useState(scheduledTasks);
  const [draftTasks, setDraftTasks] = useState(initialDraftTasks);

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentMonth={format(currentDate, "MMMM yyyy")}
        view={view}
        onPrevious={() => setCurrentDate((prev) => subMonths(prev, 1))}
        onNext={() => setCurrentDate((prev) => addMonths(prev, 1))}
        onToday={() => setCurrentDate(new Date())}
        onViewChange={setView}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {view === "month" ? (
          <CalendarGrid currentDate={currentDate} tasks={tasks} />
        ) : (
          <WeekCalendarGrid currentDate={currentDate} tasks={tasks} />
        )}

        <div className="space-y-4">
          <TaskDialog
            onAddTask={(task) => {
              setDraftTasks((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  title: task.title,
                  category: task.category as any,
                  color: "bg-violet-500",
                },
              ]);
            }}
          />

          <DraftTaskPanel tasks={draftTasks} />
        </div>
      </div>
    </div>
  );
}
