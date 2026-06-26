"use client";

import { motion } from "framer-motion";
import { AnimatedLine } from "./animated-line";
import {
  BrainCircuit,
  ClipboardList,
  CalendarDays,
  FileText,
  PenTool,
  Users,
} from "lucide-react";

const features = [
  {
    title: "AI",
    icon: BrainCircuit,
    top: "8%",
    left: "50%",
  },
  {
    title: "Kanban",
    icon: ClipboardList,
    top: "32%",
    left: "12%",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    top: "32%",
    left: "78%",
  },
  {
    title: "Notes",
    icon: FileText,
    top: "72%",
    left: "18%",
  },
  {
    title: "Whiteboard",
    icon: PenTool,
    top: "72%",
    left: "72%",
  },
  {
    title: "Realtime",
    icon: Users,
    top: "90%",
    left: "50%",
  },
];

export function FeatureOrbit() {
  return (
    <div className="relative mx-auto mt-8 h-155 w-190">

      {/* Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [.5, .9, .5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/20
          blur-[120px]
        "
      />

      {/* Center */}

      <motion.div
        initial={{
          scale: .5,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: .7,
        }}
        viewport={{
          once: true,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          flex
          h-48
          w-48
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          items-center
          justify-center
          rounded-4xl
          border
          border-violet-500/30
          bg-linear-to-br
          from-violet-600
          to-indigo-600
          shadow-[0_0_80px_rgba(99,102,241,.45)]
        "
      >
        <BrainCircuit className="mb-4 h-12 w-12" />

        <h2 className="text-3xl font-black">
          FlowForge
        </h2>

        <p className="mt-2 text-xs opacity-70">
          Productivity OS
        </p>
      </motion.div>

      {/* Orbit Items */}

      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              scale: .5,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: .6 + index * .18,
            }}
            viewport={{
              once: true,
            }}
            style={{
              top: feature.top,
              left: feature.left,
            }}
            className="
              absolute
              z-20
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
              }}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <Icon className="h-5 w-5 text-violet-300" />

              <span className="font-medium">
                {feature.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connection Lines */}

      <svg
  className="absolute inset-0 h-full w-full"
  viewBox="0 0 760 620"
>
  <defs>
    <linearGradient
      id="lineGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop
        offset="0%"
        stopColor="#8b5cf6"
      />

      <stop
        offset="100%"
        stopColor="#22d3ee"
      />
    </linearGradient>
  </defs>

  <AnimatedLine
    x1={380}
    y1={310}
    x2={380}
    y2={80}
    delay={0.5}
  />

  <AnimatedLine
    x1={380}
    y1={310}
    x2={120}
    y2={200}
    delay={0.7}
  />

  <AnimatedLine
    x1={380}
    y1={310}
    x2={640}
    y2={200}
    delay={0.9}
  />

  <AnimatedLine
    x1={380}
    y1={310}
    x2={160}
    y2={470}
    delay={1.1}
  />

  <AnimatedLine
    x1={380}
    y1={310}
    x2={600}
    y2={470}
    delay={1.3}
  />

  <AnimatedLine
    x1={380}
    y1={310}
    x2={380}
    y2={560}
    delay={1.5}
  />
</svg>

    </div>
  );
}