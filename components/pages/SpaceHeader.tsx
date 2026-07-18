"use client";

import { FilePlus2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Space } from "@/hooks/useSpaces";

interface SpaceHeaderProps {
  space: Space;
  onCreatePage: () => void;
}

export default function SpaceHeader({
  space,
  onCreatePage,
}: SpaceHeaderProps) {
  return (
    <div className="border-b bg-background px-8 py-6">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{
              backgroundColor: `${space.color}20`,
              color: space.color,
            }}
          >
            {space.icon}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {space.name}
            </h1>

            <p className="mt-1 text-muted-foreground">
              {space.description || "No description"}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {space.pageCount} Pages
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <Button
            onClick={onCreatePage}
          >
            <FilePlus2 className="mr-2 h-4 w-4" />

            New Page
          </Button>

          <Button
            size="icon"
            variant="outline"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>

        </div>

      </div>

    </div>
  );
}