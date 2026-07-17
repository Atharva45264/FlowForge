"use client";

import PageSidebar from "@/components/pages/PageSidebar";
import SpacesGrid from "@/components/pages/SpacesGrid";
import PageList from "@/components/pages/PageList";
import CreateSpaceModal from "@/components/pages/CreateSpaceModal";
import { usePageStore } from "@/store/pageStore";

export default function PagesScreen() {
  const selectedSpaceId = usePageStore(
    (state) => state.selectedSpaceId
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">

      {/* Sidebar */}
      <PageSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">

        {selectedSpaceId ? (
          <PageList />
        ) : (
          <SpacesGrid />
        )}

      </main>

      <CreateSpaceModal />
    </div>
  );
}