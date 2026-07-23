"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Calendar, PenTool, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    label: "AI Assistant",
  },
  {
    icon: PenTool,
    label: "Whiteboards",
  },
  {
    icon: Calendar,
    label: "Calendar Sync",
  },
  {
    icon: Users,
    label: "Live Collaboration",
  },
];

const techStack = [
  "Gemini AI",
  "Next.js",
  "Clerk",
  "MongoDB",
  "Liveblocks",
  "Tailwind CSS",
];

export function CTA() {
  return (
    <section className="relative overflow-hidden py-36">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_65%)]" />

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-10 backdrop-blur-xl md:p-16"
        >
          {/* Floating Badge */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2"
          >
            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium text-violet-300">
              Build smarter with AI
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-4xl text-center text-5xl font-black leading-tight lg:text-7xl"
          >
            Ready to Forge

            <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Your Next Workspace?
            </span>
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-slate-400"
          >
            Organize projects, collaborate in real time, brainstorm ideas,
            manage calendars and boost productivity with AI — all in one
            beautiful workspace.
          </motion.p>

          {/* CTA Button */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/50"
            >
              Start Building Free

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Features */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>

                  <p className="font-semibold text-white">
                    {feature.label}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Tech Stack */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
            className="mt-16"
          >
            <p className="mb-6 text-center text-sm uppercase tracking-[0.3em] text-slate-500">
              Powered By
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-violet-500/40 hover:text-white"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}