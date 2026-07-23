"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  CalendarDays,
  ClipboardList,
  FileText,
  Library,
  PenTool,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";

type ModuleCard = {
  title: string;
  description: string;
  href: string;
  icon: any;
  color: string;
  bg: string;
  count: number;
  emptyText: string;
  status: "active" | "coming";
};

export default function WorkspaceGrid() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
              WORKSPACE
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Everything in one place
            </h2>

            <p className="mt-2 text-slate-400">
              Loading your workspace...
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border border-white/10 bg-[#111827] p-6"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-700" />

              <div className="mt-6 h-6 w-40 rounded bg-slate-700" />

              <div className="mt-3 h-4 w-full rounded bg-slate-800" />

              <div className="mt-2 h-4 w-3/4 rounded bg-slate-800" />

              <div className="mt-8 h-2 rounded-full bg-slate-800" />

              <div className="mt-5 h-8 w-28 rounded-full bg-slate-700" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const stats = data?.stats;

  const modules: ModuleCard[] = [
    {
      title: "AI Assistant",
      description: "Chat, PDFs, Images & Voice",
      href: "/assistant",
      icon: Bot,
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
      count: stats?.chats ?? 0,
      emptyText: "Start your first chat",
      status: "active",
    },
    {
      title: "Calendar",
      description: "Meetings & Planning",
      href: "/calendar",
      icon: CalendarDays,
      color: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-500/10",
      count: stats?.eventsToday ?? 0,
      emptyText: "No events today",
      status: "active",
    },
    {
      title: "Task Board",
      description: "Kanban Workflow",
      href: "/kanban",
      icon: ClipboardList,
      color: "from-orange-500 to-yellow-500",
      bg: "bg-orange-500/10",
      count: 0,
      emptyText: "Coming Soon",
      status: "coming",
    },
    {
      title: "Notes",
      description: "Quick Capture",
      href: "/notes",
      icon: FileText,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
      count: stats?.notes ?? 0,
      emptyText: "Create your first note",
      status: "active",
    },
    {
      title: "Canvas",
      description: "Infinite Whiteboard",
      href: "/whiteboard",
      icon: PenTool,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-500/10",
      count: stats?.boards ?? 0,
      emptyText: "Create your first board",
      status: "active",
    },
    {
      title: "Pages & Spaces",
      description: "Knowledge Base",
      href: "/pages",
      icon: Library,
      color: "from-sky-500 to-cyan-500",
      bg: "bg-sky-500/10",
      count: stats?.pages ?? 0,
      emptyText: "Create your first page",
      status: "active",
    },
    {
      title: "Architect",
      description: "AI Workflow Builder",
      href: "/architect",
      icon: Sparkles,
      color: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-500/10",
      count: stats?.architectProjects ?? 0,
      emptyText: "Start your first project",
      status: "active",
    },
  ];

  const totalResources =
    (stats?.notes ?? 0) +
    (stats?.pages ?? 0) +
    (stats?.boards ?? 0) +
    (stats?.architectProjects ?? 0) +
    (stats?.chats ?? 0);

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            WORKSPACE
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Everything in one place
          </h2>

          <p className="mt-2 text-slate-400">
            Access every FlowForge module from a single dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3">
          <p className="text-xs uppercase tracking-widest text-indigo-300">
            Resources
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {totalResources}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module, index) => {
          const Icon = module.icon;

          const progress =
            module.status === "coming"
              ? 0
              : Math.min(module.count * 10, 100);

          return (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Link href={module.href}>
                <div
                  className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-6 transition-all duration-300 ${
                    module.status === "coming"
                      ? "opacity-75"
                      : "hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
                  }`}
                >
                  <div
                    className={`absolute right-0 top-0 h-36 w-36 rounded-full bg-linear-to-br ${module.color} opacity-10 blur-3xl`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div
                        className={`rounded-2xl ${module.bg} p-4`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                                          <div className="flex items-center gap-2">
                      {module.status === "active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                          <Clock className="h-3.5 w-3.5" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {module.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {module.description}
                    </p>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          {module.status === "coming"
                            ? "Development Progress"
                            : "Workspace Usage"}
                        </span>

                        <span className="font-medium text-slate-300">
                          {module.status === "coming"
                            ? "0%"
                            : `${progress}%`}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full bg-linear-to-r ${module.color}`}
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {module.status === "coming"
                          ? module.emptyText
                          : module.count === 0
                          ? module.emptyText
                          : `${module.count} ${
                              module.count === 1 ? "Item" : "Items"
                            }`}
                      </span>

                      <ArrowRight className="h-5 w-5 text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}