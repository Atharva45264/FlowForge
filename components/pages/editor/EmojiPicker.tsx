"use client";

import { PAGE_EMOJIS } from "@/lib/page-emojis";

interface Props {
  value: string;
  onChange: (emoji: string) => void;
}

export default function EmojiPicker({
  value,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-6 gap-2 rounded-2xl border bg-background p-4 shadow-lg">

      {PAGE_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onChange(emoji)}
          className={`rounded-xl p-3 text-2xl transition ${
            value === emoji
              ? "bg-primary/10 ring-2 ring-primary"
              : "hover:bg-muted"
          }`}
        >
          {emoji}
        </button>
      ))}

    </div>
  );
}