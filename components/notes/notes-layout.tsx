"use client";

import { NotesSidebar } from "./notes-sidebar";
import { NotesHeader } from "./notes-header";
import { NotesEditor } from "./notes-editor";
import { AIPanel } from "./ai-panel";

export function NotesLayout() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0F172A]">

      {/* Sidebar */}

      <NotesSidebar />

      {/* Main */}

      <div className="flex flex-1 flex-col">

        <NotesHeader />

        <div className="flex flex-1 overflow-hidden">

          <NotesEditor />

          <AIPanel />

        </div>

      </div>

    </div>
  );
}