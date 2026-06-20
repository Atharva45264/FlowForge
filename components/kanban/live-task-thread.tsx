"use client";

import { useEffect } from "react";

import {
  Thread,
} from "@liveblocks/react-ui";

import {
  useThreads,
  useCreateThread,
} from "@liveblocks/react";

import "@liveblocks/react-ui/styles.css";

type Props = {
  taskId: string;
};

export function LiveTaskThread({
  taskId,
}: Props) {
  const threads = useThreads();

  const createThread =
    useCreateThread();

  const taskThreads =
    threads.threads?.filter(
      (thread) =>
        thread.metadata?.taskId ===
        taskId
    ) ?? [];

  useEffect(() => {
    if (
      threads.isLoading ||
      taskThreads.length > 0
    ) {
      return;
    }

    createThread({
      body: {
        version: 1,
        content: [
          {
            type: "paragraph",
            children: [
              {
                text:
                  "Discussion started",
              },
            ],
          },
        ],
      },

      metadata: {
        taskId,
      },
    });
  }, [
    taskId,
    taskThreads.length,
    threads.isLoading,
    createThread,
  ]);

  return (
    <div className="space-y-4">
      <div
        className="
          rounded-lg
          border
          border-slate-700
          p-3
        "
      >
        <p className="text-sm text-slate-400">
          Live Discussion
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {taskThreads.length}
          {" "}
          thread(s)
        </p>
      </div>

      {taskThreads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
        />
      ))}
    </div>
  );
}