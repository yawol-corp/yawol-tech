import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Generate a short-lived upload URL for the client to PUT a file directly to Convex Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

// Get a public URL for a stored file
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})

// Get metadata for a stored file
export const getMetadata = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.db.system.get("_storage", args.storageId)
  },
})

// Delete a file from storage
export const deleteFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId)
  },
})

// List all stored files (for the media library)
export const listFiles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.system.query("_storage").order("desc").take(200)
  },
})
