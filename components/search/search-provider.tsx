"use client";

import { useCallback, useEffect, useState } from "react";

import SearchDialog from "./search-dialog";

export default function SearchProvider() {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => {
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform
        .toUpperCase()
        .includes("MAC");

      const shortcut = isMac
        ? e.metaKey && e.key.toLowerCase() === "k"
        : e.ctrlKey && e.key.toLowerCase() === "k";

      if (!shortcut) return;

      e.preventDefault();

      setOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  return (
    <>
      <SearchDialog
        open={open}
        onClose={closeSearch}
      />
    </>
  );
}