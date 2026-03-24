import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Id } from "./_generated/dataModel"

// --- Queries ---

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("asc")
      .take(100)
    // Resolve image URLs
    return Promise.all(
      products.map(async (p) => {
        const imageUrls = await Promise.all(
          p.images.map(async (img) => {
            if (typeof img === "string" && !img.match(/^[0-9a-z]{20,40}$/i)) {
              return img
            }
            try {
              return await ctx.storage.getUrl(img as Id<"_storage">)
            } catch (e) {
              return null
            }
          })
        )
        return { ...p, imageUrls: imageUrls.filter(Boolean) as string[] }
      })
    )
  },
})

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").order("asc").take(200)
  },
})

export const getById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId)
    if (!product) return null
    const imageUrls = await Promise.all(
      product.images.map(async (img) => {
        if (typeof img === "string" && !img.match(/^[0-9a-z]{20,40}$/i)) {
          return img
        }
        try {
          return await ctx.storage.getUrl(img as Id<"_storage">)
        } catch (e) {
          return null
        }
      })
    )
    return { ...product, imageUrls: imageUrls.filter(Boolean) as string[] }
  },
})

// --- Mutations ---

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    price_inr: v.number(),
    images: v.array(v.id("_storage")),
    specs: v.record(v.string(), v.string()),
    active: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args)
  },
})

export const update = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    price_inr: v.optional(v.number()),
    images: v.optional(v.array(v.id("_storage"))),
    specs: v.optional(v.record(v.string(), v.string())),
    active: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { productId, ...fields }) => {
    await ctx.db.patch(productId, fields)
  },
})

export const remove = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId)
  },
})

export const toggleActive = mutation({
  args: { productId: v.id("products"), active: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, { active: args.active })
  },
})
