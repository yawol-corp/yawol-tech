import * as React from "react"
import { ArrowRight, Crosshair } from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { RichTextRenderer } from "../rich-text"

const CMS_CONTENT = JSON.stringify({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Engineering infrastructure for high-performance " },
        { type: "text", marks: [{ type: "bold" }], text: "telecommunication" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "bold" }], text: "signal control" },
        { type: "text", text: ", and " },
        { type: "text", marks: [{ type: "bold" }], text: "hardware deployment" },
        { type: "text", text: " in demanding environments." }
      ]
    }
  ]
})

export function HeroSection() {
  const container = React.useRef<HTMLElement>(null)

  useGSAP(() => {
    // Initial hardware boot state
    gsap.set(".hero-grid", { opacity: 0, scaleX: 0 })
    gsap.set(".hero-target", { opacity: 0, scale: 0.5, rotation: -90 })
    gsap.set(".hero-headline", { y: 40, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" })
    gsap.set(".hero-sub", { y: 20, opacity: 0 })
    gsap.set(".hero-btn", { opacity: 0, x: -20 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // 1. Grid matrix initialization
    tl.to(".hero-grid", { scaleX: 1, opacity: 1, duration: 1.2, stagger: 0.15, transformOrigin: "left center" })
      
    // 2. Target lock acquisition
      .to(".hero-target", { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.8")

    // 3. Headline decryption/reveal
      .to(".hero-headline", { 
        y: 0, 
        opacity: 1, 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
        duration: 1.5,
      }, "-=0.6")

    // 4. Subsystem initialization (text blocks)
      .to(".hero-sub", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=1.0")

    // 5. Command interface ready (buttons)
      .to(".hero-btn", { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.7")

  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-[95vh] flex flex-col justify-end pb-16 pt-32 lg:pt-48 overflow-hidden z-10 bg-background/50">
      
      {/* Brutalist Grid Lines - specific to this massive section */}
      <div className="hero-grid absolute top-1/4 inset-x-0 h-px bg-border/40 z-0 pointer-events-none" />
      <div className="hero-grid absolute top-2/4 inset-x-0 h-px bg-border/40 z-0 pointer-events-none" />
      <div className="hero-grid absolute top-3/4 inset-x-0 h-px bg-border/40 z-0 pointer-events-none" />

      {/* Decorative Target Node */}
      <div className="hero-target hidden md:flex absolute top-1/4 right-[5%] lg:right-[10%] text-cyan-500/30 flex-col items-center justify-center animate-pulse z-0 hidden">
        <Crosshair className="size-[80px] lg:size-[120px]" weight="thin" />
        <span className="font-mono text-[0.45rem] lg:text-[0.55rem] tracking-[0.3em] mt-2">OP_COORD: [X:104 Y:992]</span>
      </div>

      <div className="container relative mx-auto px-6 reveal is-visible flex flex-col items-start w-full">
        
        {/* Massive Headline jammed left, text scale breaks normally safe boundaries */}
        <h1 className="hero-headline mb-8 font-heading text-[clamp(2.5rem,9vw,8rem)] font-light leading-[0.85] tracking-tighter text-left w-full max-w-[100vw] overflow-wrap-anywhere break-words hover-glitch transition-colors selection:bg-cyan-500 selection:text-black">
          <span className="opacity-40 select-none">// </span>RELIABLE
          <br />
          <strong className="font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            TECHNOLOGY.
          </strong>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-10 mt-12 md:mt-24 border-t border-border/40 pt-10 relative">
          
          {/* Intersection node on the divider line */}
          <div className="absolute top-0 left-0 -translate-y-[2px] w-2 h-2 bg-cyan-400" />

          {/* Technical Data Subtitle block */}
          <div className="max-w-xl font-mono">
            <div className="hero-sub inline-flex items-center gap-3 mb-4 rounded-none border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-cyan-400">
              <span className="flex size-1.5 animate-[pulse-dot_1.5s_ease_infinite] rounded-none bg-cyan-400" />
              STATUS: NOMINAL
            </div>
            
            <div className="hero-sub">
              <RichTextRenderer content={CMS_CONTENT} />
            </div>
          </div>

          {/* Brutalist Command Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-0 w-full md:w-auto self-start md:self-end border border-cyan-500/40 bg-black/50 backdrop-blur-md">
            <Button
              size="lg"
              className="hero-btn group relative overflow-hidden rounded-none bg-transparent hover:bg-cyan-500/20 text-cyan-400 px-4 sm:px-8 py-5 sm:py-7 text-xs font-mono tracking-widest transition-all h-full shadow-[inset_0_0_20px_rgba(34,211,238,0)] hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]"
            >
              <span className="relative flex items-center gap-3 min-w-[160px] justify-center">
                INITIATE_PROTOCOL
                <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            {/* Divider between buttons */}
            <div className="w-px bg-cyan-500/40 hidden sm:block" />
            <div className="h-px bg-cyan-500/40 sm:hidden block" />

            <Button
              variant="ghost"
              size="lg"
              className="hero-btn rounded-none bg-transparent hover:bg-white/5 text-muted-foreground hover:text-white px-4 sm:px-8 py-5 sm:py-7 text-xs font-mono tracking-widest transition-all h-full"
            >
              READ.DOCS()
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  )
}
