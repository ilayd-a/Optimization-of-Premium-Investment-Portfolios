import { motion } from 'framer-motion'
import { Activity, ShieldAlert, TrendingUp } from 'lucide-react'
import { STRESS_METRICS } from '../../data/mockPortfolioData'
import { DownsideBarChart } from '../charts/DownsideBarChart'
import { StressHistogramChart } from '../charts/StressHistogramChart'
import { StressScenarioLines } from '../charts/StressScenarioLines'
import { GlassCard } from '../ui/GlassCard'

export function StressTestSection() {
  const m = STRESS_METRICS

  return (
    <section id="stress" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-amber-400 uppercase">
            Stress lab
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl">
            Scenario analysis that reads in seconds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-mist">
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
                <p className="text-[11px] font-medium tracking-wide text-mist/80 uppercase">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-frost">
                  {value}
                </p>
                <p className="mt-2 text-xs text-mist/70">{hint}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <GlassCard hover={false} className="p-6 lg:col-span-2">
            <h3 className="mb-1 font-display text-base font-semibold text-frost">
              Return distribution
            </h3>
            <p className="mb-4 text-xs text-mist">
              Histogram of scenario outcomes — quantum vs. equal weight.
            </p>
            <StressHistogramChart />
          </GlassCard>
          <GlassCard hover={false} className="flex flex-col p-6">
            <h3 className="mb-1 font-display text-base font-semibold text-frost">Win rate</h3>
            <p className="text-xs text-mist">Head-to-head on scenario PnL.</p>
            <div className="mt-6 flex flex-1 flex-col items-center justify-center">
              <p className="font-display text-5xl font-semibold tabular-nums text-gradient">
                {m.quantumWinRatePct}%
              </p>
              <p className="mt-2 text-sm text-mist">Quantum beats equal weight</p>
              <p className="mt-6 text-center text-xs leading-relaxed text-mist/80">
                REPLACE: compute wins as count(quantum PnL &gt; baseline) / n_scenarios from{' '}
                <code className="rounded bg-white/10 px-1">portfolio_stress_results.csv</code>.
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Activity className="size-5 text-cyan-glow" aria-hidden />
              <h3 className="font-display text-base font-semibold text-frost">
                Path across scenarios
              </h3>
            </div>
            <StressScenarioLines />
          </GlassCard>
          <GlassCard hover={false} className="p-6">
            <h3 className="mb-1 font-display text-base font-semibold text-frost">
              Downside stack
            </h3>
            <p className="mb-4 text-xs text-mist">Worst case and 5th percentile comparison.</p>
            <DownsideBarChart />
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
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
            <h3 className="font-display text-lg font-semibold text-frost">Judge-ready insight</h3>
            <p className="relative mt-3 max-w-3xl text-sm leading-relaxed text-mist">
              Under the mocked paths, the quantum book keeps a higher mean while shaving the left
              tail versus equal weight, translating into a{' '}
              <strong className="text-frost">{m.quantumWinRatePct}%</strong> win rate in
              head-to-head scenarios. Worst-case drawdown improves from{' '}
              <strong className="text-frost">{m.equalWeightWorstCasePct}%</strong> to{' '}
              <strong className="text-frost">{m.quantumWorstCasePct}%</strong>—a tangible
              robustness story once you drop in production numbers. The fifty-asset challenger still
              leads raw return, which is expected: the win is doing competitive risk shaping with a
              tiny discrete program, not brute-forcing breadth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
