"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  Calendar,
  FileText,
  FolderKanban,
  PenTool,
  Brain,
  ArrowRight,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";

function formatRelativeTime(date: Date | string) {
  const now = new Date();
  const updated = new Date(date);

  const seconds = Math.floor(
    (now.getTime() - updated.getTime()) / 1000
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days < 7)
    return `${days} day${days > 1 ? "s" : ""} ago`;

  return updated.toLocaleDateString();
}

function getActivityConfig(type: string) {
  switch (type) {
    case "note":
      return {
        icon: FileText,
        color: "bg-emerald-500",
        label: "Note",
      };

    case "page":
      return {
        icon: FolderKanban,
        color: "bg-sky-500",
        label: "Page",
      };

    case "board":
      return {
        icon: PenTool,
        color: "bg-pink-500",
        label: "Whiteboard",
      };

    case "calendar":
      return {
        icon: Calendar,
        color: "bg-cyan-500",
        label: "Calendar",
      };

    case "chat":
      return {
        icon: Bot,
        color: "bg-violet-500",
        label: "AI Chat",
      };

    case "architect":
      return {
        icon: Brain,
        color: "bg-amber-500",
        label: "Architect",
      };

    default:
      return {
        icon: ArrowRight,
        color: "bg-slate-500",
        label: "Activity",
      };
  }
}

export default function ActivityFeed() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
        <div className="animate-pulse">
          <div className="h-4 w-40 rounded bg-slate-700" />
          <div className="mt-3 h-8 w-72 rounded bg-slate-700" />
          <div className="mt-3 h-4 w-80 rounded bg-slate-800" />

          <div className="mt-8 space-y-5">
            {[1,2,3,4,5].map((i)=>(
              <div
                key={i}
                className="h-24 rounded-2xl bg-slate-900"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activities = data?.recentActivity ?? [];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

      <div className="mb-8 flex items-end justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            RECENT ACTIVITY
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Workspace Timeline
          </h2>

          <p className="mt-2 text-slate-400">
            Live activity across your FlowForge workspace.
          </p>
        </div>

        <span className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
          {activities.length} Activities
        </span>

      </div>

      {activities.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

          <Brain className="mx-auto h-12 w-12 text-slate-500" />

          <h3 className="mt-5 text-xl font-semibold text-white">
            No activity yet
          </h3>

          <p className="mt-2 text-slate-400">
            Create notes, pages, whiteboards or chat with AI to build your activity timeline.
          </p>

        </div>
      ) : (

      <div className="relative ml-3 border-l border-slate-700">
        {activities.map((activity, index) => {

          const config = getActivityConfig(activity.type);
          const Icon = config.icon;

          return (

            <motion.div
              key={`${activity.type}-${activity.title}-${index}`}
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.06,
              }}
              className="relative mb-8 pl-10"
            >

              <div
                className={`absolute -left-2.5 top-2 flex h-5 w-5 items-center justify-center rounded-full ${config.color}`}
              >
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
                            <Link
                href={activity.href ?? "#"}
                className="block"
              >
                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition-all hover:border-indigo-500/30 hover:bg-slate-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`rounded-xl ${config.color} p-3`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                            {config.label}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-semibold text-white">
                          {activity.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {formatRelativeTime(activity.updatedAt)}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      )}
    </section>
  );
}