"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useSearch } from "@/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import SearchResultItem from "./search-result-item";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const RECENT_KEY = "flowforge-recent-searches";

export default function SearchDialog({
  open,
  onClose,
}: SearchDialogProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const { data = [], isLoading } =
    useSearch(debouncedQuery);

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_KEY);

    if (saved) {
      setRecent(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [data]);

  const results = useMemo(() => data, [data]);

  function saveRecent(value: string) {
    if (!value.trim()) return;

    const updated = [
      value,
      ...recent.filter((item) => item !== value),
    ].slice(0, 5);

    setRecent(updated);

    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(updated)
    );
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          Math.min(prev + 1, results.length - 1)
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          Math.max(prev - 1, 0)
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();

        const item = results[selectedIndex];

        if (!item) return;

        saveRecent(item.title);

        router.push(item.href);

        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    open,
    results,
    selectedIndex,
    recent,
    router,
    onClose,
  ]);
    if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 flex items-start justify-center bg-black/50 p-6 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={(e) => e.stopPropagation()}
          className="mt-20 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl"
        >
          {/* Search Input */}

          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, pages, whiteboards, chats..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
            />

            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            )}
          </div>

          <div className="max-h-125 overflow-y-auto p-3">
            {/* Recent Searches */}

            {!query && recent.length > 0 && (
              <div className="mb-4">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Recent Searches
                </p>

                <div className="space-y-2">
                  {recent.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-900"
                    >
                      <Search className="h-4 w-4 text-slate-500" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!query && recent.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-500">
                Start typing to search your workspace...
              </div>
            )}

            {query && !isLoading && results.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-500">
                No matching results found.
              </div>
            )}

            <div className="space-y-2">
              {results.map((result, index) => (
                <SearchResultItem
                  key={`${result.type}-${result.id}`}
                  result={result}
                  selected={selectedIndex === index}
                  onSelect={() => {
                    saveRecent(result.title);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-slate-500">
            <span>↑ ↓ Navigate</span>

            <span>Enter Open</span>

            <span>Esc Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}