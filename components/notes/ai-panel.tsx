"use client";

import { useState } from "react";

import {
  Sparkles,
  Wand2,
  FileText,
  PenSquare,
  Send,
  Copy,
  Loader2,
  Replace,
  Plus,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEditorStore } from "@/store/editor-store";
import { useAI } from "@/hooks/use-ai";
import { useAIStore } from "@/store/ai-store";

const actions = [
  {
    title: "Summarize",
    action: "summarize",
    icon: FileText,
    color: "bg-violet-500/15 text-violet-300",
  },
  {
    title: "Improve Writing",
    action: "improve",
    icon: Wand2,
    color: "bg-cyan-500/15 text-cyan-300",
  },
  {
    title: "Continue Writing",
    action: "continue",
    icon: PenSquare,
    color: "bg-emerald-500/15 text-emerald-300",
  },
] as const;

export function AIPanel() {

  const ai = useAI();
const { editor } = useEditorStore();
  const {
    note,
    response,
    setResponse,
  } = useAIStore();

  const [question, setQuestion] =
    useState("");

  async function runAction(
    action:
      | "summarize"
      | "improve"
      | "continue"
  ) {

    if (!note.trim()) return;

    const res =
      await ai.mutateAsync({
        action,
        note,
      });

    if (res.success) {
      setResponse(res.result);
    }

  }

  async function askAI() {

    if (
      !question.trim() ||
      !note.trim()
    )
      return;

    const res =
      await ai.mutateAsync({
        action: "ask",
        note,
        question,
      });

    if (res.success) {
      setResponse(res.result);
    }

  }

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

      {/* Actions */}

      <div className="space-y-3 p-5">

        <p className="text-sm font-medium text-slate-400">
          Quick Actions
        </p>

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              disabled={ai.isPending}
              onClick={() =>
                runAction(item.action)
              }
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
                transition
                hover:border-violet-500
                hover:bg-slate-800
                disabled:opacity-50
              "
            >

              <div
                className={`rounded-xl p-2 ${item.color}`}
              >

                <Icon className="h-5 w-5" />

              </div>

              <span className="font-medium text-white">
                {item.title}
              </span>

            </button>

          );

        })}

      </div>

      {/* AI Response */}

      {response && (

        <div className="px-5">

          <div
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-4
            "
          >

            <h3 className="mb-3 font-semibold text-white">
              AI Response
            </h3>

            <div
              className="
                prose
                prose-invert
                max-h-72
                overflow-y-auto
                text-sm
              "
            >

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              >
                {response}
              </ReactMarkdown>

            </div>

            <div className="mt-5 flex gap-2">

              <button
  onClick={() => {

    if (!editor)
      return;

    editor
      .chain()
      .focus()
      .setContent(response)
      .run();

  }}
  className="
    flex-1
    rounded-lg
    bg-violet-600
    py-2
    text-sm
    font-medium
    text-white
  "
>
  Replace
</button>

<button
  onClick={() => {

    if (!editor)
      return;

    editor
      .chain()
      .focus()
      .insertContent(
        `<p>${response}</p>`
      )
      .run();

  }}
  className="
    flex-1
    rounded-lg
    bg-emerald-600
    py-2
    text-sm
    font-medium
    text-white
  "
>
  Append
</button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    response
                  )
                }
                className="
                  rounded-lg
                  border
                  border-slate-700
                  px-3
                "
              >
                <Copy className="h-4 w-4 text-white" />
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Loading */}

      {ai.isPending && (

        <div className="px-5 pt-5">

          <div className="flex items-center gap-2 text-slate-400">

            <Loader2 className="h-4 w-4 animate-spin" />

            Thinking...

          </div>

        </div>

      )}

      {/* Ask AI */}

      <div className="mt-auto border-t border-slate-800 p-5">

        <p className="mb-3 text-sm font-medium text-slate-400">
          Ask AI
        </p>

        <textarea
          rows={5}
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
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
            outline-none
          "
        />

        <button
          onClick={askAI}
          disabled={ai.isPending}
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
            hover:bg-violet-600
            disabled:opacity-50
          "
        >

          <Send className="h-4 w-4" />

          Ask AI

        </button>

      </div>

    </aside>

  );

}