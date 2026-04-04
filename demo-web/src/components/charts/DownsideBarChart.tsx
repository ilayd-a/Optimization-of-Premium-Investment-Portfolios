import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { STRESS_METRICS } from '../../data/mockPortfolioData'

const data = [
  {
    name: 'Worst case',
    quantum: STRESS_METRICS.quantumWorstCasePct,
    equalWeight: STRESS_METRICS.equalWeightWorstCasePct,
  },
  {
    name: '5th pct',
    quantum: STRESS_METRICS.quantumP5Pct,
    equalWeight: STRESS_METRICS.equalWeightP5Pct,
  },
]

export function DownsideBarChart() {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,17,24,0.94)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              color: '#e2e8f0',
            }}
            formatter={(value) => {
              const v = Number(value)
              return [`${v.toFixed(2)}%`, '']
            }}
          />
          <Bar dataKey="quantum" name="Quantum" fill="#a78bfa" radius={[6, 6, 0, 0]} maxBarSize={40} />
          <Bar
            dataKey="equalWeight"
            name="Equal weight"
            fill="#475569"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
