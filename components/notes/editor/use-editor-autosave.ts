"use client";

import { useEffect, useRef } from "react";

type Props = {
  callback: () => void;
  delay?: number;
  enabled?: boolean;
  dependencies: unknown[];
};

export function useEditorAutosave({
  callback,
  delay = 800,
  enabled = true,
  dependencies,
}: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [...dependencies]);
}