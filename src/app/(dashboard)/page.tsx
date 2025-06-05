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

// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { Id } from "../../../convex/_generated/dataModel";
// import Image from "next/image";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const workspaceIdStr = searchParams.get("workspaceId");
//   const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     workspaceId ? { id: workspaceId } : "skip"
//   );

//   const deleteWorkspace = useDeleteWorkspace();
//   const updateWorkspace = useUpdateWorkspace();

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editName, setEditName] = useState(workspace?.name || "");
//   const [confirmDeleteId, setConfirmDeleteId] = useState<Id<"workspaces"> | null>(null);

//   const handleEdit = () => {
//     if (workspace) {
//       setEditName(workspace.name);
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleEditSave = async () => {
//     if (!workspaceId || editName.trim().length < 3) return;
//     await updateWorkspace({ id: workspaceId, name: editName });
//     setIsEditModalOpen(false);
//   };

//   const handleDelete = async () => {
//     if (!workspaceId) return;
//     await deleteWorkspace({ id: workspaceId });
//     setConfirmDeleteId(null);
//     router.push("/"); // Redirect to home without workspaceId
//   };

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
//           <div className="mt-2 space-x-2">
//             <Button
//               className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//               onClick={handleEdit}
//             >
//               Edit
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => setConfirmDeleteId(workspace._id)}
//             >
//               Delete
//             </Button>
//           </div>
//         </div>
//       )}

//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogTitle>Edit Workspace</DialogTitle>
//           <DialogDescription>Update the workspace name.</DialogDescription>
//           <Input
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             placeholder="Workspace name"
//             minLength={3}
//           />
//           <Button
//             className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//             onClick={handleEditSave}
//           >
//             Save
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
//         <DialogContent>
//           <DialogTitle>Delete this workspace?</DialogTitle>
//           <DialogDescription className="mb-6 text-sm text-gray-600">
//             This action cannot be undone.
//           </DialogDescription>
//           <div className="flex justify-end space-x-2">
//             <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }






// ireakany naxordn a, esi update versia a log outi hamar 
// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery } from "convex/react";
// import { useCurrentUser } from "@/features/auth/api/use-current-user";
// import { api } from "../../../convex/_generated/api";
// import { Id } from "../../../convex/_generated/dataModel";
// import Image from "next/image";
// import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
// import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const { data: user, isLoading } = useCurrentUser();
//   const isAuthenticated = !!user;
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const workspaceIdStr = searchParams.get("workspaceId");
//   const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     isAuthenticated && workspaceId ? { id: workspaceId } : "skip"
//   );

//   const deleteWorkspace = useDeleteWorkspace();
//   const updateWorkspace = useUpdateWorkspace();

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editName, setEditName] = useState(workspace?.name || "");
//   const [confirmDeleteId, setConfirmDeleteId] = useState<Id<"workspaces"> | null>(null);

//   // Use isAdmin from the workspace query instead of checking user._id === workspace.userId
//   const isAdmin = workspace?.isAdmin;

//   const handleEdit = () => {
//     if (workspace) {
//       setEditName(workspace.name);
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleEditSave = async () => {
//     if (!workspaceId || editName.trim().length < 3) return;
//     await updateWorkspace({ id: workspaceId, name: editName });
//     setIsEditModalOpen(false);
//   };

//   const handleDelete = async () => {
//     if (!workspaceId) return;
//     await deleteWorkspace({ id: workspaceId });
//     setConfirmDeleteId(null);
//     router.push("/"); // Redirect to home without workspaceId
//   };

//   if (isLoading) {
//     return <div className="p-4 text-center">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <p className="p-4 text-center">Please log in to access this page.</p>;
//   }

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
//           {isAdmin && (
//             <div className="mt-2 space-x-2">
//               <Button
//                 className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//                 onClick={handleEdit}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={() => setConfirmDeleteId(workspace._id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           )}
//         </div>
//       )}

//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogTitle>Edit Workspace</DialogTitle>
//           <DialogDescription>Update the workspace name.</DialogDescription>
//           <Input
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             placeholder="Workspace name"
//             minLength={3}
//           />
//           <Button
//             className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//             onClick={handleEditSave}
//           >
//             Save
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
//         <DialogContent>
//           <DialogTitle>Delete this workspace?</DialogTitle>
//           <DialogDescription className="mb-6 text-sm text-gray-600">
//             This action cannot be undone.
//           </DialogDescription>
//           <div className="flex justify-end space-x-2">
//             <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }





// update for adding projects
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
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
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();
  const isAuthenticated = !!user;
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;
  const projectId = searchParams.get("projectId") as Id<"projects"> | null;

  const workspace = useQuery(
    api.workspaces.getById,
    isAuthenticated && workspaceId ? { id: workspaceId } : "skip"
  );
  const project = useQuery(
    api.projects.getById,
    projectId ? { id: projectId } : "skip"
  );

  const deleteWorkspace = useDeleteWorkspace();
  const updateWorkspace = useUpdateWorkspace();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  // Workspace states
  const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] = useState(false);
  const [editWorkspaceName, setEditWorkspaceName] = useState(workspace?.name || "");
  const [confirmDeleteWorkspaceId, setConfirmDeleteWorkspaceId] = useState<Id<"workspaces"> | null>(null);

  // Project states
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editProjectName, setEditProjectName] = useState(project?.name || "");
  const [confirmDeleteProjectId, setConfirmDeleteProjectId] = useState<Id<"projects"> | null>(null);

  const isAdmin = workspace?.isAdmin;

  // Workspace handlers
  const handleEditWorkspace = () => {
    if (workspace) {
      setEditWorkspaceName(workspace.name);
      setIsEditWorkspaceModalOpen(true);
    }
  };

  const handleEditWorkspaceSave = async () => {
    if (!workspaceId || editWorkspaceName.trim().length < 3) return;
    await updateWorkspace({ id: workspaceId, name: editWorkspaceName });
    setIsEditWorkspaceModalOpen(false);
  };

  const handleDeleteWorkspace = async () => {
    if (!workspaceId) return;
    await deleteWorkspace({ id: workspaceId });
    setConfirmDeleteWorkspaceId(null);
    router.push("/"); // Redirect to home without workspaceId
  };

  // Project handlers
  const handleEditProject = () => {
    if (project) {
      setEditProjectName(project.name);
      setIsEditProjectModalOpen(true);
    }
  };

  const handleEditProjectSave = async () => {
    if (!projectId || editProjectName.trim().length < 3) return;
    await updateProject({ id: projectId, name: editProjectName });
    setIsEditProjectModalOpen(false);
  };

  const handleDeleteProject = async () => {
    if (!projectId) return;
    await deleteProject({ id: projectId });
    setConfirmDeleteProjectId(null);
    router.push(`/?workspaceId=${workspaceId}`); // Remove projectId from URL
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <p className="p-4 text-center">Please log in to access this page.</p>;
  }

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
          {isAdmin && (
            <div className="mt-2 space-x-2">
              <Button
                className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
                onClick={handleEditWorkspace}
              >
                Edit Workspace
              </Button>
              <Button
                variant="destructive"
                onClick={() => setConfirmDeleteWorkspaceId(workspace._id)}
              >
                Delete Workspace
              </Button>
            </div>
          )}
        </div>
      )}
      {project && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Project: {project.name}</h3>
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={150}
              height={150}
              className="rounded mt-2"
            />
          )}
          <p className="text-sm text-gray-500">ID: {project._id}</p>
          <div className="mt-2 space-x-2">
            <Button
              className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
              onClick={handleEditProject}
            >
              Edit Project
            </Button>
            <Button
              variant="destructive"
              onClick={() => setConfirmDeleteProjectId(project._id)}
            >
              Delete Project
            </Button>
          </div>
        </div>
      )}

      {/* Workspace Edit Modal */}
      <Dialog open={isEditWorkspaceModalOpen} onOpenChange={setIsEditWorkspaceModalOpen}>
        <DialogContent>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>Update the workspace name.</DialogDescription>
          <Input
            value={editWorkspaceName}
            onChange={(e) => setEditWorkspaceName(e.target.value)}
            placeholder="Workspace name"
            minLength={3}
          />
          <Button
            className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
            onClick={handleEditWorkspaceSave}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>

      {/* Workspace Delete Confirmation */}
      <Dialog open={!!confirmDeleteWorkspaceId} onOpenChange={() => setConfirmDeleteWorkspaceId(null)}>
        <DialogContent>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription className="mb-6 text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteWorkspaceId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWorkspace}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Edit Modal */}
      <Dialog open={isEditProjectModalOpen} onOpenChange={setIsEditProjectModalOpen}>
        <DialogContent>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Update the project name.</DialogDescription>
          <Input
            value={editProjectName}
            onChange={(e) => setEditProjectName(e.target.value)}
            placeholder="Project name"
            minLength={3}
          />
          <Button
            className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
            onClick={handleEditProjectSave}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>

      {/* Project Delete Confirmation */}
      <Dialog open={!!confirmDeleteProjectId} onOpenChange={() => setConfirmDeleteProjectId(null)}>
        <DialogContent>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription className="mb-6 text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteProjectId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}