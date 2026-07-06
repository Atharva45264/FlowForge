"use client";

import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  () =>
    import("@excalidraw/excalidraw").then(
      (mod) => mod.Excalidraw
    ),
  {
    ssr: false,
  }
);

export function WhiteboardCanvas() {
  return (
    <div
      className="
        h-full
        w-full
        overflow-hidden
        bg-[#1F2937]
      "
    >
      <Excalidraw
        theme="dark"
      />
    </div>
  );
}