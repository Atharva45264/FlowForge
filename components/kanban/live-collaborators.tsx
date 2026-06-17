"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  useMyPresence,
  useOthers,
} from "@liveblocks/react";

export function LiveCollaborators() {
  const [
    myPresence,
    updateMyPresence,
  ] = useMyPresence();
  const { user } = useUser();
  useEffect(() => {
  if (!user) return;

  updateMyPresence({
    name:
      user.fullName ??
      user.firstName ??
      "User",
  });
}, [user, updateMyPresence]);

  const others = useOthers();

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
        {
  (
    user?.firstName?.[0] ??
    user?.fullName?.[0] ??
    "U"
  ).toUpperCase()
}
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