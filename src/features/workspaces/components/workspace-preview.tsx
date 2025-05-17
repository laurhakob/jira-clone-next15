"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const WorkspacePreview = () => {
  const { data, isLoading } = useGetWorkspaces();
  const [name, setName] = useState("");

  const workspace = data?.[0];

  const handleCreate = () => {
    // TODO: connect to a mutation to create the workspace
    console.log("Create workspace:", name);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      {workspace ? (
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Workspace</h2>
          <p><strong>Name:</strong> {workspace.name}</p>
          <p><strong>ID:</strong> {workspace._id}</p>
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
          <Button onClick={handleCreate}>Create</Button>
        </div>
      )}
    </div>
  );
};
