import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { WEIGHTS_CHALLENGER_50_TOP } from '../../data/mockPortfolioData'

export function ChallengerSleevesChart() {
  const data = [...WEIGHTS_CHALLENGER_50_TOP].sort((a, b) => b.weight - a.weight)
  return (
    <div className="h-[300px] w-full sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            domain={[0, 'auto']}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={100}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
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
              return [`${(v * 100).toFixed(1)}%`, 'Weight']
            }}
          />
          <Bar dataKey="weight" fill="#34d399" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
