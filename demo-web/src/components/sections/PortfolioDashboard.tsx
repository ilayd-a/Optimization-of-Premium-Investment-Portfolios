import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BarChart3, CheckCircle2, Layers, Loader2, Play } from 'lucide-react'
import { PORTFOLIO_PROGRAMS } from '../../data/presentationData'
import { PORTFOLIO_WEIGHTS_FIGURE } from '../../data/notebookFigures'
import { NotebookFigure } from '../notebook/NotebookFigure'
import { GlassCard } from '../ui/GlassCard'

function Metric({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg border px-2.5 py-2 sm:px-3 sm:py-2.5 ${
        highlight
          ? 'border-violet-500/30 bg-violet-500/10'
          : 'border-white/5 bg-black/20'
      }`}
    >
      <p className="text-[10px] font-medium tracking-wide text-mist/80 uppercase sm:text-[11px]">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-0.5 font-display text-base font-semibold tabular-nums text-frost sm:text-lg"
      >
        {value}
      </motion.p>
      {sub ? (
        <motion.p
          key={sub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-0.5 text-[10px] text-mist/60 leading-snug sm:text-xs"
        >
          {sub}
        </motion.p>
      ) : null}
    </div>
  )
}

function PortfolioColumn({
  name,
  tagline,
  accent,
  metrics,
  highlight,
}: {
  name: string
  tagline: string
  accent: string
  metrics: { label: string; value: string; sub?: string }[]
  highlight?: boolean
}) {
  return (
    <GlassCard className="flex h-full flex-col p-4 sm:p-5">
      <div
        className="mb-3 h-0.5 w-10 rounded-full sm:mb-4 sm:h-1 sm:w-12"
        style={{ background: accent, boxShadow: `0 0 20px ${accent}55` }}
      />
      <h3 className="font-display text-base font-semibold text-frost sm:text-lg">{name}</h3>
      <p className="mt-1 text-[11px] leading-relaxed text-mist sm:text-sm">{tagline}</p>
      <div className="mt-4 grid grid-cols-2 gap-1.5 sm:gap-2">
        {metrics.map((m) => (
          <Metric
            key={m.label}
            label={m.label}
            value={m.value}
            sub={m.sub}
            highlight={highlight}
          />
        ))}
      </div>
    </GlassCard>
  )
}

export function PortfolioDashboard() {
  const [optimizing, setOptimizing] = useState(false)
  const [showBest, setShowBest] = useState(true)
  const [runStamp, setRunStamp] = useState(0)

  const programs = PORTFOLIO_PROGRAMS

  function runReplay() {
    if (optimizing) return
    setOptimizing(true)
    setShowBest(false)
    window.setTimeout(() => {
      setOptimizing(false)
      setShowBest(true)
      setRunStamp((s) => s + 1)
    }, 2200)
  }

  return (
    <section id="comparison" className="px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="deck-section-eyebrow text-emerald-400">Comparison</p>
          <h2 className="deck-section-title">Programs at a glance</h2>
          <p className="deck-section-lead mt-3">
            Metrics come from the 4Q enumeration table and the QAOA depth sweep in the notebooks. Press{' '}
            <strong className="text-frost/90">Replay highlight</strong> to re-run the card emphasis
            animation. Weights use{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-[11px]">wᵢ = xᵢ · w_maxᵢ</code>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <div className="flex w-full max-w-xl flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <motion.button
              type="button"
              onClick={runReplay}
              disabled={optimizing}
              whileHover={{ scale: optimizing ? 1 : 1.02 }}
              whileTap={{ scale: optimizing ? 1 : 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-600/20 px-5 py-2.5 text-xs font-semibold text-frost shadow-[0_0_32px_-10px_rgba(139,92,246,0.5)] transition-colors hover:bg-violet-600/30 disabled:pointer-events-none disabled:opacity-60 sm:px-6 sm:py-3 sm:text-sm"
            >
              {optimizing ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <Play className="size-4 fill-current" aria-hidden />
              )}
              {optimizing ? 'Converging…' : 'Replay highlight'}
            </motion.button>
            {!optimizing && showBest ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300/90 sm:text-xs">
                <CheckCircle2 className="size-3.5 sm:size-4" aria-hidden />
                Notebook-sourced metrics
              </span>
            ) : null}
          </div>
          {optimizing ? (
            <div className="h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          ) : null}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${showBest}-${runStamp}`}
            initial={{ opacity: 0.92 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.9 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 lg:grid-cols-3 md:grid-cols-2"
          >
            {programs.map((p, i) => (
              <motion.div
                key={p.id + String(showBest)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
              >
                <PortfolioColumn
                  name={p.name}
                  tagline={p.tagline}
                  accent={p.accent}
                  metrics={p.metrics}
                  highlight={showBest}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-10"
        >
          <GlassCard hover={false} className="p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-frost sm:text-lg">
                  <BarChart3 className="size-4 text-violet-400 sm:size-5" aria-hidden />
                  Sleeve weights (4Q)
                </h3>
                <p className="mt-1 text-xs text-mist sm:text-sm">
                  Ground-state scenario visualization; sleeve metrics stay in the cards above.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-2.5 py-1.5 text-[10px] text-mist sm:px-3 sm:text-xs">
                <Layers className="size-3.5 text-violet-300" aria-hidden />
                One qubit per sleeve
              </div>
            </div>
            <motion.div
              key={runStamp}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <NotebookFigure
                src={PORTFOLIO_WEIGHTS_FIGURE.src}
                alt={PORTFOLIO_WEIGHTS_FIGURE.alt}
                title={PORTFOLIO_WEIGHTS_FIGURE.title}
              />
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
