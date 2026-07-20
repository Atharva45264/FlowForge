"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  FileText,
  FileCode2,
  FileDown,
} from "lucide-react";

import {
  exportAsHTML,
  exportAsMarkdown,
  exportAsPDF,
} from "@/lib/export-page";

import { Page } from "@/hooks/usePages";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page;
}

export default function ExportDialog({
  open,
  onOpenChange,
  page,
}: Props) {
  async function handleExport(
    type: "pdf" | "html" | "markdown"
  ) {
    switch (type) {
      case "pdf":
        await exportAsPDF(page);
        break;

      case "html":
        await exportAsHTML(page);
        break;

      case "markdown":
        await exportAsMarkdown(page);
        break;
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Export Page</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => handleExport("pdf")}
          >
            <FileDown className="h-5 w-5" />
            Export as PDF
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => handleExport("markdown")}
          >
            <FileText className="h-5 w-5" />
            Export as Markdown
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => handleExport("html")}
          >
            <FileCode2 className="h-5 w-5" />
            Export as HTML
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}