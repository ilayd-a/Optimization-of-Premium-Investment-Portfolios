import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Section ids in slide order — must match `SLIDES` in `QuantumDemoPage.tsx`. */
export const SLIDE_IDS = [
  'hero',
  'problem',
  'method',
  'results',
  'comparison',
  'stress',
  'learnings',
  'why',
  'cta',
] as const

export type SlideId = (typeof SLIDE_IDS)[number]

type PresentationContextValue = {
  slideIndex: number
  slideCount: number
  goToIndex: (index: number) => void
  goNext: () => void
  goPrev: () => void
  goToId: (id: string) => void
}

const PresentationContext = createContext<PresentationContextValue | null>(null)

export function PresentationProvider({
  slideCount,
  children,
}: {
  slideCount: number
  children: ReactNode
}) {
  const [slideIndex, setSlideIndex] = useState(0)

  const goToIndex = useCallback((index: number) => {
    const next = Math.max(0, Math.min(slideCount - 1, index))
    setSlideIndex(next)
  }, [slideCount])

  const goNext = useCallback(() => {
    goToIndex(slideIndex + 1)
  }, [goToIndex, slideIndex])

  const goPrev = useCallback(() => {
    goToIndex(slideIndex - 1)
  }, [goToIndex, slideIndex])

  const goToId = useCallback(
    (id: string) => {
      const i = SLIDE_IDS.indexOf(id as SlideId)
      if (i >= 0) goToIndex(i)
    },
    [goToIndex],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, [contenteditable=true]')) return

      if (e.key === 'ArrowRight' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const value = useMemo(
    () => ({
      slideIndex,
      slideCount,
      goToIndex,
      goNext,
      goPrev,
      goToId,
    }),
    [goToIndex, goNext, goPrev, slideCount, slideIndex],
  )

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>
}

export function usePresentation() {
  const ctx = useContext(PresentationContext)
  if (!ctx) {
    throw new Error('usePresentation must be used within PresentationProvider')
  }
  return ctx
}
