"use client";

import { motion } from "framer-motion";

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
    icon: BrainCircuit,
    title: "AI Assistant",
    desc: "Summaries, brainstorming and smart productivity.",
  },
  {
    icon: ClipboardList,
    title: "Kanban",
    desc: "Organize projects visually with drag-and-drop.",
  },
  {
    icon: CalendarDays,
    title: "Calendar",
    desc: "Plan meetings, sprints and deadlines.",
  },
  {
    icon: FileText,
    title: "Notes",
    desc: "Rich collaborative notes powered by AI.",
  },
  {
    icon: PenTool,
    title: "Whiteboard",
    desc: "Sketch ideas together in realtime.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Live cursors, comments and multiplayer editing.",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="py-32"
    >
      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-20 text-center">

          <h2 className="text-5xl font-black">

            Everything Your Team Needs

          </h2>

          <p className="mt-6 text-slate-400">

            One intelligent workspace designed
            for modern productivity.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map(
            (
              feature,
              index
            ) => {

              const Icon =
                feature.icon;

              return (

                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-xl
                  "
                >

                  <div className="mb-6 inline-flex rounded-2xl bg-indigo-500/20 p-4">

                    <Icon className="h-8 w-8 text-indigo-400" />

                  </div>

                  <h3 className="text-2xl font-bold">

                    {feature.title}

                  </h3>

                  <p className="mt-4 text-slate-400 leading-7">

                    {feature.desc}

                  </p>

                </motion.div>

              );
            }
          )}

        </div>

      </div>
    </section>
  );
}