"use client";

import {
  Sparkles,
  Wand2,
  FileText,
  PenSquare,
  Send,
} from "lucide-react";

const actions = [
  {
    title: "Summarize",
    icon: FileText,
    color: "bg-violet-500/15 text-violet-300",
  },
  {
    title: "Improve Writing",
    icon: Wand2,
    color: "bg-cyan-500/15 text-cyan-300",
  },
  {
    title: "Continue Writing",
    icon: PenSquare,
    color: "bg-emerald-500/15 text-emerald-300",
  },
];

export function AIPanel() {
  return (
    <aside
      className="
        flex
        w-80
        flex-col
        border-l
        border-slate-800
        bg-slate-950
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-500/20 p-3">
            <Sparkles className="h-6 w-6 text-violet-300" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              AI Assistant
            </h2>

            <p className="text-sm text-slate-400">
              Powered by Groq
            </p>
          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="space-y-3 p-5">

        <p className="text-sm font-medium text-slate-400">
          Quick Actions
        </p>

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                p-4
                transition-all
                duration-200
                hover:border-violet-500
                hover:bg-slate-800
              "
            >
              <div
                className={`rounded-xl p-2 ${action.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span className="font-medium text-white">
                {action.title}
              </span>
            </button>
          );
        })}

      </div>

      {/* Ask AI */}

      <div className="mt-auto border-t border-slate-800 p-5">

        <p className="mb-3 text-sm font-medium text-slate-400">
          Ask AI
        </p>

        <textarea
          rows={5}
          placeholder="Ask AI anything about this note..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            p-4
            text-sm
            text-white
            placeholder:text-slate-500
            outline-none
            focus:border-violet-500
          "
        />

        <button
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-500
            py-3
            font-medium
            text-white
            transition
            hover:bg-violet-600
          "
        >
          <Send className="h-4 w-4" />

          Ask AI

        </button>

      </div>

    </aside>
  );
}