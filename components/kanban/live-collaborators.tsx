"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  useMyPresence,
  useOthers,
} from "@liveblocks/react";

export function LiveCollaborators() {
  const [, updateMyPresence] =
  useMyPresence();
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
  <div className="flex items-center justify-between">
    <div className="flex -space-x-2">
      <div
        className="
          flex h-9 w-9 items-center
          justify-center rounded-full
          border-2 border-[#1F2937]
          bg-indigo-500
          text-sm font-semibold text-white
        "
      >
        {(
          user?.firstName?.[0] ??
          user?.fullName?.[0] ??
          "U"
        ).toUpperCase()}
      </div>

      {others.map((other) => (
        <div
          key={other.connectionId}
          className="
            flex h-9 w-9 items-center
            justify-center rounded-full
            border-2 border-[#1F2937]
            bg-emerald-500
            text-sm font-semibold text-white
          "
        >
          {String(
            other.presence?.name ?? "U"
          )
            .charAt(0)
            .toUpperCase()}
        </div>
      ))}
    </div>

    <span className="text-sm text-slate-400">
      {others.length + 1} online
    </span>
  </div>
);
}