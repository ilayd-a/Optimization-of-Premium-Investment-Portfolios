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
import { WEIGHTS_FOUR_ASSET_UNIVERSE } from '../../data/mockPortfolioData'

const q = WEIGHTS_FOUR_ASSET_UNIVERSE.quantum
const m = WEIGHTS_FOUR_ASSET_UNIVERSE.classical_matched

const chartData = q.map((row, i) => ({
  label: row.label,
  quantum: row.weight,
  matched: m[i]?.weight ?? 0,
}))

export function WeightsGroupedChart() {
  return (
    <div className="h-[300px] w-full sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(148,163,184,0.2)' }}
          />
          <YAxis
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,17,24,0.94)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              color: '#e2e8f0',
            }}
            formatter={(value) => {
              const v = Number(value)
              return [`${(v * 100).toFixed(1)}%`, '']
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12, color: '#94a3b8' }} />
          <Bar
            name="Quantum"
            dataKey="quantum"
            fill="#a78bfa"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
          <Bar
            name="Matched classical"
            dataKey="matched"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
