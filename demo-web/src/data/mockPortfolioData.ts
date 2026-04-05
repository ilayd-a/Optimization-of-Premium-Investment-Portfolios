/**
 * Central mock data for the demo UI.
 *
 * REPLACE: Swap objects below with parsed outputs from your pipeline
 * (e.g. CSV/JSON from challenger.py, stress_test.py, or experiment logs).
 * Keep the same shapes so charts and cards update without code changes.
 */

/** Single portfolio summary for metric cards */
export type PortfolioSummary = {
  id: string
  name: string
  tagline: string
  expectedReturnPct: number
  variance: number
  objective: number
  activeAssets: number
  /** Hex color for charts / accents */
  accent: string
}

/** Weight row for bar charts */
export type WeightRow = {
  label: string
  weight: number
}

export const PORTFOLIO_SUMMARIES: PortfolioSummary[] = [
  {
    id: 'quantum',
    name: 'Quantum portfolio',
    tagline: '8-qubit discrete program on 4 assets',
    // REPLACE: from your quantum run
    expectedReturnPct: 7.9,
    variance: 0.012,
    objective: -0.073,
    activeAssets: 4,
    accent: '#a78bfa',
  },
  {
    id: 'classical_matched',
    name: 'Classical matched baseline',
    tagline: 'Same 4-asset universe & constraints',
    // REPLACE: classical optimizer on identical setup
    expectedReturnPct: 7.1,
    variance: 0.015,
    objective: -0.064,
    activeAssets: 4,
    accent: '#38bdf8',
  },
  {
    id: 'challenger_50',
    name: 'Classical 50-asset challenger',
    tagline: 'Continuous / richer universe search',
    // REPLACE: large-scale classical benchmark
    expectedReturnPct: 8.34,
    variance: 0.0118,
    objective: -0.0775,
    activeAssets: 12,
    accent: '#34d399',
  },
]

/** Optional fourth benchmark — toggle in dashboard */
export const PORTFOLIO_DISCRETIZED_50: PortfolioSummary = {
  id: 'challenger_50_discrete',
  name: 'Discretized 50-asset challenger',
  tagline: 'Coarse allocation grid on broad universe',
  // REPLACE: discretized classical on 50 names
  expectedReturnPct: 8.51,
  variance: 0.0191,
  objective: -0.0755,
  activeAssets: 2,
  accent: '#fb7185',
}

/**
 * REPLACE: Pull from your covariance/return estimates for the 4-asset quantum slice.
 * Labels should match tickers or internal IDs from investment_dataset_assets.csv.
 */
export const WEIGHTS_FOUR_ASSET_UNIVERSE: Record<
  'quantum' | 'classical_matched',
  WeightRow[]
> = {
  quantum: [
    { label: 'Asset α', weight: 0.31 },
    { label: 'Asset β', weight: 0.27 },
    { label: 'Asset γ', weight: 0.22 },
    { label: 'Asset δ', weight: 0.2 },
  ],
  classical_matched: [
    { label: 'Asset α', weight: 0.26 },
    { label: 'Asset β', weight: 0.3 },
    { label: 'Asset γ', weight: 0.24 },
    { label: 'Asset δ', weight: 0.2 },
  ],
}

/** Top sleeves for the 50-asset book (mock). REPLACE with sorted weights from CSV. */
export const WEIGHTS_CHALLENGER_50_TOP: WeightRow[] = [
  { label: 'Tech sleeve', weight: 0.18 },
  { label: 'Credit sleeve', weight: 0.14 },
  { label: 'Rates sleeve', weight: 0.12 },
  { label: 'EM sleeve', weight: 0.11 },
  { label: 'Infra sleeve', weight: 0.09 },
  { label: 'Other (44)', weight: 0.36 },
]

/** Risk–return scatter points for Problem Overview (illustrative). REPLACE if you plot real frontiers. */
export const RISK_RETURN_POINTS: {
  id: string
  label: string
  risk: number
  returnPct: number
}[] = [
  { id: 'q', label: 'Quantum', risk: 0.11, returnPct: 7.9 },
  { id: 'm', label: 'Matched classical', risk: 0.122, returnPct: 7.1 },
  { id: 'c', label: '50-asset challenger', risk: 0.109, returnPct: 8.34 },
]

/** Stress-test headline metrics. REPLACE with portfolio_stress_results.csv aggregates. */
export const STRESS_METRICS = {
  quantumWorstCasePct: -4.8,
  equalWeightWorstCasePct: -6.1,
  quantumMeanPct: 2.7,
  equalWeightMeanPct: 2.1,
  quantumWinRatePct: 63,
  quantumP5Pct: -1.2,
  equalWeightP5Pct: -2.4,
}

/**
 * REPLACE: Bin edges / counts from Monte Carlo or historical scenario engine.
 */
export const STRESS_RETURN_HISTOGRAM: {
  binMidPct: number
  quantum: number
  equalWeight: number
}[] = [
  { binMidPct: -8, quantum: 2, equalWeight: 6 },
  { binMidPct: -5, quantum: 8, equalWeight: 14 },
  { binMidPct: -2, quantum: 18, equalWeight: 22 },
  { binMidPct: 1, quantum: 28, equalWeight: 24 },
  { binMidPct: 4, quantum: 22, equalWeight: 18 },
  { binMidPct: 7, quantum: 14, equalWeight: 10 },
  { binMidPct: 10, quantum: 6, equalWeight: 4 },
  { binMidPct: 13, quantum: 2, equalWeight: 2 },
]

/**
 * REPLACE: Per-scenario PnL from stress_test_outputs or similar.
 */
export const STRESS_SCENARIO_SERIES: {
  scenario: string
  quantumPct: number
  equalWeightPct: number
}[] = [
  { scenario: 'S1', quantumPct: 1.2, equalWeightPct: 0.4 },
  { scenario: 'S2', quantumPct: -0.8, equalWeightPct: -1.9 },
  { scenario: 'S3', quantumPct: 3.1, equalWeightPct: 2.2 },
  { scenario: 'S4', quantumPct: -2.4, equalWeightPct: -3.8 },
  { scenario: 'S5', quantumPct: 0.6, equalWeightPct: -0.2 },
  { scenario: 'S6', quantumPct: 4.2, equalWeightPct: 3.5 },
  { scenario: 'S7', quantumPct: -1.1, equalWeightPct: -2.0 },
  { scenario: 'S8', quantumPct: 2.8, equalWeightPct: 1.9 },
  { scenario: 'S9', quantumPct: -3.6, equalWeightPct: -4.8 },
  { scenario: 'S10', quantumPct: 1.9, equalWeightPct: 0.7 },
  { scenario: 'S11', quantumPct: 5.1, equalWeightPct: 4.2 },
  { scenario: 'S12', quantumPct: -0.3, equalWeightPct: -1.4 },
]
