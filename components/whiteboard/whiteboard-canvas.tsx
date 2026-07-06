"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useWhiteboard } from "@/hooks/use-whiteboard";

const Excalidraw = dynamic(
  async () =>
    (await import("@excalidraw/excalidraw"))
      .Excalidraw,
  {
    ssr: false,
  }
);

interface Props {
  boardId?: string;
}

export function WhiteboardCanvas({
  boardId,
}: Props) {
  const {
    setSaving,
  } = useWhiteboard();

  const [initialData, setInitialData] =
    useState<any>(null);

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!boardId) return;

    async function loadBoard() {
      const res = await fetch(
        `/api/whiteboards/${boardId}`
      );

      const board = await res.json();

      if (
        board?.excalidrawData?.elements
      ) {
        setInitialData(board.excalidrawData);
      } else {
        setInitialData({
          elements: [],
          appState: {},
          files: {},
        });
      }
    }

    loadBoard();
  }, [boardId]);

  const handleChange =
    useCallback(
      (
        elements: any,
        appState: any,
        files: any
      ) => {
        if (!boardId) return;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        setSaving(true);

        timeoutRef.current =
          setTimeout(async () => {
            await fetch(
              `/api/whiteboards/${boardId}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  excalidrawData: {
                    elements,
                    appState,
                    files,
                  },
                }),
              }
            );

            setSaving(false);
          }, 2000);
      },
      [boardId, setSaving]
    );

  if (!initialData) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#1E293B]">
        <p className="text-slate-400">
          Loading Whiteboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#1E293B]">
      <Excalidraw
        initialData={initialData}
        onChange={handleChange}
      />
    </div>
  );
}