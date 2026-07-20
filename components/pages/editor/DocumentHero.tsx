"use client";

import { useMemo, useState } from "react";

import {
  Camera,
  CheckCircle2,
  Loader2,
  Share2,
  Star,
  StarOff,
  Download,
} from "lucide-react";

import ShareDialog from "../ShareDialog";

import { Button } from "@/components/ui/button";

import { Page, useUpdatePage } from "@/hooks/usePages";
import { PAGE_COVERS } from "@/lib/page-covers";

import CoverPicker from "./CoverPicker";
import EmojiPicker from "./EmojiPicker";
import ExportDialog from "../ExportDialog";

interface Props {
  page: Page;
  saving: boolean;
}

export default function DocumentHero({
  page,
  saving,
}: Props) {
  const updatePage = useUpdatePage();

  const [showCoverPicker, setShowCoverPicker] =
    useState(false);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const [exportOpen, setExportOpen] =
    useState(false);

const [shareOpen, setShareOpen] =
  useState(false);

  const currentCover = useMemo(() => {
    return (
      PAGE_COVERS.find(
        (cover) => cover.id === page.cover
      ) ?? PAGE_COVERS[0]
    );
  }, [page.cover]);

  return (
    <div className="relative">

      {/* Cover */}

      <div
        className={`relative h-44 rounded-b-3xl bg-linear-to-r ${currentCover.className}`}
      >
        <div className="absolute right-5 top-5">

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setShowCoverPicker((prev) => !prev)
            }
          >
            <Camera className="mr-2 h-4 w-4" />
            Change Cover
          </Button>

        </div>
      </div>

      {showCoverPicker && (
        <div className="absolute right-6 top-20 z-50 w-130">
          <CoverPicker
            value={page.cover}
            onChange={(cover) => {
              updatePage.mutate({
                id: page._id,
                data: {
                  cover,
                },
              });

              setShowCoverPicker(false);
            }}
          />
        </div>
      )}

      <div className="relative -mt-10 px-10 pb-6">

        <div className="flex items-end justify-between">

          {/* Emoji */}

          <div>

            <button
              onClick={() =>
                setShowEmojiPicker((prev) => !prev)
              }
              className="flex h-20 w-20 items-center justify-center rounded-3xl border bg-background text-5xl shadow-lg transition hover:scale-105"
            >
              {page.emoji}
            </button>

            {showEmojiPicker && (
              <div className="absolute left-10 top-20 z-50">
                <EmojiPicker
                  value={page.emoji}
                  onChange={(emoji) => {
                    updatePage.mutate({
                      id: page._id,
                      data: {
                        emoji,
                        icon: emoji,
                      },
                    });

                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}

          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">

            <Button
  variant="outline"
  className="rounded-xl"
  onClick={() => setShareOpen(true)}
>
  <Share2 className="mr-2 h-4 w-4" />
  Share
</Button>

            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setExportOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
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

        {/* Status */}

        <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">

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

          <span>
            Updated{" "}
            {new Date(
              page.updatedAt
            ).toLocaleString()}
          </span>

        </div>

      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        page={page}
      />

      <ShareDialog
  open={shareOpen}
  onOpenChange={setShareOpen}
  page={page}
/>

    </div>
  );
}