import { create } from "zustand";

interface NotesStore {
  selectedNoteId: string | null;

  setSelectedNoteId: (
    id: string | null
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
    selectedNoteId: null,

    setSelectedNoteId: (id) =>
      set({
        selectedNoteId: id,
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