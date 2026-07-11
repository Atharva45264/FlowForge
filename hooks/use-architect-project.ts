"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { ArchitectAPI } from "@/lib/architect-api";
import { ArchitectProject } from "@/types/architect";

export function useArchitectProject() {
  const queryClient =
    useQueryClient();

  const projectsQuery =
    useQuery({
      queryKey: [
        "architect-projects",
      ],

      queryFn:
        ArchitectAPI.getProjects,
    });

  const createMutation =
    useMutation({
      mutationFn: async (data: {
        title: string;
        prompt: string;
        mermaid: string;
      }) => {
        return await ArchitectAPI.createProject(
          data
        );
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "architect-projects",
          ],
        });
      },
    });

  const updateMutation =
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;

        data: Partial<ArchitectProject>;
      }) => {
        return await ArchitectAPI.updateProject(
          id,
          data
        );
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "architect-projects",
          ],
        });
      },
    });

  const deleteMutation =
    useMutation({
      mutationFn:
        ArchitectAPI.deleteProject,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "architect-projects",
          ],
        });
      },
    });

  return {
    projects:
      projectsQuery.data ?? [],

    loading:
      projectsQuery.isLoading,

    createProject: async (data: {
      title: string;
      prompt: string;
      mermaid: string;
    }) => {
      return await createMutation.mutateAsync(
        data
      );
    },

    updateProject: async ({
      id,
      data,
    }: {
      id: string;

      data: Partial<ArchitectProject>;
    }) => {
      return await updateMutation.mutateAsync(
        {
          id,
          data,
        }
      );
    },

    deleteProject: async (
      id: string
    ) => {
      return await deleteMutation.mutateAsync(
        id
      );
    },
  };
}