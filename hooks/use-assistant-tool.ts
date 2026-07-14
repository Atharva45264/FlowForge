"use client";

import { useState } from "react";

import type { AssistantTool } from "@/types/tool";

export default function useAssistantTool() {
  const [tool, setTool] =
    useState<AssistantTool>("chat");

  return {
    tool,
    setTool,
    resetTool() {
      setTool("chat");
    },
  };
}