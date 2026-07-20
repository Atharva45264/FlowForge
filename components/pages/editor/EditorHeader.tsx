"use client";

import { useEffect, useState } from "react";

import { ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Page, useUpdatePage } from "@/hooks/usePages";

interface Props {
  page: Page;
  saving: boolean;
}

export default function EditorHeader({
  page,
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

      <div className="mx-auto max-w-6xl px-8 py-6">

        {/* Breadcrumb */}

        <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">

          <span>{page.icon}</span>

          <span>Pages</span>

          <ChevronRight className="h-4 w-4" />

          <span className="font-medium truncate">
            {page.title}
          </span>

        </div>

        {/* Editable Title */}

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

      </div>

    </div>
  );
}