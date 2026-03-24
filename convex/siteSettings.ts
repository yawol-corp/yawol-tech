import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("site_settings").order("asc").take(200)
  },
})

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique()
  },
})

export const upsert = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique()
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value })
    } else {
      await ctx.db.insert("site_settings", args)
    }
  },
})

export const remove = mutation({
  args: { settingId: v.id("site_settings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.settingId)
  },
})
