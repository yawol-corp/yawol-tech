import { MapPin } from "@phosphor-icons/react"
import { SectionHeader } from "../section-header"

const LOCATIONS = [
  {
    id: "LOC_01",
    city: "NEW DELHI",
    type: "HQ_COMMAND",
    cords: "LAT: 28.6139° N | LNG: 77.2090° E",
    ip: "192.168.1.1:8080",
    status: "ONLINE",
    desc: "Primary command center handling global network architecture, executive strategy, and tier 3 engineering support."
  },
  {
    id: "LOC_02",
    city: "IMPHAL",
    type: "FIELD_OPS",
    cords: "LAT: 24.8170° N | LNG: 93.9368° E",
    ip: "10.0.0.45:443",
    status: "ONLINE",
    desc: "Regional field operations hub, hardware distribution center, and tactical deployment coordination."
  }
]

export function LocationsSection() {
  return (
    <section id="locations" className="py-24 md:py-32 relative bg-background">
      <SectionHeader 
        label="NOC_LOCATIONS" 
        title={<>COMMAND <br /> CENTERS.</>} 
        description="Physical operational hubs coordinating digital infrastructure deployment globally."
        className="px-6 relative z-20"
      />

      <div className="mt-16 mx-4 md:mx-12 lg:mx-24 border border-border/40 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40 relative z-10 reveal">
        
        {LOCATIONS.map((loc) => (
          <div key={loc.id} className="relative p-6 sm:p-8 md:p-12 lg:p-16 group hover:bg-black/40 transition-colors flex flex-col items-start w-full">
            
            {/* Header Flex Row (Type + Status) */}
            <div className="w-full flex items-center justify-between gap-4 mb-4">
              <div className="font-mono text-cyan-500/80 text-[0.65rem] tracking-[0.3em] uppercase">
                 // {loc.type}
              </div>
              
              {/* Blinking Status Indicator */}
              <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-cyan-400">
                 {loc.status}
                 <div className="size-2 bg-cyan-400 rounded-none animate-pulse" />
              </div>
            </div>

            <h3 className="font-heading text-[clamp(2rem,6vw,4.5rem)] font-light tracking-tighter leading-none mb-8 group-hover:text-white transition-colors truncate w-full">
               {loc.city}
            </h3>

            {/* Brutalist Data Table */}
            <div className="space-y-4 font-mono text-sm border-t border-b border-border/30 py-6 mb-8 group-hover:border-cyan-500/30 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-[0.6rem] text-muted-foreground tracking-widest">COORDINATES</span>
                <span className="text-cyan-400 group-hover:text-white transition-colors">{loc.cords}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.6rem] text-muted-foreground tracking-widest">IP_GATEWAY</span>
                <span className="text-cyan-400 group-hover:text-white transition-colors">{loc.ip}</span>
              </div>
            </div>

            <p className="font-mono text-[0.75rem] text-muted-foreground leading-relaxed max-w-sm">
              {loc.desc}
            </p>

            <div className="mt-10 inline-flex items-center gap-2 border border-border/40 px-4 py-2 hover:bg-white/5 transition-colors">
               <MapPin size={16} className="text-cyan-400" />
               <span className="font-mono text-xs tracking-widest uppercase">Plot Route</span>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}
