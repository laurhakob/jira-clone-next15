import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useUpdateWorkspace = () => useMutation(api.workspaces.update);
