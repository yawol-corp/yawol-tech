import * as React from "react"
import { MagnifyingGlass, CircleNotch, ArrowRight, Globe } from "@phosphor-icons/react"
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@workspace/ui/components/command"
import { search, type SearchResult } from "../../lib/exa"

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (value.length < 3) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const searchResults = await search(value)
      setResults(searchResults)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex h-9 w-9 items-center justify-center border border-border bg-background transition-all hover:border-blue-500/50 hover:bg-accent"
        aria-label="Search"
      >
        <MagnifyingGlass size={18} className="text-muted-foreground transition-colors group-hover:text-blue-400" />
        <span className="absolute -bottom-8 right-0 hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] whitespace-nowrap text-muted-foreground group-hover:block">
          ⌘K
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <CommandInput
            placeholder="Neural search the web..."
            value={query}
            onValueChange={handleSearch}
            className="h-14 border-none bg-transparent px-4 font-sans text-base focus:ring-0"
          />
          {isLoading && (
            <div className="absolute right-4 top-4">
              <CircleNotch size={20} className="animate-spin text-blue-400" />
            </div>
          )}
        </div>
        <CommandList className="max-h-[400px] border-t border-border scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <CommandEmpty className="py-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <MagnifyingGlass size={32} className="text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            </div>
          </CommandEmpty>
          
          {results.length > 0 && (
            <CommandGroup heading="Neural Search Results" className="p-2">
              {results.map((result, idx) => (
                <CommandItem
                  key={result.url + idx}
                  onSelect={() => window.open(result.url, "_blank")}
                  className="group flex flex-col items-start gap-1 p-3 transition-colors hover:bg-blue-500/5"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-heading text-sm font-medium text-foreground line-clamp-1">
                      {result.title}
                    </span>
                    <ArrowRight size={14} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe size={12} className="text-blue-400/50" />
                    <span className="line-clamp-1">{new URL(result.url).hostname}</span>
                  </div>
                  {result.text && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground/70">
                      {result.text}
                    </p>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!query && (
            <CommandGroup heading="Quick Links" className="p-2">
              <CommandItem className="flex items-center gap-2 p-3">
                <Globe size={16} className="text-blue-400" />
                <span className="text-sm">Yawol Technologies Home</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-background px-1">ESC</kbd> to close
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-background px-1">↵</kbd> to select
            </span>
          </div>
          <span className="font-medium text-blue-400/70">Powered by Exa AI</span>
        </div>
      </CommandDialog>
    </>
  )
}
