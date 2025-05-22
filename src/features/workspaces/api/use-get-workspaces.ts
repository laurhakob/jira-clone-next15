import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Workspace } from "@/types";

export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get) as Workspace[] | undefined;
  const isLoading = data === undefined;

  return { data, isLoading };
};