"use client";

import { useEffect, useState } from "react";

import {
  Globe,
  Lock,
  Copy,
  Share2,
  FileCode2,
  FileText,
  Check,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { Page, useToggleShare } from "@/hooks/usePages";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: Page;
}

export default function ShareDialog({
  open,
  onOpenChange,
  page,
}: Props) {
  const toggleShare = useToggleShare();

  const [shareUrl, setShareUrl] = useState("");
  const [isPublic, setIsPublic] = useState(page.isPublic);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsPublic(page.isPublic);

    if (page.shareId) {
      setShareUrl(
        `${window.location.origin}/share/${page.shareId}`
      );
    }
  }, [page]);

  async function handleToggle() {
    toggleShare.mutate(page._id, {
      onSuccess(data) {
        setIsPublic(data.isPublic);
        setShareUrl(data.shareUrl);
      },
    });
  }

  async function copyLink() {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  async function nativeShare() {
    if (!shareUrl) return;

    if (navigator.share) {
      await navigator.share({
        title: page.title,
        text: page.title,
        url: shareUrl,
      });
    } else {
      copyLink();
    }
  }

  async function copyMarkdown() {
    const markdown = `# ${page.title}\n\n${page.content}`;

    await navigator.clipboard.writeText(markdown);
  }

  async function copyHTML() {
    await navigator.clipboard.writeText(page.content);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">

        <DialogHeader>
          <DialogTitle>
            Share Page
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* Status */}

          <div className="flex items-center justify-between rounded-xl border p-4">

            <div className="flex items-center gap-3">

              {isPublic ? (
                <Globe className="h-5 w-5 text-green-600" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}

              <div>

                <p className="font-medium">
                  {isPublic
                    ? "Public"
                    : "Private"}
                </p>

                <p className="text-sm text-muted-foreground">
                  {isPublic
                    ? "Anyone with the link can view."
                    : "Only you can access this page."}
                </p>

              </div>

            </div>

            <Switch
              checked={isPublic}
              disabled={toggleShare.isPending}
              onCheckedChange={handleToggle}
            />

          </div>

          {/* URL */}

          <div className="space-y-2">

            <p className="text-sm font-medium">
              Share Link
            </p>

            <div className="rounded-lg border bg-muted p-3 text-sm break-all">

              {shareUrl || "Enable public sharing first"}

            </div>

          </div>

          {/* Actions */}

          <div className="grid grid-cols-2 gap-3">

            <Button
              variant="outline"
              disabled={!isPublic}
              onClick={copyLink}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              variant="outline"
              disabled={!isPublic}
              onClick={nativeShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            <Button
              variant="outline"
              onClick={copyMarkdown}
            >
              <FileText className="mr-2 h-4 w-4" />
              Copy Markdown
            </Button>

            <Button
              variant="outline"
              onClick={copyHTML}
            >
              <FileCode2 className="mr-2 h-4 w-4" />
              Copy HTML
            </Button>

          </div>

          {toggleShare.isPending && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">

              <Loader2 className="h-4 w-4 animate-spin" />

              Updating sharing...

            </div>
          )}

        </div>

      </DialogContent>
    </Dialog>
  );
}