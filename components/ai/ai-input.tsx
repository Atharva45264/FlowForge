"use client";

import { ImageIcon, Mic, Paperclip, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AIInput() {
  return (
    <div className="flex items-center gap-3 p-4">

      <Button variant="outline" size="icon">
        <Paperclip className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon">
        <ImageIcon className="h-4 w-4" />
      </Button>

      <textarea
        rows={1}
        placeholder="Ask FlowForge AI anything..."
        className="min-h-11 flex-1 resize-none rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
      />

      <Button variant="outline" size="icon">
        <Mic className="h-4 w-4" />
      </Button>

      <Button size="icon">
        <SendHorizontal className="h-4 w-4" />
      </Button>

    </div>
  );
}