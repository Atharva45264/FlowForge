"use client";

import {
  Composer,
} from "@liveblocks/react-ui";

import "@liveblocks/react-ui/styles.css";

export function LiveTaskComments() {
  return (
    <div className="mt-4 border-t border-slate-700 pt-4">
      <h3 className="mb-3 text-sm font-medium text-slate-300">
        Live Discussion
      </h3>

      <Composer />
    </div>
  );
}