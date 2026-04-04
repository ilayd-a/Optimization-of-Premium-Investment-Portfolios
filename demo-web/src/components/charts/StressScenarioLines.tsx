import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { STRESS_SCENARIO_SERIES } from '../../data/mockPortfolioData'

type StressScenarioLinesProps = {
  /** Highlight vertical line at this scenario id (e.g. "S3"). */
  activeScenario?: string | null
}

export function StressScenarioLines({ activeScenario }: StressScenarioLinesProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={STRESS_SCENARIO_SERIES} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis dataKey="scenario" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
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
              return [`${v.toFixed(2)}%`, '']
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          {activeScenario ? (
            <ReferenceLine
              x={activeScenario}
              stroke="#fb7185"
              strokeWidth={2}
              strokeDasharray="6 4"
              label={{
                value: 'Focus',
                position: 'top',
                fill: '#fb7185',
                fontSize: 10,
              }}
            />
          ) : null}
          <Line
            type="monotone"
            dataKey="quantumPct"
            name="Quantum"
            stroke="#a78bfa"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#a78bfa' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="equalWeightPct"
            name="Equal weight"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={{ r: 2.5, fill: '#38bdf8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
