import { Id } from "../convex/_generated/dataModel";

export interface Workspace {
  _id: Id<"workspaces">;
  _creationTime: number;
  name: string;
  image?: Id<"_storage">;
  userId: Id<"users">;
  imageUrl: string | null;
}