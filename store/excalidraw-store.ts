"use client";

import { create } from "zustand";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

interface ExcalidrawStore {
  api: ExcalidrawImperativeAPI | null;

  setAPI: (
    api: ExcalidrawImperativeAPI
  ) => void;

  insertElements: (
    elements: any[]
  ) => void;
}

export const useExcalidrawStore =
  create<ExcalidrawStore>((set, get) => ({
    api: null,

    setAPI: (api) =>
      set({
        api,
      }),

    insertElements: (elements) => {
      const api = get().api;

      if (!api) return;

      api.updateScene({
        elements,
      });
    },
  }));