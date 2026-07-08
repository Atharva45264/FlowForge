"use client";
import { useWhiteboardStore } from "@/store/whiteboard-store";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
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
  const setSaving = useWhiteboardStore(
  (state) => state.setSaving
);

  const [initialData, setInitialData] =
    useState<any>(null);

  const saveTimeout =
  useRef<ReturnType<typeof setTimeout> | null>(null);
  const excalidrawRef =
  useRef<ExcalidrawImperativeAPI | null>(null);
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

        if (saveTimeout.current) {
          clearTimeout(saveTimeout.current);
        }

        useWhiteboardStore.getState().setSaving(true);

        saveTimeout.current =
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

            useWhiteboardStore.getState().setSaving(false);
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
  excalidrawAPI={(api) => {
  if (!excalidrawRef.current) {
    excalidrawRef.current = api;
  }
}}
        initialData={initialData}
        onChange={handleChange}
      />
    </div>
  );
}