"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Workspace", href: "/dashboard" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Roadmap", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Privacy", href: "#" },
];

const technologies = [
  "Next.js",
  "Gemini AI",
  "MongoDB",
  "Clerk",
  "Liveblocks",
  "Tailwind CSS",
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Atharva45264",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "YOUR_LINKEDIN_URL",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:YOUR_EMAIL",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-20">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)]" />

      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top */}

        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  FlowForge
                </h2>

                <p className="text-sm text-violet-400">
                  AI Productivity OS
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-md leading-8 text-slate-400">
              One intelligent workspace to organize projects,
              collaborate in real time and supercharge productivity
              with AI.
            </p>

            <div className="mt-10 flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10"
                  >
                    <Icon className="h-5 w-5 text-slate-300 transition-colors group-hover:text-cyan-400" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Product */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="mb-6 text-lg font-bold">
              Product
            </h3>

            <div className="space-y-4">
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Resources */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-6 text-lg font-bold">
              Resources
            </h3>

            <div className="space-y-4">
              {resourceLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-10"
        >
          <p className="mb-6 text-center text-sm uppercase tracking-[0.3em] text-slate-500">
            Built With
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row"
        >
          <p>
            © {new Date().getFullYear()} FlowForge. All rights reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-white">
              Atharva Phanse
            </span>{" "}
            ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}