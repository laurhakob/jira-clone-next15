import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    image: v.optional(v.id("_storage")), // Convex file reference
    userId: v.id("users"),
    // joinCode: v.string(),
  }),
});
