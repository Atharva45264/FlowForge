"use client";

import { useRoom } from "@liveblocks/react";

export function LiveblocksDebug() {
  const room = useRoom();

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
      Connected Room: {room.id}
    </div>
  );
}