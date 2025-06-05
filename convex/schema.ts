
// new for inviteCode 

// import { defineSchema, defineTable } from "convex/server";
// import { authTables } from "@convex-dev/auth/server";
// import { v } from "convex/values";

// export default defineSchema({
//   ...authTables,
//   workspaces: defineTable({
//     name: v.string(),
//     image: v.optional(v.id("_storage")),
//     userId: v.id("users"),
//     inviteId: v.optional(v.id("invites")), 
//   }),
//   members: defineTable({
//     workspaceId: v.id("workspaces"),
//     userId: v.id("users"),
//     isCreator: v.boolean(),
//   }).index("by_workspace", ["workspaceId"]),
//   invites: defineTable({
//     workspaceId: v.id("workspaces"),
//   }),
// });



// for creating projects

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
});