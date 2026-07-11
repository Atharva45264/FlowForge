"use client";

import {
  Boxes,
  Cloud,
  Database,
  GitBranch,
  Network,
  Workflow,
} from "lucide-react";

import { useArchitectStore } from "@/store/architect-store";

const templates = [
  {
    title: "Flowchart",
    icon: Workflow,
    prompt: "Create a software flowchart for ",
  },
  {
    title: "ER Diagram",
    icon: Database,
    prompt: "Create an ER diagram for ",
  },
  {
    title: "Microservices",
    icon: Boxes,
    prompt: "Design a microservices architecture for ",
  },
  {
    title: "AWS Cloud",
    icon: Cloud,
    prompt: "Design an AWS cloud architecture for ",
  },
  {
    title: "Sequence",
    icon: GitBranch,
    prompt: "Create a sequence diagram for ",
  },
  {
    title: "System Design",
    icon: Network,
    prompt: "Design a scalable system for ",
  },
];

export function TemplateSidebar() {
  const {
    setPrompt,
    setSelectedTemplate,
    selectedTemplate,
  } = useArchitectStore();

  return (
    <aside
      className="
        w-72
        border-r
        border-slate-800
        bg-[#111827]
        p-5
      "
    >
      <h2
        className="
          mb-5
          text-sm
          font-semibold
          uppercase
          tracking-widest
          text-slate-400
        "
      >
        Templates
      </h2>

      <div className="space-y-3">
        {templates.map((template) => {
          const Icon = template.icon;

          return (
            <button
              key={template.title}
              onClick={() => {
                setSelectedTemplate(
                  template.title
                );

                setPrompt(
                  template.prompt
                );
              }}
              className={`
                flex
                w-full
                items-center
                gap-4
                rounded-xl
                border
                p-4
                transition-all

                ${
                  selectedTemplate ===
                  template.title
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-slate-700 bg-slate-900 hover:border-violet-500 hover:bg-slate-800"
                }
              `}
            >
              <Icon
                size={22}
                className="text-violet-400"
              />

              <div className="text-left">
                <p className="font-medium text-white">
                  {template.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Click to use template
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}