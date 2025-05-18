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

// "use client";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useDeleteWorkspace } from "../api/use-delete-workspace";
// import { Id } from "../../../../convex/_generated/dataModel";

// export const WorkspacePreview = () => {
//   const { data, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace();
//   const deleteWorkspace = useDeleteWorkspace();
//   const [name, setName] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleCreate = async () => {
//     if (name.trim().length < 3) {
//       setError("Workspace name must be at least 3 characters");
//       return;
//     }
//     setError(null);
//     setIsCreating(true);
//     try {
//       await createWorkspace({ name });
//       setName("");
//     } catch (e) {
//       setError("Failed to create workspace");
//       console.error(e);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
// await deleteWorkspace({ id: id as Id<"workspaces"> });
//     } catch (e) {
//       console.error("Failed to delete workspace", e);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="mt-6 space-y-6">
//       <div className="p-4 bg-gray-100 rounded-md space-y-4">
//         <h2 className="text-lg font-semibold">Create a Workspace</h2>
//         <Input
//           placeholder="Workspace name e.g. 'Work', 'Personal'"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           minLength={3}
//           required
//         />
//         <Button onClick={handleCreate} disabled={isCreating}>
//           {isCreating ? "Creating..." : "Create"}
//         </Button>
//         {error && <p className="text-red-600">{error}</p>}
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
//         {data?.length === 0 ? (
//           <p className="text-gray-600">No workspaces found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {data?.map((workspace) => (
//               <li
//                 key={workspace._id}
//                 className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-medium">{workspace.name}</p>
//                   <p className="text-sm text-gray-500">ID: {workspace._id}</p>
//                 </div>
//                 <Button
//                   variant="destructive"
//                   onClick={() => handleDelete(workspace._id)}
//                 >
//                   Delete
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// "use client";

// import { useState } from "react";
// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Id } from "../../../../convex/_generated/dataModel";

// export const WorkspacePreview = () => {
//   /* ─── queries & mutations ─────────────────────────────── */
//   const { data, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace();
//   const updateWorkspace = useUpdateWorkspace();
//   const deleteWorkspace = useDeleteWorkspace();

//   /* ─── local state ──────────────────────────────────────── */
//   const [name, setName] = useState("");
//   const [editingId, setEditingId] = useState<Id<"workspaces"> | null>(null);
//   const [newName, setNewName] = useState("");
//   const [confirmId, setConfirmId] = useState<Id<"workspaces"> | null>(null);

//   /* ─── create ───────────────────────────────────────────── */
//   const handleCreate = async () => {
//     if (name.trim().length < 3) return;
//     await createWorkspace({ name });
//     setName("");
//   };

//   /* ─── edit ─────────────────────────────────────────────── */
//   const startEdit = (wsId: Id<"workspaces">, current: string) => {
//     setEditingId(wsId);
//     setNewName(current);
//   };

//   const handleEditSave = async () => {
//     if (!editingId || newName.trim().length < 3) return;
//     await updateWorkspace({ id: editingId, name: newName });
//     setEditingId(null);
//   };

//   /* ─── delete ───────────────────────────────────────────── */
//   const confirmDelete = async () => {
//     if (!confirmId) return;
//     await deleteWorkspace({ id: confirmId });
//     setConfirmId(null);
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="mt-6 space-y-6">
//       {/* ─────── Create ─────── */}
//       <div className="p-4 bg-gray-100 rounded-md space-y-4">
//         <h2 className="text-lg font-semibold">Create a Workspace</h2>
//         <Input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Workspace name"
//           minLength={3}
//           required
//         />
//         <Button onClick={handleCreate}>Create</Button>
//       </div>

//       {/* ─────── List ─────── */}
//       <div>
//         <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
//         {data?.length ? (
//           <ul className="space-y-3">
//             {data.map((ws) => (
//               <li
//                 key={ws._id}
//                 className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
//               >
//                 {editingId === ws._id ? (
//                   <>
//                     <Input
//                       value={newName}
//                       onChange={(e) => setNewName(e.target.value)}
//                       className="mr-2"
//                     />
//                     <div className="space-x-2">
//                       <Button size="sm" onClick={handleEditSave}>
//                         Save
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={() => setEditingId(null)}
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div>
//                       <p className="font-medium">{ws.name}</p>
//                       <p className="text-sm text-gray-500">ID: {ws._id}</p>
//                     </div>
//                     <div className="space-x-2">
//                       <Button size="sm" onClick={() => startEdit(ws._id, ws.name)}>
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => setConfirmId(ws._id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No workspaces found.</p>
//         )}
//       </div>

//       {/* ─────── Confirm Delete Dialog ─────── */}
//       <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
//         <DialogContent>
//           <h3 className="text-lg font-semibold mb-4">
//             Delete this workspace?
//           </h3>
//           <p className="text-sm text-gray-600 mb-6">
//             This action cannot be undone.
//           </p>
//           <div className="flex justify-end space-x-2">
//             <Button variant="secondary" onClick={() => setConfirmId(null)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Id } from "../../../../convex/_generated/dataModel";

export const WorkspacePreview = () => {
  /* ─── queries & mutations ─────────────────────────────── */
  const { data, isLoading } = useGetWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const updateWorkspace = useUpdateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();

  /* ─── local state ──────────────────────────────────────── */
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<Id<"workspaces"> | null>(null);
  const [newName, setNewName] = useState("");
  const [confirmId, setConfirmId] = useState<Id<"workspaces"> | null>(null);

  /* ─── create ───────────────────────────────────────────── */
  const handleCreate = async () => {
    if (name.trim().length < 3) return;
    await createWorkspace({ name });
    setName("");
  };

  /* ─── edit ─────────────────────────────────────────────── */
  const startEdit = (wsId: Id<"workspaces">, current: string) => {
    setEditingId(wsId);
    setNewName(current);
  };

  const handleEditSave = async () => {
    if (!editingId || newName.trim().length < 3) return;
    await updateWorkspace({ id: editingId, name: newName });
    setEditingId(null);
  };

  /* ─── delete ───────────────────────────────────────────── */
  const confirmDelete = async () => {
    if (!confirmId) return;
    await deleteWorkspace({ id: confirmId });
    setConfirmId(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6 space-y-6">
      {/* ─────── Create ─────── */}
      <div className="p-4 bg-gray-100 rounded-md space-y-4">
        <h2 className="text-lg font-semibold">Create a Workspace</h2>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace name"
          minLength={3}
          required
        />
        <Button
          className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      {/* ─────── List ─────── */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
        {data?.length ? (
          <ul className="space-y-3">
            {data.map((ws) => (
              <li
                key={ws._id}
                className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
              >
                {editingId === ws._id ? (
                  <>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="mr-2"
                    />
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
                        onClick={handleEditSave}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-medium">{ws.name}</p>
                      <p className="text-sm text-gray-500">ID: {ws._id}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
                        onClick={() => startEdit(ws._id, ws.name)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setConfirmId(ws._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No workspaces found.</p>
        )}
      </div>

      {/* ─────── Confirm Delete Dialog ─────── */}
      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription className="mb-6 text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
