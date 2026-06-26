"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tasks = [
  {
    id: 1,
    title: "Landing Page",
    color: "bg-violet-500",
  },
  {
    id: 2,
    title: "AI Notes",
    color: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Dashboard UI",
    color: "bg-emerald-500",
  },
];

export function KanbanPreview() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % tasks.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          layout
          animate={{
            scale: active === index ? 1.03 : 1,
            x: active === index ? 8 : 0,
            borderColor:
              active === index
                ? "rgba(99,102,241,.6)"
                : "rgba(255,255,255,.05)",
          }}
          transition={{
            duration: .45,
          }}
          className="
            rounded-xl
            border
            border-white/5
            bg-white/5
            p-3
          "
        >
          <div className="flex items-center gap-3">

            <div
              className={`h-3 w-3 rounded-full ${task.color}`}
            />

            <span className="text-sm text-white">
              {task.title}
            </span>

            {active === index && (
              <motion.span
                layoutId="status"
                className="ml-auto rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] text-emerald-300"
              >
                In Progress
              </motion.span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}