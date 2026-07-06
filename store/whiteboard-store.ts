"use client";

import { create } from "zustand";
import { Whiteboard } from "@/types/whiteboard";

interface WhiteboardStore {
  selectedBoard?: Whiteboard;

  setSelectedBoard: (
    board?: Whiteboard
  ) => void;

  search: string;

  setSearch: (
    value: string
  ) => void;

  saving: boolean;

  setSaving: (
    value: boolean
  ) => void;
}

export const useWhiteboardStore =
  create<WhiteboardStore>((set) => ({
    selectedBoard: undefined,

    search: "",

    saving: false,

    setSelectedBoard: (board) =>
      set({
        selectedBoard: board,
      }),

    setSearch: (search) =>
      set({
        search,
      }),

    setSaving: (saving) =>
      set({
        saving,
      }),
  }));