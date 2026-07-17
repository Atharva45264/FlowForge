import { create } from "zustand";

interface PageStore {
  // Selected Space
  selectedSpaceId: string | null;
  setSelectedSpaceId: (id: string | null) => void;

  // Selected Page
  selectedPageId: string | null;
  setSelectedPageId: (id: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Create Modals
  createSpaceOpen: boolean;
  setCreateSpaceOpen: (open: boolean) => void;

  createPageOpen: boolean;
  setCreatePageOpen: (open: boolean) => void;

  // Filters
  activeFilter:
    | "all"
    | "favorites"
    | "recent"
    | "archived";

  setActiveFilter: (
    filter:
      | "all"
      | "favorites"
      | "recent"
      | "archived"
  ) => void;

  reset: () => void;
}

export const usePageStore = create<PageStore>((set) => ({
  // Selected items
  selectedSpaceId: null,
  selectedPageId: null,

  // Search
  searchQuery: "",

  // Sidebar
  sidebarCollapsed: false,

  // Dialogs
  createSpaceOpen: false,
  createPageOpen: false,

  // Filter
  activeFilter: "all",

  setSelectedSpaceId: (id) =>
    set({
      selectedSpaceId: id,
      selectedPageId: null,
    }),

  setSelectedPageId: (id) =>
    set({
      selectedPageId: id,
    }),

  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  setCreateSpaceOpen: (open) =>
    set({
      createSpaceOpen: open,
    }),

  setCreatePageOpen: (open) =>
    set({
      createPageOpen: open,
    }),

  setActiveFilter: (filter) =>
    set({
      activeFilter: filter,
    }),

  reset: () =>
    set({
      selectedSpaceId: null,
      selectedPageId: null,
      searchQuery: "",
      sidebarCollapsed: false,
      createSpaceOpen: false,
      createPageOpen: false,
      activeFilter: "all",
    }),
}));