"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface WorkspaceSettings {
  workspaceName: string;
  defaultPage: string;

  collapseSidebar: boolean;
  rememberSidebar: boolean;

  autosaveNotes: boolean;
  autosaveWhiteboard: boolean;
  autosavePages: boolean;
}

async function fetchSettings(): Promise<WorkspaceSettings> {
  const res = await fetch("/api/settings/workspace");

  if (!res.ok) {
    throw new Error(
      "Failed to fetch workspace settings"
    );
  }

  return res.json();
}

export function useWorkspaceSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["workspace-settings"],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: async (
      settings: WorkspaceSettings
    ) => {
      const res = await fetch(
        "/api/settings/workspace",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to save workspace settings"
        );
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "workspace-settings",
        ],
      });
    },
  });

  return {
    ...query,
    saveSettings: mutation.mutate,
    isSaving: mutation.isPending,
  };
}