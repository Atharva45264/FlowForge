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

import useImageTool from "@/hooks/use-image-tool";
import usePDFTool from "@/hooks/use-pdf-tool";
import useVoice from "@/hooks/use-voice";

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

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoice();

  const {
    uploading: pdfUploading,
    upload: uploadPDF,
  } = usePDFTool();

  const {
    uploading: imageUploading,
    upload: uploadImage,
  } = useImageTool();

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height =
      textarea.scrollHeight + "px";
  }, [message]);

  async function handleSend() {
    if (!message.trim() || loading)
      return;

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
      const uploaded =
        await uploadPDF(file);

      setUploadedFile(uploaded);
    } catch (err) {
      console.error(err);
      alert("Failed uploading PDF.");
    }

    e.target.value = "";
  }

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const uploaded =
        await uploadImage(file);

      setUploadedFile(uploaded);
    } catch (err) {
      console.error(err);
      alert("Failed uploading image.");
    }

    e.target.value = "";
  }

  return (
    <div className="sticky bottom-0 z-20 border-t bg-background/80 px-6 pb-6 pt-4 backdrop-blur-xl">

      <div className="mx-auto w-full max-w-5xl rounded-[30px] border bg-background shadow-2xl">

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handlePDFChange}
        />

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {uploadedFile && (
          <div className="border-b px-5 py-4">

            <div className="flex items-center justify-between rounded-2xl border bg-muted/40 px-4 py-3">

              <div className="flex items-center gap-3">

                {uploadedFile.type ===
                "pdf" ? (
                  <FileText className="h-5 w-5 text-red-500" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                )}

                <div>

                  <p className="text-sm font-medium">

                    {uploadedFile.fileName}

                  </p>

                  <p className="text-xs text-muted-foreground">

                    Attached

                  </p>

                </div>

              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setUploadedFile(null)
                }
                className="rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>

            </div>

          </div>
        )}

        <div className="flex items-end gap-3 p-4">
                    <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-2xl transition-all hover:bg-muted"
            disabled={
              loading ||
              pdfUploading ||
              imageUploading
            }
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {pdfUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-2xl transition-all hover:bg-muted"
            disabled={
              loading ||
              imageUploading
            }
            onClick={() =>
              imageInputRef.current?.click()
            }
          >
            {imageUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImageIcon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant={
              listening
                ? "destructive"
                : "ghost"
            }
            size="icon"
            className={`h-11 w-11 rounded-2xl transition-all ${
              listening
                ? "animate-pulse shadow-lg"
                : "hover:bg-muted"
            }`}
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
            ref={textareaRef}
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
                ? "Ask anything about your attachment..."
                : "Message FlowForge AI..."
            }
            className="max-h-52 min-h-11.5 flex-1 resize-none bg-transparent px-2 py-2 text-[15px] leading-7 placeholder:text-muted-foreground focus:outline-none"
          />

          <Button
            size="icon"
            disabled={
              loading ||
              !message.trim()
            }
            onClick={handleSend}
            className="h-11 w-11 rounded-2xl shadow-md transition-all hover:scale-105"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </Button>

        </div>

        <div className="flex items-center justify-between border-t px-5 py-3 text-xs text-muted-foreground">

          <span>
            Press <kbd className="rounded border px-1.5 py-0.5">Enter</kbd> to send
          </span>

          <span>
            Shift + Enter for a new line
          </span>

        </div>

      </div>

    </div>
  );
}