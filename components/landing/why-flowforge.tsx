"use client";

import { motion } from "framer-motion";
import { MergingApp } from "./merging-app";

export function WhyFlowForge() {
  return (
    <section
      id="why-flowforge"
      className="relative overflow-hidden py-32"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-8">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            WHY FLOWFORGE
          </p>

          <h2 className="mt-6 text-5xl font-black leading-tight lg:text-6xl">
            Replace{" "}
            <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              5 Apps
            </span>
            <br />
            With One Workspace
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            Stop switching between ChatGPT, Trello, Notion, Calendar and
            Whiteboards.
            <br />
            FlowForge brings AI, planning, collaboration and productivity
            together in one beautiful workspace.
          </p>
        </motion.div>

        <MergingApp />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-3xl text-center"
        >
          <h3 className="text-4xl font-black">
            From Chaos.
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              To Clarity.
            </span>
          </h3>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Bring ideas, tasks, meetings, AI and collaboration together in one
            intelligent workspace designed to help your team move faster with
            less context switching.
          </p>
        </motion.div>
      </div>
    </section>
  );
}