"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
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

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const sectionIds = useMemo(
    () =>
      navItems.map((item) =>
        item.href.replace("#", "")
      ),
    []
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin:
          "-100px 0px -45% 0px",
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
    const section =
      document.querySelector(href);

    if (!section) return;

    const navbarHeight = 90;

    const y =
      (section as HTMLElement)
        .getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setMobileOpen(false);
  };

  const NavLink = ({
    label,
    href,
  }: {
    label: string;
    href: string;
  }) => {
    const active =
      activeSection ===
      href.replace("#", "");

    return (
      <button
        onClick={() =>
          scrollToSection(href)
        }
        className={`group relative py-2 text-sm font-medium transition-all duration-300 ${
          active
            ? "text-white"
            : "text-slate-300 hover:text-white"
        }`}
      >
        {label}

        <span
          className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-300 ${
            active
              ? "w-full"
              : "w-0 group-hover:w-full"
          }`}
        />
      </button>
    );
  };
    return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="fixed inset-x-0 top-5 z-50 px-5"
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-slate-950/85 shadow-2xl shadow-black/40 backdrop-blur-2xl"
              : "border-white/5 bg-slate-950/45 backdrop-blur-xl"
          } px-6`}
        >
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: -10,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-500 shadow-lg shadow-indigo-500/25"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>

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
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            {/* Mobile Menu */}

            <button
              onClick={() =>
                setMobileOpen((prev) => !prev)
              }
              className="rounded-xl border border-white/10 p-2 text-slate-300 transition-all hover:bg-white/5 hover:text-white lg:hidden"
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
                    className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
                  >
                    Open Workspace

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <UserButton />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40">
                      Start Free

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

          </div>
        </div>
      </motion.header>
            {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed left-5 right-5 top-24 z-40 lg:hidden"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-3xl">

              <div className="space-y-2">
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
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                        active
                          ? "bg-linear-to-r from-indigo-500/20 to-cyan-500/10 text-cyan-400"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="font-medium">
                        {item.label}
                      </span>

                      {active && (
                        <motion.div
                          layoutId="mobile-active"
                          className="h-2 w-2 rounded-full bg-cyan-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-white/10" />

              {isSignedIn ? (
                <div className="space-y-4">
                  <Link
                    href="/workspace"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                  >
                    Open Workspace

                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <SignInButton mode="modal">
                    <button className="w-full rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="w-full rounded-2xl bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                      Start Free
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}