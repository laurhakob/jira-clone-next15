import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useDeleteProject = () => {
  return useMutation(api.projects.remove);
};