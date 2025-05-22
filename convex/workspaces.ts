

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







// porcum enq GROKi versiayov hima, ashxatoxy naxordn er 

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    // Fetch image URLs for each workspace
    const workspacesWithUrls = await Promise.all(
      workspaces.map(async (ws) => {
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

/* Rest of the file (create, update, remove) remains unchanged */

/* ─────────────────────  CREATE  ──────────────────── */
export const create = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return ctx.db.insert("workspaces", {
      name: args.name,
      image: args.image,
      userId,
    });
  },
});

/* ─────────────────────  UPDATE  ──────────────────── */
export const update = mutation({
  args: {
    id: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, { id, name }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const ws = await ctx.db.get(id);
    if (!ws || ws.userId !== userId) throw new Error("Forbidden");

    await ctx.db.patch(id, { name });
    return id;
  },
});

/* ─────────────────────  DELETE  ──────────────────── */
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



// esi grokov avelacac 


export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    if (!workspace) return null;

    let imageUrl = null;
    if (workspace.image) {
      imageUrl = await ctx.storage.getUrl(workspace.image);
    }
    return { ...workspace, imageUrl };
  },
});

