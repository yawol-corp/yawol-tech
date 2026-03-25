import * as React from "react"
import { DotsNine, X } from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Link } from "wouter"

export function Nav() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "[01_SERVICES]", href: "/#services" },
    { name: "[02_PROCESS]", href: "/#process" },
    { name: "[03_LOCATIONS]", href: "/#locations" },
    { name: "[04_CONTACT]", href: "/#contact" },
    { name: "[05_STORE]", href: "/requisition" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "border-border/60 bg-background/90 backdrop-blur-md"
          : "border-border/30 bg-transparent"
      )}
      style={{
        left: "0",
        right: "0",
      }}
    >
      <div className="mx-4 md:mx-12 lg:mx-24 border-x border-border/40 grid grid-cols-12 h-16 relative">
        <div className="absolute top-full -left-[3px] w-1.5 h-1.5 bg-border/80" />
        <div className="absolute top-full -right-[3px] w-1.5 h-1.5 bg-border/80" />

        <div className="col-span-8 md:col-span-3 border-r border-border/40 flex items-center px-6">
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-[0.3em] uppercase text-white hover:text-cyan-400 transition-colors"
          >
            YAWOL<span className="text-cyan-500">_</span>
          </Link>
        </div>

        <div className="hidden md:flex col-span-6 lg:col-span-7 items-center justify-around border-r border-border/40 px-4">
          {navLinks.map((link) => {
            const isRoute = link.href === "/requisition";
            const LinkComponent = isRoute ? Link : "a";
            return (
              <LinkComponent
                key={link.name}
                href={link.href}
                className="text-[0.65rem] font-mono tracking-widest text-muted-foreground hover:text-cyan-400 transition-colors relative group"
              >
                <span className="opacity-0 group-hover:opacity-100 absolute -left-3 text-cyan-500">&gt;</span>
                {link.name}
              </LinkComponent>
            );
          })}
        </div>

        <div className="hidden md:flex col-span-3 lg:col-span-2 items-center justify-center p-0">
          <Link href="/requisition" className="w-full h-full">
            <Button
              className="w-full h-full rounded-none bg-transparent hover:bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono tracking-widest border-0 p-0 hover:text-cyan-300 flex items-center justify-center gap-2 group transition-all"
            >
              SYS.CONNECT()
              <span className="inline-block w-1.5 h-3 bg-cyan-400 group-hover:animate-pulse" />
            </Button>
          </Link>
        </div>

        <div className="md:hidden col-span-4 flex items-center justify-end px-6">
          <button
            className="text-foreground hover:text-cyan-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <DotsNine size={28} weight="bold" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-16 border-x border-b border-border/40 bg-background/95 backdrop-blur-xl md:hidden font-mono divide-y divide-border/40">
          {navLinks.map((link) => {
            const isRoute = link.href === "/requisition";
            const LinkComponent = isRoute ? Link : "a";
            return (
              <LinkComponent
                key={link.name}
                href={link.href}
                className="block p-6 text-sm tracking-widest text-muted-foreground hover:text-cyan-400 hover:bg-white/5 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </LinkComponent>
            );
          })}
          <div className="p-6">
            <Link href="/requisition" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full rounded-none bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 h-12 text-xs tracking-widest hover:bg-cyan-500 hover:text-black">
                SYS.CONNECT()
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
