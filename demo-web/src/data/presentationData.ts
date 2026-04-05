/**
 * Presentation metrics (synced from the optimization pipeline / experiment logs).
 * Primary story: four sleeves, one qubit per sleeve (4Q). Eight-qubit and 4×2Q runs are supplementary.
 */

/** --- QUBO 4F4Q: full ranking (cell 17 stream) --- */
export const QUBO_4F4Q_RANKED = [
  { rank: 1, state: '0011', objective: -0.007414, return_: 0.008477, risk: 0.007973 },
  { rank: 2, state: '1100', objective: -0.003571, return_: 0.007672, risk: 0.010071 },
  { rank: 3, state: '1001', objective: 0.00806, return_: 0.008045, risk: 0.010237 },
  { rank: 4, state: '0010', objective: 0.020911, return_: 0.004098, risk: 0.003028 },
  { rank: 5, state: '0110', objective: 0.040944, return_: 0.008105, risk: 0.00699 },
  { rank: 6, state: '1101', objective: 0.052109, return_: 0.012052, risk: 0.012673 },
  { rank: 7, state: '1000', objective: 0.096388, return_: 0.003665, risk: 0.007286 },
  { rank: 8, state: '0101', objective: 0.135704, return_: 0.008387, risk: 0.009526 },
  { rank: 9, state: '0111', objective: 0.156626, return_: 0.012485, risk: 0.010523 },
  { rank: 10, state: '1010', objective: 0.217305, return_: 0.007763, risk: 0.008267 },
  { rank: 11, state: '0100', objective: 0.32003, return_: 0.004007, risk: 0.006094 },
  { rank: 12, state: '1011', objective: 0.428986, return_: 0.012143, risk: 0.011327 },
  { rank: 13, state: '0001', objective: 0.571667, return_: 0.00438, risk: 0.006794 },
  { rank: 14, state: '1110', objective: 0.717349, return_: 0.01177, risk: 0.010921 },
  { rank: 15, state: '0000', objective: 0.9, return_: 0, risk: 0 },
  { rank: 16, state: '1111', objective: 1.073037, return_: 0.01615, risk: 0.013663 },
] as const

/** Four sleeves × one binary decision each → four qubits. */
export const ASSETS_4 = [
  { id: 'A017', name: 'Gov Bonds', expReturn: 0.0183, volatility: 0.0364, wMax: 0.2 },
  { id: 'A026', name: 'IG Credit', expReturn: 0.0334, volatility: 0.0508, wMax: 0.12 },
  { id: 'A007', name: 'Cash', expReturn: 0.0164, volatility: 0.0121, wMax: 0.25 },
  { id: 'A047', name: 'HY Credit', expReturn: 0.073, volatility: 0.1132, wMax: 0.06 },
] as const

/** Ground x=[0,0,1,1] → w = x * w_max */
export const WEIGHTS_QUBO_4F4Q_GROUND = ASSETS_4.map((a, i) => ({
  label: `${a.id}`,
  weight: [0, 0, 1, 1][i] ? a.wMax : 0,
}))

/** Rank 2 x=[1,1,0,0] */
export const WEIGHTS_QUBO_4F4Q_RUNNER_UP = ASSETS_4.map((a, i) => ({
  label: `${a.id}`,
  weight: [1, 1, 0, 0][i] ? a.wMax : 0,
}))

/** QAOA on the 4-qubit (1q/asset) Ising instance — COBYLA outer loop, P ∈ {1,2,3}. */
export const QAOA_4F1Q_COBYLA_BY_P = [
  {
    P: 1,
    runtimeSec: 2.612145,
    expectedEnergy: 0.192856,
    groundTruthProb: 0.11116393658979765,
    topBitstring: '1100',
    topProb: 0.11717,
  },
  {
    P: 2,
    runtimeSec: 36.398552,
    expectedEnergy: 0.107382,
    groundTruthProb: 0.129245953776064,
    topBitstring: '1010',
    topProb: 0.174738,
  },
  {
    P: 3,
    runtimeSec: 97.991832,
    expectedEnergy: 0.063596,
    groundTruthProb: 0.17063194242226543,
    topBitstring: '0011',
    topProb: 0.170632,
  },
] as const

/** Classical ground energy for the 4-qubit Ising model (bitstring 0011). */
export const QAOA_4F1Q_GROUND_TRUTH_ENERGY = -0.007414

/** Classical ground energy for the 8-qubit (two qubits per sleeve) Ising instance. */
export const QAOA_8F1Q_8Q_GROUND_TRUTH_ENERGY = -0.019995518790163036

/**
 * ⟨E⟩ vs epoch during numerical GD on P=1 QAOA (8Q Ising).
 * - oneZone / twoZone: Classical_Solution notebook stdout (noisy simulators).
 * - clean: noiseless ⟨E⟩ (same Hamiltonian, LR, epochs); values from Qiskit statevector
 *   reproduction of that GD loop — Bloqade numbers may differ slightly in the last digit.
 */
export const CLASSICAL_SOLUTION_GD_TRACES = [
  { epoch: 0, oneZone: -0.000461, twoZone: -0.000707, clean: -0.000512071 },
  { epoch: 100, oneZone: -0.005048, twoZone: -0.006779, clean: -0.008330097 },
  { epoch: 200, oneZone: -0.025836, twoZone: -0.023631, clean: -0.031807842 },
  { epoch: 300, oneZone: -0.036029, twoZone: -0.032381, clean: -0.042672429 },
  { epoch: 400, oneZone: -0.042117, twoZone: -0.038002, clean: -0.048954285 },
  { epoch: 500, oneZone: -0.046002, twoZone: -0.041793, clean: -0.052874095 },
  { epoch: 600, oneZone: -0.048627, twoZone: -0.044466, clean: -0.055474712 },
  { epoch: 700, oneZone: -0.050465, twoZone: -0.046402, clean: -0.057285035 },
  { epoch: 800, oneZone: -0.051816, twoZone: -0.047868, clean: -0.058593865 },
  { epoch: 900, oneZone: -0.052832, twoZone: -0.048991, clean: -0.059569227 },
  { epoch: 999, oneZone: -0.053604, twoZone: -0.049872, clean: -0.060307656 },
] as const

/** @deprecated Use CLASSICAL_SOLUTION_GD_TRACES */
export const CLASSICAL_SOLUTION_NOISY_GD_TRACES = CLASSICAL_SOLUTION_GD_TRACES

/** COBYLA QAOA on the 8-qubit Ising instance (summary table / stdout). */
export const QAOA_8F1Q_8Q_COBYLA_BY_P = [
  { P: 1, expectedEnergy: 0.36474309412 },
  { P: 2, expectedEnergy: 0.36092879996 },
  { P: 3, expectedEnergy: 0.35323717622 },
] as const

/** QAOA ⟨E⟩ and gap to enumerative ground (8Q). */
export const QAOA_8F1Q_8Q_DEPTH_SERIES = QAOA_8F1Q_8Q_COBYLA_BY_P.map((r) => ({
  P: r.P,
  expectedEnergy: r.expectedEnergy,
  gapToGround: r.expectedEnergy - QAOA_8F1Q_8Q_GROUND_TRUTH_ENERGY,
}))

/** Portfolio cards — stakeholder-facing labels */
export type MetricCard = { label: string; value: string; sub?: string }

export type PortfolioProgram = {
  id: string
  name: string
  tagline: string
  accent: string
  metrics: MetricCard[]
}

function weightSumForBitstring(state: string): number {
  let s = 0
  for (let i = 0; i < state.length; i++) {
    if (state[i] === '1') s += ASSETS_4[i].wMax
  }
  return s
}

function activeSleeveCount(state: string): number {
  return [...state].filter((c) => c === '1').length
}

/** Cards built from `QUBO_4F4Q_RANKED`, `ASSETS_4`, and `QAOA_4F1Q_COBYLA_BY_P` (P = 3 row). */
function buildPortfolioPrograms(): PortfolioProgram[] {
  const ground = QUBO_4F4Q_RANKED[0]
  const runner = QUBO_4F4Q_RANKED[1]
  const q = QAOA_4F1Q_COBYLA_BY_P[2]
  const sumG = weightSumForBitstring(ground.state)
  const sumR = weightSumForBitstring(runner.state)
  const gt = QAOA_4F1Q_GROUND_TRUTH_ENERGY
  const matchesGround = q.topBitstring === ground.state

  return [
    {
      id: 'qubo_ground',
      name: 'QUBO optimum (4Q)',
      tagline: `Ground bitstring ${ground.state} — one qubit per sleeve`,
      accent: '#a78bfa',
      metrics: [
        { label: 'Objective', value: ground.objective.toFixed(4), sub: 'Mean–variance + budget penalty' },
        { label: 'Return', value: ground.return_.toFixed(4), sub: 'μᵀw' },
        { label: 'Risk', value: ground.risk.toFixed(4), sub: 'Variance term' },
        {
          label: 'Active sleeves',
          value: String(activeSleeveCount(ground.state)),
          sub: `Σw = ${sumG.toFixed(2)} vs target 0.30`,
        },
      ],
    },
    {
      id: 'qubo_runnerup',
      name: 'Runner-up allocation',
      tagline: `Next-best discrete state ${runner.state}`,
      accent: '#38bdf8',
      metrics: [
        {
          label: 'Objective',
          value: runner.objective.toFixed(4),
          sub: 'Second rank in full enumeration',
        },
        { label: 'Return', value: runner.return_.toFixed(4), sub: '' },
        { label: 'Risk', value: runner.risk.toFixed(4), sub: '' },
        {
          label: 'Active sleeves',
          value: String(activeSleeveCount(runner.state)),
          sub: `Σw = ${sumR.toFixed(2)}`,
        },
      ],
    },
    {
      id: 'qaoa_4f1q',
      name: 'QAOA (4Q, COBYLA)',
      tagline: 'Depth sweep P ∈ {1, 2, 3} on the same Ising instance',
      accent: '#34d399',
      metrics: [
        {
          label: 'Expected energy',
          value: q.expectedEnergy.toFixed(4),
          sub: `P = ${q.P} vs classical ground ${gt.toFixed(4)}`,
        },
        {
          label: 'P(ground state)',
          value: `${(100 * q.groundTruthProb).toFixed(1)}%`,
          sub: `Mass on ${ground.state}`,
        },
        { label: 'Runtime', value: `${q.runtimeSec.toFixed(3)} s`, sub: 'Classical outer loop + simulator' },
        {
          label: 'Top bitstring',
          value: q.topBitstring,
          sub: matchesGround ? `Matches ground at P = ${q.P}` : `Top bitstring at P = ${q.P}`,
        },
      ],
    },
  ]
}

export const PORTFOLIO_PROGRAMS: PortfolioProgram[] = buildPortfolioPrograms()

/** Scatter: each asset in μ–σ space (volatility on x). */
export const RISK_RETURN_ASSET_POINTS = ASSETS_4.map((a) => ({
  id: a.id,
  label: a.name,
  mu: a.expReturn,
  sigma: a.volatility,
}))

/** Frontier points from QUBO 4F4Q ranking (return vs sqrt risk) */
export const RISK_RETURN_FRONTIER_POINTS = QUBO_4F4Q_RANKED.slice(0, 12).map((r) => ({
  id: r.state,
  label: r.state,
  mu: r.return_,
  sigma: Math.sqrt(Math.max(r.risk, 1e-12)),
  objective: r.objective,
}))

/** Discrete “stress”: objective spread across 16 bitstrings */
export const DISCRETE_STRESS = {
  bestObjective: QUBO_4F4Q_RANKED[0].objective,
  runnerObjective: QUBO_4F4Q_RANKED[1].objective,
  worstFeasibleObjective: QUBO_4F4Q_RANKED[14].objective,
  worstNonEmptyObjective: QUBO_4F4Q_RANKED[15].objective,
  fifthRankObjective: QUBO_4F4Q_RANKED[4].objective,
  qaoaExpectedEnergy: QAOA_4F1Q_COBYLA_BY_P[2].expectedEnergy,
  groundTruthEnergy: QAOA_4F1Q_GROUND_TRUTH_ENERGY,
}

/** Histogram: count of discrete bitstrings by objective band (QUBO 4F4Q, n = 16). */
export const OBJECTIVE_HISTOGRAM = (() => {
  const bins = [
    { label: '< 0', test: (o: number) => o < 0 },
    { label: '0 – 0.1', test: (o: number) => o >= 0 && o < 0.1 },
    { label: '0.1 – 0.2', test: (o: number) => o >= 0.1 && o < 0.2 },
    { label: '0.2 – 0.4', test: (o: number) => o >= 0.2 && o < 0.4 },
    { label: '0.4 – 0.6', test: (o: number) => o >= 0.4 && o < 0.6 },
    { label: '0.6 – 0.8', test: (o: number) => o >= 0.6 && o < 0.8 },
    { label: '0.8 – 1.0', test: (o: number) => o >= 0.8 && o < 1.0 },
    { label: '≥ 1.0', test: (o: number) => o >= 1.0 },
  ]
  return bins.map(({ label, test }) => ({
    bin: label,
    count: QUBO_4F4Q_RANKED.filter((r) => test(r.objective)).length,
  }))
})()

/** Rank vs objective (enumeration ladder). */
export const OBJECTIVE_BY_RANK = QUBO_4F4Q_RANKED.map((r) => ({
  rank: r.rank,
  state: r.state,
  objective: r.objective,
}))

