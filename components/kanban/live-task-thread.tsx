"use client";

import {
  Composer,
} from "@liveblocks/react-ui";

import "@liveblocks/react-ui/styles.css";

type Props = {
  taskId: string;
};

export function LiveTaskThread({
  taskId,
}: Props) {
  return (
    <div className="space-y-4">
      <div
        className="
          rounded-lg border
          border-slate-700 p-3
        "
      >
        <p className="text-sm text-slate-400">
          Live discussion for:
        </p>

        <p className="mt-1 text-sm font-medium text-white">
          {taskId}
        </p>
      </div>

      <Composer />
    </div>
  );
}