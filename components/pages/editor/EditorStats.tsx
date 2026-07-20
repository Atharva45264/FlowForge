"use client";

import { useMemo } from "react";

interface Props {
  html: string;
}

export default function EditorStats({
  html,
}: Props) {
  const stats = useMemo(() => {
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const words = text
      ? text.split(" ").filter(Boolean).length
      : 0;

    const characters = text.length;

    const readingTime = Math.max(
      1,
      Math.ceil(words / 200)
    );

    return {
      words,
      characters,
      readingTime,
    };
  }, [html]);

  return (
    <div className="border-t bg-muted/40 px-8 py-4 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-6">

        <span>
          <strong>{stats.words}</strong> words
        </span>

        <span>
          <strong>{stats.characters}</strong> characters
        </span>

        <span>
          <strong>{stats.readingTime}</strong> min read
        </span>

      </div>
    </div>
  );
}