// "use client";

// export default function Home() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold">Home</h1>
//       <p>Monitor all of your projects and tasks here</p>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { PlusIcon, Calendar, Settings } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DottedSeparator } from "@/components/dotted-separator";
import TaskCreationForm from "@/components/tasks/TaskCreationForm";
import ProjectCreationForm from "@/components/projects/ProjectCreationForm";
import { toast } from "sonner";
import { TaskFormData } from "@/types";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const searchParams = useSearchParams();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr ? (workspaceIdStr as Id<"workspaces">) : null;

  const tasks = useQuery(
    api.tasks.getByWorkspace,
    workspaceId ? { workspaceId } : "skip"
  );
  const projects = useQuery(
    api.projects.get,
    workspaceId ? { workspaceId } : "skip"
  );
  const members = useQuery(
    api.workspaces.getMembers,
    workspaceId ? { workspaceId } : "skip"
  );

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);

  const createTask = useMutation(api.tasks.create);
  const createProject = useMutation(api.projects.create);

  // Handle loading state when workspaceId is present
  if (workspaceId && (tasks === undefined || projects === undefined || members === undefined)) {
    return <p className="p-4">Loading...</p>;
  }

  // Default to empty arrays if data is undefined
  const tasksArray = tasks || [];
  const sortedTasks = [...tasksArray].sort((a, b) => b._creationTime - a._creationTime);
  const displayedTasks = showAllTasks ? sortedTasks : sortedTasks.slice(0, 3);
  const totalTasks = tasksArray.length;

  const projectsArray = projects || [];
  const sortedProjects = [...projectsArray].sort((a, b) => b._creationTime - a._creationTime);
  const displayedProjects = showAllProjects ? sortedProjects : sortedProjects.slice(0, 3);
  const totalProjects = projectsArray.length;

  const membersArray = members || [];
  const sortedMembers = [...membersArray].sort((a, b) => (a.user?.name || "").localeCompare(b.user?.name || ""));
  const displayedMembers = showAllMembers ? sortedMembers : sortedMembers.slice(0, 3);
  const totalMembers = membersArray.length;

  const handleTaskSubmit = async (data: TaskFormData) => {
    if (!workspaceId) {
      toast.error("No workspace selected");
      return;
    }
    try {
      await createTask(data);
      toast.success("Task created successfully");
    } catch {
      toast.error("Failed to create task");
    } finally {
      setIsTaskModalOpen(false);
    }
  };

  const handleProjectSubmit = async (data: { name: string; image?: Id<"_storage"> }) => {
    if (!workspaceId) {
      toast.error("No workspace selected");
      return;
    }
    try {
      await createProject({ workspaceId, ...data });
      toast.success("Project created successfully");
    } catch {
      toast.error("Failed to create project");
    } finally {
      setIsProjectModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      {!workspaceId && (
        <p className="mb-4 text-red-500">
          No workspace selected. Please choose from the sidebar.
        </p>
      )}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-40 md:space-y-0">
        {/* Task Section */}
        <div className="w-full md:w-[400px] space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Tasks ({totalTasks})</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => workspaceId && setIsTaskModalOpen(true)}
              disabled={!workspaceId}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <DottedSeparator />
          {displayedTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {displayedTasks.map((task) => (
                <div key={task._id} className="py-2 border-b">
                  <p className="font-medium">{task.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{task.projectName}</span>
                    <span>•</span>
                    {task.dueDate ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                      </div>
                    ) : (
                      <span>No due date</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalTasks > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllTasks(!showAllTasks)}
              className="text-blue-500 hover:underline"
            >
              {showAllTasks ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>

        {/* Project Section */}
        <div className="w-full md:w-[400px] space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Projects ({totalProjects})</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => workspaceId && setIsProjectModalOpen(true)}
              disabled={!workspaceId}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <DottedSeparator />
          {displayedProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="space-y-4">
              {displayedProjects.map((project) => (
                <div
                  key={project._id}
                  className="py-2 border-b flex items-center gap-2"
                >
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <p className="font-medium">{project.name}</p>
                </div>
              ))}
            </div>
          )}
          {totalProjects > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="text-blue-500 hover:underline"
            >
              {showAllProjects ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>

        {/* Members Section */}
        <div className="w-full md:w-[400px] space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Members ({totalMembers})</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => workspaceId && setIsMembersModalOpen(true)}
              disabled={!workspaceId}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <DottedSeparator />
          {displayedMembers.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <div className="space-y-4">
              {displayedMembers.map((member) => (
                <div
                  key={member._id}
                  className="py-2 border-b flex items-center gap-2"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={member.user?.image} />
                    <AvatarFallback>
                      {member.user?.name?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.user?.name || "Unknown"}</p>
                    <p className="text-sm text-gray-400">{member.user?.email || "No email"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalMembers > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllMembers(!showAllMembers)}
              className="text-blue-500 hover:underline"
            >
              {showAllMembers ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>
      </div>

      {/* Modals */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogTitle>Create New Task</DialogTitle>
          {workspaceId ? (
            <TaskCreationForm
              workspaceId={workspaceId}
              projectId={null}
              initialData={undefined}
              onSubmit={handleTaskSubmit}
              onClose={() => setIsTaskModalOpen(false)}
            />
          ) : (
            <p>Please select a workspace first.</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent>
          <DialogTitle>Create New Project</DialogTitle>
          {workspaceId ? (
            <ProjectCreationForm
              workspaceId={workspaceId}
              onSubmit={handleProjectSubmit}
              onClose={() => setIsProjectModalOpen(false)}
            />
          ) : (
            <p>Please select a workspace first.</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isMembersModalOpen} onOpenChange={setIsMembersModalOpen}>
        <DialogContent>
          <DialogTitle>Members</DialogTitle>
          <div className="space-y-4">
            {sortedMembers.length === 0 ? (
              <p>No members found.</p>
            ) : (
              sortedMembers.map((member) => (
                <div key={member._id} className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={member.user?.image} />
                    <AvatarFallback>
                      {member.user?.name?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.user?.name || "Unknown"}</p>
                    <p className="text-sm text-gray-500">{member.user?.email || "No email"}</p>
                    <p className="text-sm">{member.isCreator ? "Admin" : "Member"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}