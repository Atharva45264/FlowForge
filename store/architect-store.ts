"use client";

import { create } from "zustand";

interface ArchitectStore {
  prompt: string;
  mermaid: string;
  loading: boolean;

  selectedTemplate: string;

  setPrompt: (
    prompt: string
  ) => void;

  setMermaid: (
    code: string
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setSelectedTemplate: (
    template: string
  ) => void;

  clear: () => void;
}

export const useArchitectStore =
  create<ArchitectStore>((set) => ({
    prompt: "",

    mermaid: "",

    loading: false,

    selectedTemplate: "Flowchart",

    setPrompt: (prompt) =>
      set({
        prompt,
      }),

    setMermaid: (mermaid) =>
      set({
        mermaid,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    setSelectedTemplate: (
      template
    ) =>
      set({
        selectedTemplate: template,
      }),

    clear: () =>
      set({
        prompt: "",
        mermaid: "",
        selectedTemplate:
          "Flowchart",
      }),
  }));