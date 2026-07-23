"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is FlowForge?",
    answer:
      "FlowForge is an AI-powered productivity workspace that combines Notes, Whiteboards, Pages, Calendar, AI Assistant, Architect and Global Search into one seamless platform.",
  },
  {
    question: "Can I use Google Calendar with FlowForge?",
    answer:
      "Yes. FlowForge supports Google Calendar integration so you can sync events between your workspace and your Google account.",
  },
  {
    question: "Is AI included in every plan?",
    answer:
      "Yes. Every plan includes AI features. Higher plans unlock unlimited AI usage, advanced productivity tools and collaboration features.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Absolutely. FlowForge includes real-time collaboration on whiteboards, shared workspaces and team productivity tools for seamless collaboration.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Authentication is handled securely through Clerk and your workspace data is stored safely with modern backend technologies and secure APIs.",
  },
  {
    question: "Will more features be added?",
    answer:
      "Definitely. FlowForge is continuously evolving with upcoming modules like Notifications, Settings, AI improvements and additional integrations.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)]" />

      <div className="absolute left-1/2 top-32 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            FAQ
          </p>

          <h2 className="mt-6 text-5xl font-black lg:text-6xl">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Everything you need to know before getting started with
            FlowForge.
          </p>
        </motion.div>

        {/* FAQ Items */}

        <div className="mt-20 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-500/40 bg-slate-900/70"
                    : "border-white/10 bg-slate-900/40 hover:border-violet-500/30 hover:bg-slate-900/60"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between p-7 text-left"
                >
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="ml-6 flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/10"
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <Plus className="h-5 w-5 text-cyan-400" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div className="px-7 pb-7">
                        <div className="h-px bg-white/10 mb-6" />

                        <p className="leading-8 text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Card */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
          }}
          className="mt-20 rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 to-cyan-500/5 p-10 text-center backdrop-blur-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15">
            <MessageCircle className="h-8 w-8 text-cyan-400" />
          </div>

          <h3 className="mt-6 text-3xl font-bold text-white">
            Still have questions?
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-400">
            We'd love to help. Reach out to us anytime and we'll answer
            all your questions about FlowForge.
          </p>

          <a
  href="https://www.linkedin.com/in/YOUR-LINKEDIN"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/50"
>
  Let's Connect
</a>
        </motion.div>
      </div>
    </section>
  );
}