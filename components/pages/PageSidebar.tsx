"use client";

import {
  Search,
  Star,
  Clock3,
  Archive,
  Plus,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";

import { useSpaces } from "@/hooks/useSpaces";
import { usePagesBySpace } from "@/hooks/usePages";
import { usePageStore } from "@/store/pageStore";
import { useState } from "react";

export default function PageSidebar() {
  const { data: spaces = [], isLoading } = useSpaces();

  const [expandedSpace, setExpandedSpace] =
  useState<string | null>(null);

  const {
    selectedSpaceId,
    setSelectedSpaceId,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    setCreateSpaceOpen,
  } = usePageStore();

  return (
    <aside className="w-72 border-r bg-background flex flex-col">

      {/* Header */}
      <div className="border-b p-5">
        <h2 className="text-xl font-bold">
          Pages & Spaces
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Organize your notes and documents
        </p>
      </div>

      {/* Search */}
      <div className="p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-muted-foreground"
          />

          <input
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search..."
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

        </div>

      </div>

      {/* Filters */}
      <div className="px-3 space-y-1">

        <SidebarButton
          active={activeFilter === "favorites"}
          icon={<Star size={18} />}
          label="Favorites"
          onClick={() => setActiveFilter("favorites")}
        />

        <SidebarButton
          active={activeFilter === "recent"}
          icon={<Clock3 size={18} />}
          label="Recently Opened"
          onClick={() => setActiveFilter("recent")}
        />

        <SidebarButton
          active={activeFilter === "archived"}
          icon={<Archive size={18} />}
          label="Archived"
          onClick={() => setActiveFilter("archived")}
        />

      </div>

      {/* Spaces */}
      <div className="mt-6 flex-1 overflow-y-auto">

        <div className="flex items-center justify-between px-4 mb-3">

          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Spaces
          </h3>

          <button
            onClick={() => setCreateSpaceOpen(true)}
            className="rounded-md p-1 hover:bg-muted transition"
          >
            <Plus size={16} />
          </button>

        </div>

        {isLoading ? (
          <p className="px-4 text-sm text-muted-foreground">
            Loading...
          </p>
        ) : spaces.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            No spaces yet
          </p>
        ) : (
          <div className="space-y-1 px-2">

            {spaces.map((space) => (
  <SpaceItem
    key={space._id}
    space={space}
    expanded={expandedSpace === space._id}
    onToggle={() =>
      setExpandedSpace((prev) =>
        prev === space._id ? null : space._id
      )
    }
  />
))}

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t p-4">

        <button
          onClick={() => setSelectedSpaceId(null)}
          className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 hover:bg-muted transition"
        >
          <FolderOpen size={18} />

          <span>All Spaces</span>

        </button>

      </div>

    </aside>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-muted font-medium"
          : "hover:bg-muted"
      }`}
    >
      {icon}

      {label}
    </button>
  );
}

interface SpaceItemProps {
  space: any;
  expanded: boolean;
  onToggle: () => void;
}

function SpaceItem({
  space,
  expanded,
  onToggle,
}: SpaceItemProps) {
  const {
    selectedSpaceId,
    selectedPageId,
    setSelectedSpaceId,
    setSelectedPageId,
  } = usePageStore();

  const { data: pages = [] } =
    usePagesBySpace(space._id);

  return (
    <div className="rounded-xl">

      <button
        onClick={() => {
          setSelectedSpaceId(space._id);
          onToggle();
        }}
        className={`flex w-full items-center rounded-xl px-3 py-2 transition ${
          selectedSpaceId === space._id
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`}
      >
        {expanded ? (
          <ChevronDown className="mr-2 h-4 w-4" />
        ) : (
          <ChevronRight className="mr-2 h-4 w-4" />
        )}

        <span className="mr-2 text-lg">
          {space.icon}
        </span>

        <div className="flex-1 text-left">

          <p className="font-medium">
            {space.name}
          </p>

          <p className="text-xs opacity-70">
            {space.pageCount} Pages
          </p>

        </div>

      </button>

      {expanded && (
        <div className="ml-10 mt-1 space-y-1">

          {pages.map((page: any) => (
            <button
              key={page._id}
              onClick={() =>
                setSelectedPageId(page._id)
              }
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                selectedPageId === page._id
                  ? "bg-muted font-medium"
                  : "hover:bg-muted"
              }`}
            >
              <FileText className="h-4 w-4" />

              {page.title}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}