import { Route, Switch, Link, useLocation } from "wouter"
import { useConvexAuth } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
import {
  Package,
  Article,
  Robot,
  Gear,
  ImagesSquare,
  SquaresFour,
  ArrowSquareOut,
  SignOut,
} from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"
import { ProductsPage } from "./pages/ProductsPage"
import { BlogsPage } from "./pages/BlogsPage"
import { AIPromptsPage } from "./pages/AIPromptsPage"
import { SiteSettingsPage } from "./pages/SiteSettingsPage"
import { MediaLibraryPage } from "./pages/MediaLibraryPage"
import { DashboardPage } from "./pages/DashboardPage"
import { LoginPage } from "./pages/LoginPage"

const navItems = [
  { href: "/", label: "Dashboard", icon: SquaresFour },
  { href: "/products", label: "Products", icon: Package },
  { href: "/blogs", label: "Blog", icon: Article },
  { href: "/ai-prompts", label: "AI Prompts", icon: Robot },
  { href: "/media", label: "Media Library", icon: ImagesSquare },
  { href: "/settings", label: "Settings", icon: Gear },
]

function Sidebar() {
  const [location] = useLocation()
  const { signOut } = useAuthActions()
  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand */}
      <div className="h-16 border-b border-border flex items-center px-6 gap-3">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="font-heading text-sm font-bold tracking-[0.2em] uppercase">
          YAWOL <span className="text-primary">CMS</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? location === "/" : location.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all group",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                size={18}
                weight={active ? "fill" : "regular"}
                className="shrink-0"
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer Links */}
      <div className="border-t border-border p-3 space-y-0.5">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <ArrowSquareOut size={18} />
          View Site
        </a>
        <a
          href="https://dashboard.convex.dev/d/modest-mongoose-0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <ArrowSquareOut size={18} />
          Convex Dashboard
        </a>
        <button
          onClick={() => void signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <SignOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export function App() {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-muted-foreground tracking-widest animate-pulse">
          INITIALIZING_SESSION...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={ProductsPage} />
          <Route path="/blogs" component={BlogsPage} />
          <Route path="/blogs/:id" component={BlogsPage} />
          <Route path="/ai-prompts" component={AIPromptsPage} />
          <Route path="/media" component={MediaLibraryPage} />
          <Route path="/settings" component={SiteSettingsPage} />
        </Switch>
      </main>
    </div>
  )
}
