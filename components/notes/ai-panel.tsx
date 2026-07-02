"use client";

import { useEffect, useRef, useState } from "react";

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
  User,
  Bot,
} from "lucide-react";
import { useKanbanStore } from "@/store/kanban-store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClipboardList } from "lucide-react";
import { useAI } from "@/hooks/use-ai";
import { useAIStore } from "@/store/ai-store";
import { useEditorStore } from "@/store/editor-store";

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
  {
    title: "Generate Tasks",

    action: "generateTasks",

    icon: ClipboardList,

    color: "bg-orange-500/20 text-orange-300",
  },
] as const;

export function AIPanel() {
  const ai = useAI();

  const { note, messages, addMessage, clearMessages } = useAIStore();

  const { editor } = useEditorStore();

  const [question, setQuestion] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeBoardId = useKanbanStore((state) => state.activeBoardId);

  const createTask = useKanbanStore((state) => state.createTask);

  const [generatedTasks, setGeneratedTasks] =
  useState<any[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function runAction(
  action:
    | "summarize"
    | "improve"
    | "continue"
    | "generateTasks"
) {
  if (!note.trim()) return;

  addMessage({
    role: "user",
    content: action,
  });

  const res = await ai.mutateAsync({
    action,
    note,
  });

  if (!res.success) return;

  if (res.type === "text") {
    addMessage({
      role: "assistant",
      content: res.result,
    });
  }

  if (res.type === "tasks") {
    setGeneratedTasks(res.tasks);

    addMessage({
      role: "assistant",
      content: `Generated ${res.tasks.length} tasks successfully.`,
    });
  }
}

  async function askAI() {
    if (!question.trim() || !note.trim()) return;

    addMessage({
      role: "user",
      content: question,
    });

    const res = await ai.mutateAsync({
      action: "ask",
      note,
      question,
    });

    if (res.success) {
      addMessage({
        role: "assistant",
        content: res.result,
      });

      setQuestion("");
    }
  }

  const latestAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  return (
    <aside
      className="
        flex
        w-96
        flex-col
        border-l
        border-slate-800
        bg-slate-950
      "
    >
      {/* HEADER */}

      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/20 p-3">
            <Sparkles className="h-6 w-6 text-violet-300" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">AI Assistant</h2>

            <p className="text-sm text-slate-400">Powered by Groq</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="space-y-3 border-b border-slate-800 p-5">
        <p className="text-sm font-medium text-slate-400">Quick Actions</p>

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              disabled={ai.isPending}
              onClick={() => runAction(item.action)}
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
              <div className={`rounded-xl p-2 ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>

              <span className="font-medium text-white">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* CONVERSATION */}

      <div
  className="
    flex-1
    min-h-0
    overflow-y-auto
    px-5
    py-4
    space-y-4
  "
>
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Sparkles className="mb-4 h-12 w-12 text-violet-400" />

            <h3 className="text-lg font-semibold text-white">
              Your AI Assistant is Ready
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Summarize notes, improve writing, continue your ideas, or ask
              questions about the current document.
            </p>
          </div>
        )}

        {messages.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={index}
              className={`
              flex
              gap-3
              ${isUser ? "justify-end" : "justify-start"}
            `}
            >
              {!isUser && (
                <div
                  className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-500/20
                "
                >
                  <Bot className="h-5 w-5 text-violet-300" />
                </div>
              )}

              <div
                className={`
                max-w-[85%]
                rounded-2xl
                border
                px-4
                py-3

                ${
                  isUser
                    ? "border-violet-500 bg-violet-600 text-white"
                    : "border-slate-700 bg-slate-900 text-slate-200"
                }
              `}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                ) : (
                  <div
                    className="
                    prose
                    prose-invert
                    prose-sm
                    max-w-none
                  "
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {isUser && (
                <div
                  className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                "
                >
                  <User className="h-5 w-5 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}

        {ai.isPending && (
          <div className="flex gap-3">
            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-violet-500/20
            "
            >
              <Bot className="h-5 w-5 text-violet-300" />
            </div>

            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
            "
            >
              <Loader2 className="h-4 w-4 animate-spin text-violet-400" />

              <span className="text-sm text-slate-400">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        {latestAssistant && (
          <div
  className="
    mt-3
    rounded-xl
    border
    border-slate-700
    bg-slate-900/70
    p-3
  "
>
  <p className="mb-3 text-sm font-semibold text-white">
    AI Actions
  </p>

  <div className="grid grid-cols-2 gap-2">

    <button
      onClick={() => {
        if (!editor) return;

        editor
          .chain()
          .focus()
          .setContent(latestAssistant.content)
          .run();
      }}
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-violet-600
        py-2
        text-sm
        text-white
        hover:bg-violet-700
      "
    >
      <Replace className="h-4 w-4" />
      Replace
    </button>

    <button
      onClick={() => {
        if (!editor) return;

        editor
          .chain()
          .focus()
          .insertContent(latestAssistant.content)
          .run();
      }}
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-emerald-600
        py-2
        text-sm
        text-white
        hover:bg-emerald-700
      "
    >
      <Plus className="h-4 w-4" />
      Append
    </button>

    <button
      onClick={() =>
        navigator.clipboard.writeText(
          latestAssistant.content
        )
      }
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-slate-700
        bg-slate-800
        py-2
        text-sm
        text-white
        hover:bg-slate-700
      "
    >
      <Copy className="h-4 w-4" />
      Copy
    </button>

    <button
      onClick={() => {
        if (!latestAssistant) return;

        try {
          const tasks = JSON.parse(
            latestAssistant.content
          );

          tasks.forEach((task: any) => {
            const priority =
              ["low", "medium", "high"].includes(
                task.priority?.toLowerCase()
              )
                ? task.priority.toLowerCase()
                : "medium";

            createTask(activeBoardId, {
              title: task.title,
              description:
                task.description || "",
              priority,
              columnId: "todo",
              dueDate:
                task.dueDate || undefined,
              labels: [],
              comments: [],
              syncCalendar: false,
              syncNotes: true,
            });
          });

          alert(
            `${tasks.length} tasks created!`
          );

        } catch {
          alert("Invalid AI JSON");
        }
      }}
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-orange-600
        py-2
        text-sm
        text-white
        hover:bg-orange-700
      "
    >
      <ClipboardList className="h-4 w-4" />
      Create
    </button>

  </div>
</div>
        )}
      </div>

      {/* ASK AI */}

      <div className="border-t border-slate-800 p-5">
        <p className="mb-3 text-sm font-medium text-slate-400">Ask AI</p>

        <textarea
  rows={2}
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="Ask AI..."
  className="
    h-20
    w-full
    resize-none
    rounded-xl
    border
    border-slate-700
    bg-slate-900
    p-3
    text-sm
    text-white
    placeholder:text-slate-500
    outline-none
    focus:border-violet-500
  "
/>

        <button
          onClick={askAI}
          disabled={ai.isPending || !question.trim()}
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Send className="h-4 w-4" />
          Ask AI
        </button>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="
              mt-3
              w-full
              rounded-xl
              border
              border-red-500/40
              py-3
              text-sm
              font-medium
              text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            Clear Conversation
          </button>
        )}
      </div>
    </aside>
  );
}
