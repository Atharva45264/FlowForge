"use client";

import Link from "next/link";
import {
  Bot,
  CalendarDays,
  FileText,
  FolderKanban,
  PenTool,
  Brain,
} from "lucide-react";

import { SearchResult } from "@/hooks/use-search";

interface Props {
  result: SearchResult;
  selected?: boolean;
  onSelect?: () => void;
}

const iconMap = {
  note: FileText,
  page: FolderKanban,
  whiteboard: PenTool,
  calendar: CalendarDays,
  chat: Bot,
  architect: Brain,
};

const colorMap = {
  note: "text-emerald-400",
  page: "text-sky-400",
  whiteboard: "text-pink-400",
  calendar: "text-cyan-400",
  chat: "text-violet-400",
  architect: "text-amber-400",
};

export default function SearchResultItem({
  result,
  selected = false,
  onSelect,
}: Props) {
  const Icon = iconMap[result.type];

  return (
    <Link
      href={result.href}
      onClick={onSelect}
      className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200 ${
        selected
          ? "border-indigo-500/40 bg-indigo-500/10"
          : "border-transparent hover:border-indigo-500/30 hover:bg-slate-900"
      }`}
    >
      <div
        className={`rounded-xl bg-slate-800 p-2 ${colorMap[result.type]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-white">
          {result.title}
        </h4>

        {result.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
            {result.description}
          </p>
        )}

        <span className="mt-2 inline-block rounded-full bg-slate-800 px-2 py-1 text-xs capitalize text-slate-300">
          {result.type}
        </span>
      </div>
    </Link>
  );
}