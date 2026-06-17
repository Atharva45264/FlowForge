"use client";

import { useEffect } from "react";

import {
  useMyPresence,
  useOthers,
} from "@liveblocks/react";

export function LiveCollaborators() {
  const [
    myPresence,
    updateMyPresence,
  ] = useMyPresence();

  useEffect(() => {
    updateMyPresence({
      name: "Atharva",
    });
  }, [updateMyPresence]);

  const others = useOthers();

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
        A
      </div>

      {others.map((user) => (
        <div
          key={user.connectionId}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white"
        >
          U
        </div>
      ))}

      <span className="text-xs text-slate-400">
        {others.length + 1} online
      </span>
    </div>
  );
}