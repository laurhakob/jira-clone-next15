"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
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
        {members.map((member, index) => (
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
                  <p className="font-medium">{member.user?.name || "Unknown"}</p>
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
                  <DropdownMenuItem>Set as Administrator</DropdownMenuItem>
                  <DropdownMenuItem>Set as Member</DropdownMenuItem>
                  <DropdownMenuItem>
                    Remove{" "}
                    <strong>{member.user?.name || "this member"}</strong>
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