import { useEffect } from 'react'
import { DeckNavigation } from './components/layout/DeckNavigation'
import { SlideDeck } from './components/layout/SlideDeck'
import { DemoCTASection } from './components/sections/DemoCTASection'
import { HeroSection } from './components/sections/HeroSection'
import { MethodologySection } from './components/sections/MethodologySection'
import { PortfolioDashboard } from './components/sections/PortfolioDashboard'
import { ProblemOverview } from './components/sections/ProblemOverview'
import { ResultsSection } from './components/sections/ResultsSection'
import { StressTestSection } from './components/sections/StressTestSection'
import { WhatWeLearnedSection } from './components/sections/WhatWeLearnedSection'
import { WhyItMatters } from './components/sections/WhyItMatters'
import { PresentationProvider } from './presentation/PresentationProvider'

const SLIDES = [
  <HeroSection key="hero" />,
  <ProblemOverview key="problem" />,
  <MethodologySection key="method" />,
  <ResultsSection key="results" />,
  <PortfolioDashboard key="comparison" />,
  <StressTestSection key="stress" />,
  <WhatWeLearnedSection key="learnings" />,
  <WhyItMatters key="why" />,
  <DemoCTASection key="cta" />,
]

/**
 * Presentation mode: fixed slide deck (no document scroll). Each slide fills the stage;
 * overflow scrolls inside the active slide only. Navigation: bottom bar + keyboard.
 */
export function QuantumDemoPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [])

  return (
    <PresentationProvider slideCount={SLIDES.length}>
      <div className="fixed inset-0 z-0 flex flex-col overflow-hidden bg-void text-mist">
        <SlideDeck slides={SLIDES} />
        <DeckNavigation />
      </div>
    </PresentationProvider>
  )
}
