"use client";

import { useState } from "react";

export interface UploadedPDF {
  type: "pdf";
  fileName: string;
  mimeType: string;
  base64: string;
}

export default function usePDFTool() {
  const [uploading, setUploading] = useState(false);

  async function upload(
    file: File
  ): Promise<UploadedPDF> {
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch(
        "/api/assistant/pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error?.message ??
            "Failed uploading PDF."
        );
      }

      return data.data;
    } finally {
      setUploading(false);
    }
  }

  return {
    uploading,
    upload,
  };
}