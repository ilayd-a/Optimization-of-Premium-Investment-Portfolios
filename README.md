# Quantum-Inspired Portfolio Optimization

Research-style codebase that compares **quantum (QUBO → Ising) portfolio weights** against **classical mean–variance** baselines on a shared premium-investment dataset, with **scenario stress testing** and **tail risk (CVaR)** reporting.

---

## 1. Project overview

We study a **four-asset** slice of a larger universe (`A004`, `A047`, `A026`, `A017`) encoded for an **8-qubit** model (two qubits per asset in the notebook formulation). The pipeline:

1. Takes **quantum weights** (from the notebook / QAOA workflow, or the configured placeholder vector).
2. Solves a **matched classical** long-only Markowitz problem on the **same four assets**.
3. Solves a **50-asset classical challenger** (continuous optimum + **discretized** weights for presentation).
4. Runs **stress tests** on historical scenarios (quantum vs **equal weight** on the four assets).
5. Emits a **single comparison table** under `outputs/final/final_comparison.csv`.

A separate **`demo-web/`** app presents results for demos.

---

## 2. Problem formulation (QUBO + Ising)

The classical objective aligned with this repo’s optimizers is **mean–variance** with risk aversion `q`:

\[
\min_w \; q \, w^\top \Sigma w - \mu^\top w
\quad\text{s.t.}\quad
w \ge 0,\; \mathbf{1}^\top w = 1.
\]

The quantum side constructs a **QUBO** from discrete allocation choices per asset; that QUBO maps to an **Ising** Hamiltonian for QAOA / analog simulation (see `notebooks/MultiLot_4Assets.ipynb`). `src/quantum/encoding.py` documents the qubit-count convention.

---

## 3. Methodology

- **Data**: Expected returns and full covariance from `data/raw/`; scenarios for path-wise evaluation.
- **Classical**: `scipy.optimize.minimize` with **SLSQP** (long-only, fully invested).
- **Challenger discretization**: continuous optimum is rounded to a grid (`config.DISCRETIZATION_STEP`, default `0.25`), clipped, and renormalized.
- **Stress testing**: portfolio return per scenario is \(r_s = R_s^\top w\) for scenario matrix \(R_s\).
- **Comparison**: same formulas across portfolios; challenger metrics use the **full** \(\mu\), \(\Sigma\), and scenario columns.

---

## 4. Portfolio types compared

| Portfolio | Description |
|-----------|-------------|
| **Quantum** | Weights from QAOA / notebook output, or `config.QUANTUM_WEIGHTS_RAW` (normalized). |
| **Equal weight** | \(1/4\) on each of the four matched assets. |
| **Classical matched** | Markowitz on the **same four assets** as quantum. |
| **Classical challenger** | Markowitz on the **full universe**; table uses **discretized** weights. |

---

## 5. Metrics (including CVaR)

- **Expected return**: \(\mu^\top w\).
- **Variance**: \(w^\top \Sigma w\).
- **Objective** (reported in the final table): \(q \cdot \text{Var} - \mathbb{E}[r]\) with shared `q` from `src/config.py`.
- **Scenario mean / worst case / 5th percentile**: statistics of scenario path returns.
- **CVaR (5%)**: average return over the **worst 5%** of scenarios (conditional tail expectation). Lower (more negative) indicates worse tail behavior for return outcomes.

---

## 6. Results summary

After running the pipeline, open:

- **`outputs/final/final_comparison.csv`** — side-by-side metrics for all four portfolios.

Per-step artifacts:

- `outputs/matched/classical_matched_weights.csv`, `classical_matched_summary.csv`, `classical_matched_scenarios.csv`
- `outputs/challenger/classical_challenger_weights.csv`, `classical_challenger_summary.csv`
- `outputs/stress/stress_scenarios.csv`, `stress_summary.csv`, `stress_comparison.csv`

---

## 7. How to run

**Environment** (recommended: fresh venv). Some Anaconda stacks ship NumPy 2 while older binary wheels expect NumPy 1.x; this repo pins **`numpy<2`** in `requirements.txt` for reproducibility.

```bash
cd /path/to/Optimization-of-Premium-Investment-Portfolios
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python run_all.py
```

**Individual steps** (same defaults as `run_all.py`):

```bash
python classical_matched.py
python challenger.py
python stress_test.py
python final_comparison.py   # expects matched/challenger CSVs already in outputs/
```

**Frontend demo**:

```bash
cd demo-web && npm install && npm run dev
```

---

## 8. Project structure

```text
├── data/
│   ├── raw/                 # investment_dataset_*.csv (source of truth)
│   └── processed/           # reserved for derived datasets
├── src/
│   ├── config.py            # assets, q, paths, outputs
│   ├── quantum/             # encoding docs + weight helper
│   ├── classical/           # matched + challenger optimizers
│   ├── evaluation/          # metrics + stress_test
│   ├── comparison/          # final_comparison table
│   └── utils/               # data_loader
├── notebooks/               # MultiLot_4Assets (quantum model)
├── outputs/                 # pipeline writes here
├── demo-web/
├── run_all.py
├── requirements.txt
└── README.md
```

---

## 9. Key insights

- **Apples-to-apples**: “Quantum” and “Classical matched” share the **same** \(\mu\), \(\Sigma\), and scenario columns for the four-asset subset.
- **Scale**: The **challenger** uses the **full** covariance and scenarios; objectives and CVaR are not directly comparable to the 4-asset rows without interpretation.
- **Discretization**: The challenger’s **discretized** weights mimic implementable allocations and are what the final table uses for “Classical Challenger”.
- **Configuration**: Change assets, `q`, paths, or quantum weights in **`src/config.py`** only — scripts load through `utils.data_loader` and these constants.

---

## License / attribution

YQuantum hackathon project; see repository history for team contributions.
