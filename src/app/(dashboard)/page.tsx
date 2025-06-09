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
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import TaskCreationForm from "@/components/tasks/TaskCreationForm";

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();
  const isAuthenticated = !!user;
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr
    ? (workspaceIdStr as Id<"workspaces">)
    : null;
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

  const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] =
    useState(false);
  const [editWorkspaceName, setEditWorkspaceName] = useState(
    workspace?.name || ""
  );
  const [confirmDeleteWorkspaceId, setConfirmDeleteWorkspaceId] =
    useState<Id<"workspaces"> | null>(null);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editProjectName, setEditProjectName] = useState(project?.name || "");
  const [confirmDeleteProjectId, setConfirmDeleteProjectId] =
    useState<Id<"projects"> | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const isAdmin = workspace?.isAdmin;

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
    router.push("/");
  };

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
    router.push(`/?workspaceId=${workspaceId}`);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <p className="p-4 text-center">Please log in to access this page.</p>
    );
  }

  if (projectId && project && workspace) {
    return (
      <div className="p-4">
        {/* Path Display */}
        <div className="mb-4 text-sm">
          <span className="italic text-gray-500">Workspace: </span>
          <Link
            href={`/?workspaceId=${workspaceId}`}
            className="text-blue-500 hover:underline"
          >
            {workspace.name}
          </Link>
          <span> / </span>
          <span className="italic text-gray-500">Project: </span>
          <span>{project.name}</span>
        </div>

        {/* Project Details Line */}
        <div className="flex items-center gap-4">
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={32}
              height={32}
              className="rounded"
            />
          )}
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <div className="ml-auto flex gap-2">
            <Button
              size="sm"
              className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
              onClick={handleEditProject}
            >
              Edit Project
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setConfirmDeleteProjectId(project._id)}
            >
              Delete Project
            </Button>
          </div>
        </div>

        {/* Project ID */}
        <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>

        {/* Tab Section */}
        <Tabs className="flex-1 w-full border rounded-lg">
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
              <Button
                onClick={() => setIsTaskModalOpen(true)}
                className="w-full lg:w-auto ml-4"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> New
              </Button>
            </div>
            <DottedSeparator className="my-4" />
            <div>Data filters</div>
            <DottedSeparator className="my-4" />
            <>
              <TabsContent value="table" className="mt-0">
                Data table
              </TabsContent>
              <TabsContent value="kanban" className="mt-0">
                Data kanban
              </TabsContent>
              <TabsContent value="calendar" className="mt-0">
                Data calendar
              </TabsContent>
            </>
          </div>
        </Tabs>

        {/* Task Creation Modal */}
        <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
          <DialogContent>
            <DialogTitle>Create New Task</DialogTitle>
            <TaskCreationForm
              workspaceId={workspaceId!}
              projectId={projectId}
              onClose={() => setIsTaskModalOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Project Modal */}
        <Dialog
          open={isEditProjectModalOpen}
          onOpenChange={setIsEditProjectModalOpen}
        >
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

        {/* Delete Project Confirmation */}
        <Dialog
          open={!!confirmDeleteProjectId}
          onOpenChange={() => setConfirmDeleteProjectId(null)}
        >
          <DialogContent>
            <DialogTitle>Delete this project?</DialogTitle>
            <DialogDescription className="mb-6 text-sm text-gray-600">
              This action cannot be undone.
            </DialogDescription>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setConfirmDeleteProjectId(null)}
              >
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
  } else if (workspaceId && workspace) {
    return (
      <div className="p-4">
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

        <Dialog
          open={isEditWorkspaceModalOpen}
          onOpenChange={setIsEditWorkspaceModalOpen}
        >
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

        <Dialog
          open={!!confirmDeleteWorkspaceId}
          onOpenChange={() => setConfirmDeleteWorkspaceId(null)}
        >
          <DialogContent>
            <DialogTitle>Delete this workspace?</DialogTitle>
            <DialogDescription className="mb-6 text-sm text-gray-600">
              This action cannot be undone.
            </DialogDescription>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setConfirmDeleteWorkspaceId(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteWorkspace}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <p>
          No workspace selected. Please choose a workspace from the sidebar.
        </p>
      </div>
    );
  }
}