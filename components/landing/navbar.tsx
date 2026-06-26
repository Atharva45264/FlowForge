"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LandingNavbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1020]/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-indigo-500 p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              FlowForge
            </h1>

            <p className="text-xs text-slate-400">
              Productivity OS
            </p>
          </div>
        </Link>

        <nav className="hidden gap-8 text-sm text-slate-300 lg:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#workspace" className="hover:text-white">
            Workspace
          </a>

          <a href="#ai" className="hover:text-white">
            AI
          </a>

          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <UserButton />

          <Link
            href="/kanban"
            className="rounded-xl bg-indigo-500 px-5 py-2.5 font-medium transition hover:bg-indigo-600"
          >
            Open Workspace
          </Link>
        </div>
      </div>
    </motion.header>
  );
}