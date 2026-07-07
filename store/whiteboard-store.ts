"use client";

import { create } from "zustand";
import { Whiteboard } from "@/types/whiteboard";

interface WhiteboardStore {
  selectedBoard: Whiteboard | null;

  setSelectedBoard: (
    board: Whiteboard | null
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
    selectedBoard: null,

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