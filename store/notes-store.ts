import { create } from "zustand";

import { Note } from "@/types/note";

interface NotesStore {
  selectedNote: Note | null;

  setSelectedNote: (
    note: Note | null
  ) => void;

  search: string;

  setSearch: (
    value: string
  ) => void;

  isCreating: boolean;

  setIsCreating: (
    value: boolean
  ) => void;
}

export const useNotesStore =
  create<NotesStore>((set) => ({
    selectedNote: null,

    setSelectedNote: (note) =>
      set({
        selectedNote: note,
      }),

    search: "",

    setSearch: (value) =>
      set({
        search: value,
      }),

    isCreating: false,

    setIsCreating: (value) =>
      set({
        isCreating: value,
      }),
  }));