"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Brain,
  CalendarDays,
  Clock3,
  FileText,
  PenTool,
  Bot,
  FolderKanban,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";

export default function InsightsPanel() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <section>
        <div className="mb-6 animate-pulse">
          <div className="h-4 w-40 rounded bg-slate-700" />
          <div className="mt-3 h-8 w-72 rounded bg-slate-700" />
          <div className="mt-3 h-4 w-96 rounded bg-slate-800" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl bg-slate-900 h-107.5" />
          <div className="rounded-3xl bg-slate-900 h-107.5" />
        </div>
      </section>
    );
  }

  const productivity = data?.productivity;
  const stats = data?.stats;

  const metrics = [
    {
      title: "Productivity Score",
      value: `${productivity?.score ?? 0}%`,
      progress: productivity?.score ?? 0,
      icon: Activity,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Completion Rate",
      value: `${productivity?.completionRate ?? 0}%`,
      progress: productivity?.completionRate ?? 0,
      icon: BarChart3,
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Focus Hours",
      value: `${productivity?.focusHours ?? 0}h`,
      progress: Math.min(
        ((productivity?.focusHours ?? 0) / 8) * 100,
        100
      ),
      icon: Clock3,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Workspace Resources",
      value: `${productivity?.totalItems ?? 0}`,
      progress: Math.min(
        ((productivity?.totalItems ?? 0) / 50) * 100,
        100
      ),
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const modules = [
    {
      title: "Notes",
      value: stats?.notes ?? 0,
      icon: FileText,
      color: "text-emerald-400",
    },
    {
      title: "Pages",
      value: stats?.pages ?? 0,
      icon: FolderKanban,
      color: "text-sky-400",
    },
    {
      title: "Whiteboards",
      value: stats?.boards ?? 0,
      icon: PenTool,
      color: "text-pink-400",
    },
    {
      title: "AI Chats",
      value: stats?.chats ?? 0,
      icon: Bot,
      color: "text-violet-400",
    },
    {
      title: "Architect",
      value: stats?.architectProjects ?? 0,
      icon: Brain,
      color: "text-amber-400",
    },
    {
      title: "Events Today",
      value: stats?.eventsToday ?? 0,
      icon: CalendarDays,
      color: "text-cyan-400",
    },
  ];

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
          WORKSPACE ANALYTICS
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Performance & Insights
        </h2>

        <p className="mt-2 text-slate-400">
          Live analytics generated from your FlowForge workspace.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">

        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-white/10 bg-[#111827] p-6"
        >
          <h3 className="mb-6 text-xl font-bold text-white">
            Workspace Health
          </h3>

          <div className="space-y-6">
            {metrics.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl bg-linear-to-r ${item.color} p-2`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {item.title}
                        </p>
                      </div>
                    </div>

                    <span className="text-lg font-bold text-white">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${item.progress}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.15,
                      }}
                      className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
                <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-white/10 bg-[#111827] p-6"
        >
          <h3 className="mb-6 text-xl font-bold text-white">
            Workspace Distribution
          </h3>

          <div className="space-y-4">
            {modules.map((module, index) => {
              const Icon = module.icon;

              const total = Math.max(
                productivity?.totalItems ?? 1,
                1
              );

              const percentage = Math.round(
                (module.value / total) * 100
              );

              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    x: 4,
                  }}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-5 w-5 ${module.color}`}
                      />

                      <span className="font-medium text-white">
                        {module.title}
                      </span>
                    </div>

                    <span className="text-lg font-bold text-white">
                      {module.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${percentage}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    {percentage}% of your workspace
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-linear-to-r from-indigo-500/10 to-violet-500/10 p-5">
            <h4 className="flex items-center gap-2 font-semibold text-white">
              <Brain className="h-5 w-5 text-violet-400" />
              AI Recommendation
            </h4>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              {(productivity?.score ?? 0) >= 80
                ? "Your workspace is well organized. Continue maintaining your notes, pages, and whiteboards to keep productivity high."
                : (productivity?.score ?? 0) >= 50
                ? "You're making good progress. Organizing documents and completing pending work will improve your workspace score."
                : "Your workspace is just getting started. Create more notes, pages, whiteboards, and AI conversations to build a productive workflow."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}