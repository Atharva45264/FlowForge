import { Note } from "@/types/note";

export async function getNotes(): Promise<Note[]> {
  const res = await fetch("/api/notes");

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
}

export async function createNote() {
  const res = await fetch("/api/notes", {
    method: "POST",
  });

  return res.json();
}

export async function updateNote(
  id: string,
  data: Partial<Note>
) {
  const res = await fetch(
    `/api/notes/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}

export async function deleteNote(
  id: string
) {
  await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
}