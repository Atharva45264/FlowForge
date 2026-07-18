"use client";

import { useEffect, useState } from "react";

import {
  Clock3,
  Star,
  StarOff,
  CheckCircle2,
  Loader2,
  ChevronRight,
  Share2,
  MoreHorizontal,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Page, useUpdatePage } from "@/hooks/usePages";

interface Props {
  page: Page;
  saving: boolean;
}

export default function EditorHeader({
  page,
  saving,
}: Props) {
  const updatePage = useUpdatePage();

  const [title, setTitle] = useState(page.title);

  useEffect(() => {
    setTitle(page.title);
  }, [page.title]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title === page.title) return;

      updatePage.mutate({
        id: page._id,
        data: {
          title,
        },
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div className="border-b bg-background">
      <div className="px-10 py-6">

        {/* Breadcrumb */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2 text-sm text-muted-foreground">

            <span className="font-medium">
              {page.icon || "📄"}
            </span>

            <span>Pages</span>

            <ChevronRight className="h-4 w-4" />

            <span className="font-medium">
              {page.title}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-xl"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>

          </div>

        </div>

        {/* Title */}

        <div className="flex items-start justify-between gap-6">

          <div className="flex-1">

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              className="
                h-auto
                border-none
                bg-transparent
                p-0
                text-5xl
                font-bold
                tracking-tight
                shadow-none
                focus-visible:ring-0
              "
            />

            <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />

                <span>
                  Updated{" "}
                  {new Date(page.updatedAt).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">

                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Saved
                  </>
                )}

              </div>

            </div>

          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-2xl"
            onClick={() =>
              updatePage.mutate({
                id: page._id,
                data: {
                  favorite: !page.favorite,
                },
              })
            }
          >
            {page.favorite ? (
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </Button>

        </div>

      </div>
    </div>
  );
}