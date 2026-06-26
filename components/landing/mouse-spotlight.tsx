"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function MouseSpotlight() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="
        pointer-events-none
        fixed
        z-0
        h-125
        w-125
        rounded-full
        bg-violet-500/20
        blur-[140px]
      "
    />
  );
}