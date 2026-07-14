"use client";

import { useEffect, useState } from "react";

export default function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStart = () => setSpeaking(true);
    const handleEnd = () => setSpeaking(false);

    speechSynthesis.addEventListener("voiceschanged", () => {});

    return () => {
      speechSynthesis.cancel();
      speechSynthesis.removeEventListener(
        "voiceschanged",
        () => {}
      );
      handleStart;
      handleEnd;
    };
  }, []);

  function speak(text: string) {
    if (!text.trim()) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    const voices = speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) =>
        voice.name.includes("Google")
      ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    speechSynthesis.cancel();
    setSpeaking(false);
  }

  return {
    speak,
    stopSpeaking,
    speaking,
  };
}