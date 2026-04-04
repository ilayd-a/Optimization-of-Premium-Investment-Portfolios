import { motion } from 'framer-motion'
import { useState } from 'react'
import { Activity, ShieldAlert, TrendingUp } from 'lucide-react'
import { STRESS_METRICS, STRESS_SCENARIO_SERIES } from '../../data/mockPortfolioData'
import { DownsideBarChart } from '../charts/DownsideBarChart'
import { StressHistogramChart } from '../charts/StressHistogramChart'
import { StressScenarioLines } from '../charts/StressScenarioLines'
import { GlassCard } from '../ui/GlassCard'

export function StressTestSection() {
  const m = STRESS_METRICS
  const [scenarioIx, setScenarioIx] = useState(4)
  const scenario = STRESS_SCENARIO_SERIES[scenarioIx] ?? STRESS_SCENARIO_SERIES[0]

  return (
    <section id="stress" className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="deck-section-eyebrow text-amber-400">Stress lab</p>
          <h2 className="deck-section-title">
            Scenario analysis that reads in seconds
          </h2>
          <p className="deck-section-lead mt-4">
            We shock the same covariance structure across synthetic scenarios—think macro bands,
            spread dislocations, and correlation spikes—then read the distribution of portfolio
            returns. Numbers below are mock placeholders ready for your CSV merge.
          </p>
        </motion.div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldAlert,
              label: 'Quantum worst case',
              value: `${m.quantumWorstCasePct}%`,
              hint: 'REPLACE: min scenario PnL',
            },
            {
              icon: ShieldAlert,
              label: 'Equal-weight worst case',
              value: `${m.equalWeightWorstCasePct}%`,
              hint: 'Naive baseline tail',
            },
            {
              icon: TrendingUp,
              label: 'Mean return — quantum',
              value: `${m.quantumMeanPct}%`,
              hint: 'Across scenarios',
            },
            {
              icon: TrendingUp,
              label: 'Mean return — equal weight',
              value: `${m.equalWeightMeanPct}%`,
              hint: 'Across scenarios',
            },
          ].map(({ icon: Icon, label, value, hint }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="h-full p-5">
                <Icon className="mb-3 size-5 text-amber-300/90" aria-hidden />
                <p className="text-[11px] font-medium tracking-wide text-mist/80 uppercase sm:text-xs">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-frost sm:text-3xl">
                  {value}
                </p>
                <p className="mt-2 text-xs text-mist/75 sm:text-sm">{hint}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <GlassCard hover={false} className="p-6 lg:col-span-2">
            <h3 className="mb-1 font-display text-lg font-semibold text-frost">
              Return distribution
            </h3>
            <p className="mb-4 text-xs text-mist sm:text-sm">
              Histogram of scenario outcomes — quantum vs. equal weight.
            </p>
            <StressHistogramChart />
          </GlassCard>
          <GlassCard hover={false} className="flex flex-col p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-frost">Win rate</h3>
            <p className="text-xs text-mist sm:text-sm">Head-to-head on scenario PnL.</p>
            <div className="mt-6 flex flex-1 flex-col items-center justify-center">
              <p className="font-display text-5xl font-semibold tabular-nums text-gradient sm:text-6xl">
                {m.quantumWinRatePct}%
              </p>
              <p className="mt-2 text-sm text-mist sm:text-base">Quantum vs. equal weight</p>
              <p className="mt-6 text-center text-xs leading-relaxed text-mist/80 sm:text-sm">
                REPLACE: compute wins as count(quantum PnL &gt; baseline) / n_scenarios from{' '}
                <code className="rounded bg-white/10 px-1">portfolio_stress_results.csv</code>.
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-5 text-cyan-glow" aria-hidden />
                <h3 className="font-display text-lg font-semibold text-frost">
                  Path across scenarios
                </h3>
              </div>
              <p className="text-xs text-mist/75 sm:text-sm">
                Scrub the timeline — chart highlights the active shock.
              </p>
            </div>
            <div className="mb-4 space-y-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-violet-300 sm:text-sm">{scenario.scenario}</span>
                <span className="text-xs text-mist sm:text-sm">
                  Quantum{' '}
                  <strong className="text-frost tabular-nums">{scenario.quantumPct.toFixed(2)}%</strong>
                  <span className="mx-1.5 text-mist/40">·</span>
                  Equal weight{' '}
                  <strong className="text-frost tabular-nums">
                    {scenario.equalWeightPct.toFixed(2)}%
                  </strong>
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={STRESS_SCENARIO_SERIES.length - 1}
                value={scenarioIx}
                onChange={(e) => setScenarioIx(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-rose-400"
                aria-label="Select stress scenario"
              />
              <p className="text-[11px] text-mist/65 sm:text-xs">
                REPLACE: bind slider to rows in{' '}
                <code className="rounded bg-white/10 px-1 py-0.5 text-[11px]">portfolio_stress_results.csv</code>.
              </p>
            </div>
            <StressScenarioLines activeScenario={scenario.scenario} />
          </GlassCard>
          <GlassCard hover={false} className="p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-frost">
              Downside stack
            </h3>
            <p className="mb-4 text-xs text-mist sm:text-sm">Worst case and 5th percentile comparison.</p>
            <DownsideBarChart />
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <dt className="text-mist/70">Quantum 5th pct</dt>
                <dd className="font-mono text-frost">{m.quantumP5Pct}%</dd>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <dt className="text-mist/70">Equal-weight 5th pct</dt>
                <dd className="font-mono text-frost">{m.equalWeightP5Pct}%</dd>
              </div>
            </dl>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-slate-950/80 p-6 sm:p-8">
            <div className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-violet-500/20 blur-3xl" />
            <h3 className="font-display text-xl font-semibold text-frost sm:text-2xl">Summary</h3>
            <p className="relative mt-3 max-w-3xl text-sm leading-relaxed text-mist sm:text-base">
              Under these mock paths, the quantum allocation posts a higher mean return and a narrower
              left tail than equal weight, with a{' '}
              <strong className="text-frost">{m.quantumWinRatePct}%</strong> head-to-head win rate
              across scenarios. Worst-case loss moves from{' '}
              <strong className="text-frost">{m.equalWeightWorstCasePct}%</strong> to{' '}
              <strong className="text-frost">{m.quantumWorstCasePct}%</strong>. The fifty-asset
              classical challenger still leads on raw return—consistent with giving up breadth in
              exchange for a compact, discrete quantum program on four names.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
