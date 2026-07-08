"use client";

import {
  Download,
  FileImage,
  FileJson,
} from "lucide-react";

export function ExportMenu() {
  async function exportPNG() {
    const api = (window as any).excalidrawAPI;

    if (!api) return;

    const blob = await api.exportToBlob({
      mimeType: "image/png",
    });

    download(blob, "whiteboard.png");
  }

  async function exportSVG() {
    const api = (window as any).excalidrawAPI;

    if (!api) return;

    const blob = await api.exportToBlob({
      mimeType: "image/svg+xml",
    });

    download(blob, "whiteboard.svg");
  }

  function exportJSON() {
    const api = (window as any).excalidrawAPI;

    if (!api) return;

    const data = api.getSceneElements();

    const blob = new Blob(
      [
        JSON.stringify(data, null, 2),
      ],
      {
        type: "application/json",
      }
    );

    download(blob, "whiteboard.excalidraw");
  }

  function download(
    blob: Blob,
    filename: string
  ) {
    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportPNG}
        className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800"
      >
        <FileImage size={18} />
      </button>

      <button
        onClick={exportSVG}
        className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800"
      >
        <Download size={18} />
      </button>

      <button
        onClick={exportJSON}
        className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800"
      >
        <FileJson size={18} />
      </button>
    </div>
  );
}