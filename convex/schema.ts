import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    image: v.optional(v.id("_storage")),
    userId: v.id("users"),
  }),
  members: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    isCreator: v.boolean(),
  }).index("by_workspace", ["workspaceId"]),
});