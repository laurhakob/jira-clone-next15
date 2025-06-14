import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

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

    const project = await ctx.db.get(args.projectId);
    if (!project || project.workspaceId !== args.workspaceId) {
      throw new Error("Invalid project");
    }

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

export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    const tasksWithDetails = await Promise.all(
      tasks.map(async (task) => {
        const project = await ctx.db.get(task.projectId);
        const imageUrl = project?.image ? await ctx.storage.getUrl(project.image) : null;
        const assigneeDetails = task.assignee
          ? await ctx.db.get(task.assignee).then(async (member) => {
              if (member) {
                const user = await ctx.db.get(member.userId);
                return user ? { name: user.name, image: user.image } : null;
              }
              return null;
            })
          : null;
        return {
          ...task,
          projectName: project?.name || "Unknown",
          projectImageUrl: imageUrl,
          assigneeId: task.assignee || null,
          assignee: assigneeDetails,
        };
      })
    );

    return tasksWithDetails;
  },
});

export const getByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    const tasksWithDetails = await Promise.all(
      tasks.map(async (task) => {
        const project = await ctx.db.get(task.projectId);
        const imageUrl = project?.image ? await ctx.storage.getUrl(project.image) : null;
        const assigneeDetails = task.assignee
          ? await ctx.db.get(task.assignee).then(async (member) => {
              if (member) {
                const user = await ctx.db.get(member.userId);
                return user ? { name: user.name, image: user.image } : null;
              }
              return null;
            })
          : null;
        return {
          ...task,
          projectName: project?.name || "Unknown",
          projectImageUrl: imageUrl,
          assigneeId: task.assignee || null,
          assignee: assigneeDetails,
        };
      })
    );

    return tasksWithDetails;
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), task.workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: You are not a member of this workspace");

    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    name: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    assignee: v.optional(v.id("members")),
    status: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), task.workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: You are not a member of this workspace");

    if (args.projectId) {
      const project = await ctx.db.get(args.projectId);
      if (!project || project.workspaceId !== task.workspaceId) {
        throw new Error("Invalid project");
      }
    }

    const updates: Partial<{
      name: string;
      dueDate: number;
      assignee: Id<"members">;
      status: string;
      projectId: Id<"projects">;
    }> = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.dueDate !== undefined) updates.dueDate = args.dueDate;
    if (args.assignee !== undefined) updates.assignee = args.assignee;
    if (args.status !== undefined) updates.status = args.status;
    if (args.projectId !== undefined) updates.projectId = args.projectId;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});