"use client";

import { motion } from "framer-motion";

export default function DashboardBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0 bg-[#0b1120]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Orb 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute -left-30 -top-30 h-105 w-105 rounded-full bg-indigo-600/20 blur-[140px]"
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute -right-40 top-[20%] h-105 w-105 rounded-full bg-violet-600/20 blur-[150px]"
      />

      {/* Orb 3 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 120, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute -bottom-45 left-[35%] h-105 w-105 rounded-full bg-cyan-500/15 blur-[160px]"
      />
    </div>
  );
}