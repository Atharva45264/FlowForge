"use client";

import {
  Composer,
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

  console.log(
  "THREADS:",
  threads
);

  return (
    <div className="space-y-4">
      <div
        className="
          rounded-lg border
          border-slate-700 p-3
        "
      >
        <p className="text-sm text-slate-400">
          Live discussion for:
        </p>

        <div className="mt-2 rounded-lg border border-slate-700 p-3">
          <p className="text-xs text-slate-400">
            Thread ID
          </p>

          <p className="mt-1 break-all text-sm text-white">
            {taskId}
          </p>
        </div>

        <p className="mt-3 text-xs text-slate-400">
  Threads Found:{" "}
  {threads.threads?.length ?? 0}
</p>
      </div>

      <button
        type="button"
        onClick={() => {
          createThread({
            body: {
              version: 1,
              content: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text:
                        "Thread created for task " +
                        taskId,
                    },
                  ],
                },
              ],
            },

            metadata: {
              taskId,
            },
          });
        }}
        className="
          rounded-lg
          bg-indigo-500
          px-3 py-2
          text-sm
          text-white
          hover:bg-indigo-600
        "
      >
        Create Test Thread
      </button>

      <Composer />
    </div>
  );
}