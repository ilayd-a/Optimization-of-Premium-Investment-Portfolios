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
  /** Powell best run: marginal P(qubit=1) per asset (4Q notebook). */
  qaoa4QMarginalsPowell: '/notebook-figures/qaoa_4f1q_4q_05.png',
  /** Powell 4f-2q P=3: marginal P(qubit=1) for all eight qubits. */
  qaoa4F2Q8QMarginalsPowell: '/notebook-figures/qaoa_4f2q_8q_10.png',
  /** 8F1Q notebook: marginal P(qubit=1) for best run at P=3 (eight qubits). */
  qaoa8f1qQubitMarginalsBestP3: '/notebook-figures/qaoa_8f1q_8q_03.png',
  /** 8F1Q notebook: Powell best expected energy vs QAOA depth P. */
  qaoa8f1qExpectedEnergyVsPPowell: '/notebook-figures/qaoa_8f1q_8q_08.png',
  /** Qiskit mpl: 4Q QAOA circuit (Powell best angles). */
  qaoa4f1qCircuitPowellBest: '/notebook-figures/qaoa_4f1q_4q_06.png',
  /** Second plot from plot_noise_summary: average energy under noise (4Q). */
  qaoa4f1qNoiseAvgEnergy: '/notebook-figures/qaoa_4f1q_4q_12.png',
  /** Second plot from plot_noise_summary: average energy under noise (8Q). */
  qaoa8f1qNoiseAvgEnergy: '/notebook-figures/qaoa_8f1q_8q_20.png',
  qaoaRuntimeVsEnergyLoss: '/notebook-figures/qaoa_4f1q_4q_04.png',
  /** Qiskit mpl: 4Q QAOA at depth P=1 (COBYLA angles)—shallowest export for legibility. */
  qaoa4QCircuitP1: '/notebook-figures/qaoa_4f1q_4q_07.png',
  /** Qiskit mpl: 8Q QAOA circuit (COBYLA). */
  qaoa8QCircuitCobyla: '/notebook-figures/qaoa_8f1q_8q_15.png',
  /** Qiskit mpl: 8Q QAOA circuit (Powell). */
  qaoa8QCircuitPowell: '/notebook-figures/qaoa_8f1q_8q_17.png',
} as const

/** Order: 4Q sweep → 8Q Powell sweep → 8Q marginals → 4Q marginals → circuit → noise (4Q → 8Q). */
export const RESULTS_NOTEBOOK_FIGURES = [
  {
    key: 'qaoa_energy_4q',
    src: NB.qaoaExpectedEnergyVsP,
    title: 'Expected energy vs P (4 assets / 4 qubits)',
    alt: 'Line plot of QAOA expected energy versus depth P with classical target energy reference',
  },
  {
    key: 'qaoa_energy_8q_powell',
    src: NB.qaoa8f1qExpectedEnergyVsPPowell,
    title: 'Powell: best expected energy vs P (8 assets / 8 qubits)',
    alt: 'Line plot of Powell best expected energy versus QAOA depth P with target reference',
  },
  {
    key: 'qaoa_marginals_8f1q',
    src: NB.qaoa8f1qQubitMarginalsBestP3,
    title: 'Qubit marginals of best run (P = 3, 8 qubits)',
    alt: 'Bar chart of marginal probability of measuring 1 for each of eight qubits',
  },
  {
    key: 'qaoa_marginals_4q',
    src: NB.qaoa4QMarginalsPowell,
    title: 'Qubit marginal probabilities (Powell, best run P = 3, four assets)',
    alt: 'Bar chart of marginal probability of measuring 1 for Gov Bonds, IG Credit, Cash, and HY Credit',
  },
  {
    key: 'qaoa_circuit_4q',
    src: NB.qaoa4f1qCircuitPowellBest,
    title: '4Q QAOA circuit (Powell best angles)',
    alt: 'Quantum circuit diagram for four-qubit QAOA with Hadamard, rotations, and ZZ interactions',
  },
  {
    key: 'qaoa_noise_avg_energy_4q',
    src: NB.qaoa4f1qNoiseAvgEnergy,
    title: '4F / 4Q — average energy under noise',
    alt: 'Bar chart of average energy for clean, full noise, and no-move noise versus target',
  },
  {
    key: 'qaoa_noise_avg_energy_8q',
    src: NB.qaoa8f1qNoiseAvgEnergy,
    title: '8F / 8Q — average energy under noise',
    alt: 'Bar chart of average energy for clean, full noise, and no-move noise versus target',
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
  title: 'Asset correlation structure',
  alt: 'Heatmap of Q for the four selected assets',
} as const
