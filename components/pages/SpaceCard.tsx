"use client";

import { MoreVertical, FileText, Clock } from "lucide-react";
import { Space } from "@/hooks/useSpaces";

interface SpaceCardProps {
  space: Space;
  onClick: () => void;
}

export default function SpaceCard({
  space,
  onClick,
}: SpaceCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm"
          style={{
            backgroundColor: `${space.color}20`,
          }}
        >
          {space.icon}
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-2 opacity-0 transition hover:bg-muted group-hover:opacity-100"
        >
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-5">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {space.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {space.description || "No description"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{space.pageCount} Pages</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDate(space.updatedAt)}</span>
        </div>

      </div>
    </div>
  );
}

function formatDate(date: string) {
  const now = new Date();
  const updated = new Date(date);

  const diff =
    Math.floor(
      (now.getTime() - updated.getTime()) /
      (1000 * 60 * 60 * 24)
    );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;

  return updated.toLocaleDateString();
}