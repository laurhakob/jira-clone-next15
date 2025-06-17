

// import { Task } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";

// interface KanbanBoardProps {
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// // Define the statuses and their corresponding colors as per the screenshot
// const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
// const statusColors: Record<string, string> = {
//   Backlog: "border-pink-500",
//   Todo: "border-red-500",
//   "In Progress": "border-yellow-500",
//   "In Review": "border-blue-500",
//   Done: "border-green-500",
// };

// export const KanbanBoard = ({ tasks, onAddTask }: KanbanBoardProps) => {
//   return (
//     <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
//       {statuses.map((status) => {
//         const tasksInStatus = tasks.filter((task) => task.status === status);
//         return (
//           <KanbanColumn
//             key={status}
//             status={status}
//             tasks={tasksInStatus}
//             onAddTask={onAddTask}
//           />
//         );
//       })}
//     </div>
//   );
// };

// interface KanbanColumnProps {
//   status: string;
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// const KanbanColumn = ({ status, tasks, onAddTask }: KanbanColumnProps) => {
//   return (
//     <div className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm">
//       {/* Column Header */}
//       <div className="flex items-center gap-2 mb-2">
//         {/* Circle with a hole (donut shape) */}
//         <div
//           className={`w-5 h-5 rounded-full border-4 ${
//             statusColors[status] || "border-gray-500"
//           }`}
//         ></div>
//         {/* Status Name */}
//         <h3 className="font-semibold">{status}</h3>
//         {/* Task Count Badge */}
//         <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
//           {tasks.length}
//         </span>
//         {/* Plus Icon */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-gray-100 rounded-full"
//           onClick={() => onAddTask(status)}
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       {/* Task List */}
//       <div className="flex-1 space-y-2">
//         {tasks.map((task) => (
//           <div key={task._id} className="bg-white p-2 rounded shadow">
//             {task.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// import { Task } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";

// interface KanbanBoardProps {
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// // Define the statuses and their corresponding colors
// const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
// const statusColors: Record<string, string> = {
//   Backlog: "border-pink-500",
//   Todo: "border-red-500",
//   "In Progress": "border-yellow-500",
//   "In Review": "border-blue-500",
//   Done: "border-green-500",
// };

// export const KanbanBoard = ({ tasks, onAddTask }: KanbanBoardProps) => {
//   return (
//     <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
//       {statuses.map((status) => {
//         const tasksInStatus = tasks.filter((task) => task.status === status);
//         return (
//           <KanbanColumn
//             key={status}
//             status={status}
//             tasks={tasksInStatus}
//             onAddTask={onAddTask}
//           />
//         );
//       })}
//     </div>
//   );
// };

// interface KanbanColumnProps {
//   status: string;
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// const KanbanColumn = ({ status, tasks, onAddTask }: KanbanColumnProps) => {
//   return (
//     <div className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm">
//       {/* Column Header with plus icon at the end */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           {/* Circle with a hole (donut shape) */}
//           <div
//             className={`w-5 h-5 rounded-full border-4 ${
//               statusColors[status] || "border-gray-500"
//             }`}
//           ></div>
//           {/* Status Name */}
//           <h3 className="font-semibold">{status}</h3>
//           {/* Task Count Badge */}
//           <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
//             {tasks.length}
//           </span>
//         </div>
//         {/* Plus Icon */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-gray-100 rounded-full"
//           onClick={() => onAddTask(status)}
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       {/* Task List */}
//       <div className="flex-1 space-y-2">
//         {tasks.map((task) => (
//           <div key={task._id} className="bg-white p-2 rounded shadow">
//             {task.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };







// import { Task } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import Image from "next/image";
// import { format } from "date-fns";
// import { DottedSeparator } from "@/components/dotted-separator";

// // Define the statuses and their corresponding colors
// const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
// const statusColors: Record<string, string> = {
//   Backlog: "border-pink-500",
//   Todo: "border-red-500",
//   "In Progress": "border-yellow-500",
//   "In Review": "border-blue-500",
//   Done: "border-green-500",
// };

// // KanbanTaskCard Component
// interface KanbanTaskCardProps {
//   task: Task;
// }

// const KanbanTaskCard = ({ task }: KanbanTaskCardProps) => {
//   return (
//     <div className="bg-white p-3 rounded-lg shadow">
//       <h4 className="font-semibold mb-2">{task.name}</h4>
//       <DottedSeparator className="my-2" />
//       <div className="flex items-center gap-2 mb-2">
//         {task.assignee ? (
//           <Avatar className="size-6">
//             <AvatarImage src={task.assignee.image} />
//             <AvatarFallback>{task.assignee.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
//           </Avatar>
//         ) : (
//           <Avatar className="size-6">
//             <AvatarFallback>?</AvatarFallback>
//           </Avatar>
//         )}
//         <span className="text-gray-500">•</span>
//         <span className="text-gray-500">
//           {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         {task.projectImageUrl && (
//           <Image
//             src={task.projectImageUrl}
//             alt={task.projectName ?? "Project image"}
//             width={24}
//             height={24}
//             className="rounded"
//           />
//         )}
//         <span>{task.projectName}</span>
//       </div>
//     </div>
//   );
// };

// // KanbanBoard Component
// interface KanbanBoardProps {
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// export const KanbanBoard = ({ tasks, onAddTask }: KanbanBoardProps) => {
//   return (
//     <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
//       {statuses.map((status) => {
//         const tasksInStatus = tasks.filter((task) => task.status === status);
//         return (
//           <KanbanColumn
//             key={status}
//             status={status}
//             tasks={tasksInStatus}
//             onAddTask={onAddTask}
//           />
//         );
//       })}
//     </div>
//   );
// };

// // KanbanColumn Component
// interface KanbanColumnProps {
//   status: string;
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// const KanbanColumn = ({ status, tasks, onAddTask }: KanbanColumnProps) => {
//   return (
//     <div className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm">
//       {/* Column Header with plus icon at the end */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           {/* Circle with a hole (donut shape) */}
//           <div
//             className={`w-5 h-5 rounded-full border-4 ${
//               statusColors[status] || "border-gray-500"
//             }`}
//           ></div>
//           {/* Status Name */}
//           <h3 className="font-semibold">{status}</h3>
//           {/* Task Count Badge */}
//           <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
//             {tasks.length}
//           </span>
//         </div>
//         {/* Plus Icon */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-gray-100 rounded-full"
//           onClick={() => onAddTask(status)}
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       {/* Task List */}
//       <div className="flex-1 space-y-2">
//         {tasks.map((task) => (
//           <KanbanTaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };






// import { Task } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import Image from "next/image";
// import { format } from "date-fns";
// import { DottedSeparator } from "@/components/dotted-separator";

// // Define the statuses and their corresponding colors
// const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
// const statusColors: Record<string, string> = {
//   Backlog: "border-pink-500",
//   Todo: "border-red-500",
//   "In Progress": "border-yellow-500",
//   "In Review": "border-blue-500",
//   Done: "border-green-500",
// };

// // KanbanTaskCard Component
// interface KanbanTaskCardProps {
//   task: Task;
// }

// const KanbanTaskCard = ({ task }: KanbanTaskCardProps) => {
//   return (
//     <div className="bg-white p-3 rounded-lg shadow">
//       <h4 className="font-semibold mb-2">{task.name}</h4>
//       <DottedSeparator className="my-2" />
//       <div className="flex items-center gap-2 mb-4">
//         {task.assignee ? (
//           <Avatar className="size-6">
//             <AvatarImage src={task.assignee.image} />
//             <AvatarFallback>{task.assignee.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
//           </Avatar>
//         ) : (
//           <Avatar className="size-6">
//             <AvatarFallback>?</AvatarFallback>
//           </Avatar>
//         )}
//         <span className="text-gray-500">•</span>
//         <span className="text-gray-500">
//           {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         {task.projectImageUrl && (
//           <Image
//             src={task.projectImageUrl}
//             alt={task.projectName ?? "Project image"}
//             width={24}
//             height={24}
//             className="rounded"
//           />
//         )}
//         <span>{task.projectName}</span>
//       </div>
//     </div>
//   );
// };

// // KanbanBoard Component
// interface KanbanBoardProps {
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// export const KanbanBoard = ({ tasks, onAddTask }: KanbanBoardProps) => {
//   return (
//     <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
//       {statuses.map((status) => {
//         const tasksInStatus = tasks.filter((task) => task.status === status);
//         return (
//           <KanbanColumn
//             key={status}
//             status={status}
//             tasks={tasksInStatus}
//             onAddTask={onAddTask}
//           />
//         );
//       })}
//     </div>
//   );
// };

// // KanbanColumn Component
// interface KanbanColumnProps {
//   status: string;
//   tasks: Task[];
//   onAddTask: (status: string) => void;
// }

// const KanbanColumn = ({ status, tasks, onAddTask }: KanbanColumnProps) => {
//   return (
//     <div className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm">
//       {/* Column Header with plus icon at the end */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           {/* Circle with a hole (donut shape) */}
//           <div
//             className={`w-5 h-5 rounded-full border-4 ${
//               statusColors[status] || "border-gray-500"
//             }`}
//           ></div>
//           {/* Status Name */}
//           <h3 className="font-semibold">{status}</h3>
//           {/* Task Count Badge */}
//           <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
//             {tasks.length}
//           </span>
//         </div>
//         {/* Plus Icon */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-gray-100 rounded-full"
//           onClick={() => onAddTask(status)}
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       {/* Task List */}
//       <div className="flex-1 space-y-2">
//         {tasks.map((task) => (
//           <KanbanTaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };






// yntir code minchgev drag amd drop




// import { Task } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon, MoreVertical, ExternalLink, Pencil, Trash } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import Image from "next/image";
// import { format } from "date-fns";
// import { DottedSeparator } from "@/components/dotted-separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Id } from "../../convex/_generated/dataModel";

// // Define the statuses and their corresponding colors
// const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
// const statusColors: Record<string, string> = {
//   Backlog: "border-pink-500",
//   Todo: "border-red-500",
//   "In Progress": "border-yellow-500",
//   "In Review": "border-blue-500",
//   Done: "border-green-500",
// };

// // KanbanTaskCard Component
// interface KanbanTaskCardProps {
//   task: Task;
//   onEditTask: (task: Task) => void;
//   onDeleteTask: (taskId: Id<"tasks">) => void;
// }

// const KanbanTaskCard = ({ task, onEditTask, onDeleteTask }: KanbanTaskCardProps) => {
//   return (
//     <div className="bg-white p-3 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-2">
//         <h4 className="font-semibold">{task.name}</h4>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem className="font-medium p-[10px]">
//               <ExternalLink className="size-4 mr-2 stroke-2" />
//               Task Details
//             </DropdownMenuItem>
//             <DropdownMenuItem className="font-medium p-[10px]">
//               <ExternalLink className="size-4 mr-2 stroke-2" />
//               Open Project
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="font-medium p-[10px]"
//               onClick={() => onEditTask(task)}
//             >
//               <Pencil className="size-4 mr-2 stroke-2" />
//               Edit Task
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
//               onClick={() => onDeleteTask(task._id)}
//             >
//               <Trash className="size-4 mr-2 stroke-2" />
//               Delete Task
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <DottedSeparator className="my-2" />
//       <div className="flex items-center gap-2 mb-4">
//         {task.assignee ? (
//           <Avatar className="size-6">
//             <AvatarImage src={task.assignee.image} />
//             <AvatarFallback>{task.assignee.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
//           </Avatar>
//         ) : (
//           <Avatar className="size-6">
//             <AvatarFallback>?</AvatarFallback>
//           </Avatar>
//         )}
//         <span className="text-gray-500">•</span>
//         <span className="text-gray-500">
//           {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         {task.projectImageUrl && (
//           <Image
//             src={task.projectImageUrl}
//             alt={task.projectName ?? "Project image"}
//             width={24}
//             height={24}
//             className="rounded"
//           />
//         )}
//         <span>{task.projectName}</span>
//       </div>
//     </div>
//   );
// };

// // KanbanBoard Component
// interface KanbanBoardProps {
//   tasks: Task[];
//   onAddTask: (status: string) => void;
//   onEditTask: (task: Task) => void;
//   onDeleteTask: (taskId: Id<"tasks">) => void;
// }

// export const KanbanBoard = ({ tasks, onAddTask, onEditTask, onDeleteTask }: KanbanBoardProps) => {
//   return (
//     <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
//       {statuses.map((status) => {
//         const tasksInStatus = tasks.filter((task) => task.status === status);
//         return (
//           <KanbanColumn
//             key={status}
//             status={status}
//             tasks={tasksInStatus}
//             onAddTask={onAddTask}
//             onEditTask={onEditTask}
//             onDeleteTask={onDeleteTask}
//           />
//         );
//       })}
//     </div>
//   );
// };

// // KanbanColumn Component
// interface KanbanColumnProps {
//   status: string;
//   tasks: Task[];
//   onAddTask: (status: string) => void;
//   onEditTask: (task: Task) => void;
//   onDeleteTask: (taskId: Id<"tasks">) => void;
// }

// const KanbanColumn = ({ status, tasks, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) => {
//   return (
//     <div className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm">
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           <div
//             className={`w-5 h-5 rounded-full border-4 ${
//               statusColors[status] || "border-gray-500"
//             }`}
//           ></div>
//           <h3 className="font-semibold">{status}</h3>
//           <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
//             {tasks.length}
//           </span>
//         </div>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-gray-100 rounded-full"
//           onClick={() => onAddTask(status)}
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       <div className="flex-1 space-y-2">
//         {tasks.map((task) => (
//           <KanbanTaskCard
//             key={task._id}
//             task={task}
//             onEditTask={onEditTask}
//             onDeleteTask={onDeleteTask}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };




import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon, MoreVertical, ExternalLink, Pencil, Trash } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../convex/_generated/dataModel";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Define the statuses and their corresponding colors
const statuses = ["Backlog", "Todo", "In Progress", "In Review", "Done"];
const statusColors: Record<string, string> = {
  Backlog: "border-pink-500",
  Todo: "border-red-500",
  "In Progress": "border-yellow-500",
  "In Review": "border-blue-500",
  Done: "border-green-500",
};

// KanbanTaskCard Component
interface KanbanTaskCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: Id<"tasks">) => void;
}

const KanbanTaskCard = ({ task, onEditTask, onDeleteTask }: KanbanTaskCardProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{task.name}</h4>
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
              onClick={() => onEditTask(task)}
            >
              <Pencil className="size-4 mr-2 stroke-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
              onClick={() => onDeleteTask(task._id)}
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DottedSeparator className="my-2" />
      <div className="flex items-center gap-2 mb-4">
        {task.assignee ? (
          <Avatar className="size-6">
            <AvatarImage src={task.assignee.image} />
            <AvatarFallback>{task.assignee.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="size-6">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        )}
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">
          {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {task.projectImageUrl && (
          <Image
            src={task.projectImageUrl}
            alt={task.projectName ?? "Project image"}
            width={24}
            height={24}
            className="rounded"
          />
        )}
        <span>{task.projectName}</span>
      </div>
    </div>
  );
};

// KanbanBoard Component
interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: Id<"tasks">) => void;
}

export const KanbanBoard = ({ tasks, onAddTask, onEditTask, onDeleteTask }: KanbanBoardProps) => {
  const updateTaskStatus = useMutation(api.tasks.update);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside a droppable area

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    // No change if dropped in the same position
    if (sourceStatus === destStatus && source.index === destination.index) return;

    const taskId = result.draggableId;
    const newStatus = destStatus;

    // Update task status in the database
    await updateTaskStatus({ id: taskId as Id<"tasks">, status: newStatus });

    // Convex reactivity will update the tasks list, and the UI will reflect the new counts
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto gap-4 p-4 bg-white border rounded-lg">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-[250px] flex flex-col bg-gray-50 p-2 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-4 ${
                        statusColors[status] || "border-gray-500"
                      }`}
                    ></div>
                    <h3 className="font-semibold">{status}</h3>
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {tasks.filter((task) => task.status === status).length}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-100 rounded-full"
                    onClick={() => onAddTask(status)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-2">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanTaskCard
                              task={task}
                              onEditTask={onEditTask}
                              onDeleteTask={onDeleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};