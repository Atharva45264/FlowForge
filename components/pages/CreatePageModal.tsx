"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2, Check } from "lucide-react";

import { useCreatePage } from "@/hooks/usePages";
import { usePageStore } from "@/store/pageStore";
import {
  PAGE_TEMPLATES,
  PageTemplate,
} from "@/lib/page-templates";

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

  const [template, setTemplate] =
    useState<PageTemplate>(PAGE_TEMPLATES[0]);

  const reset = () => {
    setTitle("");
    setIcon("📄");
    setTemplate(PAGE_TEMPLATES[0]);
  };

  const handleCreate = () => {
    if (!selectedSpaceId || !title.trim()) return;

    createPage.mutate(
      {
        spaceId: selectedSpaceId,
        title,
        icon,
        content: template.content,
      },
      {
        onSuccess() {
          reset();
          setCreatePageOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={createPageOpen}
      onOpenChange={(open) => {
        if (!open) reset();
        setCreatePageOpen(open);
      }}
    >
      <DialogContent className="max-w-3xl">

        <DialogHeader>

          <DialogTitle>
            Create New Page
          </DialogTitle>

          <DialogDescription>
            Choose a template or start with a blank page.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-6">

          <Input
            placeholder="Page Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <div>

            <p className="mb-2 text-sm font-medium">
              Icon
            </p>

            <div className="flex flex-wrap gap-2">

              {PAGE_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`rounded-xl border p-2 text-xl transition ${
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

          <div>

            <p className="mb-3 text-sm font-medium">
              Choose Template
            </p>

            <div className="grid grid-cols-2 gap-3">

              {PAGE_TEMPLATES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTemplate(item)}
                  className={`relative rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-muted/40 ${
                    template.id === item.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >

                  {template.id === item.id && (
                    <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
                  )}

                  <div className="mb-2 text-2xl">
                    {item.icon}
                  </div>

                  <h4 className="font-medium">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>

                </button>
              ))}

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => {
              reset();
              setCreatePageOpen(false);
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreate}
            disabled={
              createPage.isPending || !title.trim()
            }
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