import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCreateProject = () => {
  return useMutation(api.projects.create);
};