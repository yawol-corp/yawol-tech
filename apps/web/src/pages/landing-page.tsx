import { Nav } from "../components/nav"
import { Footer } from "../components/footer"
import { HeroSection } from "../components/sections/hero-section"
import { TrustBar } from "../components/sections/trust-bar"
import { ServicesSection } from "../components/sections/services-section"
import { ProcessSection } from "../components/sections/process-section"
import { NumbersSection } from "../components/sections/numbers-section"
import { LocationsSection } from "../components/sections/locations-section"
import { CTASection } from "../components/sections/cta-section"

export function LandingPage() {
  return (
    <>
      <Nav />
      <main className="divide-y divide-border/40 flex-1">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <ProcessSection />
        <NumbersSection />
        <LocationsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
