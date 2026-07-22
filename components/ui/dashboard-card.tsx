"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function DashboardCard({
  children,
  className,
  hover = true,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              transition: {
                duration: 0.2,
              },
            }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/10",
        "bg-slate-900/70",
        "backdrop-blur-xl",
        "transition-all duration-300",
        hover &&
          "hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10",
        className
      )}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
      </div>

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}