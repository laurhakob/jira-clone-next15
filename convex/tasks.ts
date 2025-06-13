// import { mutation } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";

// export const create = mutation({
//   args: {
//     name: v.string(),
//     dueDate: v.optional(v.number()),
//     assignee: v.optional(v.id("members")),
//     status: v.string(),
//     projectId: v.id("projects"),
//     workspaceId: v.id("workspaces"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     // Check if the user is a member of the workspace
//     const member = await ctx.db
//       .query("members")
//       .filter((q) =>
//         q.and(
//           q.eq(q.field("workspaceId"), args.workspaceId),
//           q.eq(q.field("userId"), userId)
//         )
//       )
//       .first();
//     if (!member) throw new Error("Forbidden: You are not a member of this workspace");

//     // Check if the project belongs to the workspace
//     const project = await ctx.db.get(args.projectId);
//     if (!project || project.workspaceId !== args.workspaceId) {
//       throw new Error("Invalid project");
//     }

//     // Create the task
//     const taskId = await ctx.db.insert("tasks", {
//       name: args.name,
//       dueDate: args.dueDate,
//       assignee: args.assignee,
//       status: args.status,
//       projectId: args.projectId,
//       workspaceId: args.workspaceId,
//     });

//     return taskId;
//   },
// });



// update tasks for New response 
// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { getAuthUserId } from "@convex-dev/auth/server";

// export const create = mutation({
//   args: {
//     name: v.string(),
//     dueDate: v.optional(v.number()),
//     assignee: v.optional(v.id("members")),
//     status: v.string(),
//     projectId: v.id("projects"),
//     workspaceId: v.id("workspaces"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     // Check if the user is a member of the workspace
//     const member = await ctx.db
//       .query("members")
//       .filter((q) =>
//         q.and(
//           q.eq(q.field("workspaceId"), args.workspaceId),
//           q.eq(q.field("userId"), userId)
//         )
//       )
//       .first();
//     if (!member) throw new Error("Forbidden: You are not a member of this workspace");

//     // Check if the project belongs to the workspace
//     const project = await ctx.db.get(args.projectId);
//     if (!project || project.workspaceId !== args.workspaceId) {
//       throw new Error("Invalid project");
//     }

//     // Create the task
//     const taskId = await ctx.db.insert("tasks", {
//       name: args.name,
//       dueDate: args.dueDate,
//       assignee: args.assignee,
//       status: args.status,
//       projectId: args.projectId,
//       workspaceId: args.workspaceId,
//     });

//     return taskId;
//   },
// });

// export const getByProject = query({
//   args: { projectId: v.id("projects") },
//   handler: async (ctx, args) => {
//     const tasks = await ctx.db
//       .query("tasks")
//       .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
//       .collect();

//     const tasksWithAssignees = await Promise.all(
//       tasks.map(async (task) => {
//         if (task.assignee) {
//           const member = await ctx.db.get(task.assignee);
//           if (member) {
//             const user = await ctx.db.get(member.userId);
//             return {
//               ...task,
//               assigneeId: task.assignee,
//               assignee: user ? { name: user.name, image: user.image } : null
//             };
//           }
//         }
//         return { ...task, assigneeId: null, assignee: null };
//       })
//     );

//     return tasksWithAssignees;
//   },
// });



import { mutation, query } from "./_generated/server";
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