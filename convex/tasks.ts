import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
    dueDate: v.optional(v.number()),
    assignee: v.optional(v.id("members")),
    status: v.string(),
    projectId: v.id("projects"),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check if the user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: You are not a member of this workspace");

    // Check if the project belongs to the workspace
    const project = await ctx.db.get(args.projectId);
    if (!project || project.workspaceId !== args.workspaceId) {
      throw new Error("Invalid project");
    }

    // Create the task
    const taskId = await ctx.db.insert("tasks", {
      name: args.name,
      dueDate: args.dueDate,
      assignee: args.assignee,
      status: args.status,
      projectId: args.projectId,
      workspaceId: args.workspaceId,
    });

    return taskId;
  },
});