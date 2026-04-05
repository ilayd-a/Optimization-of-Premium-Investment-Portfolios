import { QAOA_8F1Q_8Q_DEPTH_SERIES } from '../../data/presentationData'
import { UnifiedClassicalQuantumChart } from './UnifiedClassicalQuantumChart'

export function OptimizationComparisonPresentation() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-violet-500/15 bg-gradient-to-b from-violet-950/25 to-transparent p-4 sm:p-5">
        <p className="text-[11px] font-semibold tracking-wide text-violet-300/90 uppercase sm:text-xs">
          Classical vs quantum · loss-style curves
        </p>
        <h4 className="mt-1 font-display text-sm font-semibold text-frost sm:text-base">
          Classical GD (noiseless + 2 noise models) vs 8Q QAOA ⟨E⟩
        </h4>
        <p className="mt-1 text-[11px] leading-relaxed text-mist sm:text-xs">
          Left axis: noiseless ⟨E⟩, then one-zone and two-zone noisy ⟨E⟩ (Classical_Solution). Right
          axis: COBYLA QAOA ⟨E⟩ at P=1,2,3. Gold line: 8Q enumerative ground. See note under the chart
          for epoch alignment of the QAOA markers.
        </p>
        <div className="mt-4">
          <UnifiedClassicalQuantumChart />
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-mist sm:text-[11px]">
          {QAOA_8F1Q_8Q_DEPTH_SERIES.map((row) => (
            <span
              key={row.P}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono tabular-nums"
            >
              P={row.P}: gap to 8Q ground{' '}
              <span className="text-amber-200/90">{row.gapToGround.toFixed(3)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
