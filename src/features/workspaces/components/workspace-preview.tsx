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