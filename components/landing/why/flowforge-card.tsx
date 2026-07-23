"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

type Props = {
  show: boolean;
};

export function FlowForgeCard({ show }: Props) {
  if (!show) return null;

  return (
    <motion.div
      initial={{
        scale: 0,
        rotate: -20,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 16,
      }}
      className="
        absolute
        left-1/2
        top-1/2
        z-30
        flex
        h-56
        w-56
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-violet-400/30
        bg-linear-to-br
        from-violet-600
        via-indigo-600
        to-cyan-500
        shadow-[0_0_90px_rgba(99,102,241,.45)]
      "
    >
      {/* Glow */}

      <motion.div
  animate={{
    scale: [1, 1.25, 1],
    opacity: [0.25, 0.65, 0.25],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
  }}
  className="
    absolute
    inset-0
    rounded-3xl
    bg-violet-500/25
    blur-[55px]
  "
/>

      <BrainCircuit className="mb-5 h-14 w-14 text-white" />

      <h2 className="relative z-10 text-4xl font-black">
        FlowForge
      </h2>

      <p className="relative z-10 mt-2 text-xs text-slate-200">
        Productivity OS
      </p>
    </motion.div>
  );
}