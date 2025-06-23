"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";

import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/features/upload/fileUpload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function ProjectEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const projectIdStr = searchParams.get("projectId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;
  const projectId = projectIdStr ? (projectIdStr as Id<"projects">) : null;

  const workspace = useQuery(
    api.workspaces.getById,
    workspaceId ? { id: workspaceId } : "skip"
  );
  const project = useQuery(
    api.projects.getById,
    projectId ? { id: projectId } : "skip"
  );

  const updateProject = useMutation(api.projects.update);
  const deleteProject = useMutation(api.projects.remove);

  const [editedName, setEditedName] = useState("");
  const [editedImageId, setEditedImageId] = useState<Id<"_storage"> | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const imageUrl = useQuery(
    api.upload.getImageUrl,
    editedImageId ? { storageId: editedImageId } : "skip"
  );

  useEffect(() => {
    if (project) {
      setEditedName(project.name);
      setEditedImageId(project.image);
    }
  }, [project]);

  const handleSave = async () => {
    if (!projectId) return;
    setIsSaving(true);
    const args: {
      id: Id<"projects">;
      name?: string;
      image?: Id<"_storage"> | undefined;
    } = { id: projectId, name: editedName };
    if (editedImageId !== project?.image) {
      args.image = editedImageId;
    }
    await updateProject(args);
    setIsSaving(false);
    toast.success("Project updated successfully");
  };

  const handleRemoveImage = () => setEditedImageId(undefined);

  const handleDelete = async () => {
    if (!projectId) return;
    await deleteProject({ id: projectId });
    router.push(`/tasks?workspaceId=${workspaceId}`);
  };

  if (!workspaceId || !projectId) {
    return <p className="text-center">Invalid workspace or project</p>;
  }

  if (workspace === undefined || project === undefined) {
    return <p className="text-center">Loading...</p>;
  }

  if (workspace === null || project === null) {
    return <p className="text-center">Workspace or project not found or you do not have access</p>;
  }

  const isAdmin = workspace.isAdmin;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <Button
          variant="outline"
          onClick={() => router.push(`/tasks?workspaceId=${workspaceId}&projectId=${projectId}`)}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Project name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Image
          </label>
          {editedImageId && imageUrl && (
            <Image
              src={imageUrl}
              alt={project.name}
              width={200}
              height={200}
              className="rounded mt-2"
            />
          )}
          <div className="mt-2 flex gap-2">
            <FileUpload
              onUploadComplete={(id) => setEditedImageId(id as Id<"_storage">)}
            />
            {editedImageId && (
              <Button variant="ghost" onClick={handleRemoveImage}>
                Remove Image
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-[#48909b] hover:bg-[#3d7f87] text-white"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          {isAdmin && (
            <Button
              variant="destructive"
              onClick={() => setConfirmDelete(true)}
            >
              Delete Project
            </Button>
          )}
        </div>
      </div>

      {isAdmin && (
        <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <DialogContent>
            <DialogTitle>Delete this project?</DialogTitle>
            <DialogDescription className="mb-6 text-sm text-gray-600">
              This action cannot be undone.
            </DialogDescription>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}