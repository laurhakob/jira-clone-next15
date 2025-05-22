
// es minchev GROKy ashxatoxn er


// es versian shat lavn er, menak nkary broken er

// "use client";
// import { useState } from "react";
// import Image from "next/image";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";

// import { Id } from "../../../../convex/_generated/dataModel";
// import FileUpload from "@/features/upload/fileUpload";

// export const WorkspacePreview = () => {
//   const { data, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace();
//   const updateWorkspace = useUpdateWorkspace();
//   const deleteWorkspace = useDeleteWorkspace();

//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const [editingId, setEditingId] = useState<Id<"workspaces"> | null>(null);
//   const [newName, setNewName] = useState("");
//   const [confirmId, setConfirmId] = useState<Id<"workspaces"> | null>(null);

//   const handleCreate = async () => {
//     if (name.trim().length < 3) return;
//     await createWorkspace({ name, image: imageId ?? undefined });
//     setName("");
//     setImageId(null);
//     setImageUrl(null);
//   };

//   const startEdit = (wsId: Id<"workspaces">, current: string) => {
//     setEditingId(wsId);
//     setNewName(current);
//   };

//   const handleEditSave = async () => {
//     if (!editingId || newName.trim().length < 3) return;
//     await updateWorkspace({ id: editingId, name: newName });
//     setEditingId(null);
//   };

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

//         <FileUpload
//           onUploadComplete={(id) => {
//             const baseUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
//             setImageId(id as Id<"_storage">);
//             setImageUrl(`${baseUrl}/storage/${id}`);
//           }}
//         />

//         {imageUrl && (
//           <div>
//             <Image
//               src={imageUrl}
//               alt="Uploaded Preview"
//               width={100}
//               height={100}
//               className="rounded border mt-2"
//             />
//           </div>
//         )}

//         <Button
//           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//           onClick={handleCreate}
//         >
//           Create
//         </Button>
//       </div>

//       {/* ─────── List ─────── */}
//       <div>
//         <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
//         {data?.length ? (
//           <ul className="space-y-3">
//             {data.map((ws) => {
//               const wsImageUrl = ws.image
//                 ? `${process.env.NEXT_PUBLIC_CONVEX_URL}/storage/${ws.image}`
//                 : null;

//               return (
//                 <li
//                   key={ws._id}
//                   className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
//                 >
//                   {editingId === ws._id ? (
//                     <>
//                       <Input
//                         value={newName}
//                         onChange={(e) => setNewName(e.target.value)}
//                         className="mr-2"
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           size="sm"
//                           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                           onClick={handleEditSave}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => setEditingId(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="flex items-center gap-4">
//                         {wsImageUrl && (
//                           <Image
//                             src={wsImageUrl}
//                             alt="Workspace"
//                             width={48}
//                             height={48}
//                             className="rounded border"
//                           />
//                         )}
//                         <div>
//                           <p className="font-medium">{ws.name}</p>
//                           <p className="text-sm text-gray-500">ID: {ws._id}</p>
//                         </div>
//                       </div>
//                       <div className="space-x-2">
//                         <Button
//                           size="sm"
//                           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                           onClick={() => startEdit(ws._id, ws.name)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => setConfirmId(ws._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No workspaces found.</p>
//         )}
//       </div>

//       {/* ─────── Confirm Delete Dialog ─────── */}
//       <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
//         <DialogContent>
//           <DialogTitle>Delete this workspace?</DialogTitle>
//           <DialogDescription className="mb-6 text-sm text-gray-600">
//             This action cannot be undone.
//           </DialogDescription>
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

// .......................................................................................


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




// es lav ashxatum a

// "use client";

// import { useState } from "react";
// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
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
//         <Button
//           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//           onClick={handleCreate}
//         >
//           Create
//         </Button>
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
//                       <Button
//                         size="sm"
//                         className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                         onClick={handleEditSave}
//                       >
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
//                       <Button
//                         size="sm"
//                         className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                         onClick={() => startEdit(ws._id, ws.name)}
//                       >
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
//           <DialogTitle>Delete this workspace?</DialogTitle>
//           <DialogDescription className="mb-6 text-sm text-gray-600">
//             This action cannot be undone.
//           </DialogDescription>
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




// stex avelacnum ena image uploady workspaceum

// 'use client';

// import { useState } from "react";
// import Image from "next/image";

// import { Id } from "../../../../convex/_generated/dataModel";

// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import FileUpload from "@/features/upload/fileUpload";

// export default function WorkspacePreview() {
//   const [name, setName] = useState("");
// const [imageId, setImageId] = useState<string | undefined>(undefined);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   // <-- add this mutation hook here
//   const createWorkspace = useMutation(api.workspaces.create);

//   const handleCreate = async () => {
//   if (name.trim().length < 3) return;

//   await createWorkspace({
//     name,
//     image: imageId ? (imageId as Id<"_storage">) : undefined,
//   });

//   setName("");
//   setImageId(null);
//   setImageUrl(null);
// };

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Create a Workspace</h2>

//       <input
//         type="text"
//         placeholder="Workspace name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-3 py-2 border rounded mb-4"
//       />

//       {/* File upload component */}
//       <FileUpload
//         onUploadComplete={(id) => {
//           setImageId(id);
//           const url = `https://api.convex.dev/storage/${id}`; // use your Convex storage URL
//           setImageUrl(url);
//         }}
//       />

//       {/* Image preview */}
//       {imageUrl && (
//         <div className="mt-4">
//           <Image
//             src={imageUrl}
//             alt="Workspace Preview"
//             width={100}
//             height={100}
//             className="rounded border"
//           />
//         </div>
//       )}

//       <button
//         onClick={handleCreate}
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//       >
//         Create Workspace
//       </button>
//     </div>
//   );
// }


// chstacvac imagei het vat design

// 'use client';

// import { useState } from "react";
// import Image from "next/image";

// import { Id } from "../../../../convex/_generated/dataModel";

// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import FileUpload from "@/features/upload/fileUpload";

// export default function WorkspacePreview() {
//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const createWorkspace = useMutation(api.workspaces.create);

//   const handleCreate = async () => {
//     if (name.trim().length < 3) return;

//     await createWorkspace({
//       name,
//       image: imageId ?? undefined,  // pass undefined if null
//     });

//     setName("");
//     setImageId(null);
//     setImageUrl(null);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Create a Workspace</h2>

//       <input
//         type="text"
//         placeholder="Workspace name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-3 py-2 border rounded mb-4"
//       />

//       <FileUpload
//         onUploadComplete={(id) => {
//           setImageId(id as Id<"_storage">);
//           const baseUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
//           const url = `${baseUrl}/storage/${id}`;
//           setImageUrl(url);
//         }}
//       />

//       {imageUrl && (
//         <div className="mt-4">

//           <Image
//             src={imageUrl}
//             alt="Workspace Preview"
//             width={100}
//             height={100}
//             className="rounded border"
//           />
//           <p className="text-sm mt-1 text-gray-600">Image ID: {imageId}</p>
//         </div>
//       )}

//       <button
//         onClick={handleCreate}
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//       >
//         Create Workspace
//       </button>
//     </div>
//   );
// }




// es lavy chi

// "use client";

// import { useState } from "react";
// import Image from "next/image";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";

// import { Id } from "../../../../convex/_generated/dataModel";
// import FileUpload from "@/features/upload/fileUpload";

// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

// export const WorkspacePreview = () => {
//   const { data, isLoading } = useGetWorkspaces();
//   const createWorkspace = useCreateWorkspace();
//   const updateWorkspace = useUpdateWorkspace();
//   const deleteWorkspace = useDeleteWorkspace();

//   const saveImageToWorkspace = useMutation(api.upload.saveImageToWorkspace);

//   const [name, setName] = useState("");
//   const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const [editingId, setEditingId] = useState<Id<"workspaces"> | null>(null);
//   const [newName, setNewName] = useState("");
//   const [confirmId, setConfirmId] = useState<Id<"workspaces"> | null>(null);

//   const handleCreate = async () => {
//     if (name.trim().length < 3) return;
//     await createWorkspace({ name, image: imageId ?? undefined });
//     setName("");
//     setImageId(null);
//     setImageUrl(null);
//   };

//   const startEdit = (wsId: Id<"workspaces">, current: string) => {
//     setEditingId(wsId);
//     setNewName(current);
//   };

//   const handleEditSave = async () => {
//     if (!editingId || newName.trim().length < 3) return;
//     await updateWorkspace({ id: editingId, name: newName });
//     setEditingId(null);
//   };

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

//         <FileUpload
//   onUploadComplete={async (id) => {
//     const baseUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
//     setImageId(id as Id<"_storage">);
//     setImageUrl(`${baseUrl}/storage/${id}`);
//   }}
// />

//         {imageUrl && (
//           <div>
//             <Image
//               src={imageUrl}
//               alt="Uploaded Preview"
//               width={100}
//               height={100}
//               className="rounded border mt-2"
//             />
//           </div>
//         )}

//         <Button
//           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//           onClick={handleCreate}
//         >
//           Create
//         </Button>
//       </div>

//       {/* ─────── List ─────── */}
//       <div>
//         <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
//         {data?.length ? (
//           <ul className="space-y-3">
//             {data.map((ws) => {
//               const wsImageUrl = ws.image
//                 ? `${process.env.NEXT_PUBLIC_CONVEX_URL}/storage/${ws.image}`
//                 : null;

//               return (
//                 <li
//                   key={ws._id}
//                   className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
//                 >
//                   {editingId === ws._id ? (
//                     <>
//                       <Input
//                         value={newName}
//                         onChange={(e) => setNewName(e.target.value)}
//                         className="mr-2"
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           size="sm"
//                           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                           onClick={handleEditSave}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => setEditingId(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="flex items-center gap-4">
//                         {wsImageUrl && (
//                           <Image
//                             src={wsImageUrl}
//                             alt="Workspace"
//                             width={48}
//                             height={48}
//                             className="rounded border"
//                           />
//                         )}
//                         <div>
//                           <p className="font-medium">{ws.name}</p>
//                           <p className="text-sm text-gray-500">ID: {ws._id}</p>
//                         </div>
//                       </div>
//                       <div className="space-x-2">
//                         <Button
//                           size="sm"
//                           className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                           onClick={() => startEdit(ws._id, ws.name)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => setConfirmId(ws._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No workspaces found.</p>
//         )}
//       </div>

//       {/* ─────── Confirm Delete Dialog ─────── */}
//       <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
//         <DialogContent>
//           <DialogTitle>Delete this workspace?</DialogTitle>
//           <DialogDescription className="mb-6 text-sm text-gray-600">
//             This action cannot be undone.
//           </DialogDescription>
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






// lav ashxatum a GROK-ov 

"use client";
import { useState } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";

import { Id } from "../../../../convex/_generated/dataModel";
import FileUpload from "@/features/upload/fileUpload";

export const WorkspacePreview = () => {
  const { data, isLoading } = useGetWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const updateWorkspace = useUpdateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();

  const [name, setName] = useState("");
  const [imageId, setImageId] = useState<Id<"_storage"> | null>(null);

  const [editingId, setEditingId] = useState<Id<"workspaces"> | null>(null);
  const [newName, setNewName] = useState("");
  const [confirmId, setConfirmId] = useState<Id<"workspaces"> | null>(null);

  // Fetch the preview image URL, skipping if no imageId
  const previewImageUrl = useQuery(
    api.upload.getImageUrl,
    imageId ? { storageId: imageId } : "skip"
  );

  const handleCreate = async () => {
    if (name.trim().length < 3) return;
    await createWorkspace({ name, image: imageId ?? undefined });
    setName("");
    setImageId(null);
  };

  const startEdit = (wsId: Id<"workspaces">, current: string) => {
    setEditingId(wsId);
    setNewName(current);
  };

  const handleEditSave = async () => {
    if (!editingId || newName.trim().length < 3) return;
    await updateWorkspace({ id: editingId, name: newName });
    setEditingId(null);
  };

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

        <FileUpload
          onUploadComplete={(id) => {
            setImageId(id as Id<"_storage">);
          }}
        />

        {previewImageUrl && (
          <div>
            <Image
              src={previewImageUrl}
              alt="Uploaded Preview"
              width={100}
              height={100}
              className="rounded border mt-2"
            />
          </div>
        )}

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
                    <div className="flex items-center gap-4">
                      {ws.imageUrl && (
                        <Image
                          src={ws.imageUrl}
                          alt="Workspace"
                          width={48}
                          height={48}
                          className="rounded border"
                        />
                      )}
                      <div>
                        <p className="font-medium">{ws.name}</p>
                        <p className="text-sm text-gray-500">ID: {ws._id}</p>
                      </div>
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