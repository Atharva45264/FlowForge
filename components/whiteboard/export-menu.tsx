"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Download,
  FileImage,
  FileJson,
  FileType2,
} from "lucide-react";
import { toast } from "sonner";

import { useExcalidrawStore } from "@/store/excalidraw-store";

export function ExportMenu() {
  const api = useExcalidrawStore(
    (state) => state.api
  );

  async function exportPNG() {
    if (!api) {
      toast.error("Canvas not ready");
      return;
    }

    try {
      const { exportToBlob } = await import(
        "@excalidraw/excalidraw"
      );

      const blob = await exportToBlob({
        elements: api.getSceneElements(),
        appState: {
          ...api.getAppState(),
          exportBackground: true,
        },
        files: api.getFiles(),
        mimeType: "image/png",
      });

      download(blob, "whiteboard.png");

      toast.success("PNG exported");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PNG");
    }
  }

  async function exportSVG() {
    if (!api) {
      toast.error("Canvas not ready");
      return;
    }

    try {
      const { exportToSvg } = await import(
        "@excalidraw/excalidraw"
      );

      const svg = await exportToSvg({
        elements: api.getSceneElements(),
        appState: {
          ...api.getAppState(),
          exportBackground: true,
        },
        files: api.getFiles(),
      });

      const blob = new Blob(
        [svg.outerHTML],
        {
          type: "image/svg+xml",
        }
      );

      download(blob, "whiteboard.svg");

      toast.success("SVG exported");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export SVG");
    }
  }

  function exportJSON() {
    if (!api) {
      toast.error("Canvas not ready");
      return;
    }

    try {
      const scene = {
        type: "excalidraw",
        version: 2,
        source: "FlowForge",
        elements: api.getSceneElements(),
        appState: api.getAppState(),
        files: api.getFiles(),
      };

      const blob = new Blob(
        [
          JSON.stringify(
            scene,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

      download(
        blob,
        "whiteboard.excalidraw"
      );

      toast.success("JSON exported");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export JSON");
    }
  }

  function download(
    blob: Blob,
    filename: string
  ) {
    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            transition
            hover:bg-slate-800
          "
        >
          <Download size={16} />
          Export
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="
            z-50
            w-52
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            p-2
            shadow-xl
          "
        >
          <DropdownMenu.Item
            onClick={exportPNG}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              outline-none
              hover:bg-slate-800
            "
          >
            <FileImage size={16} />
            Export PNG
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={exportSVG}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              outline-none
              hover:bg-slate-800
            "
          >
            <FileType2 size={16} />
            Export SVG
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-slate-700" />

          <DropdownMenu.Item
            onClick={exportJSON}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              outline-none
              hover:bg-slate-800
            "
          >
            <FileJson size={16} />
            Export JSON
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}