"use client";

import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Users,
  Rocket,
  Building2,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Users,
    price: "Free",
    description:
      "Perfect for students, freelancers and individual developers.",
    button: "Start Free",
    popular: false,
    features: [
      "AI Assistant",
      "Notes",
      "Pages",
      "Calendar",
      "Whiteboard",
      "Global Search",
      "1 Workspace",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "₹499",
    duration: "/month",
    description:
      "Everything you need for serious productivity and collaboration.",
    button: "Start Building",
    popular: true,
    features: [
      "Unlimited AI",
      "Unlimited Workspaces",
      "Google Calendar Sync",
      "Live Collaboration",
      "AI Architect",
      "Priority Support",
      "Unlimited Storage",
      "Advanced Analytics",
    ],
  },
  {
    name: "Teams",
    icon: Building2,
    price: "Custom",
    description:
      "Best for startups and growing teams collaborating together.",
    button: "Contact Us",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited Members",
      "Shared Workspaces",
      "Advanced Permissions",
      "Team Analytics",
      "Priority Onboarding",
      "Dedicated Success Manager",
      "Future Enterprise Features",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_65%)]" />

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            PRICING
          </p>

          <h2 className="mt-6 text-5xl font-black lg:text-6xl">
            Choose the

            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Perfect Plan
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Whether you're working solo or collaborating with a team,
            FlowForge grows with your workflow.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
                      {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -12,
                }}
                className={`group relative ${
                  plan.popular ? "lg:scale-105 lg:-mt-4" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 opacity-40 blur-2xl transition-all duration-500 group-hover:opacity-70" />
                )}

                <div
                  className={`relative h-full overflow-hidden rounded-3xl border transition-all duration-500 ${
                    plan.popular
                      ? "border-violet-500/60 bg-gradient-to-b from-violet-500/10 to-slate-900"
                      : "border-white/10 bg-slate-900/60 backdrop-blur-xl group-hover:border-violet-500/40"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                      ⭐ Recommended
                    </div>
                  )}

                  <div className="p-8">

                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                      <Icon className="h-8 w-8 text-cyan-400" />
                    </div>

                    <h3 className="text-3xl font-bold">
                      {plan.name}
                    </h3>

                    <p className="mt-3 text-slate-400">
                      {plan.description}
                    </p>

                    <div className="mt-8 flex items-end gap-2">

                      <span
                        className={`text-5xl font-black ${
                          plan.popular
                            ? "bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent"
                            : ""
                        }`}
                      >
                        {plan.price}
                      </span>

                      {plan.duration && (
                        <span className="pb-2 text-slate-400">
                          {plan.duration}
                        </span>
                      )}

                    </div>

                    <button
                      className={`mt-8 w-full rounded-2xl py-3 font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30 hover:scale-[1.02]"
                          : "border border-white/10 bg-white/5 text-white hover:border-violet-500/40 hover:bg-white/10"
                      }`}
                    >
                      {plan.button}
                    </button>

                    <div className="my-8 h-px bg-white/10" />

                    <div className="space-y-4">
                      {plan.features.map((feature) => (
                        <motion.div
                          whileHover={{
                            x: 6,
                          }}
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15">
                            <Check className="h-3.5 w-3.5 text-cyan-400" />
                          </div>

                          <span className="text-slate-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl"
        >
          <div className="border-b border-white/10 p-8 text-center">
            <h3 className="text-3xl font-bold">
              Compare Plans
            </h3>

            <p className="mt-3 text-slate-400">
              Pick the plan that best fits your workflow.
            </p>
          </div>

          <div className="grid grid-cols-4 text-center">

            <div className="border-r border-white/10 p-5 font-semibold">
              Features
            </div>

            <div className="border-r border-white/10 p-5">
              Starter
            </div>

            <div className="border-r border-white/10 bg-violet-500/10 p-5 font-semibold text-cyan-400">
              Pro
            </div>

            <div className="p-5">
              Teams
            </div>

            {[
              "AI Assistant",
              "Google Calendar",
              "Whiteboard",
              "AI Architect",
              "Live Collaboration",
            ].map((feature) => (
              <>
                <div
                  key={feature + "-label"}
                  className="border-r border-t border-white/10 p-5 text-left"
                >
                  {feature}
                </div>

                <div className="border-r border-t border-white/10 p-5">
                  ✓
                </div>

                <div className="border-r border-t border-white/10 bg-violet-500/5 p-5">
                  ✓
                </div>

                <div className="border-t border-white/10 p-5">
                  ✓
                </div>
              </>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}