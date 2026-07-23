"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bot,
  CheckCircle2,
  CalendarDays,
  Users,
  FileText,
} from "lucide-react";

const activities = [
  {
    icon: Bot,
    color: "text-violet-400",
    text: "AI generated sprint summary",
  },
  {
    icon: Users,
    color: "text-cyan-400",
    text: "Rohit joined the workspace",
  },
  {
    icon: CheckCircle2,
    color: "text-emerald-400",
    text: "Landing Page moved to Done",
  },
  {
    icon: FileText,
    color: "text-orange-400",
    text: "Notes synced successfully",
  },
  {
    icon: CalendarDays,
    color: "text-sky-400",
    text: "Sprint planning starts in 15 min",
  },
];

export function LiveActivity() {
  const [index, setIndex] =
    useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(
        (prev) =>
          (prev + 1) %
          activities.length
      );
    }, 2500);

    return () =>
      clearInterval(timer);
  }, []);

  const activity =
    activities[index];

  const Icon =
    activity.icon;

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">

      <AnimatePresence
        mode="wait"
      >
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.35,
          }}
          className="flex items-center gap-3"
        >
          <Icon
            className={`h-4 w-4 ${activity.color}`}
          />

          <span className="text-sm text-slate-300">
            {activity.text}
          </span>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}