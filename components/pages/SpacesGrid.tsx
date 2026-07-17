"use client";

import { Plus } from "lucide-react";

import { useSpaces } from "@/hooks/useSpaces";
import { usePageStore } from "@/store/pageStore";

import SpaceCard from "./SpaceCard";

export default function SpacesGrid() {
  const { data: spaces = [], isLoading } = useSpaces();

  const setSelectedSpaceId = usePageStore(
    (state) => state.setSelectedSpaceId
  );

  const setCreateSpaceOpen = usePageStore(
    (state) => state.setCreateSpaceOpen
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading Spaces...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">

      {/* Header */}

      <div className="border-b px-8 py-6">

        <h1 className="text-3xl font-bold">
          All Spaces
        </h1>

        <p className="mt-2 text-muted-foreground">
          Organize your notes, documents and ideas into spaces.
        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 xl:grid-cols-3">

        {/* Create Space Card */}

        <button
          onClick={() => setCreateSpaceOpen(true)}
          className="group flex min-h-55 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted transition hover:border-primary hover:bg-muted/40"
        >

          <div className="rounded-full bg-primary/10 p-4 transition group-hover:scale-110">

            <Plus className="h-8 w-8 text-primary" />

          </div>

          <h3 className="mt-5 text-lg font-semibold">
            Create New Space
          </h3>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Start organizing a new workspace
          </p>

        </button>

        {/* Existing Spaces */}

        {spaces.map((space) => (
          <SpaceCard
            key={space._id}
            space={space}
            onClick={() => setSelectedSpaceId(space._id)}
          />
        ))}

      </div>

    </div>
  );
}