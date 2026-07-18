"use client";

import { Clock, Star } from "lucide-react";

import { Page } from "@/hooks/usePages";

interface Props {
  page: Page;
  selected: boolean;
  onClick: () => void;
}

export default function PageItem({
  page,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/10"
          : "hover:border-primary/40 hover:bg-muted/40"
      }`}
    >
      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-xl">
          {page.icon}
        </div>

        <div className="text-left">

          <h3 className="font-medium">
            {page.title}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">

            <Clock className="h-3.5 w-3.5" />

            {new Date(page.updatedAt).toLocaleDateString()}

          </div>

        </div>

      </div>

      {page.favorite && (
        <Star
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      )}
    </button>
  );
}