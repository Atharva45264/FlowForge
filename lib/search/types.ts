export type SearchType =
  | "note"
  | "page"
  | "whiteboard"
  | "calendar"
  | "chat"
  | "architect";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: SearchType;
  href: string;
  updatedAt: Date;
}

export interface SearchResponse {
  results: SearchResult[];
}