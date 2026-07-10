"use client";

import {
  Boxes,
  Database,
  Workflow,
  Cloud,
  GitBranch,
  Network,
} from "lucide-react";

const templates = [
  {
    title: "Flowchart",
    icon: Workflow,
  },
  {
    title: "ER Diagram",
    icon: Database,
  },
  {
    title: "Microservices",
    icon: Boxes,
  },
  {
    title: "AWS Cloud",
    icon: Cloud,
  },
  {
    title: "Sequence",
    icon: GitBranch,
  },
  {
    title: "System Design",
    icon: Network,
  },
];

export function TemplateSidebar() {
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

              <span className="font-medium">
                {template.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}