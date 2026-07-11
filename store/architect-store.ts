"use client";

import { create } from "zustand";

interface ArchitectStore {
  currentProjectId: string | null;

  prompt: string;

  mermaid: string;

  loading: boolean;

  selectedTemplate: string;

  setCurrentProject: (
    id: string | null
  ) => void;

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
    currentProjectId: null,

    prompt: "",

    mermaid: "",

    loading: false,

    selectedTemplate: "Flowchart",

    setCurrentProject: (id) =>
      set({
        currentProjectId: id,
      }),

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
        currentProjectId: null,
        prompt: "",
        mermaid: "",
        selectedTemplate:
          "Flowchart",
      }),
  }));