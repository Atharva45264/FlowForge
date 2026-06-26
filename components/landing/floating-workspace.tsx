"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CalendarDays,
  ClipboardList,
  FileText,
  PenTool,
} from "lucide-react";

const cards = [
  {
    title: "AI Assistant",
    icon: BrainCircuit,
    x: -120,
    y: -90,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    x: 140,
    y: -70,
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "Notes",
    icon: FileText,
    x: -80,
    y: 120,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Kanban",
    icon: ClipboardList,
    x: 140,
    y: 130,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Whiteboard",
    icon: PenTool,
    x: 20,
    y: 15,
    color: "from-amber-500 to-orange-500",
  },
];

export function FloatingWorkspace() {
  return (
    <div className="relative h-115 w-140">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `calc(50% + ${card.x}px)`,
              top: `calc(50% + ${card.y}px)`,
            }}
            className="absolute"
          >
            <div className="w-40 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">
              <div
                className={`mb-4 inline-flex rounded-xl bg-linear-to-r ${card.color} p-3`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="font-semibold text-white">
                {card.title}
              </h3>

              <p className="mt-2 text-xs text-slate-400">
                Collaborative workspace
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}