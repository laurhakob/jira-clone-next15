
// for creating tasks

import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    image: v.optional(v.id("_storage")),
    userId: v.id("users"),
    inviteId: v.optional(v.id("invites")), 
  }),
  members: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    isCreator: v.boolean(),
  }).index("by_workspace", ["workspaceId"]),
  invites: defineTable({
    workspaceId: v.id("workspaces"),
  }),
  projects: defineTable({
    name: v.string(),
    image: v.optional(v.id("_storage")),
    workspaceId: v.id("workspaces"),
  }).index("by_workspace", ["workspaceId"]),
  tasks: defineTable({
    name: v.string(),
    dueDate: v.optional(v.number()),
    assignee: v.optional(v.id("members")),
    status: v.string(),
    projectId: v.id("projects"),
    workspaceId: v.id("workspaces"),
  }).index("by_project", ["projectId"]).index("by_workspace", ["workspaceId"]),
});