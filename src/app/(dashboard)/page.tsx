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
// import { useUpdateProject } from "@/features/projects/api/use-update-project";
// import { useDeleteProject } from "@/features/projects/api/use-delete-project";
// import Link from "next/link";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { PlusIcon } from "lucide-react";
// import { DottedSeparator } from "@/components/dotted-separator";
// import TaskCreationForm from "@/components/tasks/TaskCreationForm";

// export default function Home() {
//   const { data: user, isLoading } = useCurrentUser();
//   const isAuthenticated = !!user;
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const workspaceIdStr = searchParams.get("workspaceId");
//   const workspaceId = workspaceIdStr
//     ? (workspaceIdStr as Id<"workspaces">)
//     : null;
//   const projectId = searchParams.get("projectId") as Id<"projects"> | null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     isAuthenticated && workspaceId ? { id: workspaceId } : "skip"
//   );
//   const project = useQuery(
//     api.projects.getById,
//     projectId ? { id: projectId } : "skip"
//   );

//   const deleteWorkspace = useDeleteWorkspace();
//   const updateWorkspace = useUpdateWorkspace();
//   const updateProject = useUpdateProject();
//   const deleteProject = useDeleteProject();

//   const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] =
//     useState(false);
//   const [editWorkspaceName, setEditWorkspaceName] = useState(
//     workspace?.name || ""
//   );
//   const [confirmDeleteWorkspaceId, setConfirmDeleteWorkspaceId] =
//     useState<Id<"workspaces"> | null>(null);
//   const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
//   const [editProjectName, setEditProjectName] = useState(project?.name || "");
//   const [confirmDeleteProjectId, setConfirmDeleteProjectId] =
//     useState<Id<"projects"> | null>(null);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

//   const isAdmin = workspace?.isAdmin;

//   const handleEditWorkspace = () => {
//     if (workspace) {
//       setEditWorkspaceName(workspace.name);
//       setIsEditWorkspaceModalOpen(true);
//     }
//   };

//   const handleEditWorkspaceSave = async () => {
//     if (!workspaceId || editWorkspaceName.trim().length < 3) return;
//     await updateWorkspace({ id: workspaceId, name: editWorkspaceName });
//     setIsEditWorkspaceModalOpen(false);
//   };

//   const handleDeleteWorkspace = async () => {
//     if (!workspaceId) return;
//     await deleteWorkspace({ id: workspaceId });
//     setConfirmDeleteWorkspaceId(null);
//     router.push("/");
//   };

//   const handleEditProject = () => {
//     if (project) {
//       setEditProjectName(project.name);
//       setIsEditProjectModalOpen(true);
//     }
//   };

//   const handleEditProjectSave = async () => {
//     if (!projectId || editProjectName.trim().length < 3) return;
//     await updateProject({ id: projectId, name: editProjectName });
//     setIsEditProjectModalOpen(false);
//   };

//   const handleDeleteProject = async () => {
//     if (!projectId) return;
//     await deleteProject({ id: projectId });
//     setConfirmDeleteProjectId(null);
//     router.push(`/?workspaceId=${workspaceId}`);
//   };

//   if (isLoading) {
//     return <div className="p-4 text-center">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return (
//       <p className="p-4 text-center">Please log in to access this page.</p>
//     );
//   }

//   if (projectId && project && workspace) {
//     return (
//       <div className="p-4">
//         {/* Path Display */}
//         <div className="mb-4 text-sm">
//           <span className="italic text-gray-500">Workspace: </span>
//           <Link
//             href={`/?workspaceId=${workspaceId}`}
//             className="text-blue-500 hover:underline"
//           >
//             {workspace.name}
//           </Link>
//           <span> / </span>
//           <span className="italic text-gray-500">Project: </span>
//           <span>{project.name}</span>
//         </div>

//         {/* Project Details Line */}
//         <div className="flex items-center gap-4">
//           {project.imageUrl && (
//             <Image
//               src={project.imageUrl}
//               alt={project.name}
//               width={32}
//               height={32}
//               className="rounded"
//             />
//           )}
//           <h2 className="text-lg font-semibold">{project.name}</h2>
//           <div className="ml-auto flex gap-2">
//             <Button
//               size="sm"
//               className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//               onClick={handleEditProject}
//             >
//               Edit Project
//             </Button>
//             <Button
//               size="sm"
//               variant="destructive"
//               onClick={() => setConfirmDeleteProjectId(project._id)}
//             >
//               Delete Project
//             </Button>
//           </div>
//         </div>

//         {/* Project ID */}
//         <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>

//         {/* Tab Section */}
//         <Tabs className="flex-1 w-full border rounded-lg">
//           <div className="h-full flex flex-col overflow-auto p-4">
//             <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
//               <TabsList className="w-full lg:w-auto">
//                 <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
//                   Table
//                 </TabsTrigger>
//                 <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
//                   Kanban
//                 </TabsTrigger>
//                 <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
//                   Calendar
//                 </TabsTrigger>
//               </TabsList>
//               <Button
//                 onClick={() => setIsTaskModalOpen(true)}
//                 className="w-full lg:w-auto ml-4"
//               >
//                 <PlusIcon className="mr-2 h-4 w-4" /> New
//               </Button>
//             </div>
//             <DottedSeparator className="my-4" />
//             <div>Data filters</div>
//             <DottedSeparator className="my-4" />
//             <>
//               <TabsContent value="table" className="mt-0">
//                 Data table
//               </TabsContent>
//               <TabsContent value="kanban" className="mt-0">
//                 Data kanban
//               </TabsContent>
//               <TabsContent value="calendar" className="mt-0">
//                 Data calendar
//               </TabsContent>
//             </>
//           </div>
//         </Tabs>

//         {/* Task Creation Modal */}
//         <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
//           <DialogContent>
//             <DialogTitle>Create New Task</DialogTitle>
//             <TaskCreationForm
//               workspaceId={workspaceId!}
//               projectId={projectId}
//               onClose={() => setIsTaskModalOpen(false)}
//             />
//           </DialogContent>
//         </Dialog>

//         {/* Edit Project Modal */}
//         <Dialog
//           open={isEditProjectModalOpen}
//           onOpenChange={setIsEditProjectModalOpen}
//         >
//           <DialogContent>
//             <DialogTitle>Edit Project</DialogTitle>
//             <DialogDescription>Update the project name.</DialogDescription>
//             <Input
//               value={editProjectName}
//               onChange={(e) => setEditProjectName(e.target.value)}
//               placeholder="Project name"
//               minLength={3}
//             />
//             <Button
//               className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//               onClick={handleEditProjectSave}
//             >
//               Save
//             </Button>
//           </DialogContent>
//         </Dialog>

//         {/* Delete Project Confirmation */}
//         <Dialog
//           open={!!confirmDeleteProjectId}
//           onOpenChange={() => setConfirmDeleteProjectId(null)}
//         >
//           <DialogContent>
//             <DialogTitle>Delete this project?</DialogTitle>
//             <DialogDescription className="mb-6 text-sm text-gray-600">
//               This action cannot be undone.
//             </DialogDescription>
//             <div className="flex justify-end space-x-2">
//               <Button
//                 variant="secondary"
//                 onClick={() => setConfirmDeleteProjectId(null)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={handleDeleteProject}>
//                 Delete
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     );
//   } else if (workspaceId && workspace) {
//     return (
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{workspace.name}</h2>
//         <p className="text-sm text-gray-500">ID: {workspace._id}</p>
//         {workspace.imageUrl && (
//           <Image
//             src={workspace.imageUrl}
//             alt={workspace.name}
//             width={200}
//             height={200}
//             className="rounded mt-2"
//           />
//         )}
//         {isAdmin && (
//           <div className="mt-2 space-x-2">
//             <Button
//               className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//               onClick={handleEditWorkspace}
//             >
//               Edit Workspace
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => setConfirmDeleteWorkspaceId(workspace._id)}
//             >
//               Delete Workspace
//             </Button>
//           </div>
//         )}

//         <Dialog
//           open={isEditWorkspaceModalOpen}
//           onOpenChange={setIsEditWorkspaceModalOpen}
//         >
//           <DialogContent>
//             <DialogTitle>Edit Workspace</DialogTitle>
//             <DialogDescription>Update the workspace name.</DialogDescription>
//             <Input
//               value={editWorkspaceName}
//               onChange={(e) => setEditWorkspaceName(e.target.value)}
//               placeholder="Workspace name"
//               minLength={3}
//             />
//             <Button
//               className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
//               onClick={handleEditWorkspaceSave}
//             >
//               Save
//             </Button>
//           </DialogContent>
//         </Dialog>

//         <Dialog
//           open={!!confirmDeleteWorkspaceId}
//           onOpenChange={() => setConfirmDeleteWorkspaceId(null)}
//         >
//           <DialogContent>
//             <DialogTitle>Delete this workspace?</DialogTitle>
//             <DialogDescription className="mb-6 text-sm text-gray-600">
//               This action cannot be undone.
//             </DialogDescription>
//             <div className="flex justify-end space-x-2">
//               <Button
//                 variant="secondary"
//                 onClick={() => setConfirmDeleteWorkspaceId(null)}
//               >
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={handleDeleteWorkspace}>
//                 Delete
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     );
//   } else {
//     return (
//       <div className="p-4">
//         <p>
//           No workspace selected. Please choose a workspace from the sidebar.
//         </p>
//       </div>
//     );
//   }
// }



// update tasks for New response 
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Image from "next/image";
import { format } from "date-fns";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";
import TaskCreationForm from "@/components/tasks/TaskCreationForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;
  const projectId = searchParams.get("projectId") as Id<"projects"> | null;

  const workspace = useQuery(api.workspaces.getById, workspaceId ? { id: workspaceId } : "skip");
  const project = useQuery(api.projects.getById, projectId ? { id: projectId } : "skip");
  const tasks = useQuery(api.tasks.getByProject, projectId ? { projectId } : "skip");

  const [selectedTasks, setSelectedTasks] = useState<Id<"tasks">[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleSelectAll = () => {
    if (tasks && selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else if (tasks) {
      setSelectedTasks(tasks.map((task) => task._id));
    }
  };

  const handleSelectTask = (taskId: Id<"tasks">) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  // No workspace selected
  if (!workspaceId) {
    return (
      <div className="p-4">
        <p>No workspace selected. Please choose from the sidebar.</p>
      </div>
    );
  }

  // Workspace loading
  if (workspace === undefined) {
    return (
      <div className="p-4">
        <p>Loading workspace...</p>
      </div>
    );
  }

  // Workspace not found or no access
  if (workspace === null) {
    return (
      <div className="p-4">
        <p>Workspace not found or you do not have access.</p>
      </div>
    );
  }

  // Workspace selected, but no project
  if (!projectId) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold">{workspace.name}</h2>
        {workspace.imageUrl && (
          <Image
            src={workspace.imageUrl}
            alt={workspace.name}
            width={200}
            height={200}
            className="rounded mt-2"
          />
        )}
      </div>
    );
  }

  // Project loading
  if (project === undefined) {
    return (
      <div className="p-4">
        <p>Loading project...</p>
      </div>
    );
  }

  // Project not found or no access
  if (project === null) {
    return (
      <div className="p-4">
        <p>Project not found or you do not have access.</p>
      </div>
    );
  }

  // Both workspace and project selected
  return (
    <div className="p-4">
      {/* Path Display */}
      <div className="mb-4 text-sm">
        <span className="italic text-gray-500">Workspace: </span>
        <Link href={`/?workspaceId=${workspaceId}`} className="text-blue-500 hover:underline">
          {workspace.name}
        </Link>
        <span> / </span>
        <span className="italic text-gray-500">Project: </span>
        <span>{project.name}</span>
      </div>

      {/* Project Details */}
      <div className="flex items-center gap-4">
        {project.imageUrl && (
          <Image src={project.imageUrl} alt={project.name} width={32} height={32} className="rounded" />
        )}
        <h2 className="text-lg font-semibold">{project.name}</h2>
      </div>
      <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>

      {/* Tabs */}
      <Tabs defaultValue="table" className="flex-1 w-full border rounded-lg mt-4">
        <div className="h-full flex flex-col overflow-auto p-4">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                Table
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                Kanban
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                Calendar
              </TabsTrigger>
            </TabsList>
            <Button onClick={() => setIsTaskModalOpen(true)} className="w-full lg:w-auto ml-4">
              <PlusIcon className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <DottedSeparator className="my-4" />
          <div>Data filters</div>
          <DottedSeparator className="my-4" />

          {/* Table Tab Content */}
          <TabsContent value="table" className="mt-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">
                    <input
                      type="checkbox"
                      checked={tasks && tasks.length > 0 && selectedTasks.length === tasks.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border p-2 text-left">Task Name</th>
                  <th className="border p-2 text-left">Project</th>
                  <th className="border p-2 text-left">Assignee</th>
                  <th className="border p-2 text-left">Due Date</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {tasks === undefined ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      Loading tasks...
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  [...tasks]
                    .sort((a, b) => b._creationTime - a._creationTime)
                    .map((task) => (
                      <tr key={task._id} className="border-b">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task._id)}
                            onChange={() => handleSelectTask(task._id)}
                          />
                        </td>
                        <td className="p-2">{task.name}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {project.imageUrl && (
                              <Image
                                src={project.imageUrl}
                                alt={project.name}
                                width={24}
                                height={24}
                                className="rounded"
                              />
                            )}
                            <span>{project.name}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          {task.assignee ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6">
                                <AvatarImage src={task.assignee.image} />
                                <AvatarFallback>
                                  {task.assignee.name?.[0]?.toUpperCase() || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee.name}</span>
                            </div>
                          ) : (
                            "Unassigned"
                          )}
                        </td>
                        <td className="p-2">
                          {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
                        </td>
                        <td className="p-2">{task.status}</td>
                        <td className="p-2">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </TabsContent>

          {/* Other Tab Content */}
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </div>
      </Tabs>

      {/* Task Creation Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogTitle>Create New Task</DialogTitle>
          <TaskCreationForm
            workspaceId={workspaceId}
            projectId={projectId}
            onClose={() => setIsTaskModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}