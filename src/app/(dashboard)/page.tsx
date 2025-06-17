// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { Id } from "../../../convex/_generated/dataModel";
// import Image from "next/image";
// import { format } from "date-fns";
// import {
//   MoreVertical,
//   PlusIcon,
//   List,
//   User,
//   File,
//   Calendar,
//   ExternalLink,
//   Pencil,
//   Trash,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { DottedSeparator } from "@/components/dotted-separator";
// import TaskCreationForm from "@/components/tasks/TaskCreationForm";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import Link from "next/link";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "sonner";
// import { Task, TaskFormData } from "@/types";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const workspaceIdStr = searchParams.get("workspaceId");
//   const workspaceId = workspaceIdStr
//     ? (workspaceIdStr as Id<"workspaces">)
//     : null;
//   const projectId = searchParams.get("projectId") as Id<"projects"> | null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     workspaceId ? { id: workspaceId } : "skip"
//   );
//   const project = useQuery(
//     api.projects.getById,
//     projectId ? { id: projectId } : "skip"
//   );
//   const tasks = useQuery(
//     projectId ? api.tasks.getByProject : api.tasks.getByWorkspace,
//     projectId ? { projectId } : workspaceId ? { workspaceId } : "skip"
//   );
//   const members = useQuery(
//     api.workspaces.getMembers,
//     workspaceId ? { workspaceId } : "skip"
//   );
//   const projects = useQuery(
//     api.projects.get,
//     workspaceId ? { workspaceId } : "skip"
//   );

//   const [selectedTasks, setSelectedTasks] = useState<Id<"tasks">[]>([]);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedAssignee, setSelectedAssignee] =
//     useState<Id<"members"> | null>(null);
//   const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(null);
//   const [confirmDeleteTaskId, setConfirmDeleteTaskId] =
//     useState<Id<"tasks"> | null>(null);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   const deleteTask = useMutation(api.tasks.remove);
//   const createTask = useMutation(api.tasks.create);
//   const updateTask = useMutation(api.tasks.update);

//   const statusOptions = ["Backlog", "In Progress", "In Review", "Todo", "Done"];

//   const handleSelectAll = () => {
//     if (tasks && selectedTasks.length === tasks.length) {
//       setSelectedTasks([]);
//     } else if (tasks) {
//       setSelectedTasks(tasks.map((task) => task._id));
//     }
//   };

//   const handleSelectTask = (taskId: Id<"tasks">) => {
//     setSelectedTasks((prev) =>
//       prev.includes(taskId)
//         ? prev.filter((id) => id !== taskId)
//         : [...prev, taskId]
//     );
//   };

//   const handleDeleteTask = async () => {
//     if (!confirmDeleteTaskId) return;
//     try {
//       await deleteTask({ id: confirmDeleteTaskId });
//       toast.success("Task deleted successfully");
//     } catch {
//       toast.error("Failed to delete task");
//     } finally {
//       setConfirmDeleteTaskId(null);
//     }
//   };

//   const handleTaskSubmit = async (data: TaskFormData) => {
//     try {
//       if (editingTask) {
//         await updateTask({
//           id: editingTask._id,
//           name: data.name,
//           dueDate: data.dueDate,
//           assignee: data.assignee,
//           status: data.status,
//           projectId: data.projectId,
//         });
//         toast.success("Task updated successfully");
//       } else {
//         await createTask(data);
//         toast.success("Task created successfully");
//       }
//     } catch {
//       toast.error("Failed to save task");
//     } finally {
//       setIsTaskModalOpen(false);
//       setEditingTask(null);
//     }
//   };

//   const filteredTasks = tasks?.filter((task) => {
//     if (selectedStatus && task.status !== selectedStatus) return false;
//     if (selectedAssignee && task.assigneeId !== selectedAssignee) return false;
//     if (
//       selectedDueDate &&
//       (!task.dueDate ||
//         new Date(task.dueDate).toDateString() !==
//           selectedDueDate.toDateString())
//     )
//       return false;
//     return true;
//   });

//   const getStatusClass = (status: string) => {
//     const styles: Record<string, string> = {
//       Todo: "border-transparent bg-red-400 text-primary hover:bg-red-400/80 rounded-full",
//       "In Progress":
//         "border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80 rounded-full",
//       "In Review":
//         "border-transparent bg-blue-400 text-primary hover:bg-blue-400/80 rounded-full",
//       Done: "border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80 rounded-full",
//       Backlog:
//         "border-transparent bg-pink-400 text-primary hover:bg-pink-400/80 rounded-full",
//     };
//     return (
//       styles[status] ||
//       "border-transparent bg-gray-400 text-primary hover:bg-gray-400/80 rounded-full"
//     );
//   };

//   if (!workspaceId) {
//     return (
//       <div className="p-4">
//         <p>No workspace selected. Please choose from the sidebar.</p>
//       </div>
//     );
//   }

//   if (workspace === undefined) {
//     return (
//       <div className="p-4">
//         <p>Loading workspace...</p>
//       </div>
//     );
//   }

//   if (workspace === null) {
//     return (
//       <div className="p-4">
//         <p>Workspace not found or you do not have access.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       {/* Path Display */}
//       <div className="mb-4 text-sm">
//         <span className="italic text-gray-500">Workspace: </span>
//         <Link
//           href={`/?workspaceId=${workspaceId}`}
//           className="text-blue-500 hover:underline"
//         >
//           {workspace.name}
//         </Link>
//         {projectId && project && (
//           <>
//             <span> / </span>
//             <span className="italic text-gray-500">Project: </span>
//             <span>{project.name}</span>
//           </>
//         )}
//       </div>

//       {/* Project Details */}
//       {projectId && project ? (
//         <div className="flex items-center gap-4">
//           {project.imageUrl && (
//             <Image
//               src={project.imageUrl}
//               alt={project.name}
//               width={32}
//               height={32}
//               className="rounded"
//             />
//           )}
//           <h2 className="text-lg font-semibold">{project.name}</h2>
//         </div>
//       ) : (
//         <h2 className="text-lg font-semibold">
//           All projects in {workspace.name}
//         </h2>
//       )}
//       {projectId && project && (
//         <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>
//       )}

//       {/* Tabs */}
//       <Tabs
//         defaultValue="table"
//         className="flex-1 w-full border rounded-lg mt-4"
//       >
//         <div className="h-full flex flex-col overflow-auto p-4">
//           <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
//             <TabsList className="w-full lg:w-auto">
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
//                 Table
//               </TabsTrigger>
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
//                 Kanban
//               </TabsTrigger>
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
//                 Calendar
//               </TabsTrigger>
//             </TabsList>
//             <Button
//               onClick={() => {
//                 setEditingTask(null);
//                 setIsTaskModalOpen(true);
//               }}
//               className="w-full lg:w-auto ml-4"
//             >
//               <PlusIcon className="mr-2 h-4 w-4" /> New
//             </Button>
//           </div>
//           <DottedSeparator className="my-4" />

//           {/* Filter Buttons */}
//           <div className="flex gap-2 mb-4">
//             {/* Status Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <List className="mr-2 h-4 w-4" />
//                   {selectedStatus
//                     ? `Status: ${selectedStatus}`
//                     : "All statuses"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
//                   All statuses
//                 </DropdownMenuItem>
//                 {statusOptions.map((status) => (
//                   <DropdownMenuItem
//                     key={status}
//                     onClick={() => setSelectedStatus(status)}
//                   >
//                     {status}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Assignee Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <User className="mr-2 h-4 w-4" />
//                   {selectedAssignee
//                     ? `Assignee: ${members?.find((m) => m._id === selectedAssignee)?.user?.name || "Unknown"}`
//                     : "All assignees"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedAssignee(null)}>
//                   All assignees
//                 </DropdownMenuItem>
//                 {members?.map((member) => (
//                   <DropdownMenuItem
//                     key={member._id}
//                     onClick={() => setSelectedAssignee(member._id)}
//                   >
//                     {member.user?.name || "Unknown"}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Project Switcher */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <File className="mr-2 h-4 w-4" />
//                   {projectId
//                     ? `Project: ${project?.name || "Loading..."}`
//                     : "All projects"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem
//                   onClick={() => router.push(`/?workspaceId=${workspaceId}`)}
//                 >
//                   All projects
//                 </DropdownMenuItem>
//                 {projects?.map((proj) => (
//                   <DropdownMenuItem
//                     key={proj._id}
//                     onClick={() =>
//                       router.push(
//                         `/?workspaceId=${workspaceId}&projectId=${proj._id}`
//                       )
//                     }
//                   >
//                     {proj.imageUrl && (
//                       <Image
//                         src={proj.imageUrl}
//                         alt={proj.name}
//                         width={16}
//                         height={16}
//                         className="mr-2 rounded"
//                       />
//                     )}
//                     {proj.name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Due Date Filter */}
//             <div className="flex items-center gap-2">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline">
//                     <Calendar className="mr-2 h-4 w-4" />
//                     Due Date
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <DatePicker
//                     selected={selectedDueDate}
//                     onChange={(date: Date | null) => setSelectedDueDate(date)}
//                     inline
//                   />
//                   <div className="p-2">
//                     <Button
//                       variant="ghost"
//                       onClick={() => setSelectedDueDate(null)}
//                       className="w-full"
//                     >
//                       Clear
//                     </Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <DottedSeparator className="my-4" />

//           {/* Table Tab Content */}
//           <TabsContent value="table" className="mt-0">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2 text-left">
//                     <input
//                       type="checkbox"
//                       checked={
//                         filteredTasks &&
//                         filteredTasks.length > 0 &&
//                         selectedTasks.length === filteredTasks.length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                   </th>
//                   <th className="border p-2 text-left">Task Name</th>
//                   <th className="border p-2 text-left">Project</th>
//                   <th className="border p-2 text-left">Assignee</th>
//                   <th className="border p-2 text-left">Due Date</th>
//                   <th className="border p-2 text-left">Status</th>
//                   <th className="border p-2 text-left"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTasks === undefined ? (
//                   <tr>
//                     <td colSpan={7} className="p-4 text-center">
//                       Loading tasks...
//                     </td>
//                   </tr>
//                 ) : filteredTasks.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="p-4 text-center">
//                       No tasks found.
//                     </td>
//                   </tr>
//                 ) : (
//                   [...filteredTasks]
//                     .sort((a, b) => b._creationTime - a._creationTime)
//                     .map((task) => (
//                       <tr key={task._id} className="border-b">
//                         <td className="p-2">
//                           <input
//                             type="checkbox"
//                             checked={selectedTasks.includes(task._id)}
//                             onChange={() => handleSelectTask(task._id)}
//                           />
//                         </td>
//                         <td className="p-2">{task.name}</td>
//                         <td className="p-2">
//                           <div className="flex items-center gap-2">
//                             {task.projectImageUrl && (
//                               <Image
//                                 src={task.projectImageUrl}
//                                 alt={task.projectName}
//                                 width={24}
//                                 height={24}
//                                 className="rounded"
//                               />
//                             )}
//                             <span>{task.projectName}</span>
//                           </div>
//                         </td>
//                         <td className="p-2">
//                           {task.assignee ? (
//                             <div className="flex items-center gap-2">
//                               <Avatar className="size-6">
//                                 <AvatarImage src={task.assignee.image} />
//                                 <AvatarFallback>
//                                   {task.assignee.name?.[0]?.toUpperCase() ||
//                                     "?"}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <span>{task.assignee.name}</span>
//                             </div>
//                           ) : (
//                             "Unassigned"
//                           )}
//                         </td>
//                         <td className="p-2">
//                           {task.dueDate
//                             ? format(new Date(task.dueDate), "MMM d, yyyy")
//                             : "No due date"}
//                         </td>
//                         <td className="p-2">
//                           <span
//                             className={`px-2 py-1 rounded inline-block ${getStatusClass(task.status)}`}
//                           >
//                             {task.status}
//                           </span>
//                         </td>
//                         <td className="p-2">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                               <DropdownMenuItem className="font-medium p-[10px]">
//                                 <ExternalLink className="size-4 mr-2 stroke-2" />
//                                 Task Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem className="font-medium p-[10px]">
//                                 <ExternalLink className="size-4 mr-2 stroke-2" />
//                                 Open Project
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 className="font-medium p-[10px]"
//                                 onClick={() => {
//                                   setEditingTask(task);
//                                   setIsTaskModalOpen(true);
//                                 }}
//                               >
//                                 <Pencil className="size-4 mr-2 stroke-2" />
//                                 Edit Task
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
//                                 onClick={() => setConfirmDeleteTaskId(task._id)}
//                               >
//                                 <Trash className="size-4 mr-2 stroke-2" />
//                                 Delete Task
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </td>
//                       </tr>
//                     ))
//                 )}
//               </tbody>
//             </table>
//           </TabsContent>

//           {/* Other Tab Content */}
//           <TabsContent value="kanban" className="mt-0">
//             Data kanban
//           </TabsContent>
//           <TabsContent value="calendar" className="mt-0">
//             Data calendar
//           </TabsContent>
//         </div>
//       </Tabs>

//       {/* Task Creation/Edit Modal */}
//       <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
//         <DialogContent>
//           <DialogTitle>
//             {editingTask ? "Edit Task" : "Create New Task"}
//           </DialogTitle>
//           <TaskCreationForm
//             workspaceId={workspaceId}
//             projectId={projectId}
//             initialData={editingTask ?? undefined} // Convert null to undefined
//             onSubmit={handleTaskSubmit}
//             onClose={() => setIsTaskModalOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={!!confirmDeleteTaskId}
//         onOpenChange={() => setConfirmDeleteTaskId(null)}
//       >
//         <DialogContent>
//           <DialogTitle>Delete Task</DialogTitle>
//           <p>
//             Are you sure you want to delete this task? This action cannot be
//             undone.
//           </p>
//           <div className="flex justify-end gap-2">
//             <Button
//               variant="secondary"
//               onClick={() => setConfirmDeleteTaskId(null)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteTask}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// esi lavn a

// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { Id } from "../../../convex/_generated/dataModel";
// import Image from "next/image";
// import { format } from "date-fns";
// import {
//   MoreVertical,
//   PlusIcon,
//   List,
//   User,
//   File,
//   Calendar,
//   ExternalLink,
//   Pencil,
//   Trash,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { DottedSeparator } from "@/components/dotted-separator";
// import TaskCreationForm from "@/components/tasks/TaskCreationForm";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import Link from "next/link";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "sonner";
// import { Task, TaskFormData } from "@/types";
// import { KanbanBoard } from "@/components/KanbanBoard";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const workspaceIdStr = searchParams.get("workspaceId");
//   const workspaceId = workspaceIdStr
//     ? (workspaceIdStr as Id<"workspaces">)
//     : null;
//   const projectId = searchParams.get("projectId") as Id<"projects"> | null;

//   const workspace = useQuery(
//     api.workspaces.getById,
//     workspaceId ? { id: workspaceId } : "skip"
//   );
//   const project = useQuery(
//     api.projects.getById,
//     projectId ? { id: projectId } : "skip"
//   );
//   const tasks = useQuery(
//     projectId ? api.tasks.getByProject : api.tasks.getByWorkspace,
//     projectId ? { projectId } : workspaceId ? { workspaceId } : "skip"
//   );
//   const members = useQuery(
//     api.workspaces.getMembers,
//     workspaceId ? { workspaceId } : "skip"
//   );
//   const projects = useQuery(
//     api.projects.get,
//     workspaceId ? { workspaceId } : "skip"
//   );

//   const [selectedTasks, setSelectedTasks] = useState<Id<"tasks">[]>([]);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [selectedAssignee, setSelectedAssignee] =
//     useState<Id<"members"> | null>(null);
//   const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(null);
//   const [confirmDeleteTaskId, setConfirmDeleteTaskId] =
//     useState<Id<"tasks"> | null>(null);
//   const [formData, setFormData] = useState<Partial<Task> | undefined>(
//     undefined
//   ); // Updated from null to undefined

//   const deleteTask = useMutation(api.tasks.remove);
//   const createTask = useMutation(api.tasks.create);
//   const updateTask = useMutation(api.tasks.update);

//   const statusOptions = ["Backlog", "Todo", "In Progress", "In Review", "Done"];

//   const handleSelectAll = () => {
//     if (tasks && selectedTasks.length === tasks.length) {
//       setSelectedTasks([]);
//     } else if (tasks) {
//       setSelectedTasks(tasks.map((task) => task._id));
//     }
//   };

//   const handleSelectTask = (taskId: Id<"tasks">) => {
//     setSelectedTasks((prev) =>
//       prev.includes(taskId)
//         ? prev.filter((id) => id !== taskId)
//         : [...prev, taskId]
//     );
//   };

//   const handleDeleteTask = async () => {
//     if (!confirmDeleteTaskId) return;
//     try {
//       await deleteTask({ id: confirmDeleteTaskId });
//       toast.success("Task deleted successfully");
//     } catch {
//       toast.error("Failed to delete task");
//     } finally {
//       setConfirmDeleteTaskId(null);
//     }
//   };

//   const handleTaskSubmit = async (data: TaskFormData) => {
//     try {
//       if (formData?._id) {
//         await updateTask({
//           id: formData._id,
//           ...data,
//         });
//         toast.success("Task updated successfully");
//       } else {
//         await createTask(data);
//         toast.success("Task created successfully");
//       }
//     } catch {
//       toast.error("Failed to save task");
//     } finally {
//       setIsTaskModalOpen(false);
//       setFormData(undefined); // Updated from null to undefined
//     }
//   };

//   const filteredTasks = tasks?.filter((task) => {
//     if (selectedStatus && task.status !== selectedStatus) return false;
//     if (selectedAssignee && task.assigneeId !== selectedAssignee) return false;
//     if (
//       selectedDueDate &&
//       (!task.dueDate ||
//         new Date(task.dueDate).toDateString() !==
//           selectedDueDate.toDateString())
//     )
//       return false;
//     return true;
//   });

//   const kanbanTasks = tasks?.filter((task) => {
//     if (selectedAssignee && task.assigneeId !== selectedAssignee) return false;
//     if (
//       selectedDueDate &&
//       (!task.dueDate ||
//         new Date(task.dueDate).toDateString() !==
//           selectedDueDate.toDateString())
//     )
//       return false;
//     return true;
//   });

//   const handleAddTask = (status: string) => {
//     setFormData({ status });
//     setIsTaskModalOpen(true);
//   };

//   const getStatusClass = (status: string) => {
//     const styles: Record<string, string> = {
//       Todo: "border-transparent bg-red-400 text-primary hover:bg-red-400/80 rounded-full",
//       "In Progress":
//         "border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80 rounded-full",
//       "In Review":
//         "border-transparent bg-blue-400 text-primary hover:bg-blue-400/80 rounded-full",
//       Done: "border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80 rounded-full",
//       Backlog:
//         "border-transparent bg-pink-400 text-primary hover:bg-pink-400/80 rounded-full",
//     };
//     return (
//       styles[status] ||
//       "border-transparent bg-gray-400 text-primary hover:bg-gray-400/80 rounded-full"
//     );
//   };

//   if (!workspaceId) {
//     return (
//       <div className="p-4">
//         <p>No workspace selected. Please choose from the sidebar.</p>
//       </div>
//     );
//   }

//   if (workspace === undefined) {
//     return (
//       <div className="p-4">
//         <p>Loading workspace...</p>
//       </div>
//     );
//   }

//   if (workspace === null) {
//     return (
//       <div className="p-4">
//         <p>Workspace not found or you do not have access.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="mb-4 text-sm">
//         <span className="italic text-gray-500">Workspace: </span>
//         <Link
//           href={`/?workspaceId=${workspaceId}`}
//           className="text-blue-500 hover:underline"
//         >
//           {workspace.name}
//         </Link>
//         {projectId && project && (
//           <>
//             <span> / </span>
//             <span className="italic text-gray-500">Project: </span>
//             <span>{project.name}</span>
//           </>
//         )}
//       </div>

//       {projectId && project ? (
//         <div className="flex items-center gap-4">
//           {project.imageUrl && (
//             <Image
//               src={project.imageUrl}
//               alt={project.name}
//               width={32}
//               height={32}
//               className="rounded"
//             />
//           )}
//           <h2 className="text-lg font-semibold">{project.name}</h2>
//         </div>
//       ) : (
//         <h2 className="text-lg font-semibold">
//           All projects in {workspace.name}
//         </h2>
//       )}
//       {projectId && project && (
//         <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>
//       )}

//       <Tabs
//         defaultValue="table"
//         className="flex-1 w-full border rounded-lg mt-4"
//       >
//         <div className="h-full flex flex-col overflow-auto p-4">
//           <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
//             <TabsList className="w-full lg:w-auto">
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
//                 Table
//               </TabsTrigger>
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
//                 Kanban
//               </TabsTrigger>
//               <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
//                 Calendar
//               </TabsTrigger>
//             </TabsList>
//             <Button
//               onClick={() => {
//                 setFormData({});
//                 setIsTaskModalOpen(true);
//               }}
//               className="w-full lg:w-auto ml-4"
//             >
//               <PlusIcon className="mr-2 h-4 w-4" /> New
//             </Button>
//           </div>
//           <DottedSeparator className="my-4" />

//           <div className="flex gap-2 mb-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <List className="mr-2 h-4 w-4" />
//                   {selectedStatus
//                     ? `Status: ${selectedStatus}`
//                     : "All statuses"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
//                   All statuses
//                 </DropdownMenuItem>
//                 {statusOptions.map((status) => (
//                   <DropdownMenuItem
//                     key={status}
//                     onClick={() => setSelectedStatus(status)}
//                   >
//                     {status}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <User className="mr-2 h-4 w-4" />
//                   {selectedAssignee
//                     ? `Assignee: ${members?.find((m) => m._id === selectedAssignee)?.user?.name || "Unknown"}`
//                     : "All assignees"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedAssignee(null)}>
//                   All assignees
//                 </DropdownMenuItem>
//                 {members?.map((member) => (
//                   <DropdownMenuItem
//                     key={member._id}
//                     onClick={() => setSelectedAssignee(member._id)}
//                   >
//                     {member.user?.name || "Unknown"}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <File className="mr-2 h-4 w-4" />
//                   {projectId
//                     ? `Project: ${project?.name || "Loading..."}`
//                     : "All projects"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem
//                   onClick={() => router.push(`/?workspaceId=${workspaceId}`)}
//                 >
//                   All projects
//                 </DropdownMenuItem>
//                 {projects?.map((proj) => (
//                   <DropdownMenuItem
//                     key={proj._id}
//                     onClick={() =>
//                       router.push(
//                         `/?workspaceId=${workspaceId}&projectId=${proj._id}`
//                       )
//                     }
//                   >
//                     {proj.imageUrl && (
//                       <Image
//                         src={proj.imageUrl}
//                         alt={proj.name}
//                         width={16}
//                         height={16}
//                         className="mr-2 rounded"
//                       />
//                     )}
//                     {proj.name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <div className="flex items-center gap-2">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline">
//                     <Calendar className="mr-2 h-4 w-4" />
//                     Due Date
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <DatePicker
//                     selected={selectedDueDate}
//                     onChange={(date: Date | null) => setSelectedDueDate(date)}
//                     inline
//                   />
//                   <div className="p-2">
//                     <Button
//                       variant="ghost"
//                       onClick={() => setSelectedDueDate(null)}
//                       className="w-full"
//                     >
//                       Clear
//                     </Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <DottedSeparator className="my-4" />

//           <TabsContent value="table" className="mt-0">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2 text-left">
//                     <input
//                       type="checkbox"
//                       checked={
//                         filteredTasks &&
//                         filteredTasks.length > 0 &&
//                         selectedTasks.length === filteredTasks.length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                   </th>
//                   <th className="border p-2 text-left">Task Name</th>
//                   <th className="border p-2 text-left">Project</th>
//                   <th className="border p-2 text-left">Assignee</th>
//                   <th className="border p-2 text-left">Due Date</th>
//                   <th className="border p-2 text-left">Status</th>
//                   <th className="border p-2 text-left"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTasks === undefined ? (
//                   <tr>
//                     <td colSpan={7} className="p-4 text-center">
//                       Loading tasks...
//                     </td>
//                   </tr>
//                 ) : filteredTasks.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="p-4 text-center">
//                       No tasks found.
//                     </td>
//                   </tr>
//                 ) : (
//                   [...filteredTasks]
//                     .sort((a, b) => b._creationTime - a._creationTime)
//                     .map((task) => (
//                       <tr key={task._id} className="border-b">
//                         <td className="p-2">
//                           <input
//                             type="checkbox"
//                             checked={selectedTasks.includes(task._id)}
//                             onChange={() => handleSelectTask(task._id)}
//                           />
//                         </td>
//                         <td className="p-2">{task.name}</td>
//                         <td className="p-2">
//                           <div className="flex items-center gap-2">
//                             {task.projectImageUrl && (
//                               <Image
//                                 src={task.projectImageUrl}
//                                 alt={task.projectName}
//                                 width={24}
//                                 height={24}
//                                 className="rounded"
//                               />
//                             )}
//                             <span>{task.projectName}</span>
//                           </div>
//                         </td>
//                         <td className="p-2">
//                           {task.assignee ? (
//                             <div className="flex items-center gap-2">
//                               <Avatar className="size-6">
//                                 <AvatarImage src={task.assignee.image} />
//                                 <AvatarFallback>
//                                   {task.assignee.name?.[0]?.toUpperCase() ||
//                                     "?"}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <span>{task.assignee.name}</span>
//                             </div>
//                           ) : (
//                             "Unassigned"
//                           )}
//                         </td>
//                         <td className="p-2">
//                           {task.dueDate
//                             ? format(new Date(task.dueDate), "MMM d, yyyy")
//                             : "No due date"}
//                         </td>
//                         <td className="p-2">
//                           <span
//                             className={`px-2 py-1 rounded inline-block ${getStatusClass(task.status)}`}
//                           >
//                             {task.status}
//                           </span>
//                         </td>
//                         <td className="p-2">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                               <DropdownMenuItem className="font-medium p-[10px]">
//                                 <ExternalLink className="size-4 mr-2 stroke-2" />
//                                 Task Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem className="font-medium p-[10px]">
//                                 <ExternalLink className="size-4 mr-2 stroke-2" />
//                                 Open Project
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 className="font-medium p-[10px]"
//                                 onClick={() => {
//                                   setFormData(task);
//                                   setIsTaskModalOpen(true);
//                                 }}
//                               >
//                                 <Pencil className="size-4 mr-2 stroke-2" />
//                                 Edit Task
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
//                                 onClick={() => setConfirmDeleteTaskId(task._id)}
//                               >
//                                 <Trash className="size-4 mr-2 stroke-2" />
//                                 Delete Task
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </td>
//                       </tr>
//                     ))
//                 )}
//               </tbody>
//             </table>
//           </TabsContent>

//           <TabsContent value="kanban" className="mt-0">
//             <KanbanBoard
//               tasks={kanbanTasks || []}
//               onAddTask={handleAddTask}
//               onEditTask={(task) => {
//                 setFormData(task);
//                 setIsTaskModalOpen(true);
//               }}
//               onDeleteTask={(taskId) => setConfirmDeleteTaskId(taskId)}
//             />
//           </TabsContent>

//           <TabsContent value="calendar" className="mt-0">
//             Data calendar
//           </TabsContent>
//         </div>
//       </Tabs>

//       <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
//         <DialogContent>
//           <DialogTitle>
//             {formData?._id ? "Edit Task" : "Create New Task"}
//           </DialogTitle>
//           <TaskCreationForm
//             workspaceId={workspaceId}
//             projectId={projectId}
//             initialData={formData}
//             onSubmit={handleTaskSubmit}
//             onClose={() => setIsTaskModalOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={!!confirmDeleteTaskId}
//         onOpenChange={() => setConfirmDeleteTaskId(null)}
//       >
//         <DialogContent>
//           <DialogTitle>Delete Task</DialogTitle>
//           <p>
//             Are you sure you want to delete this task? This action cannot be
//             undone.
//           </p>
//           <div className="flex justify-end gap-2">
//             <Button
//               variant="secondary"
//               onClick={() => setConfirmDeleteTaskId(null)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteTask}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Image from "next/image";
import { format } from "date-fns";
import {
  MoreVertical,
  PlusIcon,
  List,
  User,
  File,
  Calendar,
  ExternalLink,
  Pencil,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";
import TaskCreationForm from "@/components/tasks/TaskCreationForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { Task, TaskFormData } from "@/types";
import { KanbanBoard } from "@/components/KanbanBoard";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspaceIdStr = searchParams.get("workspaceId");
  const workspaceId = workspaceIdStr
    ? (workspaceIdStr as Id<"workspaces">)
    : null;
  const projectId = searchParams.get("projectId") as Id<"projects"> | null;

  const workspace = useQuery(
    api.workspaces.getById,
    workspaceId ? { id: workspaceId } : "skip"
  );
  const project = useQuery(
    api.projects.getById,
    projectId ? { id: projectId } : "skip"
  );
  const tasks = useQuery(
    projectId ? api.tasks.getByProject : api.tasks.getByWorkspace,
    projectId ? { projectId } : workspaceId ? { workspaceId } : "skip"
  );
  const members = useQuery(
    api.workspaces.getMembers,
    workspaceId ? { workspaceId } : "skip"
  );
  const projects = useQuery(
    api.projects.get,
    workspaceId ? { workspaceId } : "skip"
  );

  const [selectedTasks, setSelectedTasks] = useState<Id<"tasks">[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] =
    useState<Id<"members"> | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(null);
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] =
    useState<Id<"tasks"> | null>(null);
  const [formData, setFormData] = useState<Partial<Task> | undefined>(
    undefined
  );

  const deleteTask = useMutation(api.tasks.remove);
  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);

  const statusOptions = ["Backlog", "Todo", "In Progress", "In Review", "Done"];

  const handleSelectAll = () => {
    if (tasks && selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else if (tasks) {
      setSelectedTasks(tasks.map((task) => task._id));
    }
  };

  const handleSelectTask = (taskId: Id<"tasks">) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleDeleteTask = async () => {
    if (!confirmDeleteTaskId) return;
    try {
      await deleteTask({ id: confirmDeleteTaskId });
      toast.success("Task deleted successfully");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setConfirmDeleteTaskId(null);
    }
  };

  const handleTaskSubmit = async (data: TaskFormData) => {
    try {
      if (formData?._id) {
        // Exclude workspaceId from the update data
        const { workspaceId: _, ...updateData } = data;
        void _;
        await updateTask({
          id: formData._id,
          ...updateData,
        });
        toast.success("Task updated successfully");
      } else {
        await createTask(data);
        toast.success("Task created successfully");
      }
    } catch {
      toast.error("Failed to save task");
    } finally {
      setIsTaskModalOpen(false);
      setFormData(undefined);
    }
  };

  const filteredTasks = tasks?.filter((task) => {
    if (selectedStatus && task.status !== selectedStatus) return false;
    if (selectedAssignee && task.assigneeId !== selectedAssignee) return false;
    if (
      selectedDueDate &&
      (!task.dueDate ||
        new Date(task.dueDate).toDateString() !==
          selectedDueDate.toDateString())
    )
      return false;
    return true;
  });

  const kanbanTasks = tasks?.filter((task) => {
    if (selectedAssignee && task.assigneeId !== selectedAssignee) return false;
    if (
      selectedDueDate &&
      (!task.dueDate ||
        new Date(task.dueDate).toDateString() !==
          selectedDueDate.toDateString())
    )
      return false;
    return true;
  });

  const handleAddTask = (status: string) => {
    setFormData({ status });
    setIsTaskModalOpen(true);
  };

  const getStatusClass = (status: string) => {
    const styles: Record<string, string> = {
      Todo: "border-transparent bg-red-400 text-primary hover:bg-red-400/80 rounded-full",
      "In Progress":
        "border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80 rounded-full",
      "In Review":
        "border-transparent bg-blue-400 text-primary hover:bg-blue-400/80 rounded-full",
      Done: "border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80 rounded-full",
      Backlog:
        "border-transparent bg-pink-400 text-primary hover:bg-pink-400/80 rounded-full",
    };
    return (
      styles[status] ||
      "border-transparent bg-gray-400 text-primary hover:bg-gray-400/80 rounded-full"
    );
  };

  if (!workspaceId) {
    return (
      <div className="p-4">
        <p>No workspace selected. Please choose from the sidebar.</p>
      </div>
    );
  }

  if (workspace === undefined) {
    return (
      <div className="p-4">
        <p>Loading workspace...</p>
      </div>
    );
  }

  if (workspace === null) {
    return (
      <div className="p-4">
        <p>Workspace not found or you do not have access.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 text-sm">
        <span className="italic text-gray-500">Workspace: </span>
        <Link
          href={`/?workspaceId=${workspaceId}`}
          className="text-blue-500 hover:underline"
        >
          {workspace.name}
        </Link>
        {projectId && project && (
          <>
            <span> / </span>
            <span className="italic text-gray-500">Project: </span>
            <span>{project.name}</span>
          </>
        )}
      </div>

      {projectId && project ? (
        <div className="flex items-center gap-4">
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={32}
              height={32}
              className="rounded"
            />
          )}
          <h2 className="text-lg font-semibold">{project.name}</h2>
        </div>
      ) : (
        <h2 className="text-lg font-semibold">
          All projects in {workspace.name}
        </h2>
      )}
      {projectId && project && (
        <p className="text-xs text-gray-400 mt-4">ID: {project._id}</p>
      )}

      <Tabs
        defaultValue="table"
        className="flex-1 w-full border rounded-lg mt-4"
      >
        <div className="h-full flex flex-col overflow-auto p-4">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                Table
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                Kanban
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                Calendar
              </TabsTrigger>
            </TabsList>
            <Button
              onClick={() => {
                setFormData({});
                setIsTaskModalOpen(true);
              }}
              className="w-full lg:w-auto ml-4"
            >
              <PlusIcon className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <DottedSeparator className="my-4" />

          <div className="flex gap-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <List className="mr-2 h-4 w-4" />
                  {selectedStatus
                    ? `Status: ${selectedStatus}`
                    : "All statuses"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                  All statuses
                </DropdownMenuItem>
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  {selectedAssignee
                    ? `Assignee: ${members?.find((m) => m._id === selectedAssignee)?.user?.name || "Unknown"}`
                    : "All assignees"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedAssignee(null)}>
                  All assignees
                </DropdownMenuItem>
                {members?.map((member) => (
                  <DropdownMenuItem
                    key={member._id}
                    onClick={() => setSelectedAssignee(member._id)}
                  >
                    {member.user?.name || "Unknown"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <File className="mr-2 h-4 w-4" />
                  {projectId
                    ? `Project: ${project?.name || "Loading..."}`
                    : "All projects"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => router.push(`/?workspaceId=${workspaceId}`)}
                >
                  All projects
                </DropdownMenuItem>
                {projects?.map((proj) => (
                  <DropdownMenuItem
                    key={proj._id}
                    onClick={() =>
                      router.push(
                        `/?workspaceId=${workspaceId}&projectId=${proj._id}`
                      )
                    }
                  >
                    {proj.imageUrl && (
                      <Image
                        src={proj.imageUrl}
                        alt={proj.name}
                        width={16}
                        height={16}
                        className="mr-2 rounded"
                      />
                    )}
                    {proj.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Due Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    selected={selectedDueDate}
                    onChange={(date: Date | null) => setSelectedDueDate(date)}
                    inline
                  />
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedDueDate(null)}
                      className="w-full"
                    >
                      Clear
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DottedSeparator className="my-4" />

          <TabsContent value="table" className="mt-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">
                    <input
                      type="checkbox"
                      checked={
                        filteredTasks &&
                        filteredTasks.length > 0 &&
                        selectedTasks.length === filteredTasks.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border p-2 text-left">Task Name</th>
                  <th className="border p-2 text-left">Project</th>
                  <th className="border p-2 text-left">Assignee</th>
                  <th className="border p-2 text-left">Due Date</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks === undefined ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      Loading tasks...
                    </td>
                  </tr>
                ) : filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  [...filteredTasks]
                    .sort((a, b) => b._creationTime - a._creationTime)
                    .map((task) => (
                      <tr key={task._id} className="border-b">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task._id)}
                            onChange={() => handleSelectTask(task._id)}
                          />
                        </td>
                        <td className="p-2">{task.name}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {task.projectImageUrl && (
                              <Image
                                src={task.projectImageUrl}
                                alt={task.projectName}
                                width={24}
                                height={24}
                                className="rounded"
                              />
                            )}
                            <span>{task.projectName}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          {task.assignee ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6">
                                <AvatarImage src={task.assignee.image} />
                                <AvatarFallback>
                                  {task.assignee.name?.[0]?.toUpperCase() ||
                                    "?"}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee.name}</span>
                            </div>
                          ) : (
                            "Unassigned"
                          )}
                        </td>
                        <td className="p-2">
                          {task.dueDate
                            ? format(new Date(task.dueDate), "MMM d, yyyy")
                            : "No due date"}
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded inline-block ${getStatusClass(task.status)}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="font-medium p-[10px]">
                                <ExternalLink className="size-4 mr-2 stroke-2" />
                                Task Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-medium p-[10px]">
                                <ExternalLink className="size-4 mr-2 stroke-2" />
                                Open Project
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="font-medium p-[10px]"
                                onClick={() => {
                                  setFormData(task);
                                  setIsTaskModalOpen(true);
                                }}
                              >
                                <Pencil className="size-4 mr-2 stroke-2" />
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
                                onClick={() => setConfirmDeleteTaskId(task._id)}
                              >
                                <Trash className="size-4 mr-2 stroke-2" />
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="kanban" className="mt-0">
            <KanbanBoard
              tasks={kanbanTasks || []}
              onAddTask={handleAddTask}
              onEditTask={(task) => {
                setFormData(task);
                setIsTaskModalOpen(true);
              }}
              onDeleteTask={(taskId) => setConfirmDeleteTaskId(taskId)}
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </div>
      </Tabs>

      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogTitle>
            {formData?._id ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <TaskCreationForm
            workspaceId={workspaceId}
            projectId={projectId}
            initialData={formData}
            onSubmit={handleTaskSubmit}
            onClose={() => setIsTaskModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!confirmDeleteTaskId}
        onOpenChange={() => setConfirmDeleteTaskId(null)}
      >
        <DialogContent>
          <DialogTitle>Delete Task</DialogTitle>
          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setConfirmDeleteTaskId(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
