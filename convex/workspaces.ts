import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";


export const get = query({
  args: {},
  handler: async (ctx) => {
   return await ctx.db.query("workspaces").collect()

  
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
