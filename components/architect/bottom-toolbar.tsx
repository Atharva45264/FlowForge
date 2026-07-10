"use client";

import {
  Sparkles,
  Clipboard,
  Download,
  Save,
  RefreshCcw,
} from "lucide-react";

export function BottomToolbar() {
  return (
    <footer
      className="
        flex
        items-center
        justify-between
        border-t
        border-slate-800
        bg-[#111827]
        px-6
        py-3
      "
    >
      <div className="flex gap-2">
        <ToolbarButton
          icon={<Clipboard size={16} />}
          label="Copy"
        />

        <ToolbarButton
          icon={<Download size={16} />}
          label="Export"
        />

        <ToolbarButton
          icon={<Save size={16} />}
          label="Save"
        />
      </div>

      <div className="flex gap-2">
        <ToolbarButton
          icon={<RefreshCcw size={16} />}
          label="Regenerate"
        />

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-4
            py-2
            text-sm
            font-medium
            transition
            hover:bg-violet-500
          "
        >
          <Sparkles size={16} />
          Explain Diagram
        </button>
      </div>
    </footer>
  );
}

function ToolbarButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-700
        px-4
        py-2
        text-sm
        transition
        hover:bg-slate-800
      "
    >
      {icon}
      {label}
    </button>
  );
}