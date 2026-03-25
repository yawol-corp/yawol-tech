import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { TipTapEditor } from "../components/TipTapEditor"
import { Plus, PencilSimple, Trash, Globe, EyeSlash } from "@phosphor-icons/react"

type Blog = {
  _id: Id<"blogs">
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  published: boolean
  tags: string[]
}

function BlogForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Blog>
  onSave: (data: Omit<Blog, "_id">) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "")
  const [content, setContent] = useState(initial?.content ?? "")
  const [author, setAuthor] = useState(initial?.author ?? "Yawol Technologies")
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "")
  const [published, setPublished] = useState(initial?.published ?? false)

  const autoSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!initial?.slug) setSlug(autoSlug(value))
  }

  const handleSave = () => {
    onSave({
      title,
      slug,
      excerpt,
      content,
      author,
      published,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="rounded-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Slug
          </label>
          <Input
            value={slug}
            onChange={(e) => setSlug(autoSlug(e.target.value))}
            placeholder="url-friendly-slug"
            className="rounded-none font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Author
          </label>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Short summary shown in post lists..."
            className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-ring resize-y"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Tags (comma separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="telecom, 5G, infrastructure"
            className="rounded-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm">
            Published (visible on site)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
          Content
        </label>
        <TipTapEditor
          content={content}
          onChange={setContent}
          placeholder="Write your blog post..."
        />
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-border">
        <Button variant="ghost" onClick={onCancel} className="rounded-none">
          Cancel
        </Button>
        <Button onClick={handleSave} className="rounded-none">
          Save Post
        </Button>
      </div>
    </div>
  )
}

export function BlogsPage() {
  const blogs = useQuery(api.blogs.listAll)
  const create = useMutation(api.blogs.create)
  const update = useMutation(api.blogs.update)
  const remove = useMutation(api.blogs.remove)
  const publish = useMutation(api.blogs.publish)
  const unpublish = useMutation(api.blogs.unpublish)

  const [editing, setEditing] = useState<Id<"blogs"> | "new" | null>(null)

  const handleSave = async (data: Omit<Blog, "_id">) => {
    if (editing === "new") {
      await create(data)
    } else if (editing) {
      await update({ blogId: editing, ...data })
    }
    setEditing(null)
  }

  const handleDelete = async (id: Id<"blogs">) => {
    if (confirm("Delete this post?")) await remove({ blogId: id })
  }

  const editingBlog = editing && editing !== "new"
    ? blogs?.find((b) => b._id === editing)
    : undefined

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Blog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {blogs?.length ?? 0} posts —{" "}
            {blogs?.filter((b) => b.published).length ?? 0} published
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="rounded-none gap-2">
          <Plus size={16} />
          New Post
        </Button>
      </div>

      {editing !== null && (
        <div className="mb-8 p-6 border border-border bg-background rounded-sm">
          <h2 className="font-heading font-semibold mb-5 text-sm tracking-wide">
            {editing === "new" ? "New Post" : "Edit Post"}
          </h2>
          <BlogForm
            initial={editingBlog}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <div className="space-y-2">
        {blogs?.map((b) => (
          <div
            key={b._id}
            className="flex items-center justify-between p-4 bg-background border border-border rounded-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{b.title}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                /{b.slug} &nbsp;·&nbsp; {b.author}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button
                onClick={() =>
                  b.published
                    ? unpublish({ blogId: b._id })
                    : publish({ blogId: b._id })
                }
                title={b.published ? "Unpublish" : "Publish"}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                {b.published ? (
                  <Globe size={16} className="text-green-500" />
                ) : (
                  <EyeSlash size={16} />
                )}
              </button>
              <button
                onClick={() => setEditing(b._id)}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <PencilSimple size={16} />
              </button>
              <button
                onClick={() => handleDelete(b._id)}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
        {blogs?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            NO_POSTS_FOUND — Click "New Post" to begin.
          </div>
        )}
      </div>
    </div>
  )
}
