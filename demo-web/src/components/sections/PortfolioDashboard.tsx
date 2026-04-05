import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BarChart3, Layers } from 'lucide-react'
import {
  PORTFOLIO_DISCRETIZED_50,
  PORTFOLIO_SUMMARIES,
  type PortfolioSummary,
} from '../../data/mockPortfolioData'
import { ChallengerSleevesChart } from '../charts/ChallengerSleevesChart'
import { WeightsGroupedChart } from '../charts/WeightsGroupedChart'
import { GlassCard } from '../ui/GlassCard'

function Metric({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-black/20 px-3 py-2.5">
      <p className="text-[11px] font-medium tracking-wide text-mist/80 uppercase">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold tabular-nums text-frost">{value}</p>
      {sub ? <p className="mt-0.5 text-[10px] text-mist/60">{sub}</p> : null}
    </div>
  )
}

function PortfolioColumn({ p }: { p: PortfolioSummary }) {
  return (
    <GlassCard className="flex h-full flex-col p-5 sm:p-6">
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{ background: p.accent, boxShadow: `0 0 24px ${p.accent}55` }}
      />
      <h3 className="font-display text-lg font-semibold text-frost">{p.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-mist sm:text-sm">{p.tagline}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Metric
          label="Expected return"
          value={`${p.expectedReturnPct.toFixed(2)}%`}
          sub="REPLACE: point estimate"
        />
        <Metric label="Variance" value={p.variance.toFixed(4)} sub="Risk proxy" />
        <Metric label="Objective" value={p.objective.toFixed(3)} sub="Lower is better" />
        <Metric label="Active assets" value={String(p.activeAssets)} sub="Non-zero sleeves" />
      </div>
    </GlassCard>
  )
}

type ChartTab = 'matched' | 'challenger'

export function PortfolioDashboard() {
  const [showDiscretized, setShowDiscretized] = useState(false)
  const [chartTab, setChartTab] = useState<ChartTab>('matched')

  return (
    <section id="comparison" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            Live board
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl">
            Portfolio comparison dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-mist">
            Three programs on stage: the eight-qubit construction, a classical twin on the same
            four assets, and a muscular fifty-name challenger. Toggle the discretized challenger to
            show how coarse grids behave at scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="text-xs font-medium tracking-wide text-mist uppercase">
            Benchmarks
          </span>
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setShowDiscretized(false)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                !showDiscretized
                  ? 'bg-white/10 text-frost shadow-inner'
                  : 'text-mist hover:text-frost/90'
              }`}
            >
              Core trio
            </button>
            <button
              type="button"
              onClick={() => setShowDiscretized(true)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                showDiscretized
                  ? 'bg-white/10 text-frost shadow-inner'
                  : 'text-mist hover:text-frost/90'
              }`}
            >
              + Discretized 50
            </button>
          </div>
        </motion.div>

        <div
          className={`grid gap-5 ${showDiscretized ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} md:grid-cols-2`}
        >
          {PORTFOLIO_SUMMARIES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <PortfolioColumn p={p} />
            </motion.div>
          ))}
          <AnimatePresence>
            {showDiscretized ? (
              <motion.div
                key="discretized"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <PortfolioColumn p={PORTFOLIO_DISCRETIZED_50} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-14"
        >
          <GlassCard hover={false} className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-frost">
                  <BarChart3 className="size-5 text-violet-400" aria-hidden />
                  Allocation geometry
                </h3>
                <p className="mt-1 text-sm text-mist">
                  {/* REPLACE: wire chart data to exported weights from each solver */}
                  Reusable charts read from <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">mockPortfolioData.ts</code>.
                </p>
              </div>
              <div className="flex rounded-full border border-white/10 bg-black/25 p-1">
                <button
                  type="button"
                  onClick={() => setChartTab('matched')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    chartTab === 'matched'
                      ? 'bg-violet-600/30 text-frost ring-1 ring-violet-500/40'
                      : 'text-mist hover:text-frost/90'
                  }`}
                >
                  <Layers className="size-3.5" aria-hidden />
                  4-asset universe
                </button>
                <button
                  type="button"
                  onClick={() => setChartTab('challenger')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    chartTab === 'challenger'
                      ? 'bg-emerald-600/25 text-frost ring-1 ring-emerald-500/35'
                      : 'text-mist hover:text-frost/90'
                  }`}
                >
                  50-asset sleeves
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {chartTab === 'matched' ? (
                <motion.div
                  key="matched"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeightsGroupedChart />
                </motion.div>
              ) : (
                <motion.div
                  key="challenger"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChallengerSleevesChart />
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
