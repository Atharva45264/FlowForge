import { create } from "zustand";

interface AIStore {
  note: string;

  setNote: (note: string) => void;

  response: string;

  setResponse: (
    response: string
  ) => void;

  loading: boolean;

  setLoading: (
    loading: boolean
  ) => void;
}

export const useAIStore =
  create<AIStore>((set) => ({
    note: "",

    response: "",

    loading: false,

    setNote: (note) =>
      set({
        note,
      }),

    setResponse: (response) =>
      set({
        response,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),
  }));