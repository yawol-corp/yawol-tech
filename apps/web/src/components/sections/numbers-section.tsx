import * as React from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { id: "S1", label: "ACTIVE_NODES", value: "25000", suffix: "+", desc: "Operational edge locations across regions.", isCurrency: true },
  { id: "S2", label: "UPTIME_SLA", value: "99.99", suffix: "%", desc: "Guaranteed connectivity via redundancy." },
  { id: "S3", label: "LATENCY_AVG", value: "1.2", suffix: "ms", desc: "Average response time on fiber backbones." },
  { id: "S4", label: "THROUGHPUT", value: "100", suffix: "Gbps", desc: "Maximum tested data transfer rate." },
]

function StatNumber({ value, isCurrency }: { value: string, isCurrency?: boolean }) {
  const numberRef = React.useRef<HTMLSpanElement>(null)
  const numericValue = parseFloat(value)
  const isInteger = numericValue % 1 === 0

  useGSAP(() => {
    if (!numberRef.current) return

    gsap.fromTo(
      numberRef.current,
      { textContent: "0" },
      {
        textContent: numericValue,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 85%",
          once: true
        },
        snap: { textContent: isInteger ? 1 : 0.01 },
        onUpdate: function () {
          if (!numberRef.current) return
          const currentVal = Number(this.targets()[0].textContent)
          if (isCurrency && currentVal > 1000) {
            numberRef.current.innerHTML = Math.round(currentVal).toLocaleString("en-IN")
          } else if (!isInteger) {
            numberRef.current.innerHTML = currentVal.toFixed(2)
          } else {
             numberRef.current.innerHTML = Math.round(currentVal).toString()
          }
        },
      }
    )
  }, [])

  return <span ref={numberRef}>0</span>
}

export function NumbersSection() {
  return (
    <section id="stats-trigger" className="py-24 relative bg-black/40">
      
      {/* 1px Grid Matrix Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/40 border-y border-border/40 mx-4 md:mx-12 lg:mx-24 stagger-up reveal">
        
        {STATS.map((stat) => (
          <div key={stat.id} className="reveal-child relative p-6 xl:p-8 group hover:bg-white-[0.02] transition-colors overflow-hidden">
            
            {/* Background Glitch on Hover */}
            <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            
            {/* Top Bar with ID */}
            <div className="flex justify-between items-start mb-6 sm:mb-12 relative z-10">
              <span className="font-mono text-xs text-cyan-500/60 uppercase tracking-widest">
                [STAT_{stat.id}]
              </span>
              <div className="size-1.5 bg-border/40 group-hover:bg-cyan-400 group-hover:animate-pulse transition-colors" />
            </div>

            {/* The Metric */}
            <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-baseline gap-1 w-full">
               {stat.isCurrency && <span className="shrink-0 opacity-40 font-mono text-lg sm:text-xl text-white">₹</span>}
               <span className="font-heading text-[clamp(1.5rem,2.8vw,3.5rem)] font-light text-white group-hover:text-cyan-400 transition-colors tracking-tighter tabular-nums whitespace-nowrap">
                 <StatNumber value={stat.value} isCurrency={stat.isCurrency} />
               </span>
               <span className="shrink-0 text-sm sm:text-base font-mono text-muted-foreground/60 tracking-widest leading-none ml-1">{stat.suffix}</span>
            </div>

            {/* Technical Label */}
            <div className="relative z-10 mt-6 pt-4 border-t border-border/30">
              <h5 className="font-mono text-sm tracking-widest uppercase mb-2 group-hover:text-white transition-colors">
                {stat.label}
              </h5>
              <p className="font-mono text-[0.65rem] text-muted-foreground leading-relaxed">
                {stat.desc}
              </p>
            </div>
            
          </div>
        ))}

      </div>

    </section>
  )
}
