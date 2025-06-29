import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Get all workspace IDs where the user is a member
    const memberWorkspaces = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const workspaceIds = memberWorkspaces.map((m) => m.workspaceId);

    // Fetch workspaces by their IDs
    const workspaces = await Promise.all(
      workspaceIds.map((id) => ctx.db.get(id))
    );

    // Filter out null workspaces and add image URLs
    const workspacesWithUrls = await Promise.all(
      workspaces.filter((ws) => ws !== null).map(async (ws) => {
        let imageUrl = null;
        if (ws.image) {
          imageUrl = await ctx.storage.getUrl(ws.image);
        }
        return { ...ws, imageUrl };
      })
    );

    return workspacesWithUrls;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      image: args.image,
      userId,
    });

    const inviteId = await ctx.db.insert("invites", { workspaceId });
    await ctx.db.patch(workspaceId, { inviteId });

    await ctx.db.insert("members", {
      workspaceId,
      userId,
      isCreator: true,
    });

    return workspaceId;
  },
});

export const update = mutation({
  args: {
    id: v.id("workspaces"),
    name: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
    removeImage: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, name, image, removeImage }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), id),
          q.eq(q.field("userId"), userId),
          q.eq(q.field("isCreator"), true)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: Only Admin can perform this action");

    const updates: { name?: string; image?: Id<"_storage"> | undefined } = {};
    if (name !== undefined) updates.name = name;
    if (removeImage) updates.image = undefined;
    else if (image !== undefined) updates.image = image;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), id),
          q.eq(q.field("userId"), userId),
          q.eq(q.field("isCreator"), true)
        )
      )
      .first();
    if (!member) throw new Error("Forbidden: Only Admin can perform this action");

    await ctx.db.delete(id);
    return id;
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.id),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();

    if (!member) return null;

    const workspace = await ctx.db.get(args.id);
    if (!workspace) return null;

    let imageUrl = null;
    if (workspace.image) {
      imageUrl = await ctx.storage.getUrl(workspace.image);
    }
    return { ...workspace, imageUrl, isAdmin: member.isCreator };
  },
});

export const getMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    const membersWithUserDetails = await Promise.all(
      members.map(async (member) => {
        const user = await ctx.db.get(member.userId);
        return { ...member, user };
      })
    );

    return membersWithUserDetails;
  },
});

export const joinWorkspace = mutation({
  args: { inviteId: v.id("invites") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const invite = await ctx.db.get(args.inviteId);
    if (!invite) throw new Error("Invalid invite");

    const workspaceId = invite.workspaceId;

    const existingMember = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), workspaceId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();

    if (existingMember) {
      return { success: true, message: "Already a member", workspaceId };
    }

    await ctx.db.insert("members", {
      workspaceId,
      userId,
      isCreator: false,
    });

    return { success: true, message: "Joined workspace", workspaceId };
  },
});

export const getWorkspaceByInvite = query({
  args: { inviteId: v.id("invites") },
  handler: async (ctx, args) => {
    const invite = await ctx.db.get(args.inviteId);
    if (!invite) return null;

    const workspace = await ctx.db.get(invite.workspaceId);
    if (!workspace) return null;

    return { id: workspace._id, name: workspace.name };
  },
});

export const leaveWorkspace = mutation({
  args: { workspaceId: v.id("workspaces") },
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

    if (!member) throw new Error("Not a member of this workspace");
    if (member.isCreator) throw new Error("Creators cannot leave their own workspace");

    await ctx.db.delete(member._id);
    return { success: true };
  },
});

export const setAsAdmin = mutation({
  args: { workspaceId: v.id("workspaces"), memberId: v.id("members") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Verify the current user is the Admin
    const currentMember = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.workspaceId),
          q.eq(q.field("userId"), userId),
          q.eq(q.field("isCreator"), true)
        )
      )
      .first();
    if (!currentMember) throw new Error("Forbidden: Only Admin can perform this action");

    // Fetch the target member
    const targetMember = await ctx.db.get(args.memberId);
    if (!targetMember || targetMember.workspaceId !== args.workspaceId) {
      throw new Error("Member not found");
    }

    // If target is already Admin, no action needed
    if (targetMember.isCreator) {
      return { success: true };
    }

    // Demote current Admin to member
    await ctx.db.patch(currentMember._id, { isCreator: false });
    // Promote target member to Admin
    await ctx.db.patch(targetMember._id, { isCreator: true });

    return { success: true };
  },
});

export const removeMember = mutation({
  args: { workspaceId: v.id("workspaces"), memberId: v.id("members") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Verify the current user is the Admin
    const currentMember = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.workspaceId),
          q.eq(q.field("userId"), userId),
          q.eq(q.field("isCreator"), true)
        )
      )
      .first();
    if (!currentMember) throw new Error("Forbidden: Only Admin can perform this action");

    // Fetch the target member
    const targetMember = await ctx.db.get(args.memberId);
    if (!targetMember || targetMember.workspaceId !== args.workspaceId) {
      throw new Error("Member not found");
    }

    // Prevent Admin from removing themselves
    if (targetMember.isCreator) {
      throw new Error("Cannot remove the Admin");
    }

    // Remove the member
    await ctx.db.delete(args.memberId);

    return { success: true };
  },
});