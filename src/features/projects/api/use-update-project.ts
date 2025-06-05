import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useUpdateProject = () => {
  return useMutation(api.projects.update);
};