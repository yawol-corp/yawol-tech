import { SectionHeader } from "../section-header"
import { 
  Broadcast, 
  ShareNetwork, 
  ShieldCheck
} from "@phosphor-icons/react"

const SERVICES = [
  {
    id: "01",
    title: "TELECOM INSTALLATION",
    icon: Buildings,
    desc: "Deployment of cellular macro sites, rooftop arrays, and small cell systems. Full civil and electrical integration.",
    data: [
      { label: "LATENCY_TOLERANCE", val: "<1ms" },
      { label: "THROUGHPUT_MAX", val: "100Gbps" },
      { label: "TEMP_RATING", val: "-40C to +85C" }
    ]
  },
  {
    id: "02",
    title: "SIGNAL ENGINEERING",
    icon: ShareNetwork,
    desc: "RF planning, interference mitigation, and propagation modeling for flawless connectivity in high-density urban zones.",
    data: [
      { label: "FREQ_RANGE", val: "700MHz-39GHz" },
      { label: "COVERAGE_RADIUS", val: "50km" },
      { label: "SN_RATIO", val: ">30dB" }
    ]
  },
  {
    id: "03",
    title: "WIFI EXPANSION",
    icon: Broadcast,
    desc: "High-capacity point-to-point and mesh networks for enterprise campuses and industrial facilities.",
    data: [
      { label: "BAND_CAPACITY", val: "Wi-Fi 7 (802.11be)" },
      { label: "CONCURRENT_USERS", val: "10,000+" },
      { label: "UPLINK_BONDING", val: "Active" }
    ]
  },
  {
    id: "04",
    title: "ACTIVE MAINTENANCE",
    icon: ShieldCheck,
    desc: "Continuous monitoring, predictive failure analysis, and immediate hardware replacement via automated logic.",
    data: [
      { label: "UPTIME_SLA", val: "99.999%" },
      { label: "RESPONSE_TIME", val: "< 15m" },
      { label: "DEFENSE_MATRIX", val: "SOC2 Type II" }
    ]
  }
]

// Note: Re-importing icon locally to fix TS error above since Buildings wasn't imported.
import { Buildings } from "@phosphor-icons/react"

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <SectionHeader 
        label="CORE_SERVICES" 
        title={<>INFRASTRUCTURE <br /> ARCHITECTURE.</>} 
        description="Comprehensive engineering across the complete telecommunications lifecycle. Hover to execute diagnostic readout."
        className="px-6 relative z-20"
      />

      {/* Sticky Stacking Grid */}
      <div className="relative mt-16 px-4 md:px-12 lg:px-24">
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <div 
              key={service.id}
              className="sticky transition-all duration-500 reveal"
              style={{
                top: `${140 + index * 40}px`, // Stack offset
                paddingBottom: "10vh",
                zIndex: index + 10
              }}
            >
              <div className="bg-background border border-border/60 shadow-[0_-20px_40px_rgba(0,0,0,0.8)] group hover:-translate-y-2 transition-transform duration-500">
                
                {/* 1px Grid Layout for the Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/40">
                  
                  {/* Left: ID & Vertical Label (Col 1-2) */}
                  <div className="lg:col-span-1 p-6 flex lg:flex-col items-center justify-between lg:justify-start gap-4 bg-muted/20">
                    <span className="font-mono text-2xl font-light text-cyan-500/50">[{service.id}]</span>
                    <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground lg:[writing-mode:vertical-rl] lg:rotate-180">
                      SYS_MOD_{service.id}
                    </div>
                  </div>

                  {/* Middle: Content (Col 2-7) */}
                  <div className="lg:col-span-6 p-6 lg:p-10 flex flex-col justify-center relative overflow-hidden">
                    {/* Background Icon Watermark */}
                    <Icon size={240} className="absolute -right-20 -bottom-20 text-border/20 z-0 group-hover:text-cyan-500/5 transition-colors" weight="thin" />
                    
                    <div className="relative z-10 w-full">
                      <h3 className="font-heading text-[clamp(1.75rem,4vw,3.5rem)] font-light tracking-tight mb-6 group-hover:text-cyan-400 transition-colors uppercase break-words leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-md font-mono">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Technical Data Readout (Col 8-12) */}
                  <div className="lg:col-span-5 p-6 lg:p-10 bg-black/40 flex flex-col justify-center">
                    <div className="font-mono text-[0.65rem] tracking-[0.2em] text-cyan-500/50 mb-6 flex items-center gap-2">
                      <span className="h-[1px] w-8 bg-cyan-500/30" />
                      DIAGNOSTIC_READOUT
                    </div>
                    
                    <ul className="space-y-4 font-mono w-full">
                      {service.data.map((stat, i) => (
                        <li key={i} className="flex flex-wrap items-end justify-between border-b border-border/30 pb-2 group/stat hover:border-cyan-500/50 transition-colors">
                          <span className="text-[0.65rem] text-muted-foreground group-hover/stat:text-white transition-colors tracking-widest uppercase">
                            {stat.label}
                          </span>
                          <span className="text-sm font-medium text-white group-hover/stat:text-cyan-400 transition-colors">
                            {stat.val}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
