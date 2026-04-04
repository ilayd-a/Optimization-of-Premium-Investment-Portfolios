import { FloatingNav } from './components/layout/FloatingNav'
import { DemoCTASection } from './components/sections/DemoCTASection'
import { HeroSection } from './components/sections/HeroSection'
import { MethodologySection } from './components/sections/MethodologySection'
import { PortfolioDashboard } from './components/sections/PortfolioDashboard'
import { ProblemOverview } from './components/sections/ProblemOverview'
import { StressTestSection } from './components/sections/StressTestSection'
import { WhyItMatters } from './components/sections/WhyItMatters'

/**
 * Single-page demo for live hackathon presentation.
 * All sections compose here; data lives in src/data/mockPortfolioData.ts
 */
export function QuantumDemoPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-void text-mist">
      <FloatingNav />
      <main>
        <HeroSection />
        <ProblemOverview />
        <MethodologySection />
        <PortfolioDashboard />
        <StressTestSection />
        <WhyItMatters />
        <DemoCTASection />
      </main>
    </div>
  )
}
