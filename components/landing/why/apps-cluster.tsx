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
    title: "ChatGPT",
    icon: BrainCircuit,
    color: "from-violet-500 to-indigo-500",
    x: -240,
    y: -120,
  },
  {
    title: "Trello",
    icon: ClipboardList,
    color: "from-sky-500 to-cyan-500",
    x: -260,
    y: 120,
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    color: "from-emerald-500 to-green-500",
    x: 240,
    y: -120,
  },
  {
    title: "Notion",
    icon: FileText,
    color: "from-slate-700 to-slate-900",
    x: 260,
    y: 120,
  },
  {
    title: "Miro",
    icon: PenTool,
    color: "from-yellow-500 to-orange-500",
    x: 0,
    y: 220,
  },
];

type Props = {
  merge: boolean;
};

export function AppsCluster({ merge }: Props) {
  return (
    <>
      {apps.map((app, index) => {
        const Icon = app.icon;

        return (
          <motion.div
            key={app.title}
            initial={{
              x: app.x,
              y: app.y,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: merge ? 0 : app.x,
              y: merge ? 0 : app.y,

              scale: merge ? 0.15 : 1,

              opacity: merge ? 0 : 1,
            }}
            transition={{
              duration: 1.3,
              delay: index * 0.08,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <motion.div
              animate={
                merge
                  ? {}
                  : {
                      y: [0, -8, 0],
                    }
              }
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
                py-4
                backdrop-blur-xl
              "
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

              <span className="font-medium">
                {app.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}