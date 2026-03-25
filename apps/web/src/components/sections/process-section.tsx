import { SectionHeader } from "../section-header"
import { Users, Crosshair, Wrench, ShieldCheck } from "@phosphor-icons/react"

const PHASES = [
  {
    step: "01",
    cmd: "EXEC_CONSULT()",
    title: "STRATEGIC ALIGNMENT",
    desc: "Initial requirement gathering and feasibility analysis.",
    icon: Users,
    coordinates: "X:10 Y:22"
  },
  {
    step: "02",
    cmd: "INIT_DESIGN()",
    title: "ARCHITECTURE PLANNING",
    desc: "Rigorous RF modeling and structural blueprint generation.",
    icon: Crosshair,
    coordinates: "X:45 Y:66"
  },
  {
    step: "03",
    cmd: "RUN_DEPLOY()",
    title: "PHYSICAL INSTALLATION",
    desc: "Hardware deployment by certified engineering teams.",
    icon: Wrench,
    coordinates: "X:12 Y:88"
  },
  {
    step: "04",
    cmd: "HALT_TEST()",
    title: "VALIDATION & HANDOVER",
    desc: "Throughput testing, compliance checks, and SLA activation.",
    icon: ShieldCheck,
    coordinates: "X:99 Y:01"
  }
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 relative border-t border-border/40 overflow-hidden bg-black/60">
      
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-blueprint opacity-50 z-0 pointer-events-none" />

      <SectionHeader 
        label="PIPELINE_FLOW" 
        title={<>DEPLOYMENT <br /> PROTOCOLS.</>} 
        description="Our standardized sequential methodology guarantees exact hardware integration on the first run."
        className="px-6 relative z-20"
      />

      <div className="relative mt-12 md:mt-24 px-6 max-w-7xl mx-auto z-10 stagger-up reveal">
        {/* The Circuit Wire (Staggered Right Angles) */}
        {/* Pushed top-0 down to top-10 so it doesn't intersect the SectionHeader */}
        <div className="hidden lg:block absolute left-[15%] top-10 bottom-12 w-px bg-border/40 z-0">
           <div className="absolute top-0 bottom-0 left-0 w-px bg-cyan-500/50 animate-[laser-scan_6s_linear_infinite]" />
        </div>

        <div className="space-y-4 lg:space-y-0">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon
            // Calculate a staggered layout for desktop
            const isEven = idx % 2 === 0
            
            return (
              <div 
                key={phase.step}
                className={`reveal-child relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${
                  isEven ? 'lg:justify-start lg:pl-[15%]' : 'lg:justify-end lg:pr-[15%]'
                }`}
              >
                
                {/* Circuit Node connecting to wire */}
                <div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${
                  isEven ? 'left-[15%] -translate-x-1/2' : 'right-[85%] translate-x-1/2' // Wait, the wire is at left 15%. So odd items (which are offset) need a horizontal line crossing back to 15%.
                } size-3 bg-background border-2 border-cyan-500 z-10 flex items-center justify-center`}>
                  <div className="size-1 bg-cyan-400 animate-pulse" />
                </div>

                {/* Horizontal branch line for odd items (connecting back to main wire at 15%) */}
                {!isEven && (
                  <div className="hidden lg:block absolute top-1/2 right-[85%] w-[70%] h-px bg-border/40 -z-10" />
                )}
                {isEven && (
                   <div className="hidden lg:block absolute top-1/2 left-[15%] w-[10%] h-px bg-border/40 -z-10" />
                )}

                {/* Phase Box (Brutalist Card) */}
                <div className={`w-full lg:w-[45%] border border-border/50 bg-background/80 backdrop-blur-md p-8 group hover:-translate-y-1 hover:border-cyan-500/50 transition-all ${isEven ? 'lg:ml-12' : ''}`}>
                  
                  {/* Internal Grid Header */}
                  <div className="flex items-start justify-between border-b border-border/30 pb-4 mb-6">
                    <div className="font-mono text-cyan-400 text-[0.65rem] tracking-[0.2em] flex flex-col gap-1">
                      <span>[{phase.step}]</span>
                      <span className="text-muted-foreground">{phase.cmd}</span>
                    </div>
                    <div className="p-2 border border-border/30 bg-black/40 group-hover:bg-cyan-500/10 transition-colors">
                      <Icon size={20} className="text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>

                  <h4 className="font-heading text-xl tracking-wide uppercase mb-3">
                    {phase.title}
                  </h4>
                  <p className="font-mono text-[0.75rem] text-muted-foreground leading-relaxed">
                    {phase.desc}
                  </p>

                  <div className="mt-8 pt-4 border-t border-border/30 text-right">
                    <span className="font-mono text-[0.5rem] tracking-widest text-border/60 group-hover:text-cyan-500/40 transition-colors">
                      LOC: {phase.coordinates}
                    </span>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
