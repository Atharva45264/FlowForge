"use client";

import { useState } from "react";

import AIChat from "./ai-chat";
import AISidebar from "./ai-sidebar";

export interface UploadedFile {
  type: "pdf" | "image";

  fileName: string;

  mimeType: string;

  base64: string;

  width?: number;

  height?: number;
}

export default function AILayout() {
  const [selectedConversation, setSelectedConversation] =
    useState<string | null>(null);

  const [uploadedFile, setUploadedFile] =
    useState<UploadedFile | null>(null);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-muted/20">
      {/* Sidebar */}

      <aside className="hidden w-80 shrink-0 border-r bg-background/95 backdrop-blur lg:block">
        <AISidebar
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </aside>

      {/* Chat */}

      <main className="flex min-w-0 flex-1 overflow-hidden bg-linear-to-b from-background via-background to-muted/10">
        <AIChat
          conversationId={selectedConversation}
          onSelectConversation={setSelectedConversation}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
      </main>
    </div>
  );
}