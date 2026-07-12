"use client";

import {
  Sparkles,
  Wand2,
  RotateCcw,
} from "lucide-react";

import { useArchitectStore } from "@/store/architect-store";
import { MermaidEditor } from "./mermaid-editor";
import { TemplateSelector } from "./template-selector";

export function PromptPanel() {
  const {
    prompt,
    setPrompt,
    loading,
    setLoading,
    setMermaid,
    clear,
    selectedTemplate,
  } = useArchitectStore();

  async function generateDiagram() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "/api/architect/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            prompt,
            template:
              selectedTemplate,
          }),
        }
      );

      if (!res.ok) {
        const err =
          await res.json();

        throw new Error(
          err.error ??
            "Generation failed"
        );
      }

      const data =
        await res.json();

      setMermaid(
        data.mermaid
      );
    } catch (err: any) {
      console.error(err);

      alert(
        err.message ??
          "Failed to generate diagram."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        flex
        w-[42%]
        flex-col
        border-r
        border-slate-800
        bg-[#0F172A]
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-white">
          Describe your architecture
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Explain what you want and AI will generate an editable Mermaid diagram.
        </p>
      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-6">

        {/* Templates */}

        <TemplateSelector />

        {/* Prompt */}

        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          placeholder={`Describe the architecture you want...

Example:

Design a Netflix Streaming Platform

or

Create a Food Delivery Microservice Architecture

or

Generate JWT Authentication Flow`}
          className="
            h-72
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            p-5
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-violet-500
          "
        />

        {/* Buttons */}

        <div className="mt-5 flex gap-3">
          <button
            onClick={
              generateDiagram
            }
            disabled={loading}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-violet-600
              py-3
              font-medium
              transition
              hover:bg-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Sparkles size={18} />

            {loading
              ? "Generating..."
              : "Generate Diagram"}
          </button>

          <button
            onClick={clear}
            className="
              rounded-xl
              border
              border-slate-700
              px-5
              hover:bg-slate-800
            "
          >
            <RotateCcw size={18} />
          </button>

          <button
            className="
              rounded-xl
              border
              border-slate-700
              px-5
              hover:bg-slate-800
            "
          >
            <Wand2 size={18} />
          </button>
        </div>

        {/* Mermaid Editor */}

        <div className="mt-8">
          <MermaidEditor />
        </div>
      </div>
    </section>
  );
}