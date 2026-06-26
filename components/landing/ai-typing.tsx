"use client";

import { useEffect, useState } from "react";

const message =
  "Generating sprint summary using AI...";

export function AITyping() {
  const [text, setText] =
    useState("");

  useEffect(() => {
    let index = 0;

    const interval =
      setInterval(() => {
        setText(
          message.slice(0, index)
        );

        index++;

        if (index > message.length) {
          clearInterval(interval);

          setTimeout(() => {
            setText("");
            index = 0;
          }, 2500);
        }
      }, 45);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">
        {text}

        <span className="animate-pulse text-violet-400">
          ▋
        </span>
      </p>
    </div>
  );
}