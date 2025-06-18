"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { toast } from "sonner";

// Define the Member interface
interface Member {
  _id: Id<"members">;
  workspaceId: Id<"workspaces">;
  userId: Id<"users">;
  isCreator: boolean;
  user: {
    _id: Id<"users">;
    name?: string;
    email?: string;
    image?: string;
  } | null;
}

export default function MembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

  const workspace = useQuery(
    api.workspaces.getById,
    workspaceId ? { id: workspaceId } : "skip"
  );
  const members = useQuery(
    api.workspaces.getMembers,
    workspaceId ? { workspaceId } : "skip"
  );

  const setAsAdmin = useMutation(api.workspaces.setAsAdmin);
  const removeMember = useMutation(api.workspaces.removeMember);

  // Handlers for dropdown actions
  const handleSetAsAdmin = async (member: Member) => {
    if (!workspaceId) return;
    try {
      await setAsAdmin({ workspaceId, memberId: member._id });
      toast.success(`Successfully set ${member.user?.name || "member"} as Administrator`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(
        errorMessage === "Forbidden: Only Admin can perform this action"
          ? "Failed to set as Administrator because you are not the admin"
          : errorMessage || "Failed to set as Administrator"
      );
    }
  };

  const handleRemoveMember = async (member: Member) => {
    if (!workspaceId) return;
    try {
      await removeMember({ workspaceId, memberId: member._id });
      toast.success(`Successfully removed ${member.user?.name || "member"}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(
        errorMessage === "Forbidden: Only Admin can perform this action"
          ? "Failed to remove member because you are not the admin"
          : errorMessage || "Failed to remove member"
      );
    }
  };

  if (workspace === undefined || members === undefined) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (workspace === null) {
    return <p className="p-4 text-center">No workspace selected or you do not have access</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/?workspaceId=${workspaceId}`)}
          className="mr-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-semibold">Member List</h1>
      </div>
      <div className="space-y-4">
        {members.map((member: Member, index: number) => (
          <React.Fragment key={member._id}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.user?.image} />
                  <AvatarFallback>
                    {member.user?.name?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.user?.name || "Unknown"}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        member.isCreator
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.isCreator ? "Admin" : "Member"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {member.user?.email || "No email"}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleSetAsAdmin(member)}
                    disabled={member.isCreator}
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRemoveMember(member)}
                    disabled={member.isCreator}
                  >
                    Remove <strong>{member.user?.name || "this member"}</strong>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < members.length - 1 && <Separator className="my-2" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}