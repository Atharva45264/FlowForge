"use client";

import {
  Search,
  Star,
  Clock3,
  Archive,
  Plus,
  FolderOpen,
} from "lucide-react";

import { useSpaces } from "@/hooks/useSpaces";
import { usePageStore } from "@/store/pageStore";

export default function PageSidebar() {
  const { data: spaces = [], isLoading } = useSpaces();

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
              <button
                key={space._id}
                onClick={() =>
                  setSelectedSpaceId(space._id)
                }
                className={`w-full rounded-lg px-3 py-2 text-left transition ${
                  selectedSpaceId === space._id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-lg">
                    {space.icon}
                  </span>

                  <div className="min-w-0 flex-1">

                    <p className="truncate font-medium">
                      {space.name}
                    </p>

                    <p className="text-xs opacity-70">
                      {space.pageCount} Pages
                    </p>

                  </div>

                </div>

              </button>
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