import { 
  Broadcast, 
  ShareNetwork, 
  Cpu, 
  Buildings, 
  Wrench, 
  ShieldCheck 
} from "@phosphor-icons/react"

const DOMAINS = [
  { id: "A1", label: "Telecom Structure", icon: Buildings },
  { id: "B2", label: "Signal Engineering", icon: ShareNetwork },
  { id: "C3", label: "WiFi Extension", icon: Broadcast },
  { id: "D4", label: "Hardware Supply", icon: Cpu },
  { id: "E5", label: "Field Installation", icon: Wrench },
  { id: "F6", label: "Active Maintenance", icon: ShieldCheck },
]

export function TrustBar() {
  return (
    <section className="border-b border-border/40 relative z-10 bg-black/20">
      
      {/* 1px Strict Matrix Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border/40 stagger-up reveal">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon
          return (
            <div 
              key={domain.id} 
              className="reveal-child group relative p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-white-[0.02] transition-colors overflow-hidden"
            >
              {/* Corner Grid Nodes */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-border/50 group-hover:bg-cyan-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-border/50 group-hover:bg-cyan-500 transition-colors" />
              
              {/* Tech ID Tag */}
              <div className="absolute top-2 left-2 text-[0.55rem] font-mono text-muted-foreground/50 group-hover:text-cyan-500/50 transition-colors">
                [{domain.id}]
              </div>

              {/* Icon Matrix Wrapper */}
              <div className="relative z-10 p-4 border border-border/40 bg-background/50 group-hover:border-cyan-500/40 transition-colors">
                <Icon size={24} weight="duotone" className="text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </div>
              
              {/* Label */}
              <span className="font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground group-hover:text-white uppercase transition-colors">
                {domain.label}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
