"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Why FlowForge",
    href: "#why-flowforge",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export function LandingNavbar() {
  const { isSignedIn } = useUser();

  const [activeSection, setActiveSection] =
    useState("why-flowforge");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const sectionIds = useMemo(
    () =>
      navItems.map((item) =>
        item.href.replace("#", "")
      ),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const element =
        document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (
    href: string
  ) => {
    const id = href.replace("#", "");

    const section =
      document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
  };
    return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-5 z-50 px-5"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-6 backdrop-blur-2xl shadow-2xl shadow-black/30">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                FlowForge
              </h2>

              <p className="text-xs text-slate-400">
                Productivity OS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const active =
                activeSection ===
                item.href.replace("#", "");

              return (
                <button
                  key={item.label}
                  onClick={() =>
                    scrollToSection(item.href)
                  }
                  className={`group relative text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              {isSignedIn ? (
                <>
                  <Link
                    href="/workspace"
                    className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
                  >
                    Open Workspace

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <UserButton />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40">
                      Start Free

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed left-5 right-5 top-24 z-40 rounded-2xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-5">

              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    scrollToSection(item.href)
                  }
                  className={`rounded-xl px-4 py-3 text-left transition-all ${
                    activeSection ===
                    item.href.replace("#", "")
                      ? "bg-indigo-500/15 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-2 border-t border-white/10 pt-5">

                {isSignedIn ? (
                  <Link
                    href="/workspace"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white"
                  >
                    Open Workspace

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <button className="w-full rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white">
                      Start Free
                    </button>
                  </SignUpButton>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}