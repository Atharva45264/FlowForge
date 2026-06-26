"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-50
          -top-50
          h-125
          w-125
          rounded-full
          bg-violet-600/30
          blur-[120px]
        "
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 120, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-37.5
          -bottom-37.5
          h-125
          w-125
          rounded-full
          bg-cyan-500/20
          blur-[140px]
        "
      />

      {/* Pink Glow */}
      <motion.div
        animate={{
          y: [0, 100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-87.5
          w-87.5
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/20
          blur-[110px]
        "
      />
    </div>
  );
}