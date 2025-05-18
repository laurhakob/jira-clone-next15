// "use client";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export const WorkspacePreview = () => {
//   const { data, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace();
//   const [name, setName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isCreating, setIsCreating] = useState(false); // manually track loading

//   const workspace = data?.[0];

//   const handleCreate = async () => {
//     if (name.trim().length < 3) {
//       setError("Workspace name must be at least 3 characters");
//       return;
//     }
//     setError(null);
//     setIsCreating(true);

//     try {
//       await createWorkspace({ name }); // ✅ call directly
//       setName(""); // Clear input on success
//     } catch (e) {
//       setError("Failed to create workspace");
//       console.error(e);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="mt-6">
//       {workspace ? (
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-2">Workspace</h2>
//           <p>
//             <strong>Name:</strong> {workspace.name}
//           </p>
//           <p>
//             <strong>ID:</strong> {workspace._id}</p>
//         </div>
//       ) : (
//         <div className="p-4 bg-gray-100 rounded-md space-y-4">
//           <h2 className="text-lg font-semibold">Create a Workspace</h2>
//           <Input
//             placeholder="Workspace name e.g. 'Work', 'Personal'"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             minLength={3}
//             required
//           />
//           <Button onClick={handleCreate} disabled={isCreating}>
//             {isCreating ? "Creating..." : "Create"}
//           </Button>
//           {error && <p className="text-red-600">{error}</p>}
//         </div>
//       )}
//     </div>
//   );
// };


"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { Id } from "../../../../convex/_generated/dataModel";

export const WorkspacePreview = () => {
  const { data, isLoading } = useGetWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (name.trim().length < 3) {
      setError("Workspace name must be at least 3 characters");
      return;
    }
    setError(null);
    setIsCreating(true);
    try {
      await createWorkspace({ name });
      setName("");
    } catch (e) {
      setError("Failed to create workspace");
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
await deleteWorkspace({ id: id as Id<"workspaces"> });
    } catch (e) {
      console.error("Failed to delete workspace", e);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6 space-y-6">
      <div className="p-4 bg-gray-100 rounded-md space-y-4">
        <h2 className="text-lg font-semibold">Create a Workspace</h2>
        <Input
          placeholder="Workspace name e.g. 'Work', 'Personal'"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={3}
          required
        />
        <Button onClick={handleCreate} disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
        {data?.length === 0 ? (
          <p className="text-gray-600">No workspaces found.</p>
        ) : (
          <ul className="space-y-3">
            {data?.map((workspace) => (
              <li
                key={workspace._id}
                className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{workspace.name}</p>
                  <p className="text-sm text-gray-500">ID: {workspace._id}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(workspace._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
