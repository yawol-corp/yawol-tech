import * as React from "react"
import { LandingPage } from "./pages/landing-page"
import { HardwareStorePage } from "./pages/hardware-store-page"
import { Route, Switch } from "wouter"
import { AiChat } from "./pages/components/ai-chat"

export function App() {
  React.useEffect(() => {
    // Reveal animation observer (re-runs on path change in real SPA, but doing it globally here)
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        }
      })
    }
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 })
    
    // We use a mutation observer to catch dynamically rendered elements across routes
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(".reveal:not(.is-visible), .stagger-up:not(.is-visible)").forEach((el) => {
        observer.observe(el)
      })
    })
    
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    // Observe initial elements
    document.querySelectorAll(".reveal, .stagger-up").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground bg-blueprint dark overflow-x-hidden selection:bg-cyan-500/40 selection:text-white">
      
      {/* Global Architectural Borders */}
      <div className="fixed inset-y-0 left-4 md:left-12 lg:left-24 w-px bg-border/40 z-0 pointer-events-none mix-blend-overlay" />
      <div className="fixed inset-y-0 right-4 md:right-12 lg:right-24 w-px bg-border/40 z-0 pointer-events-none mix-blend-overlay" />
      
      {/* Global Laser Scan Line */}
      <div className="fixed inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)] z-0 pointer-events-none opacity-0 animate-[laser-scan_10s_ease-in-out_infinite]" />

      <div className="relative z-10 border-x border-border/40 mx-4 md:mx-12 lg:mx-24 min-h-screen bg-background shadow-2xl shadow-black/80 flex flex-col">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/requisition" component={HardwareStorePage} />
        </Switch>
      </div>

      <AiChat />
    </div>
  )
}
