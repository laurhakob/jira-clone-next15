// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

// export const useDeleteWorkspace = () => {
//   return useMutation(api.workspaces.remove);
// };


import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useDeleteWorkspace = () => useMutation(api.workspaces.remove);
