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
import { Textarea } from "@/components/ui/textarea";

import { Loader2 } from "lucide-react";

import { useCreateSpace } from "@/hooks/useSpaces";
import { usePageStore } from "@/store/pageStore";

const COLORS = [
  "#7C3AED",
  "#2563EB",
  "#059669",
  "#EA580C",
  "#DC2626",
  "#DB2777",
];

const EMOJIS = [
  "🚀",
  "📁",
  "💼",
  "📚",
  "💡",
  "🎯",
  "📝",
  "🎨",
];

export default function CreateSpaceModal() {
  const { createSpaceOpen, setCreateSpaceOpen } = usePageStore();

  const createSpace = useCreateSpace();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📁");
  const [color, setColor] = useState("#7C3AED");

  const handleCreate = () => {
    if (!name.trim()) return;

    createSpace.mutate(
      {
        name,
        description,
        icon,
        color,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setIcon("📁");
          setColor("#7C3AED");

          setCreateSpaceOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={createSpaceOpen}
      onOpenChange={setCreateSpaceOpen}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Create New Space</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <Input
            placeholder="Space Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setName(e.target.value)
}
          />

          <Textarea
            placeholder="Description..."
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
  setDescription(e.target.value)
}
          />

          {/* Emoji */}

          <div>

            <p className="mb-2 text-sm font-medium">
              Icon
            </p>

            <div className="flex flex-wrap gap-2">

              {EMOJIS.map((emoji) => (
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

          {/* Colors */}

          <div>

            <p className="mb-2 text-sm font-medium">
              Color
            </p>

            <div className="flex gap-3">

              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 rounded-full border-2 transition ${
                    color === c
                      ? "scale-110 border-black dark:border-white"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: c,
                  }}
                />
              ))}

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              setCreateSpaceOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreate}
            disabled={createSpace.isPending}
          >
            {createSpace.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Create Space
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}