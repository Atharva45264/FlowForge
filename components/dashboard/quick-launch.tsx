"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarPlus,
 ClipboardPlus,
  FilePlus2,
  PenSquare,
  Sparkles,
  StickyNote,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

const actions = [
  {
    title: "New Note",
    description: "Capture ideas instantly",
    href: "/notes",
    icon: StickyNote,
    gradient: "from-emerald-500 to-green-400",
    status: "Ready",
  },
  {
    title: "AI Assistant",
    description: "Chat, PDFs & Images",
    href: "/assistant",
    icon: Bot,
    gradient: "from-violet-500 to-indigo-500",
    status: "Ready",
  },
  {
    title: "New Canvas",
    description: "Visual brainstorming",
    href: "/whiteboard",
    icon: PenSquare,
    gradient: "from-pink-500 to-rose-500",
    status: "Ready",
  },
  {
    title: "Create Task",
    description: "Kanban workflow",
    href: "/kanban",
    icon: ClipboardPlus,
    gradient: "from-orange-500 to-yellow-500",
    status: "Soon",
  },
  {
    title: "Schedule Event",
    description: "Plan your calendar",
    href: "/calendar",
    icon: CalendarPlus,
    gradient: "from-cyan-500 to-blue-500",
    status: "Ready",
  },
  {
    title: "New Page",
    description: "Knowledge management",
    href: "/pages",
    icon: FilePlus2,
    gradient: "from-sky-500 to-indigo-500",
    status: "Ready",
  },
  {
    title: "Architect",
    description: "Build AI workflows",
    href: "/architect",
    icon: Sparkles,
    gradient: "from-fuchsia-500 to-violet-500",
    status: "Ready",
  },
  {
    title: "Invite Team",
    description: "Collaboration",
    href: "/settings",
    icon: Users,
    gradient: "from-slate-500 to-slate-300",
    status: "Soon",
  },
];

export default function QuickLaunch() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            QUICK LAUNCH
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Jump into your workflow
          </h2>

          <p className="mt-2 text-slate-400">
            Frequently used actions for faster productivity.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3">
          <p className="text-xs uppercase tracking-widest text-indigo-300">
            Shortcuts
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {actions.length}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Link href={action.href}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-6 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">

                  <div
                    className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br ${action.gradient} opacity-10 blur-3xl`}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between">

                      <div
                        className={`rounded-2xl bg-linear-to-r ${action.gradient} p-4`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {action.status === "Ready" ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                          <Clock className="h-3.5 w-3.5" />
                          Soon
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {action.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        Launch
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