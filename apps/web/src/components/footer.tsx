import * as React from "react"
import { GithubLogo, TwitterLogo, LinkedinLogo, Crosshair } from "@phosphor-icons/react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Static fake coords for the terminal feel
  const [time, setTime] = React.useState("00:00:00")

  React.useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date()
      setTime(`${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}:${d.getUTCSeconds().toString().padStart(2, '0')} UTC`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden pt-16 mt-24">
      {/* Brutalist 1px Grid Container */}
      <div className="container mx-auto px-6 relative z-10 mb-20">
        
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border/40 pb-6 mb-8 md:pb-8 gap-8">
          <div className="max-w-md">
            <h2 className="font-heading text-2xl tracking-tighter mb-4 text-white">YAWOL TECHNOLOGIES</h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed uppercase tracking-widest">
              Advanced Telecommunication <br />
              Electronic Systems • Signal Engineering
            </p>
          </div>
          <div className="flex items-center gap-4 text-cyan-500/60 font-mono text-[0.65rem] tracking-[0.2em]">
            <Crosshair size={16} className="animate-[pulse-dot_2s_infinite]" />
            <span>SYS_TIME: {time}</span>
          </div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-0 md:divide-x divide-border/20 font-mono relative">
          
          <div className="flex flex-col gap-6 md:px-8 first:px-0">
            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">Services</h4>
            <div className="flex flex-col gap-3">
              {['Telecommunication', 'Signal Engineering', 'WiFi Extension', 'Maintenance'].map((link) => (
                <a key={link} href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:px-8">
            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">Offices</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                New Delhi
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                Imphal
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:px-8">
            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">Company</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                Careers
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:px-8">
             <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">Legal</h4>
             <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors inline-block relative group w-fit">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Socials */}
      <div className="relative z-10 border-t border-border/20 bg-background/80 backdrop-blur-md py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            © {currentYear} Yawol Technologies. All rights reserved.
          </span>
          
          <div className="flex gap-6 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">
              <GithubLogo size={18} weight="fill" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">
              <TwitterLogo size={18} weight="fill" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">
              <LinkedinLogo size={18} weight="fill" />
            </a>
          </div>
        </div>
      </div>

      {/* Massive Watermark Typography */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-0 flex items-end justify-center translate-y-[28%]">
        <span className="font-heading font-bold text-[clamp(8rem,24vw,28rem)] text-white/[0.02] whitespace-nowrap select-none tracking-tighter">
          YAWOL.SYS
        </span>
      </div>

    </footer>
  )
}
