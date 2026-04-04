import { motion } from 'framer-motion'
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { RISK_RETURN_POINTS } from '../../data/mockPortfolioData'

const pointColors: Record<string, string> = {
  q: '#a78bfa',
  m: '#38bdf8',
  c: '#34d399',
}

export function ProblemOverview() {
  const data = RISK_RETURN_POINTS.map((p) => ({
    ...p,
    z: 420,
    fill: pointColors[p.id] ?? '#94a3b8',
  }))

  return (
    <section id="problem" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-violet-400 uppercase">
            Problem
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl">
            Risk, return, and hard allocation rules
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-mist">
            Portfolio construction is the art of balancing expected return against variance while
            respecting investable budgets. When allocations must sit on a discrete grid—common in
            operational mandates—the search space becomes combinatorial. That is where structured
            optimizers, including quantum formulations, earn their keep.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel space-y-5 rounded-3xl p-8"
          >
            <h3 className="font-display text-xl font-semibold text-frost">What we optimize</h3>
            <ul className="space-y-4 text-sm leading-relaxed text-mist sm:text-base">
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-violet-400" />
                <span>
                  <strong className="text-frost">Risk–return tradeoff:</strong> maximize expected
                  return for a penalized variance term—your classic mean–variance spirit, expressed
                  in a form compatible with binary decision variables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-glow" />
                <span>
                  <strong className="text-frost">Budget constraint:</strong> weights sum to one
                  investable unit; empty slots stay at zero exposure so the solution stays
                  deployable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-soft" />
                <span>
                  <strong className="text-frost">Discrete slices:</strong> each active asset picks
                  from a small set of allocation levels encoded with multiple qubits—here, two
                  qubits per name across four curated instruments.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="mb-4 text-center text-sm font-medium text-frost/90">
              Illustrative risk vs. return (σ proxy on x-axis)
            </p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                  <XAxis
                    type="number"
                    dataKey="risk"
                    name="Risk"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{
                      value: 'Risk (lower → left)',
                      position: 'bottom',
                      fill: '#64748b',
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="returnPct"
                    name="Return %"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{
                      value: 'E[return] %',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#64748b',
                      fontSize: 11,
                    }}
                  />
                  <ZAxis type="number" dataKey="z" range={[120, 120]} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: 'rgba(148,163,184,0.35)' }}
                    contentStyle={{
                      background: 'rgba(15,17,24,0.92)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      color: '#e2e8f0',
                    }}
                    formatter={(value, name) => {
                      const n = String(name)
                      const num = Number(value)
                      const formatted =
                        n === 'returnPct'
                          ? `${num.toFixed(2)}%`
                          : n === 'risk'
                            ? num.toFixed(3)
                            : String(value ?? '')
                      const label =
                        n === 'returnPct' ? 'Return' : n === 'risk' ? 'Risk' : n
                      return [formatted, label]
                    }}
                  />
                  <Scatter data={data} fill="#8884d8">
                    {data.map((entry) => (
                      <Cell key={entry.id} fill={entry.fill} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-center text-xs text-mist/80">
              REPLACE: overlay your empirical frontier once exports are wired in.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
