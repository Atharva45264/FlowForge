"use client";

import { PAGE_COVERS } from "@/lib/page-covers";

interface Props {
  value: string;
  onChange: (cover: string) => void;
}

export default function CoverPicker({
  value,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-background p-4 shadow-lg">

      {PAGE_COVERS.map((cover) => (
        <button
          key={cover.id}
          onClick={() => onChange(cover.id)}
          className={`rounded-2xl border transition ${
            value === cover.id
              ? "ring-2 ring-primary"
              : ""
          }`}
        >

          <div
            className={`h-20 rounded-t-2xl bg-linear-to-r ${cover.className}`}
          />

          <div className="p-3 text-sm font-medium">
            {cover.name}
          </div>

        </button>
      ))}

    </div>
  );
}