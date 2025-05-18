// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";


// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//    return await ctx.db.query("workspaces").collect()

  
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


import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all workspaces for the current user
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

// Create Workspace
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

    return workspaceId;
  },
});


export const remove = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const workspace = await ctx.db.get(id);
    if (!workspace || workspace.userId !== userId) {
      throw new Error("You do not have permission to delete this workspace");
    }

    await ctx.db.delete(id);
  },
});
