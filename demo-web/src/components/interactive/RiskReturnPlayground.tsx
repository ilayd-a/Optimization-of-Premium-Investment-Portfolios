import { PLAYGROUND_FIGURE } from '../../data/notebookFigures'
import { NotebookFigure } from '../notebook/NotebookFigure'
import { GlassCard } from '../ui/GlassCard'

export function RiskReturnPlayground() {
  return (
    <GlassCard hover={false} className="overflow-hidden p-0">
      <div className="border-b border-white/10 bg-black/20 px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-[10px] font-semibold tracking-wide text-violet-300/95 uppercase sm:text-xs">
          Four-asset universe
        </p>
        <p className="mt-1 font-display text-base font-semibold text-frost sm:text-lg">
          {PLAYGROUND_FIGURE.title}
        </p>
        <p className="mt-1.5 text-xs text-mist sm:text-sm">
          Pairwise correlations for the four selected assets.
        </p>
      </div>
      <div className="px-1 pb-3 pt-1 sm:px-3 sm:pb-4">
        <NotebookFigure
          src={PLAYGROUND_FIGURE.src}
          alt={PLAYGROUND_FIGURE.alt}
          title={PLAYGROUND_FIGURE.title}
        />
      </div>
    </GlassCard>
  )
}
