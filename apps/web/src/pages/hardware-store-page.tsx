import { Button } from "@workspace/ui/components/button"
import { ShoppingCart } from "@phosphor-icons/react"
import { Link } from "wouter"

import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { RichTextRenderer } from "../components/rich-text"

export function HardwareStorePage() {
  const products = useQuery(api.products.listActive)

  return (
    <div className="flex-1 flex flex-col pt-16 bg-background">
      
      {/* Structural Header */}
      <div className="border-b border-border/40 bg-black/40 px-6 py-12 md:py-16 relative overflow-hidden">
         {/* Background noise specifically for header */}
         <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
         
         <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-stretch gap-6">
               <div className="hidden md:flex border-l border-cyan-500/50 min-w-[32px] items-center justify-center relative">
                  <div className="font-mono text-[0.6rem] text-cyan-500/80 tracking-[0.3em] uppercase text-vertical whitespace-nowrap">
                     // SECURE_COMMERCE_PORTAL
                  </div>
                  <div className="absolute top-0 -left-[2px] w-1 h-1 bg-cyan-400/50" />
                  <div className="absolute bottom-0 -left-[2px] w-1 h-1 bg-cyan-400/50" />
               </div>
               <div>
                 <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tighter text-outline hover-glitch transition-colors selection:text-transparent leading-[0.9]">
                   HARDWARE <br /> REQUISITION.
                 </h1>
                 <p className="font-mono text-xs text-muted-foreground mt-6 max-w-lg tracking-widest leading-relaxed">
                   Procure industrial-grade telecommunication assets. Authorization required for military applications.
                 </p>
               </div>
            </div>

            {/* Filter / Cart Strip */}
            <div className="flex flex-col gap-4 font-mono text-xs">
                <Link href="/" className="self-end md:self-auto">
                   <Button variant="ghost" className="rounded-none border-b border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 tracking-[0.2em] font-mono text-[0.65rem] uppercase">
                     &lt; RETURN_TO_BASE()
                   </Button>
                </Link>
                <div className="flex items-center gap-4 text-muted-foreground border border-border/40 p-1 bg-black/60">
                   <button className="px-4 py-2 hover:bg-white/5 hover:text-white transition-colors active">ALL_SYSTEMS</button>
                   <button className="px-4 py-2 hover:bg-white/5 hover:text-white transition-colors">ANTENNAS</button>
                   <button className="px-4 py-2 hover:bg-white/5 hover:text-white transition-colors">ROUTING</button>
                </div>
                <Button className="rounded-none bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black tracking-[0.2em] flex items-center gap-2">
                   <ShoppingCart size={16} />
                   [0] ACTIVE_LOG
                </Button>
            </div>
         </div>
      </div>

      {/* Product Matrix */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/40">
        
        {/* Loading State */}
        {products === undefined && (
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-32 font-mono text-cyan-500/80 tracking-widest text-xs animate-pulse">
            <div className="w-16 h-1 bg-cyan-500/50 mb-4" />
            SYNCHRONIZING_WITH_CMS...
          </div>
        )}

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-32 font-mono text-muted-foreground tracking-widest text-xs">
            NO_ASSETS_AVAILABLE_IN_CATALOG
          </div>
        )}

        {/* Product List */}
        {products?.map((product) => {
          // Resolve local image mapping as fallback
          const localImageMap: Record<string, string> = {
            "MACRO-CELL TRANSCEIVER ARRAY": "/hardware/transceiver.png",
            "QUANTUM EDGE SERVER ROUTER [UPGRADED]": "/hardware/server.png",
            "FIBER OPTIC SPLICE NODE": "/hardware/node.png",
            "EMP-SHIELDED POWER UNIT": "/hardware/power.png",
          }
          const displayImage = product.imageUrls?.[0] || localImageMap[product.name]

          return (
            <article key={product._id} className="relative group flex flex-col border-b lg:border-b-0 border-border/40 hover:bg-white-[0.02] transition-colors reveal">
               
               {/* ID Tag */}
               <div className="absolute top-6 left-6 z-20 font-mono text-[0.65rem] tracking-[0.2em] text-cyan-500/80 bg-black/60 px-2 py-1 border border-cyan-500/30 backdrop-blur-md">
                  [{product._id.slice(-8).toUpperCase()}]
               </div>
  
               {/* Image Container */}
               <div className="relative aspect-video w-full bg-black/80 overflow-hidden border-b border-border/40 flex items-center justify-center p-8 group-hover:border-cyan-500/30 transition-colors">
                  <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
                  {displayImage ? (
                    <img 
                      src={displayImage} 
                      alt={product.name} 
                      className="w-full h-full object-contain filter grayscale-[0.8] contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="font-mono text-xs text-muted-foreground/50 tracking-widest border border-dashed border-border/40 p-4">NO_IMAGE_DATA</div>
                  )}
               </div>

             {/* Product Data */}
             <div className="p-8 md:p-12 flex-1 flex flex-col justify-between">
                <div>
                   <div className="font-mono text-[0.6rem] text-muted-foreground tracking-widest uppercase mb-4">
                     // CAT: {product.category}
                   </div>
                   <h2 className="font-heading text-3xl md:text-4xl font-light tracking-tight mb-4 group-hover:text-white transition-colors">
                     {product.name}
                   </h2>

                   {/* Rich Text CMS Description */}
                   <div className="mb-8">
                     {product.description && (
                       <RichTextRenderer content={product.description} />
                     )}
                   </div>

                   {/* Technical Specs Grid */}
                   <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono mb-12 border-l border-cyan-500/30 pl-6">
                      {Object.entries(product.specs || {}).map(([key, val]) => (
                        <div key={key} className="flex flex-col gap-1">
                           <span className="text-[0.6rem] text-muted-foreground tracking-widest uppercase">{key}</span>
                           <span className="text-xs text-white">{val as string}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Procurement Action */}
                <div className="flex items-center justify-between pt-8 border-t border-border/30">
                   <span className="font-mono text-lg text-cyan-400">₹{(product.price_inr / 100).toLocaleString("en-IN")}</span>
                   <Button className="rounded-none bg-transparent border border-border/60 hover:border-cyan-500 text-muted-foreground hover:text-cyan-400 font-mono text-xs tracking-widest px-8 transition-colors">
                     ISSUE_ORDER()
                   </Button>
                </div>
              </div>
            </article>
          )
        })}

      </div>
    </div>
  )
}
