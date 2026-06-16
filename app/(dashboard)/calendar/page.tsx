"use client";

import { useState } from "react";
import { format } from "date-fns";
import { addMonths, subMonths } from "date-fns";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarView } from "@/components/calendar/calendar-types";
import { DraftTaskPanel } from "@/components/calendar/draft-task-panel";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { TaskDialog } from "@/components/calendar/task-dialog";
import { WeekCalendarGrid } from "@/components/calendar/week-calendar-grid";
import { useCalendarStore } from "@/store/calendar-store";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("month");
  const tasks = useCalendarStore((state) => state.tasks);

  const draftTasks = useCalendarStore((state) => state.draftTasks);

  const createDraftTask = useCalendarStore((state) => state.createDraftTask);

  const scheduleTask = useCalendarStore((state) => state.scheduleTask);

  const moveTask = useCalendarStore((state) => state.moveTask);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draftTask = draftTasks.find((task) => task.id === active.id);

    if (draftTask) {
      scheduleTask(String(active.id), String(over.id));

      return;
    }

    moveTask(String(active.id), String(over.id));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
              onAddTask={(task) => createDraftTask(task.title, task.category)}
            />

            <DraftTaskPanel tasks={draftTasks} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
