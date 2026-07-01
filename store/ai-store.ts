import { create } from "zustand";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIStore {
  // Current editor content
  note: string;
  setNote: (note: string) => void;

  // AI conversation
  messages: AIMessage[];

  addMessage: (
    message: AIMessage
  ) => void;

  clearMessages: () => void;

  // Latest AI response
  response: string;

  setResponse: (
    response: string
  ) => void;

  // Loading state
  loading: boolean;

  setLoading: (
    loading: boolean
  ) => void;
}

export const useAIStore =
  create<AIStore>((set) => ({
    note: "",

    setNote: (note) =>
      set({
        note,
      }),

    messages: [],

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    clearMessages: () =>
      set({
        messages: [],
      }),

    response: "",

    setResponse: (response) =>
      set({
        response,
      }),

    loading: false,

    setLoading: (loading) =>
      set({
        loading,
      }),
  }));