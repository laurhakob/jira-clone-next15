

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
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

export default function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

  const workspace = useQuery(
    api.workspaces.getById,
    workspaceId ? { id: workspaceId } : "skip"
  );

  const updateWorkspace = useMutation(api.workspaces.update);
  const deleteWorkspace = useMutation(api.workspaces.remove);

  const [editedName, setEditedName] = useState("");
  const [editedImageId, setEditedImageId] = useState<Id<"_storage"> | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const imageUrl = useQuery(
    api.upload.getImageUrl,
    editedImageId ? { storageId: editedImageId } : "skip"
  );

  // Sync state with workspace data only when workspace changes
  useEffect(() => {
    if (workspace) {
      setEditedName(workspace.name);
      setEditedImageId(workspace.image);
    }
  }, [workspace]);

  const handleSave = async () => {
    if (!workspaceId) return;
    setIsSaving(true);
    const args: {
      id: Id<"workspaces">;
      name?: string;
      image?: Id<"_storage">;
      removeImage?: boolean;
    } = { id: workspaceId, name: editedName };
    if (editedImageId !== workspace?.image) {
      if (editedImageId === undefined) {
        args.removeImage = true;
      } else {
        args.image = editedImageId;
      }
    }
    await updateWorkspace(args);
    setIsSaving(false);
  };

  const handleRemoveImage = () => {
    setEditedImageId(undefined);
  };

  const handleDelete = async () => {
    if (!workspaceId) return;
    await deleteWorkspace({ id: workspaceId });
    router.push("/");
  };

  if (!workspaceId || !workspace) {
    return <p className="text-center">No workspace selected or you do not have access</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{workspace.name}</h1>
        <Button
          variant="outline"
          onClick={() => router.push(`/?workspaceId=${workspaceId}`)}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workspace Name
          </label>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Workspace name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workspace Image
          </label>
          {editedImageId && imageUrl && (
            <Image
              src={imageUrl}
              alt={workspace.name}
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
              <Button variant="destructive" onClick={handleRemoveImage}>
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
          <Button variant="destructive" onClick={() => setConfirmDelete(true)}>
            Delete Workspace
          </Button>
        </div>
      </div>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription className="mb-6 text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
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