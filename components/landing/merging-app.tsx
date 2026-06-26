"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CalendarDays,
  ClipboardList,
  FileText,
  PenTool,
} from "lucide-react";

const apps = [
  {
    icon: BrainCircuit,
    name: "ChatGPT",
    x: -220,
    y: -120,
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: ClipboardList,
    name: "Trello",
    x: -250,
    y: 120,
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: CalendarDays,
    name: "Calendar",
    x: 220,
    y: -120,
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: FileText,
    name: "Notion",
    x: 260,
    y: 120,
    color: "from-slate-700 to-slate-900",
  },
  {
    icon: PenTool,
    name: "Miro",
    x: 0,
    y: 220,
    color: "from-yellow-500 to-orange-500",
  },
];

export function MergingApps() {
  return (
    <div className="relative mx-auto mt-8 h-130 w-190">

      {/* Center Glow */}

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [.4, .8, .4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-40
          w-40
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/30
          blur-[90px]
        "
      />

      {apps.map((app, index) => {
        const Icon = app.icon;

        return (
          <motion.div
            key={app.name}
            initial={{
              x: app.x,
              y: app.y,
              opacity: 0,
              scale: .8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: [app.x, 0],
              y: [app.y, 0],
              scale: [1, .75],
              opacity: [1, .35],
            }}
            transition={{
              delay: index * .25,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            viewport={{
              once: true,
            }}
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className={`
                flex
                w-44
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/10
                p-5
                backdrop-blur-xl
              `}
            >

              <div
                className={`
                  rounded-xl
                  bg-linear-to-br
                  ${app.color}
                  p-3
                `}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <span>{app.name}</span>

            </div>

          </motion.div>
        );
      })}

      {/* FlowForge */}

      <motion.div
        initial={{
          opacity: 0,
          scale: .5,
        }}
        whileInView={{
          opacity: 1,
        }}
        animate={{
          scale: [1, 1.06, 1],
          boxShadow: [
            "0 0 20px rgba(99,102,241,.2)",
            "0 0 70px rgba(99,102,241,.7)",
            "0 0 20px rgba(99,102,241,.2)",
          ],
        }}
        transition={{
          delay: 1.4,
          duration: 2,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          -translate-x-1/2
          -translate-y-1/2
          rounded-[28px]
          border
          border-violet-500/40
          bg-linear-to-br
          from-violet-600
          to-indigo-600
          px-12
          py-8
        "
      >

        <BrainCircuit className="mx-auto mb-4 h-10 w-10" />

        <h2 className="text-center text-3xl font-black">
          FlowForge
        </h2>

      </motion.div>

    </div>
  );
}