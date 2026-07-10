"use client";

import mermaid from "mermaid";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
});

export function MermaidViewer({
  chart,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function render() {
      if (!chart || !containerRef.current)
        return;

      try {
        setError("");

        const id =
          "mermaid-" +
          Date.now();

        const { svg } =
          await mermaid.render(
            id,
            chart
          );

        containerRef.current.innerHTML =
          svg;
      } catch (err) {
        console.error(err);

        setError(
          "Invalid Mermaid Diagram"
        );
      }
    }

    render();
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div
      id="mermaid-preview"
      ref={containerRef}
      className="
        flex
        justify-center
        overflow-auto
      "
    />
  );
}