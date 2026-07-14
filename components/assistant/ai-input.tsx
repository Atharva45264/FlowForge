"use client";

import { useEffect, useRef, useState } from "react";

import {
  FileText,
  ImageIcon,
  Loader2,
  Mic,
  Paperclip,
  SendHorizontal,
  Square,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import useVoice from "@/hooks/use-voice";
import usePDFTool from "@/hooks/use-pdf-tool";

import type { UploadedFile } from "./ai-layout";

interface AIInputProps {
  onSend: (message: string) => Promise<void>;
  loading: boolean;

  uploadedFile: UploadedFile | null;

  setUploadedFile: React.Dispatch<
    React.SetStateAction<UploadedFile | null>
  >;
}

export default function AIInput({
  onSend,
  loading,
  uploadedFile,
  setUploadedFile,
}: AIInputProps) {
  const [message, setMessage] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoice();

  const {
    uploading,
    upload,
  } = usePDFTool();

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  async function handleSend() {
    if (!message.trim() || loading) return;

    const text = message;

    setMessage("");

    clearTranscript();

    await onSend(text);
  }

  async function handlePDFChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const uploaded = await upload(file);

      setUploadedFile(uploaded);
    } catch (err) {
      console.error(err);
      alert("Failed uploading PDF.");
    }

    e.target.value = "";
  }

  return (
    <div className="border-t bg-background p-4">

      {uploadedFile && (
        <div className="mb-3 flex items-center justify-between rounded-lg border bg-muted px-3 py-2">

          <div className="flex items-center gap-2">

            <FileText className="h-4 w-4 text-red-500" />

            <span className="text-sm">
              {uploadedFile.fileName}
            </span>

          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setUploadedFile(null)
            }
          >
            <X className="h-4 w-4" />
          </Button>

        </div>
      )}

      <div className="flex items-end gap-3 rounded-2xl border bg-card p-3">

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handlePDFChange}
        />

        <Button
          variant="ghost"
          size="icon"
          disabled={
            loading || uploading
          }
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Paperclip className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled
        >
          <ImageIcon className="h-5 w-5" />
        </Button>

        <Button
          variant={
            listening
              ? "destructive"
              : "ghost"
          }
          size="icon"
          onClick={() => {
            if (listening) {
              stopListening();
            } else {
              clearTranscript();
              startListening();
            }
          }}
        >
          {listening ? (
            <Square className="h-4 w-4" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        <textarea
          rows={1}
          value={message}
          disabled={loading}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            listening
              ? "Listening..."
              : uploadedFile
              ? "Ask anything about your document..."
              : "Ask FlowForge AI..."
          }
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent outline-none"
        />

        <Button
          size="icon"
          disabled={
            loading ||
            !message.trim()
          }
          onClick={handleSend}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>

      </div>

    </div>
  );
}