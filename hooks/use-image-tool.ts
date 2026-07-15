"use client";

import { useState } from "react";

export interface UploadedImage {
  type: "image";
  fileName: string;
  mimeType: string;
  base64: string;
}

export default function useImageTool() {
  const [uploading, setUploading] =
    useState(false);

  async function upload(
    file: File
  ): Promise<UploadedImage> {
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch(
        "/api/assistant/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error?.message ??
            "Image upload failed."
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