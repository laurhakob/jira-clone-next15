"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const WorkspaceSwitcher = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase text-neutral-500">Workspaces</p>
          <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
        </div>
        <p>Loading workspaces...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select
        onValueChange={(value) => console.log("Selected workspace ID:", value)}
      >
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.length === 0 ? (
            <p className="text-sm text-neutral-500 p-2">No workspaces available</p>
          ) : (
            workspaces?.map((workspace) => (
              <SelectItem key={workspace._id} value={workspace._id}>
                <div className="flex items-center gap-2">
                  {workspace.imageUrl && (
                    <img
                      src={workspace.imageUrl}
                      alt={workspace.name}
                      className="w-6 h-6 rounded"
                    />
                  )}
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};