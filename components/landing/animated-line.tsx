"use client";

import { motion } from "framer-motion";

type AnimatedLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
};

export function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
}: AnimatedLineProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#lineGradient)"
      strokeWidth="2"
      strokeLinecap="round"

      initial={{
        pathLength: 0,
        opacity: 0,
      }}

      animate={{
        pathLength: 1,
        opacity: 1,
      }}

      transition={{
        duration: 0.8,
        delay,
      }}
    />
  );
}