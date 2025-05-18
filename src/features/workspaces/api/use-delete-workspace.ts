import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useDeleteWorkspace = () => {
  return useMutation(api.workspaces.remove);
};
