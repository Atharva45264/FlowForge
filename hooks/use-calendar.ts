"use client";

import { useEffect, useState } from "react";

import { CalendarTask } from "@/components/calendar/calendar-types";
import { useCalendarStore } from "@/store/calendar-store";

export default function useCalendar() {
  const setTasks = useCalendarStore(
    (state) => state.setTasks
  );

  const tasks = useCalendarStore(
    (state) => state.tasks
  );

  const [loading, setLoading] =
    useState(true);

  async function loadEvents() {
    try {
      const res = await fetch(
        "/api/calendar"
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error?.message
        );
      }

      const events: CalendarTask[] =
        data.data.map((event: any) => ({
          id: event._id,

          title: event.title,

          date: event.date,

          category: "meeting",

          color: "bg-indigo-500",
        }));

      setTasks(events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    tasks,
    loading,
    refreshCalendar: loadEvents,
  };
}