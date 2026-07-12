"use client";

import { Star } from "lucide-react";

import { ArchitectProject } from "@/types/architect";
import { ProjectMenu } from "./project-menu";

import { useArchitectStore } from "@/store/architect-store";

interface Props {
  project: ArchitectProject;
}

export function ProjectCard({
  project,
}: Props) {
  const {
    setPrompt,
    setMermaid,
    setCurrentProject,
    currentProjectId,
  } = useArchitectStore();

  function handleOpen() {
    setPrompt(project.prompt);

    setMermaid(project.mermaid);

    setCurrentProject(project._id);
  }

  const active =
    currentProjectId === project._id;


    return (
  <div
    onClick={handleOpen}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (
        e.key === "Enter" ||
        e.key === " "
      ) {
        handleOpen();
      }
    }}
    className={`
      group
      mb-3
      flex
      w-full
      cursor-pointer
      items-start
      justify-between
      rounded-xl
      border
      p-4
      text-left
      transition-all

      ${
        active
          ? "border-violet-500 bg-violet-500/10"
          : "border-slate-700 bg-slate-900 hover:border-violet-500 hover:bg-slate-800"
      }
    `}
  >
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="truncate font-semibold text-white">
          {project.title}
        </h3>

        {project.favorite && (
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />
        )}
      </div>

      <p className="mt-1 truncate text-xs text-slate-400">
        {new Date(
          project.updatedAt
        ).toLocaleDateString()}
      </p>
    </div>

    <ProjectMenu project={project} />
  </div>
);
}