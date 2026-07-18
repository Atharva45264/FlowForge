"use client";

import PageSidebar from "@/components/pages/PageSidebar";
import PageList from "@/components/pages/PageList";
import CreateSpaceModal from "@/components/pages/CreateSpaceModal";

export default function PagesScreen() {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">

      {/* Left Sidebar */}
      <PageSidebar />

      {/* Workspace */}
      <main className="flex-1 overflow-hidden">
        <PageList />
      </main>

      <CreateSpaceModal />

    </div>
  );
}