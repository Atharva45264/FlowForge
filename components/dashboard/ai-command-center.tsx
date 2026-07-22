"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  FileText,
  LayoutTemplate,
  MessageSquare,
  Sparkles,
  Wand2,
} from "lucide-react";

const actions = [
  {
    title: "Chat with AI",
    icon: MessageSquare,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Summarize PDF",
    icon: FileText,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Generate Diagram",
    icon: Wand2,
    color: "from-pink-500 to-orange-500",
  },
  {
    title: "Plan My Day",
    icon: Calendar,
    color: "from-emerald-500 to-green-500",
  },
];

export default function AICommandCenter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-[#111827] p-7"
    >
      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-400">
            AI COMMAND CENTER
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            What would you like to create today?
          </h2>

          <p className="mt-2 text-slate-400">
            Use FlowForge AI to automate your workflow.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-500/10 p-4">
          <Sparkles className="h-8 w-8 text-indigo-400" />
        </div>

      </div>

      <div className="relative">

        <input
          placeholder="Ask FlowForge AI anything..."
          className="h-16 w-full rounded-2xl border border-white/10 bg-slate-900 px-6 text-lg text-white outline-none transition focus:border-indigo-400"
        />

        <button
          className="absolute right-3 top-3 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-500"
        >
          Ask AI
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((item) => {

          const Icon = item.icon;

          return (
            <motion.button
              whileHover={{
                y: -6,
              }}
              whileTap={{
                scale: 0.97,
              }}
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-indigo-400/40"
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-linear-to-r ${item.color} p-3`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Launch instantly
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
            </motion.button>
          );
        })}

      </div>

      <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

        <div className="flex items-center gap-3">

          <LayoutTemplate className="h-5 w-5 text-indigo-300" />

          <div>

            <p className="font-semibold text-white">
              AI Suggestion
            </p>

            <p className="text-sm text-slate-300">
              Based on your recent work, generate a Software Architecture
              Diagram for FlowForge.
            </p>

          </div>

        </div>

      </div>
    </motion.section>
  );
}