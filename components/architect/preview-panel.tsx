"use client";

import {
  Copy,
  Download,
 Image,
  Save,
} from "lucide-react";

export function PreviewPanel() {
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
          <button
            className="
              rounded-xl
              border
              border-slate-700
              p-2.5
              transition
              hover:bg-slate-800
            "
          >
            <Copy size={18} />
          </button>

          <button
            className="
              rounded-xl
              border
              border-slate-700
              p-2.5
              transition
              hover:bg-slate-800
            "
          >
            <Download size={18} />
          </button>

          <button
            className="
              rounded-xl
              border
              border-slate-700
              p-2.5
              transition
              hover:bg-slate-800
            "
          >
            <Image size={18} />
          </button>

          <button
            className="
              rounded-xl
              border
              border-slate-700
              p-2.5
              transition
              hover:bg-slate-800
            "
          >
            <Save size={18} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex flex-1 items-center justify-center p-8">
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

          <h3 className="text-xl font-semibold text-white">
            Diagram Preview
          </h3>

          <p className="mt-2 max-w-md text-center text-slate-400">
            Generate an architecture from the prompt and
            your Mermaid diagram will be rendered here in
            real time.
          </p>
        </div>
      </div>
    </section>
  );
}