"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { useCreatePage } from "@/hooks/usePages";
import { usePageStore } from "@/store/pageStore";

const PAGE_ICONS = [
  "📄",
  "📝",
  "📚",
  "💡",
  "📋",
  "📊",
  "🚀",
  "🎯",
];

export default function CreatePageModal() {
  const {
    createPageOpen,
    setCreatePageOpen,
    selectedSpaceId,
  } = usePageStore();

  const createPage = useCreatePage();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("📄");

  const handleCreate = () => {
    if (!selectedSpaceId || !title.trim()) return;

    createPage.mutate(
      {
        spaceId: selectedSpaceId,
        title,
        icon,
      },
      {
        onSuccess: () => {
          setTitle("");
          setIcon("📄");
          setCreatePageOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={createPageOpen}
      onOpenChange={setCreatePageOpen}
    >
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <Input
            placeholder="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>

            <p className="mb-2 text-sm font-medium">
              Icon
            </p>

            <div className="flex flex-wrap gap-2">

              {PAGE_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setIcon(emoji)}
                  className={`rounded-lg border p-2 text-xl transition ${
                    icon === emoji
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                >
                  {emoji}
                </button>
              ))}

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => setCreatePageOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreate}
            disabled={createPage.isPending}
          >
            {createPage.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Create Page
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}