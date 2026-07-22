"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  Library,
  PenTool,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function DashboardHero() {
  const { data, isLoading } = useDashboard();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950 p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-slate-700" />
          <div className="h-10 w-72 rounded bg-slate-700" />
          <div className="h-6 w-96 rounded bg-slate-800" />

          <div className="mt-8 grid grid-cols-2 gap-4 lg:w-90">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-slate-800"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalItems = data?.productivity.totalItems ?? 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950 p-8"
    >
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-300">
            <Sparkles className="h-4 w-4" />
            AI Productivity Workspace
          </span>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
            {greeting} 👋
          </h1>

          <p className="mt-3 text-2xl font-semibold text-slate-200">
            Welcome back to FlowForge
          </p>

          <p className="mt-5 max-w-xl leading-8 text-slate-400">
            {totalItems === 0 ? (
              <>
                Welcome to FlowForge. Start by creating your first{" "}
                <span className="font-semibold text-white">Note</span>,
                <span className="font-semibold text-white"> Page</span>,
                <span className="font-semibold text-white"> Whiteboard</span> or
                begin chatting with{" "}
                <span className="font-semibold text-white">AI Assistant</span>.
              </>
            ) : (
              <>
                Your workspace currently contains{" "}
                <span className="font-semibold text-white">
  <AnimatedCounter value={totalItems} />
</span>{" "}
                active resources across all modules.
              </>
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-500">
              <Plus className="h-5 w-5" />
              Quick Create
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-white/10">
              <Search className="h-5 w-5" />
              Global Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-95">
          <HeroStat
            title="Notes"
            value={data?.stats.notes ?? 0}
            icon={<FileText className="h-5 w-5 text-white" />}
            color="from-emerald-500 to-green-500"
          />

          <HeroStat
            title="Pages"
            value={data?.stats.pages ?? 0}
            icon={<Library className="h-5 w-5 text-white" />}
            color="from-sky-500 to-cyan-500"
          />

          <HeroStat
            title="Whiteboards"
            value={data?.stats.boards ?? 0}
            icon={<PenTool className="h-5 w-5 text-white" />}
            color="from-pink-500 to-rose-500"
          />

          <HeroStat
            title="AI Chats"
            value={data?.stats.chats ?? 0}
            icon={<Bot className="h-5 w-5 text-white" />}
            color="from-violet-500 to-indigo-500"
          />
        </div>
      </div>
    </motion.section>
  );
}

function HeroStat({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl"
    >
      <div
        className={`mb-4 inline-flex rounded-xl bg-linear-to-r ${color} p-2`}
      >
        {icon}
      </div>

      <p className="text-3xl font-black text-white">
  <AnimatedCounter value={value} />
</p>

      <p className="mt-1 text-sm text-slate-400">
        {title}
      </p>
    </motion.div>
  );
}