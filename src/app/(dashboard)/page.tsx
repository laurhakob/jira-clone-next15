// "use client";

// import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
// import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

// export default function Home() {
//   const [open, setOpen] = useCreateWorkspaceModal();

//   const { data, isLoading } = useGetWorkspaces();
//   const router = useRouter();

//   const workspaceId = useMemo(() => data?.[0]?._id, [data]);

//   useEffect(() => {
//     if (isLoading) return;

//     if (workspaceId) {
//       router.replace(`/workspace/${workspaceId}`);
//       console.log("Redirect to workspace");
//     } else if (!open) {
//       setOpen(true);
//     }
//   }, [workspaceId, isLoading, open, setOpen, router]);

//   return (
//     <>
//       {" "}
//       <div>This is a home page</div>
//       <CreateWorkspaceModal />
//     </>
//   );
// }



// chat gbtic workspacei hamar

// "use client";

// import { WorkspacePreview } from "@/features/workspaces/components/workspace-preview";




// export default function Home() {
//   return (
//     <div>
//       <div>This is a home page</div>
//       <WorkspacePreview />
//     </div>
//   );
// }



// GROK-ov homepage-um current workspace

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useQuery } from "convex/react";
// import Image from "next/image";
// import { api } from "../../../convex/_generated/api";
// import { Id } from "../../../convex/_generated/dataModel";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const workspaceIdStr = searchParams.get("workspaceId");

//   // Safely cast the string to Id<"workspaces"> or use "skip" if null
//   const workspaceId = workspaceIdStr
//     ? (workspaceIdStr as Id<"workspaces">)
//     : null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     workspaceId ? { id: workspaceId } : "skip"
//   );

//   return (
//     <div className="p-4">
//       <div>This is a home page</div>
//       {workspace && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold">{workspace.name}</h2>
//           <p className="text-sm text-gray-500">ID: {workspace._id}</p>
//           {workspace.imageUrl && (
//             <Image
//               src={workspace.imageUrl}
//               alt={workspace.name}
//               width={200}
//               height={200}
//               className="rounded mt-2"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// shat lavn a GROK -ov 

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Image from "next/image";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

  const workspace = useQuery(
    api.workspaces.getById,
    workspaceId ? { id: workspaceId } : "skip"
  );

  const deleteWorkspace = useDeleteWorkspace();
  const updateWorkspace = useUpdateWorkspace();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(workspace?.name || "");
  const [confirmDeleteId, setConfirmDeleteId] = useState<Id<"workspaces"> | null>(null);

  const handleEdit = () => {
    if (workspace) {
      setEditName(workspace.name);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSave = async () => {
    if (!workspaceId || editName.trim().length < 3) return;
    await updateWorkspace({ id: workspaceId, name: editName });
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    if (!workspaceId) return;
    await deleteWorkspace({ id: workspaceId });
    setConfirmDeleteId(null);
    router.push("/"); // Redirect to home without workspaceId
  };

  return (
    <div className="p-4">
      <div>This is a home page</div>
      {workspace && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <p className="text-sm text-gray-500">ID: {workspace._id}</p>
          {workspace.imageUrl && (
            <Image
              src={workspace.imageUrl}
              alt={workspace.name}
              width={200}
              height={200}
              className="rounded mt-2"
            />
          )}
          <div className="mt-2 space-x-2">
            <Button
              className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setConfirmDeleteId(workspace._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>Update the workspace name.</DialogDescription>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Workspace name"
            minLength={3}
          />
          <Button
            className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
            onClick={handleEditSave}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription className="mb-6 text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}