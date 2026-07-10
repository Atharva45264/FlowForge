"use client";

import {
  Copy,
  Download,
 Image,
  Save,
} from "lucide-react";
import { MermaidViewer } from "./mermaid-viewer";
import { useArchitectStore } from "@/store/architect-store";
import { PreviewToolbar } from "./preview-toolbar";

export function PreviewPanel() {
    const mermaid =
useArchitectStore(
(state)=>state.mermaid
);
  return (
    
    <section className="flex flex-1 flex-col bg-[#0B1220]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Live Preview
          </h2>

          <p className="text-sm text-slate-400">
            Mermaid diagram will appear here.
          </p>
        </div>

        <div className="flex gap-2">
            <PreviewToolbar />
      </div>
        </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8">
  {!mermaid ? (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-700
        bg-slate-900/40
      "
    >
      <div className="mb-6 text-6xl">
        🏗️
      </div>

      <h3 className="text-xl font-semibold">
        Diagram Preview
      </h3>

      <p className="mt-2 max-w-md text-center text-slate-400">
        Generate a Mermaid diagram and it
        will appear here.
      </p>
    </div>
  ) : (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-white
        p-8
      "
    >
      <MermaidViewer
        chart={mermaid}
      />
    </div>
  )}
</div>
    </section>
  );
}