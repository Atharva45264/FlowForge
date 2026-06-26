"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AITyping } from "./ai-typing";
import { useRef } from "react";
import { KanbanPreview } from "./kanban-preview";
import { LiveActivity } from "./live-activity";
import {
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  FileText,
  MoreHorizontal,
} from "lucide-react";

export function WorkspacePreview() {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 120,
    damping: 18,
  });

  const springY = useSpring(rotateY, {
    stiffness: 120,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    rotateY.set((x - centerX) / 25);

    rotateX.set(-(y - centerY) / 25);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
  <div className="relative">

    {/* Glow Behind Dashboard */}
    <div
      className="
        absolute
        -inset-20
        -z-10
        rounded-full
        bg-linear-to-r
        from-violet-500/20
        via-cyan-500/10
        to-indigo-500/20
        blur-[120px]
      "
    />

    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 2000,
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="
        relative
        h-160
        w-190
        overflow-hidden
        rounded-4xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_40px_120px_rgba(99,102,241,0.35)]
      "
    >

      {/* Glass Reflection */}

      <motion.div
        animate={{
          x: [-900, 900],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          top-0
          h-full
          w-28
          -skew-x-12
          bg-linear-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

        <div>

          <h3 className="text-xl font-bold">
            FlowForge
          </h3>

          <p className="text-xs text-slate-400">
            Productivity Workspace
          </p>

          <LiveActivity />

        </div>

        <div className="flex items-center gap-3">

          <div className="flex -space-x-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111827] bg-violet-500 text-xs font-bold">
              A
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111827] bg-emerald-500 text-xs font-bold">
              R
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111827] bg-cyan-500 text-xs font-bold">
              S
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111827] bg-slate-700 text-xs">
              +5
            </div>

          </div>

          <MoreHorizontal className="h-5 w-5 text-slate-400" />

        </div>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-5 p-5">

        {/* Kanban */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">

          <div className="mb-4 flex items-center gap-2">

            <CheckCircle2 className="text-violet-400" />

            <h4 className="font-semibold">
              Kanban
            </h4>

          </div>

          <KanbanPreview />

        </div>

        {/* AI */}

        <motion.div
          animate={{
            opacity: [1, .85, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4"
        >

          <div className="mb-4 flex items-center gap-2">

            <BrainCircuit className="text-violet-400" />

            <h4 className="font-semibold">
              AI Assistant
            </h4>

          </div>

          <AITyping />

        </motion.div>

        {/* Calendar */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">

          <div className="mb-4 flex items-center gap-2">

            <CalendarDays className="text-cyan-400" />

            <h4 className="font-semibold">
              Calendar
            </h4>

          </div>

          <p className="text-sm text-slate-300">
            Today
          </p>

          <p className="mt-2 text-4xl font-bold">
            3
          </p>

          <p className="text-sm text-slate-400">
            Meetings Scheduled
          </p>

        </div>

        {/* Notes */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">

          <div className="mb-4 flex items-center gap-2">

            <FileText className="text-emerald-400" />

            <h4 className="font-semibold">
              Notes
            </h4>

          </div>

          <p className="text-sm text-slate-300">
            Product Roadmap
          </p>

          <p className="mt-2 text-sm text-slate-500">
            AI generated meeting summary...
          </p>

        </div>

      </div>

    </motion.div>

  </div>
);
}
