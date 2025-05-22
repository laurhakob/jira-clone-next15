
// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const saveImageToWorkspace = mutation({
//   args: {
//     workspaceId: v.id("workspaces"),
//     storageId: v.id("_storage"),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.patch(args.workspaceId, {
//       image: args.storageId,
//     });
//   },
// });

// export const generateUploadUrl = mutation({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.storage.generateUploadUrl();
//   },
// });


// es minchev GROKy ashxatoxn er


// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const saveImageToWorkspace = mutation({
//   args: {
//     workspaceId: v.id("workspaces"),
//     storageId: v.id("_storage"),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.patch(args.workspaceId, {
//       image: args.storageId,
//     });
//   },
// });


// export const generateUploadUrl = mutation({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.storage.generateUploadUrl();
//   },
// });



// porcum enq GROKi versiayov hima, ashxatoxy naxordn er 

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveImageToWorkspace = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      image: args.storageId,
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// New query to get the image URL
export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});