import { Note } from "@/types/note";

const API = "/api/notes";

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(API);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to fetch notes"
    );
  }

  return data.notes;
}

export async function createNote(): Promise<Note> {
  const res = await fetch(API, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to create note"
    );
  }

  return data.note;
}

export async function updateNote(
  id: string,
  note: Partial<Note>
): Promise<Note> {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to update note"
    );
  }

  return data.note;
}

export async function deleteNote(
  id: string
): Promise<void> {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to delete note"
    );
  }
}