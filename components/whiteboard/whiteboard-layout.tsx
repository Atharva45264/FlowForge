"use client";

import { WhiteboardSidebar } from "./whiteboard-sidebar";
import { WhiteboardTopbar } from "./whiteboard-topbar";
import { WhiteboardCanvas } from "./whiteboard-canvas";

export function WhiteboardLayout() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0F172A]">

      <WhiteboardSidebar />

      <div className="flex flex-1 flex-col">

        <WhiteboardTopbar />
<div className="flex flex-1 overflow-hidden">
        <WhiteboardCanvas />
</div>
      </div>

    </div>
  );
}