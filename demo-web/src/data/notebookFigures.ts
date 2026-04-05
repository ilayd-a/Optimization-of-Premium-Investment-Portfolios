/**
 * Static PNGs under /public/notebook-figures/.
 * Regenerate with: `python3 scripts/extract_notebook_images.py`
 */

export const NB = {
  quboRiskSpectrumAndCorrelation: '/notebook-figures/qubo_4f4q_00.png',
  quboQHeatmap: '/notebook-figures/qubo_4f4q_01.png',
  quboObjectivesAndSampler: '/notebook-figures/qubo_4f4q_02.png',
  quboIsingJHeatmap: '/notebook-figures/qubo_4f4q_03.png',
  quboGroundScenario: '/notebook-figures/qubo_4f4q_04.png',
  qaoaExpectedEnergyVsP: '/notebook-figures/qaoa_4f1q_4q_00.png',
  /** Powell best run: marginal P(qubit=1) per sleeve (4Q notebook). */
  qaoa4QMarginalsPowell: '/notebook-figures/qaoa_4f1q_4q_05.png',
  /** Powell 4f-2q P=3: marginal P(qubit=1) for all eight qubits. */
  qaoa4F2Q8QMarginalsPowell: '/notebook-figures/qaoa_4f2q_8q_10.png',
  qaoaRuntimeVsEnergyLoss: '/notebook-figures/qaoa_4f1q_4q_04.png',
  /** Qiskit mpl: 4Q QAOA at depth P=1 (COBYLA angles)—shallowest export for legibility. */
  qaoa4QCircuitP1: '/notebook-figures/qaoa_4f1q_4q_07.png',
  /** Qiskit mpl: 8Q QAOA circuit (COBYLA). */
  qaoa8QCircuitCobyla: '/notebook-figures/qaoa_8f1q_8q_15.png',
  /** Qiskit mpl: 8Q QAOA circuit (Powell). */
  qaoa8QCircuitPowell: '/notebook-figures/qaoa_8f1q_8q_17.png',
} as const

export const RESULTS_NOTEBOOK_FIGURES = [
  {
    key: 'risk_return',
    src: NB.quboRiskSpectrumAndCorrelation,
    title: 'Return–risk geometry & sleeve selection',
    alt: 'Selected four assets on a volatility vs expected return scatter with a correlation heatmap',
  },
  {
    key: 'ising_structure',
    src: NB.quboIsingJHeatmap,
    title: 'Ising coupling structure',
    alt: 'Ising model coupling visualization',
  },
  {
    key: 'qaoa_energy',
    src: NB.qaoaExpectedEnergyVsP,
    title: 'QAOA: expected energy vs depth',
    alt: 'QAOA expected energy versus depth P',
  },
  {
    key: 'qaoa_marginals_4q',
    src: NB.qaoa4QMarginalsPowell,
    title: 'Qubit marginals (4Q, Powell, best run)',
    alt: 'Bar chart of marginal probability of measuring 1 on each qubit for four sleeves',
  },
  {
    key: 'qaoa_marginals_8q',
    src: NB.qaoa4F2Q8QMarginalsPowell,
    title: 'Qubit marginals (4f-2q, 8Q, Powell, P=3)',
    alt: 'Bar chart of marginal probability P(qubit equals 1) for eight qubits',
  },
  {
    key: 'sampler_and_discrete',
    src: NB.quboObjectivesAndSampler,
    title: 'Objectives, Boltzmann mass & sampler',
    alt: 'Sixteen objectives, ideal and sampled probabilities, draw counts',
  },
] as const

export const STRESS_SECTION_FIGURE = {
  src: NB.qaoaRuntimeVsEnergyLoss,
  title: 'Runtime vs energy loss (QAOA)',
  alt: 'QAOA runtime versus energy loss to target',
} as const

export const PORTFOLIO_WEIGHTS_FIGURE = {
  src: NB.quboGroundScenario,
  title: 'Ground-state allocation scenario',
  alt: 'Optimal ground portfolio weights and scenario visualization',
} as const

/** Solo Q heatmap — distinct from the combined risk+correlation figure in results. */
export const PLAYGROUND_FIGURE = {
  src: NB.quboQHeatmap,
  title: 'Sleeve correlation structure',
  alt: 'Heatmap of Q for the four selected sleeves',
} as const
