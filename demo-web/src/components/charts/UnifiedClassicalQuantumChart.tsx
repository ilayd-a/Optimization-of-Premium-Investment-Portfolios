import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CLASSICAL_SOLUTION_GD_TRACES,
  QAOA_8F1Q_8Q_COBYLA_BY_P,
  QAOA_8F1Q_8Q_GROUND_TRUTH_ENERGY,
} from '../../data/presentationData'

/** P=1,2,3 placed at notebook epochs 0 / 500 / 999 so QAOA shares the GD x-axis (not COBYLA iterations). */
const QAOA_EPOCH_ANCHORS = [0, 500, 999] as const

const rows = CLASSICAL_SOLUTION_GD_TRACES.map((t) => {
  const pIdx = QAOA_EPOCH_ANCHORS.indexOf(t.epoch as (typeof QAOA_EPOCH_ANCHORS)[number])
  const qaoa8q = pIdx >= 0 ? QAOA_8F1Q_8Q_COBYLA_BY_P[pIdx].expectedEnergy : null
  return {
    epoch: t.epoch,
    clean: t.clean,
    oneZone: t.oneZone,
    twoZone: t.twoZone,
    qaoa8q,
  }
})

const tooltipStyle = {
  background: 'rgba(15,17,24,0.97)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#e2e8f0',
}

export function UnifiedClassicalQuantumChart() {
  return (
    <div>
      <div className="h-[300px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rows} margin={{ top: 16, right: 44, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
            <XAxis
              dataKey="epoch"
              type="number"
              domain={[0, 999]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickMargin={6}
            />
            <YAxis
              yAxisId="gd"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              domain={['auto', 'auto']}
              tickFormatter={(v) => Number(v).toFixed(3)}
              label={{
                value: '⟨E⟩ (classical GD)',
                angle: -90,
                position: 'insideLeft',
                fill: '#64748b',
                fontSize: 11,
              }}
            />
            <YAxis
              yAxisId="q8"
              orientation="right"
              tick={{ fill: '#c4b5fd', fontSize: 10 }}
              domain={['auto', 'auto']}
              tickFormatter={(v) => Number(v).toFixed(2)}
              label={{
                value: '8Q QAOA ⟨E⟩',
                angle: 90,
                position: 'insideRight',
                fill: '#a78bfa',
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => {
                if (value == null || Number.isNaN(Number(value))) return null
                const n = Number(value)
                const label =
                  name === 'clean'
                    ? 'Noiseless ⟨E⟩'
                    : name === 'oneZone'
                      ? '1-zone noise'
                      : name === 'twoZone'
                        ? '2-zone noise'
                        : '8Q QAOA (P at 0/500/999)'
                return [n.toFixed(6), label]
              }}
              labelFormatter={(e) => `Epoch ${e}`}
              labelStyle={{ color: '#94a3b8' }}
            />
            <ReferenceLine
              yAxisId="q8"
              y={QAOA_8F1Q_8Q_GROUND_TRUTH_ENERGY}
              stroke="#fbbf24"
              strokeDasharray="6 5"
              strokeWidth={2}
              label={{
                value: `8Q ground ${QAOA_8F1Q_8Q_GROUND_TRUTH_ENERGY.toFixed(4)}`,
                fill: '#fbbf24',
                fontSize: 9,
                position: 'insideTopRight',
              }}
            />
            <Line
              yAxisId="gd"
              type="monotone"
              dataKey="clean"
              name="clean"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
            <Line
              yAxisId="gd"
              type="monotone"
              dataKey="oneZone"
              name="oneZone"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
            <Line
              yAxisId="gd"
              type="monotone"
              dataKey="twoZone"
              name="twoZone"
              stroke="#f472b6"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
            <Line
              yAxisId="q8"
              type="monotone"
              dataKey="qaoa8q"
              name="qaoa8q"
              stroke="#a78bfa"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#a78bfa', stroke: '#ede9fe', strokeWidth: 2 }}
              connectNulls
              legendType="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
        <p className="text-center text-[11px] font-medium text-mist sm:text-xs">Epoch (GD steps)</p>
        <ul className="mx-auto flex max-w-lg flex-col gap-2.5 text-[10px] text-mist sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 sm:text-[11px]">
          <li className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-7 shrink-0 rounded-full bg-[#f43f5e]" aria-hidden />
            <span>Noiseless ⟨E⟩</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-7 shrink-0 rounded-full bg-[#38bdf8]" aria-hidden />
            <span>Noisy GD · 1-zone</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-0 w-7 shrink-0 border-t-2 border-dashed border-[#f472b6]" aria-hidden />
            <span>Noisy GD · 2-zone</span>
          </li>
          <li className="flex items-start gap-2 sm:items-center">
            <span
              className="mt-1 inline-block size-2 shrink-0 rounded-full bg-[#a78bfa] ring-2 ring-violet-200/30 sm:mt-0"
              aria-hidden
            />
            <span className="leading-snug">
              <span className="block sm:inline">8Q QAOA ⟨E⟩</span>
              <span className="mt-0.5 block text-[9px] text-mist/75 sm:ml-1 sm:mt-0 sm:inline">
                · P = 1, 2, 3 at epochs 0 / 500 / 999
              </span>
            </span>
          </li>
        </ul>
      </div>
      <p className="mt-2 text-center text-[10px] leading-snug text-mist/90 sm:text-[11px]">
        Left axis: noiseless ⟨E⟩ plus one-zone and two-zone noisy traces (Classical_Solution); noiseless
        series matches a Qiskit statevector replay of the same Hamiltonian and GD settings. Right axis:
        COBYLA QAOA ⟨E⟩ at P=1,2,3 at epochs 0 / 500 / 999 for layout only.
      </p>
    </div>
  )
}
