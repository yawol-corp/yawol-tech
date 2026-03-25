import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"


export default defineSchema({
  ...authTables,

  // Products catalog (for the hardware store)
  products: defineTable({
    name: v.string(),
    description: v.string(), // TipTap JSON string
    category: v.string(),
    price_inr: v.number(), // In paise (₹1 = 100 paise) for precision
    images: v.array(v.union(v.id("_storage"), v.string())),
    specs: v.record(v.string(), v.string()), // key-value tech specs
    active: v.boolean(), // Visible on storefront
    order: v.number(), // Manual sort position
  })
    .index("by_category", ["category"])
    .index("by_active", ["active"])
    .index("by_order", ["order"]),

  // Blog articles
  blogs: defineTable({
    title: v.string(),
    slug: v.string(), // must be unique
    content: v.string(), // TipTap JSON string
    excerpt: v.string(),
    cover_image: v.optional(v.id("_storage")),
    author: v.string(),
    published: v.boolean(),
    publishedAt: v.optional(v.number()), // Unix timestamp
    tags: v.array(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_published_at", ["publishedAt"])
    .searchIndex("search_title", { searchField: "title" }),

  // AI prompt configuration for connected AI features
  ai_prompts: defineTable({
    name: v.string(), // Unique identifier like "site_assistant"
    system_message: v.string(), // The actual LLM system prompt
    temperature: v.number(), // 0.0–2.0
    model: v.string(), // e.g. "gpt-4o", "gemini-2.0"
    active: v.boolean(),
    tags: v.array(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_active", ["active"]),

  // Global site configuration key-value store
  site_settings: defineTable({
    key: v.string(), // Must be unique (e.g. "contact_phone")
    value: v.string(),
    label: v.string(), // Human-readable description
  }).index("by_key", ["key"]),

  // Admin users table
  users: defineTable({
    tokenIdentifier: v.optional(v.string()), // from Convex auth
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"))),
  }).index("by_token", ["tokenIdentifier"]),
})
