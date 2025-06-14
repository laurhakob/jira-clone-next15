// import { Id } from "../convex/_generated/dataModel";

// export interface Workspace {
//   _id: Id<"workspaces">;
//   _creationTime: number;
//   name: string;
//   image?: Id<"_storage">;
//   userId: Id<"users">;
//   imageUrl: string | null;
// }




// import { Id } from "../convex/_generated/dataModel";

// export interface Task {
//   _id: Id<"tasks">;
//   name: string;
//   dueDate?: number;
//   assigneeId?: Id<"members">;
//   status: string;
//   projectId: Id<"projects">;
//   workspaceId: Id<"workspaces">;
//   projectName?: string;
//   projectImageUrl?: string;
//   assignee?: {
//     name?: string;
//     image?: string;
//   };
// }

// export interface TaskFormData {
//   name: string;
//   dueDate?: number;
//   assignee?: Id<"members">;
//   status: string;
//   projectId: Id<"projects">;
//   workspaceId: Id<"workspaces">;
// }



import { Id } from "../convex/_generated/dataModel";

export interface Task {
  _id: Id<"tasks">;
  name: string;
  dueDate?: number;
  assigneeId?: Id<"members"> | null; // Updated to allow null
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