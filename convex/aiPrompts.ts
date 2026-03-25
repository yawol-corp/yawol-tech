import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ai_prompts").order("asc").take(100)
  },
})

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("ai_prompts")
      .withIndex("by_active", (q) => q.eq("active", true))
      .take(50)
  },
})

export const getByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ai_prompts")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique()
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    system_message: v.string(),
    temperature: v.number(),
    model: v.string(),
    active: v.boolean(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ai_prompts", args)
  },
})

export const update = mutation({
  args: {
    promptId: v.id("ai_prompts"),
    name: v.optional(v.string()),
    system_message: v.optional(v.string()),
    temperature: v.optional(v.number()),
    model: v.optional(v.string()),
    active: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { promptId, ...fields }) => {
    await ctx.db.patch(promptId, fields)
  },
})

export const toggleActive = mutation({
  args: { promptId: v.id("ai_prompts"), active: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.promptId, { active: args.active })
  },
})

export const remove = mutation({
  args: { promptId: v.id("ai_prompts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.promptId)
  },
})
