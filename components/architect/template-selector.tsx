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
    prompt: "Create a software flowchart for",
  },
  {
    title: "Database Design",
    icon: Database,
    prompt: "Design a relational database for",
  },
  {
    title: "Microservices",
    icon: Boxes,
    prompt: "Design a microservices architecture for",
  },
  {
    title: "AWS Cloud",
    icon: Cloud,
    prompt: "Design an AWS cloud architecture for",
  },
  {
    title: "Sequence",
    icon: GitBranch,
    prompt: "Create a sequence diagram for",
  },
  {
    title: "Application Architecture",
    icon: Network,
    prompt: "Design an application architecture for",
  },
];

export function TemplateSelector() {
  const {
    selectedTemplate,
    setSelectedTemplate,
    setPrompt,
  } = useArchitectStore();

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-300">
          Templates
        </h3>

        <p className="text-xs text-slate-500">
          Choose a starting point for AI generation
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
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
                  `${template.prompt} `
                );
              }}
              className={`
                rounded-xl
                border
                p-4
                text-left
                transition-all

                ${
                  selectedTemplate ===
                  template.title
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-slate-700 bg-slate-900 hover:border-violet-500 hover:bg-slate-800"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={22}
                  className="text-violet-400"
                />

                <div>
                  <p className="font-medium">
                    {template.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    Click to use template
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}