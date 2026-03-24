import { ArrowRight, TerminalWindow } from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 bg-black flex flex-col items-center justify-center overflow-hidden border-t border-border/40">
      
      {/* Absolute stark minimalism. No complex background. Just pure data vacuum. */}
      
      <div className="container px-6 relative z-10 mx-auto max-w-5xl reveal flex flex-col items-start w-full">
        
        <div className="flex items-center gap-3 font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase mb-8">
          <TerminalWindow size={20} />
          SYSTEM.READY
        </div>

        {/* Massive Stark Command */}
        <h2 className="font-heading text-[clamp(2.5rem,8vw,6rem)] font-light tracking-tighter text-white leading-[1] mb-16 select-none group w-full text-balance">
          INITIATE
          <br />
          <strong className="font-bold text-outline group-hover:text-cyan-500 transition-colors">
            DEPLOYMENT
          </strong>
          {/* Typographical Blinking Cursor */}
          <span className="inline-block w-[0.4em] h-[0.7em] bg-cyan-500 ml-4 animate-pulse align-baseline" />
        </h2>

        {/* Brutalist Button Array */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 w-full sm:w-auto mt-4">
          <Button
            size="lg"
            className="group relative h-16 rounded-none bg-cyan-500 hover:bg-white text-black px-8 sm:px-10 font-mono text-xs sm:text-sm tracking-widest transition-colors font-bold overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 w-full">
              EXECUTE_CMD
              <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="h-16 rounded-none border border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-muted-foreground hover:text-white px-8 sm:px-10 font-mono text-xs sm:text-sm tracking-[0.2em] transition-all w-full sm:w-auto"
          >
            VIEW_TELEMETRY
          </Button>
        </div>

      </div>

    </section>
  )
}
