import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SLIDE_IDS, usePresentation } from '../../presentation/PresentationProvider'

const SHORT_LABELS: Record<string, string> = {
  hero: 'Intro',
  problem: 'Problem',
  method: 'Method',
  results: 'Results',
  comparison: 'Board',
  stress: 'Stress',
  learnings: 'Learn',
  why: 'Why',
  cta: 'Outro',
}

export function DeckNavigation() {
  const { slideIndex, slideCount, goToIndex, goNext, goPrev } = usePresentation()

  return (
    <nav
      className="relative z-20 flex h-[3.25rem] shrink-0 items-center justify-between gap-2 border-t border-white/[0.06] bg-void/90 px-3 backdrop-blur-md sm:h-14 sm:px-6"
      aria-label="Slide navigation"
    >
      <button
        type="button"
        onClick={goPrev}
        disabled={slideIndex <= 0}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-frost transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 sm:gap-2 sm:px-3 sm:text-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-x-auto px-1 py-1 sm:gap-2">
        {Array.from({ length: slideCount }, (_, i) => {
          const id = SLIDE_IDS[i] ?? `slide-${i}`
          const active = i === slideIndex
          return (
            <button
              key={id}
              type="button"
              onClick={() => goToIndex(i)}
              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium tracking-wide uppercase transition-all sm:px-3 sm:text-[11px] ${
                active
                  ? 'bg-violet-600/40 text-frost ring-1 ring-violet-400/50'
                  : 'text-mist/70 hover:bg-white/5 hover:text-frost/90'
              }`}
              title={id}
              aria-label={`Go to slide ${i + 1}: ${id}`}
              aria-current={active ? 'true' : undefined}
            >
              {SHORT_LABELS[id] ?? i + 1}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={goNext}
        disabled={slideIndex >= slideCount - 1}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-frost transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 sm:gap-2 sm:px-3 sm:text-sm"
        aria-label="Next slide"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </button>
    </nav>
  )
}
