"use client";

import { useMemo, useState } from "react";

import {
  Camera,
  SmilePlus,
  CheckCircle2,
  Loader2,
  Star,
  StarOff,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Page, useUpdatePage } from "@/hooks/usePages";
import { PAGE_COVERS } from "@/lib/page-covers";

import CoverPicker from "./CoverPicker";
import EmojiPicker from "./EmojiPicker";

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
        className={`relative h-56 rounded-b-3xl bg-linear-to-r ${currentCover.className}`}
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

      <div className="relative -mt-12 px-10 pb-6">

        <div className="flex items-end justify-between">

          <div>

            <button
              onClick={() =>
                setShowEmojiPicker((prev) => !prev)
              }
              className="flex h-24 w-24 items-center justify-center rounded-3xl border bg-background text-6xl shadow-lg transition hover:scale-105"
            >
              {page.emoji}
            </button>

            {showEmojiPicker && (
              <div className="absolute left-10 top-24 z-50">
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

          <div className="flex items-center gap-2">

            <Button
              variant="outline"
              className="rounded-xl"
            >
              <Share2 className="mr-2 h-4 w-4" />

              Share
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

        <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground">

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

    </div>
  );
}