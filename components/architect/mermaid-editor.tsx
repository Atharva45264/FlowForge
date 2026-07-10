"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";

import { useArchitectStore } from "@/store/architect-store";

export function MermaidEditor() {
  const {
    mermaid,
    setMermaid,
  } = useArchitectStore();

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">
          Mermaid Code
        </h3>

        <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400">
          Editable
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700">
        <CodeMirror
          value={mermaid}
          height="280px"
          theme="dark"
          extensions={[markdown()]}
          onChange={(value) =>
            setMermaid(value)
          }
        />
      </div>
    </div>
  );
}