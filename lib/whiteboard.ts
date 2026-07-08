import { Whiteboard } from "@/types/whiteboard";

const API = "/api/whiteboards";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const message =
      (await res.json().catch(() => null))?.error ??
      "Request failed";

    throw new Error(message);
  }

  return res.json();
}

export const WhiteboardAPI = {
  getBoards: () =>
    request<Whiteboard[]>(API),

  getBoard: (id: string) =>
    request<Whiteboard>(`${API}/${id}`),

  createBoard: () =>
    request<Whiteboard>(API, {
      method: "POST",
    }),

  updateBoard: (
    id: string,
    body: Partial<Whiteboard>
  ) =>
    request<Whiteboard>(`${API}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteBoard: (id: string) =>
    request(`${API}/${id}`, {
      method: "DELETE",
    }),

  toggleFavorite: (
  id: string,
  favorite: boolean
) =>
  request<Whiteboard>(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      favorite,
    }),
  }),
  archiveBoard: (
  id: string,
  archived: boolean
) =>
  request<Whiteboard>(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      archived,
    }),
  }),
};