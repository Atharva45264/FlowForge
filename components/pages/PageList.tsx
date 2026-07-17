"use client";

import { FilePlus2, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePages } from "@/hooks/usePages";
import { useSpaces } from "@/hooks/useSpaces";
import { usePageStore } from "@/store/pageStore";
import CreatePageModal from "./CreatePageModal";

export default function PageList() {
  const {
    selectedSpaceId,
    selectedPageId,
    setSelectedPageId,
    setCreatePageOpen,
  } = usePageStore();

  const { data: spaces = [] } = useSpaces();

  const { data: pages = [], isLoading } = usePages(
    selectedSpaceId || undefined
  );

  const space = spaces.find(
    (s) => s._id === selectedSpaceId
  );

  if (!selectedSpaceId) {
    return null;
  }

  return (
    <div className="flex h-full">

      {/* Page List */}

      <div className="w-96 border-r bg-background">

        <div className="border-b p-6">

          <div className="flex items-center gap-3">

            <span className="text-3xl">
              {space?.icon}
            </span>

            <div>

              <h2 className="text-2xl font-bold">
                {space?.name}
              </h2>

              <p className="text-sm text-muted-foreground">
                {space?.pageCount} Pages
              </p>

            </div>

          </div>

          <Button
  className="mt-5 w-full"
  onClick={() => setCreatePageOpen(true)}
>
            <FilePlus2 className="mr-2 h-4 w-4" />
            New Page
          </Button>

        </div>

        <div className="overflow-y-auto">

          {isLoading ? (
            <div className="p-5">
              Loading...
            </div>
          ) : pages.length === 0 ? (
            <div className="p-5 text-sm text-muted-foreground">
              No pages yet.
            </div>
          ) : (
            pages.map((page) => (
              <button
                key={page._id}
                onClick={() =>
                  setSelectedPageId(page._id)
                }
                className={`flex w-full items-center gap-3 border-b px-5 py-4 text-left transition hover:bg-muted ${
                  selectedPageId === page._id
                    ? "bg-muted"
                    : ""
                }`}
              >
                <span className="text-xl">
                  {page.icon}
                </span>

                <div className="flex-1">

                  <h4 className="font-medium">
                    {page.title}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    Updated{" "}
                    {new Date(
                      page.updatedAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <FileText className="h-4 w-4 text-muted-foreground" />

              </button>
            ))
          )}

        </div>

      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center">

        {selectedPageId ? (
          <div className="text-center">

            <h2 className="text-2xl font-semibold">
              Editor Coming Next
            </h2>

            <p className="mt-2 text-muted-foreground">
              We'll integrate the rich text editor here.
            </p>

          </div>
        ) : (
          <div className="text-center">

            <FileText className="mx-auto mb-5 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              Select a Page
            </h2>

            <p className="mt-2 text-muted-foreground">
              Choose a page from the left or create a new one.
            </p>

          </div>
        )}

      </div>
<CreatePageModal />
    </div>
  );
}