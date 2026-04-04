import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { STRESS_RETURN_HISTOGRAM } from '../../data/mockPortfolioData'

export function StressHistogramChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={STRESS_RETURN_HISTOGRAM} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
          <XAxis
            dataKey="binMidPct"
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            label={{ value: 'Return bin (mid)', position: 'bottom', fill: '#64748b', fontSize: 11 }}
          />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,17,24,0.94)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              color: '#e2e8f0',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="quantum" name="Quantum" fill="#a78bfa" radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar
            dataKey="equalWeight"
            name="Equal weight"
            fill="#64748b"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
