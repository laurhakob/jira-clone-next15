"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function InvitePage() {
  const router = useRouter();
  const params = useParams();
  const inviteIdRaw = params.inviteId;

  // Always call hooks at the top level, unconditionally
  const workspace = useQuery(
    api.workspaces.getWorkspaceByInvite,
    typeof inviteIdRaw === "string"
      ? { inviteId: inviteIdRaw as Id<"invites"> }
      : "skip"
  );
  const joinWorkspace = useMutation(api.workspaces.joinWorkspace);

  // Handle invalid inviteId
  if (typeof inviteIdRaw !== "string") {
    return <p className="text-center">Invalid invite link</p>;
  }

  // Handle loading state
  if (workspace === undefined) {
    return <p className="text-center">Loading...</p>;
  }

  // Handle invalid workspace (e.g., invite not found)
  if (workspace === null) {
    return <p className="text-center">Invalid invite link</p>;
  }

  // Function to join the workspace
  const handleJoin = async () => {
    const result = await joinWorkspace({
      inviteId: inviteIdRaw as Id<"invites">,
    });
    if (result.success) {
      router.push(`/?workspaceId=${result.workspaceId}`);
    }
  };

  // Render the join workspace UI
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Join Workspace</h2>
      <p className="mt-2">
        You have been invited to join {workspace.name} workspace
      </p>
      <div className="mt-4 space-x-2">
        <Button variant="secondary" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button onClick={handleJoin}>Join Workspace</Button>
      </div>
    </div>
  );
}
