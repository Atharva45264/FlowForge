"use client";

import { FileText, Sparkles } from "lucide-react";

import { usePageStore } from "@/store/pageStore";
import PageEditor from "./editor/PageEditor";
import CreatePageModal from "./CreatePageModal";

export default function PageList() {
  const { selectedPageId } = usePageStore();

  return (
    <>
      <div className="h-full bg-background">
        {selectedPageId ? (
          <PageEditor pageId={selectedPageId} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
                <FileText className="h-12 w-12 text-primary" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                Welcome to Pages
              </h2>

              <p className="mt-4 text-muted-foreground leading-7">
                Select a page from the left sidebar to start writing,
                or create a new page inside one of your spaces.
              </p>

              <div className="mt-10 rounded-2xl border bg-card p-6 text-left shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    What you can do
                  </span>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Organize documents into Spaces</li>
                  <li>• Write rich notes with the editor</li>
                  <li>• Keep meeting notes and documentation</li>
                  <li>• Favorite and archive important pages</li>
                  <li>• Autosave your work instantly</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <CreatePageModal />
    </>
  );
}