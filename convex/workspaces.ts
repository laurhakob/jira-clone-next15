// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";

// // Get all workspaces for the current user
// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     return await ctx.db
//       .query("workspaces")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .collect();
//   },
// });

// // Create Workspace
// export const create = mutation({
//   args: {
//     name: v.string(),
//     image: v.optional(v.id("_storage")),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const workspaceId = await ctx.db.insert("workspaces", {
//       name: args.name,
//       image: args.image,
//       userId,
//     });

//     return workspaceId;
//   },
// });

// export const remove = mutation({
//   args: { id: v.id("workspaces") },
//   handler: async (ctx, { id }) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const workspace = await ctx.db.get(id);
//     if (!workspace || workspace.userId !== userId) {
//       throw new Error("You do not have permission to delete this workspace");
//     }

//     await ctx.db.delete(id);
//   },
// });

// es minchev GROKy ashxatoxn er

// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";

// /* ─────────────────────  QUERY  ───────────────────── */
// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     return ctx.db
//       .query("workspaces")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .collect();
//   },
// });

// /* ─────────────────────  CREATE  ──────────────────── */
// export const create = mutation({
//   args: {
//     name: v.string(),
//     image: v.optional(v.id("_storage")),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     return ctx.db.insert("workspaces", {
//       name: args.name,
//       image: args.image,
//       userId,
//     });
//   },
// });

// /* ─────────────────────  UPDATE  ──────────────────── */
// export const update = mutation({
//   args: {
//     id: v.id("workspaces"),
//     name: v.string(),
//   },
//   handler: async (ctx, { id, name }) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const ws = await ctx.db.get(id);
//     if (!ws || ws.userId !== userId) throw new Error("Forbidden");

//     await ctx.db.patch(id, { name });
//     return id;
//   },
// });

// /* ─────────────────────  DELETE  ──────────────────── */
// export const remove = mutation({
//   args: { id: v.id("workspaces") },
//   handler: async (ctx, { id }) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const ws = await ctx.db.get(id);
//     if (!ws || ws.userId !== userId) throw new Error("Forbidden");

//     await ctx.db.delete(id);
//     return id;
//   },
// });









// porcum enq GROKi versiayov hima (shaat yntir)

// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";
// import { Id } from "./_generated/dataModel";

// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const workspaces = await ctx.db
//       .query("workspaces")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .collect();

//     const workspacesWithUrls = await Promise.all(
//       workspaces.map(async (ws) => {
//         let imageUrl = null;
//         if (ws.image) {
//           imageUrl = await ctx.storage.getUrl(ws.image);
//         }
//         return { ...ws, imageUrl };
//       })
//     );

//     return workspacesWithUrls;
//   },
// });


// export const create = mutation({
//   args: {
//     name: v.string(),
//     image: v.optional(v.id("_storage")),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     // Insert workspace without inviteId initially
//     const workspaceId = await ctx.db.insert("workspaces", {
//       name: args.name,
//       image: args.image,
//       userId,
//     });

//     // Create invite linked to the workspace
//     const inviteId = await ctx.db.insert("invites", {
//       workspaceId,
//     });

//     // Update workspace with inviteId
//     await ctx.db.patch(workspaceId, { inviteId });

//     // Add creator as a member
//     await ctx.db.insert("members", {
//       workspaceId,
//       userId,
//       isCreator: true,
//     });

//     return workspaceId;
//   },
// });

// export const update = mutation({
//   args: {
//     id: v.id("workspaces"),
//     name: v.optional(v.string()),
//     image: v.optional(v.id("_storage")),
//     removeImage: v.optional(v.boolean()),
//   },
//   handler: async (ctx, { id, name, image, removeImage }) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const ws = await ctx.db.get(id);
//     if (!ws || ws.userId !== userId) throw new Error("Forbidden");

//     const updates: { name?: string; image?: Id<"_storage"> | undefined } = {};
//     if (name !== undefined) updates.name = name;
//     if (removeImage) {
//       updates.image = undefined;
//     } else if (image !== undefined) {
//       updates.image = image;
//     }
//     await ctx.db.patch(id, updates);
//     return id;
//   },
// });


// export const remove = mutation({
//   args: { id: v.id("workspaces") },
//   handler: async (ctx, { id }) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const ws = await ctx.db.get(id);
//     if (!ws || ws.userId !== userId) throw new Error("Forbidden");

//     await ctx.db.delete(id);
//     return id;
//   },
// });

// export const getById = query({
//   args: { id: v.id("workspaces") },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const workspace = await ctx.db.get(args.id);
//     if (!workspace) return null;

//     const isCreator = workspace.userId === userId;
//     const isMember = await ctx.db
//       .query("members")
//       .filter((q) =>
//         q.and(
//           q.eq(q.field("workspaceId"), args.id),
//           q.eq(q.field("userId"), userId)
//         )
//       )
//       .first();

//     if (!isCreator && !isMember) return null;

//     let imageUrl = null;
//     if (workspace.image) {
//       imageUrl = await ctx.storage.getUrl(workspace.image);
//     }
//     return { ...workspace, imageUrl };
//   },
// });

// export const getMembers = query({
//   args: { workspaceId: v.id("workspaces") },
//   handler: async (ctx, args) => {
//     const members = await ctx.db
//       .query("members")
//       .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
//       .collect();

//     const membersWithUserDetails = await Promise.all(
//       members.map(async (member) => {
//         const user = await ctx.db.get(member.userId);
//         return { ...member, user };
//       })
//     );

//     return membersWithUserDetails;
//   },
// });



// // adding this for invite system

// export const joinWorkspace = mutation({
//   args: { inviteId: v.id("invites") },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const invite = await ctx.db.get(args.inviteId);
//     if (!invite) throw new Error("Invalid invite");

//     const workspaceId = invite.workspaceId;

//     // Check if user is already a member
//     const existingMember = await ctx.db
//       .query("members")
//       .filter((q) =>
//         q.and(
//           q.eq(q.field("workspaceId"), workspaceId),
//           q.eq(q.field("userId"), userId)
//         )
//       )
//       .first();

//     if (existingMember) {
//       return { success: true, message: "Already a member", workspaceId };
//     }

//     // Add user as a non-creator member
//     await ctx.db.insert("members", {
//       workspaceId,
//       userId,
//       isCreator: false,
//     });

//     return { success: true, message: "Joined workspace", workspaceId };
//   },
// });


// export const getWorkspaceByInvite = query({
//   args: { inviteId: v.id("invites") },
//   handler: async (ctx, args) => {
//     const invite = await ctx.db.get(args.inviteId);
//     if (!invite) return null;

//     const workspace = await ctx.db.get(invite.workspaceId);
//     if (!workspace) return null;

//     return { id: workspace._id, name: workspace.name };
//   },
// });



















// grokov, avelacnum enq quit workspace y inviteic heto


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

    const ws = await ctx.db.get(id);
    if (!ws || ws.userId !== userId) throw new Error("Forbidden");

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

    const ws = await ctx.db.get(id);
    if (!ws || ws.userId !== userId) throw new Error("Forbidden");

    await ctx.db.delete(id);
    return id;
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const workspace = await ctx.db.get(args.id);
    if (!workspace) return null;

    const isCreator = workspace.userId === userId;
    const isMember = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("workspaceId"), args.id),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();

    if (!isCreator && !isMember) return null;

    let imageUrl = null;
    if (workspace.image) {
      imageUrl = await ctx.storage.getUrl(workspace.image);
    }
    return { ...workspace, imageUrl };
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