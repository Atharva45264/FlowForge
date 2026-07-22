"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Sparkles,
  TrendingUp,
  Target,
  Timer,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";

function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TodayFocus() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-white/10 bg-[#111827] p-6"
      >
        <div className="animate-pulse space-y-5">
          <div className="h-5 w-36 rounded bg-slate-700" />
          <div className="h-8 w-56 rounded bg-slate-700" />

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-slate-800"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-slate-800"
              />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  const events = data?.today.events ?? [];

  const productivity = data?.productivity;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-[#111827] p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            TODAY OVERVIEW
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Your Day at a Glance
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Calendar schedule and workspace productivity.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-center">
          <p className="text-3xl font-black text-white">
            {events.length}
          </p>

          <p className="text-xs uppercase tracking-wider text-indigo-300">
            Events
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-indigo-400" />

          <h3 className="font-semibold text-white">
            Today's Schedule
          </h3>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-slate-500" />

            <p className="mt-4 font-semibold text-white">
              No events scheduled
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Enjoy your free day or create a new calendar event.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event: any, index: number) => (
              <motion.div
                key={event._id ?? index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 5,
                }}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-indigo-500/15 p-3">
                    <Clock3 className="h-5 w-5 text-indigo-400" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">
                      {event.title}
                    </h4>

                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />

                      {formatTime(event.start)}
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
                <MetricCard
          title="Productivity Score"
          value={`${productivity?.score ?? 0}%`}
          subtitle="Overall workspace health"
          icon={<TrendingUp className="h-5 w-5" />}
          color="emerald"
        />

        <MetricCard
          title="Completion Rate"
          value={`${productivity?.completionRate ?? 0}%`}
          subtitle="Tasks & work completed"
          icon={<Target className="h-5 w-5" />}
          color="violet"
        />

        <MetricCard
          title="Focus Hours"
          value={`${productivity?.focusHours ?? 0}h`}
          subtitle="Estimated focus time"
          icon={<Timer className="h-5 w-5" />}
          color="amber"
        />

        <MetricCard
          title="Resources"
          value={`${productivity?.totalItems ?? 0}`}
          subtitle="Workspace items"
          icon={<CalendarDays className="h-5 w-5" />}
          color="cyan"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-2xl border border-indigo-500/20 bg-linear-to-r from-indigo-500/10 to-violet-500/10 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-500/20 p-3">
            <Sparkles className="h-5 w-5 text-indigo-300" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              AI Insight
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-300">
              {events.length === 0
                ? "Your calendar is free today. This is a great opportunity to plan new work, organize notes, or brainstorm ideas on a whiteboard."
                : `You have ${events.length} scheduled event${
                    events.length > 1 ? "s" : ""
                  } today. Your workspace productivity score is ${
                    productivity?.score ?? 0
                  }%. Complete your scheduled meetings before starting new work to stay productive.`}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "emerald" | "violet" | "amber" | "cyan";
}) {
  const colors = {
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    violet:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    cyan:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-white/10 bg-slate-900 p-4"
    >
      <div
        className={`inline-flex rounded-xl border p-2 ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 font-medium text-white">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>
    </motion.div>
  );
}