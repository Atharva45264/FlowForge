import { ArchitectProject } from "@/types/architect";

export const ArchitectAPI = {
  async getProjects() {
    const res = await fetch("/api/architect");

    if (!res.ok)
      throw new Error(
        "Failed loading projects"
      );

    return res.json();
  },

  async getProject(id: string) {
    const res = await fetch(
      `/api/architect/${id}`
    );

    return res.json();
  },

  async createProject(data: {
    title: string;
    prompt: string;
    mermaid: string;
  }) {
    const res = await fetch(
      "/api/architect",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  async updateProject(
    id: string,
    data: Partial<ArchitectProject>
  ) {
    const res = await fetch(
      `/api/architect/${id}`,
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
  },

  async deleteProject(id: string) {
    await fetch(
      `/api/architect/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};