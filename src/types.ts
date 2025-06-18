import { Id } from "../convex/_generated/dataModel";

export interface Task {
  _id: Id<"tasks">;
  name: string;
  dueDate?: number;
  assigneeId?: Id<"members"> | null;
  status: string;
  projectId: Id<"projects">;
  workspaceId: Id<"workspaces">;
  projectName?: string;
  projectImageUrl?: string | null;
  assignee?: {
    name?: string;
    image?: string;
  } | null;
}

export interface TaskFormData {
  name: string;
  dueDate?: number;
  assignee?: Id<"members">;
  status: string;
  projectId: Id<"projects">;
  workspaceId: Id<"workspaces">;
}

export interface Workspace {
  _id: Id<"workspaces">;
  name: string;
}

export interface FetchedWorkspace extends Workspace {
  imageUrl?: string;
  isAdmin?: boolean;
}



// calendari hamar bayc designy

// import { Id } from "../convex/_generated/dataModel";

// // Define the TaskStatus type with specific status values
// export type TaskStatus = "Backlog" | "Todo" | "In Progress" | "In Review" | "Done";

// export interface Task {
//   _id: Id<"tasks">;
//   name: string;
//   dueDate?: number;
//   assigneeId?: Id<"members"> | null;
//   status: TaskStatus;  // Changed from string to TaskStatus
//   projectId: Id<"projects">;
//   workspaceId: Id<"workspaces">;
//   projectName?: string;
//   projectImageUrl?: string | null;
//   assignee?: {
//     name?: string;
//     image?: string;
//   } | null;
// }

// export interface TaskFormData {
//   name: string;
//   dueDate?: number;
//   assignee?: Id<"members">;
//   status: TaskStatus;  // Changed from string to TaskStatus
//   projectId: Id<"projects">;
//   workspaceId: Id<"workspaces">;
// }

// export interface Workspace {
//   _id: Id<"workspaces">;
//   name: string;
// }

// export interface FetchedWorkspace extends Workspace {
//   imageUrl?: string;
//   isAdmin?: boolean;
// }


