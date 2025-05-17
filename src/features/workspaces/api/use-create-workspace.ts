import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCreateWorkspace = () => {
  return useMutation(api.workspaces.create);
};
