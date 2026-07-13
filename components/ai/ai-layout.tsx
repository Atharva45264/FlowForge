"use client";

import { useState } from "react";

import AIChat from "./ai-chat";
import AISidebar from "./ai-sidebar";

export default function AILayout() {
  const [selectedConversation, setSelectedConversation] =
    useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden w-80 border-r bg-background lg:block">
        <AISidebar
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <AIChat
          conversationId={selectedConversation}
        />
      </div>
    </div>
  );
}