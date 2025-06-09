"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DottedSeparator } from "@/components/dotted-separator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

interface TaskCreationFormProps {
  workspaceId: Id<"workspaces">;
  projectId?: Id<"projects">;
  onClose?: () => void; // Made optional with '?'
}

export default function TaskCreationForm({ workspaceId, projectId, onClose }: TaskCreationFormProps) {
  const router = useRouter();
  const members = useQuery(api.workspaces.getMembers, { workspaceId });
  const projects = useQuery(api.projects.get, { workspaceId });
  const createTask = useMutation(api.tasks.create);

  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [assignee, setAssignee] = useState<Id<"members"> | null>(null);
  const [status, setStatus] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Id<"projects"> | null>(projectId || null);

  const statusOptions = ["Backlog", "In Progress", "In Review", "Todo", "Done"];

  const handleCreate = async () => {
    if (!name || !selectedProject || !status) {
      alert("Please fill in all required fields");
      return;
    }

    await createTask({
      name,
      dueDate: dueDate ? dueDate.getTime() : undefined,
      assignee: assignee || undefined,
      status,
      projectId: selectedProject,
      workspaceId,
    });

    if (onClose) {
      onClose(); // Call onClose if provided (e.g., to close a modal)
    } else {
      router.back(); // Navigate back if no onClose (e.g., on a separate page)
    }
  };

  if (members === undefined || projects === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <DottedSeparator className="my-4" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter task name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Select date"
            className="w-full p-2 border rounded"
            calendarClassName="border rounded"
            customInput={
              <button className="flex items-center gap-2 p-2 border rounded w-full justify-between">
                {dueDate ? dueDate.toLocaleDateString() : "Select date"}
                <CalendarIcon className="h-5 w-5" />
              </button>
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assignee</label>
          <Select value={assignee || ""} onValueChange={(value) => setAssignee(value as Id<"members">)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member._id} value={member._id}>
                  <div className="flex items-center gap-2">
                    {member.user?.image && (
                      <Image
                        src={member.user.image}
                        alt={member.user.name || "Assignee"}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span>{member.user?.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project</label>
          <Select value={selectedProject || ""} onValueChange={(value) => setSelectedProject(value as Id<"projects">)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  <div className="flex items-center gap-2">
                    {project.imageUrl && (
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    )}
                    <span>{project.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DottedSeparator className="my-4" />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => onClose ? onClose() : router.back()}>Cancel</Button>
        <Button onClick={handleCreate}>Create Task</Button>
      </div>
    </div>
  );
}