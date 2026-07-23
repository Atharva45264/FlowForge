"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CalendarDays,
  ClipboardList,
  FileText,
  PenTool,
  Users,
} from "lucide-react";

const features = [
  {
    title: "AI",
    icon: BrainCircuit,
    x: 380,
    y: 70,
  },
  {
    title: "Kanban",
    icon: ClipboardList,
    x: 120,
    y: 185,
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    x: 640,
    y: 185,
  },
  {
    title: "Notes",
    icon: FileText,
    x: 160,
    y: 470,
  },
  {
    title: "Whiteboard",
    icon: PenTool,
    x: 600,
    y: 470,
  },
  {
    title: "Realtime",
    icon: Users,
    x: 380,
    y: 565,
  },
];

export function FeatureOrbit() {
  return (
    <div className="absolute inset-0">

      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.8 + index * 0.15,
              duration: 0.5,
            }}
            style={{
              left: feature.x,
              top: feature.y,
            }}
            className="
              absolute
              z-40
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-7
                py-4
                backdrop-blur-xl
                shadow-xl
                hover:border-violet-500/40
                hover:bg-violet-500/10
              "
            >
              <div className="rounded-xl bg-violet-500/15 p-2.5">
                <Icon className="h-6 w-6 text-violet-300" />
              </div>

              <span className="text-lg font-semibold text-white">
                {feature.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}