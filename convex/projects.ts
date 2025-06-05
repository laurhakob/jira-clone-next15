import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

// Get all projects for a specific workspace
export const get = query({
  args: { workspaceId: v.id("workspaces") },
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

    // Get all projects for this workspace
    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    // Add image URLs if images are present
    const projectsWithUrls = await Promise.all(
      projects.map(async (project) => {
        let imageUrl = null;
        if (project.image) {
          imageUrl = await ctx.storage.getUrl(project.image);
        }
        return { ...project, imageUrl };
      })
    );

    return projectsWithUrls;
  },
});

// Get a single project by ID
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const project = await ctx.db.get(args.id);
    if (!project) return null;

    // Check if the user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), project.workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();
    if (!member) return null;

    let imageUrl = null;
    if (project.image) {
      imageUrl = await ctx.storage.getUrl(project.image);
    }
    return { ...project, imageUrl };
  },
});

// Create a new project in a specific workspace
export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
    image: v.optional(v.id("_storage")),
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

    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      image: args.image,
      workspaceId: args.workspaceId,
    });

    return projectId;
  },
});

// Update an existing project
export const update = mutation({
  args: {
    id: v.id("projects"),
    name: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");

    // Check if the user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), project.workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: You are not a member of this workspace");

    // Prepare updates object with only provided fields
    const updates: { name?: string; image?: Id<"_storage"> } = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.image !== undefined) updates.image = args.image;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});

// Delete a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");

    // Check if the user is the creator of the workspace (or has permission to delete)
    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), project.workspaceId),
          q.eq(q.field("userId"), userId),
          q.eq(q.field("isCreator"), true) // Only the creator can delete projects
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: Only the workspace creator can delete projects");

    await ctx.db.delete(args.id);
    return args.id;
  },
});