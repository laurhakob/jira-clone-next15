"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const WorkspacePreview = () => {
  const { data, isLoading } = useGetWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false); // manually track loading

  const workspace = data?.[0];

  const handleCreate = async () => {
    if (name.trim().length < 3) {
      setError("Workspace name must be at least 3 characters");
      return;
    }
    setError(null);
    setIsCreating(true);

    try {
      await createWorkspace({ name }); // ✅ call directly
      setName(""); // Clear input on success
    } catch (e) {
      setError("Failed to create workspace");
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      {workspace ? (
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Workspace</h2>
          <p>
            <strong>Name:</strong> {workspace.name}
          </p>
          <p>
            <strong>ID:</strong> {workspace._id}</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
