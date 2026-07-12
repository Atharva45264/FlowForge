"use client";

import { Search, FolderOpen } from "lucide-react";
import { useState } from "react";
import { ArchitectProject } from "@/types/architect";
import { useArchitectProject } from "@/hooks/use-architect-project";
import { ProjectCard } from "./project-card";

export function ProjectSidebar() {
  const {
    projects,
    loading,
  } = useArchitectProject();

  const [search, setSearch] =
    useState("");

  const filtered = projects.filter(
  (project: ArchitectProject) =>
    project.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
);

  return (
    <aside
      className="
        w-80
        border-r
        border-slate-800
        bg-[#020817]
        flex
        flex-col
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-violet-600/20
            "
          >
            <FolderOpen
              className="text-violet-400"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <p className="text-sm text-slate-400">
              Saved Architect Projects
            </p>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="p-5">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-slate-500
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search..."
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              py-2.5
              pl-10
              pr-4
              outline-none
              focus:border-violet-500
            "
          />
        </div>
      </div>

      {/* List */}

      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {loading ? (
          <p className="text-sm text-slate-400">
            Loading...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-500">
            No Projects Found
          </p>
        ) : (
          filtered.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))
        )}
      </div>
    </aside>
  );
}