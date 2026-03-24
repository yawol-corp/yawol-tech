import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Package, Article, Robot, Gear } from "@phosphor-icons/react"

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string
  value: number | string
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="bg-background border border-border p-6 rounded-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-mono mb-2">
            {label}
          </p>
          <p className="text-3xl font-heading font-bold">{value}</p>
        </div>
        <div className={`p-2 rounded-sm ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const products = useQuery(api.products.listAll)
  const blogs = useQuery(api.blogs.listAll)
  const prompts = useQuery(api.aiPrompts.listAll)
  const settings = useQuery(api.siteSettings.getAll)

  const activeProducts = products?.filter((p) => p.active).length ?? 0

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of the Yawol Technologies content system
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total Products"
          value={products?.length ?? "—"}
          icon={Package}
          color="bg-cyan-500/10 text-cyan-500"
        />
        <StatCard
          label="Active"
          value={activeProducts}
          icon={Package}
          color="bg-green-500/10 text-green-500"
        />
        <StatCard
          label="Blog Posts"
          value={blogs?.length ?? "—"}
          icon={Article}
          color="bg-purple-500/10 text-purple-500"
        />
        <StatCard
          label="AI Prompts"
          value={prompts?.length ?? "—"}
          icon={Robot}
          color="bg-orange-500/10 text-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background border border-border p-6 rounded-sm">
          <h2 className="font-heading font-semibold mb-3 text-sm tracking-wide">
            Recent Products
          </h2>
          {products && products.length > 0 ? (
            <ul className="space-y-2">
              {products.slice(0, 5).map((p) => (
                <li key={p._id} className="flex justify-between items-center text-sm">
                  <span className="text-foreground truncate">{p.name}</span>
                  <span
                    className={`text-[0.65rem] font-mono px-2 py-0.5 rounded-full ${p.active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}
                  >
                    {p.active ? "LIVE" : "DRAFT"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground font-mono">No products yet.</p>
          )}
        </div>

        <div className="bg-background border border-border p-6 rounded-sm">
          <h2 className="font-heading font-semibold mb-3 text-sm tracking-wide">
            Recent Blog Posts
          </h2>
          {blogs && blogs.length > 0 ? (
            <ul className="space-y-2">
              {blogs.slice(0, 5).map((b) => (
                <li key={b._id} className="flex justify-between items-center text-sm">
                  <span className="text-foreground truncate">{b.title}</span>
                  <span
                    className={`text-[0.65rem] font-mono px-2 py-0.5 rounded-full ${b.published ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}
                  >
                    {b.published ? "LIVE" : "DRAFT"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground font-mono">No posts yet.</p>
          )}
        </div>
      </div>

      <div className="mt-4 bg-background border border-border p-6 rounded-sm">
        <div className="flex items-center gap-2 mb-3">
          <Gear size={16} className="text-muted-foreground" />
          <h2 className="font-heading font-semibold text-sm tracking-wide">
            Site Settings
          </h2>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {settings?.length ?? 0} settings configured. &nbsp;
          <a href="/settings" className="text-primary underline underline-offset-2">
            Manage →
          </a>
        </p>
      </div>
    </div>
  )
}
