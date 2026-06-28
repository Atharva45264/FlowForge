import { create } from "zustand";

interface NotesStore {
  selectedNoteId: string | null;

  setSelectedNote: (
    id: string | null
  ) => void;

  search: string;

  setSearch: (
    value: string
  ) => void;
}

export const useNotesStore =
  create<NotesStore>((set) => ({
    selectedNoteId: null,

    setSelectedNote: (id) =>
      set({
        selectedNoteId: id,
      }),

    search: "",

    setSearch: (value) =>
      set({
        search: value,
      }),
  }));