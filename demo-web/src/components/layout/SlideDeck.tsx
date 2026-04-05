import type { ReactNode } from 'react'
import { usePresentation } from '../../presentation/PresentationProvider'

export function SlideDeck({ slides }: { slides: ReactNode[] }) {
  const { slideIndex } = usePresentation()

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <div className="h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        {slides[slideIndex]}
      </div>
    </div>
  )
}
