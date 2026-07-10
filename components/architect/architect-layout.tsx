"use client";

import { ArchitectHeader } from "./architect-header";
import { TemplateSidebar } from "./template-sidebar";
import { PromptPanel } from "./prompt-panel";
import { PreviewPanel } from "./preview-panel";
import { BottomToolbar } from "./bottom-toolbar";

export function ArchitectLayout() {
  return (
    <div className="flex h-full flex-col bg-[#0F172A] text-white">
      <ArchitectHeader />

      <div className="flex flex-1 overflow-hidden">
        <TemplateSidebar />

        <PromptPanel />

        <PreviewPanel />
      </div>

      <BottomToolbar />
    </div>
  );
}