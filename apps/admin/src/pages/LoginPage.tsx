import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Eye, EyeSlash, Lock, EnvelopeSimple } from "@phosphor-icons/react"

export function LoginPage() {
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn("password", { email, password, flow })
    } catch {
      setError(
        flow === "signIn"
          ? "Invalid email or password. Please try again."
          : "Could not create account. Try a stronger password (8+ chars)."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background grid decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            <span className="font-heading text-base font-bold tracking-[0.3em] uppercase">
              YAWOL <span className="text-primary">CMS</span>
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground tracking-widest">
            ADMIN_ACCESS_PORTAL
          </p>
        </div>

        {/* Card */}
        <div className="border border-border bg-background/80 backdrop-blur-sm p-8 space-y-5">
          <div className="border-b border-border pb-4 mb-2">
            <h1 className="font-heading text-lg font-semibold">
              {flow === "signIn" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {flow === "signIn"
                ? "Restricted to authorized personnel only."
                : "Create your admin account to access the CMS."}
            </p>
          </div>

          {error && (
            <div className="text-xs font-mono text-destructive border border-destructive/30 bg-destructive/5 px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yawol.com"
                  className="rounded-none pl-9 font-mono text-sm"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-none pl-9 pr-10 font-mono text-sm"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-none tracking-widest font-mono text-sm"
            >
              {loading
                ? "PROCESSING..."
                : flow === "signIn"
                  ? "SIGN_IN()"
                  : "CREATE_ACCOUNT()"}
            </Button>
          </form>

          <div className="pt-4 border-t border-border text-center">
            <button
              type="button"
              onClick={() => { setFlow(flow === "signIn" ? "signUp" : "signIn"); setError(null) }}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest"
            >
              {flow === "signIn" ? "No account? CREATE_ACCOUNT" : "Have an account? SIGN_IN"}
            </button>
          </div>
        </div>

        <p className="text-center text-[0.6rem] font-mono text-muted-foreground/50 mt-4 tracking-widest">
          YAWOL TECHNOLOGIES — INTERNAL SYSTEM
        </p>
      </div>
    </div>
  )
}
