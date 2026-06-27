"use client";

import { motion } from "framer-motion";

type Props = {
  show: boolean;
};

export function Explosion({ show }: Props) {
  if (!show) return null;

  return (
    <>
      <motion.div
        initial={{
          scale: 0,
          opacity: 1,
        }}
        animate={{
          scale: 5,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-48
          w-48
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/60
          blur-[70px]
        "
      />

      <motion.div
        initial={{
          scale: 0,
          opacity: 1,
        }}
        animate={{
          scale: 8,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white
        "
      />
    </>
  );
}