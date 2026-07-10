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
    prompt: "Create a flowchart using Mermaid.",
  },
  {
    title: "ER Diagram",
    icon: Database,
    prompt: "Generate an ER Diagram for an E-Commerce System using Mermaid.",
  },
  {
    title: "Microservices",
    icon: Boxes,
    prompt: "Design a Food Delivery Microservice Architecture using Mermaid.",
  },
  {
    title: "AWS Cloud",
    icon: Cloud,
    prompt: "Design an AWS Cloud Architecture using Mermaid.",
  },
  {
    title: "Sequence",
    icon: GitBranch,
    prompt: "Generate a User Login Sequence Diagram using Mermaid.",
  },
  {
    title: "System Design",
    icon: Network,
    prompt: "Design a Netflix System Architecture using Mermaid.",
  },
];

export function TemplateSidebar() {
  const setPrompt = useArchitectStore(
    (state) => state.setPrompt
  );

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
              onClick={() =>
                setPrompt(template.prompt)
              }
              className="
                flex
                w-full
                items-center
                gap-4
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                p-4
                transition-all
                hover:border-violet-500
                hover:bg-slate-800
              "
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