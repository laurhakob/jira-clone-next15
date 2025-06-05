import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetProjects = (workspaceId: Id<"workspaces">) => {
  const data = useQuery(api.projects.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};