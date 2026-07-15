import { create } from "zustand";

import { scheduledTasks, draftTasks } from "@/components/calendar/sample-data";

import { CalendarTask } from "@/components/calendar/calendar-types";

type CalendarStore = {
  tasks: CalendarTask[];
  setTasks: (tasks: CalendarTask[]) => void;
  draftTasks: CalendarTask[];

  createDraftTask: (title: string, category: string) => void;

  scheduleTask: (taskId: string, date: string) => void;

  moveTask: (taskId: string, date: string) => void;

  deleteTask: (taskId: string) => void;

  createScheduledTask: (title: string, date: string, category?: string) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  tasks: scheduledTasks,
  setTasks: (tasks) =>
  set({
    tasks,
  }),
  draftTasks,

  createDraftTask: (title, category) =>
    set((state) => ({
      draftTasks: [
        ...state.draftTasks,
        {
          id: crypto.randomUUID(),
          title,
          category: category as any,
          color: "bg-violet-500",
        },
      ],
    })),

  scheduleTask: (taskId, date) =>
    set((state) => {
      const draftTask = state.draftTasks.find((task) => task.id === taskId);

      if (!draftTask) {
        return state;
      }

      return {
        tasks: [
          ...state.tasks,
          {
            ...draftTask,
            date,
          },
        ],

        draftTasks: state.draftTasks.filter((task) => task.id !== taskId),
      };
    }),

  moveTask: (taskId, date) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              date,
            }
          : task,
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),

      draftTasks: state.draftTasks.filter((task) => task.id !== taskId),
    })),
  createScheduledTask: (title, date, category) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          date,

          category: (category as any) ?? "work",

          color: "bg-indigo-500",
        },
      ],
    })),
}));
