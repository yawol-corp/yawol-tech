import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// --- Queries ---

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db
      .query("blogs")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(50)
    return Promise.all(
      blogs.map(async (b) => {
        const coverUrl = b.cover_image
          ? await ctx.storage.getUrl(b.cover_image)
          : null
        return { ...b, coverUrl }
      })
    )
  },
})

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").take(200)
  },
})

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique()
    if (!blog) return null
    const coverUrl = blog.cover_image
      ? await ctx.storage.getUrl(blog.cover_image)
      : null
    return { ...blog, coverUrl }
  },
})

export const getById = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.blogId)
  },
})

// --- Mutations ---

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    cover_image: v.optional(v.id("_storage")),
    author: v.string(),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blogs", args)
  },
})

export const update = mutation({
  args: {
    blogId: v.id("blogs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    cover_image: v.optional(v.id("_storage")),
    author: v.optional(v.string()),
    published: v.optional(v.boolean()),
    publishedAt: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { blogId, ...fields }) => {
    await ctx.db.patch(blogId, fields)
  },
})

export const publish = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.blogId, {
      published: true,
      publishedAt: Date.now(),
    })
  },
})

export const unpublish = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.blogId, { published: false })
  },
})

export const remove = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.blogId)
  },
})
