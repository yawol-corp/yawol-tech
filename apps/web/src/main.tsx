import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConvexProvider, ConvexReactClient } from "convex/react"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ConvexProvider>
  </StrictMode>
)
