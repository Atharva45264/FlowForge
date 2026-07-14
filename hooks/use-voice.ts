"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function useVoice() {
  const recognitionRef = useRef<any>(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (
      event: SpeechRecognitionEvent
    ) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    recognitionRef.current?.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
  }

  function clearTranscript() {
    setTranscript("");
  }

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
  };
}