"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { AuroraBackground } from "../shared/aurora-background";
import { AnimatedGrid } from "../hero/animated-grid";
import { WorkspacePreview }
from "../why/workspace-preview";
import { MagneticButton } from "../hero/magnetic-button";
import { MouseSpotlight } from "../features/mouse-spotlight";
import { Particles } from "../hero/particles";

export function Hero() {
  return (
    <section 
    id="home"
    className="relative overflow-hidden">
      <MouseSpotlight />
      <Particles />
      <AuroraBackground />
      <AnimatedGrid />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-350 items-center justify-between gap-10 px-8 pt-28">

        {/* LEFT */}
        <div className="max-w-145">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            AI Powered Productivity Workspace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl font-black leading-[0.95] md:text-6xl lg:text-[5.3rem]"
          >
            Forge Ideas.

            <br />

            <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Build Together.
            </span>

            <br />

            Ship Faster.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-140 text-lg leading-8 text-slate-400"
          >
            FlowForge unifies AI, Kanban, Notes, Whiteboards,
            Calendar and Live Collaboration into one intelligent
            productivity operating system built for modern teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton className="rounded-xl bg-indigo-500 px-7 py-4 font-semibold shadow-xl shadow-indigo-500/30 transition hover:bg-indigo-600">
              <div className="flex items-center gap-2">
                Start Free
                <ArrowRight className="h-5 w-5" />
              </div>
            </MagneticButton>

            <MagneticButton className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-medium backdrop-blur transition hover:border-violet-500">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Live Demo
              </div>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex gap-10"
          >
            <div>
              <h3 className="text-3xl font-bold text-white">
                100%
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Realtime
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                AI
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Powered
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                24/7
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Collaboration
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="hidden xl:flex items-center justify-center"
        >
        <WorkspacePreview />
        </motion.div>

      </div>
    </section>
  );
}