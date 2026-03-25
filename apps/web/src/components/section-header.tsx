import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  label: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-24 flex items-stretch gap-6 md:gap-12",
        align === "center" && "flex-col md:flex-row mx-auto justify-center",
        className
      )}
      {...props}
    >
      {/* Vertical Monospace Label aligned with brutalist grid principles */}
      <div className="relative flex-none hidden md:flex min-w-[32px] border-l border-border/50 items-center justify-center">
        <div className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.2em] text-cyan-400/80 text-vertical whitespace-nowrap">
          // {label}
        </div>
        {/* Intersection Dots */}
        <div className="absolute top-0 -left-[2px] w-1 h-1 bg-cyan-400/50" />
        <div className="absolute bottom-0 -left-[2px] w-1 h-1 bg-cyan-400/50" />
      </div>

      <div className="flex-1 max-w-4xl py-2">
        {/* Mobile-only horizontal label */}
        <div className="md:hidden font-mono text-[0.62rem] font-medium uppercase tracking-[0.2em] text-cyan-400/80 mb-6">
          // {label}
        </div>

        {/* Massive Display Title */}
        <h2 className="font-heading text-[clamp(2rem,10vw,6rem)] font-light tracking-tighter leading-[1] -ml-1 text-outline hover-glitch transition-colors selection:text-transparent">
          {title}
        </h2>

        {/* Technical Description Box */}
        {description && (
          <div className="mt-8 max-w-xl border-l-[3px] border-cyan-500/50 pl-6 animate-pulse">
            <p className="text-[0.85rem] text-muted-foreground font-mono leading-relaxed opacity-80 uppercase tracking-widest">
              [DAT]: {description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
