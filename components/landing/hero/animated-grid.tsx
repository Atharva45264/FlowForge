"use client";

export function AnimatedGrid() {
  return (
    <div
      className="
        absolute
        inset-0
        opacity-20
        bg-size-[50px_50px]
        [background-image:
        linear-gradient(to_right,#334155_1px,transparent_1px),
        linear-gradient(to_bottom,#334155_1px,transparent_1px)]
      "
    />
  );
}