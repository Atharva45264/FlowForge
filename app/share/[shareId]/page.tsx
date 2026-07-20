import { notFound } from "next/navigation";

import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import { PAGE_COVERS } from "@/lib/page-covers";

interface Props {
  params: Promise<{
    shareId: string;
  }>;
}

export default async function SharedPage({
  params,
}: Props) {
  await connectDB();

  const { shareId } = await params;

  const page = await Page.findOne({
    shareId,
    isPublic: true,
  }).lean();

  if (!page) {
    notFound();
  }

  const cover =
    PAGE_COVERS.find(
      (item) => item.id === page.cover
    ) ?? PAGE_COVERS[0];

  return (
    <main className="min-h-screen bg-background">
      {/* Cover */}
      <div
        className={`h-44 bg-gradient-to-r ${cover.className}`}
      />

      <div className="mx-auto max-w-4xl px-8 py-8">
        {/* Emoji */}
        <div className="-mt-12 mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border bg-background text-5xl shadow-lg">
          {page.emoji}
        </div>

        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold">
          {page.title}
        </h1>

        <p className="mb-8 text-sm text-muted-foreground">
          Shared with FlowForge
        </p>

        {/* Content */}
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: page.content,
          }}
        />
      </div>
    </main>
  );
}