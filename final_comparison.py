import pandas as pd
import numpy as np

# -----------------------------
# CONFIG
# -----------------------------
selected_assets = ["A004", "A047", "A026", "A017"]

quantum_weights = np.array([0.08, 0.04, 0.12, 0.0667], dtype=float)
quantum_weights = quantum_weights / quantum_weights.sum()

equal_weights = np.full(len(selected_assets), 1 / len(selected_assets))


# -----------------------------
# HELPER FUNCTIONS
# -----------------------------
def cvar(returns, alpha=5):
    threshold = np.percentile(returns, alpha)
    return returns[returns <= threshold].mean()


def compute_metrics(weights, mu, sigma, scenario_returns, name):
    port_return = float(np.dot(mu, weights))
    port_var = float(weights.T @ sigma @ weights)
    objective = 0.5 * port_var - port_return
    active_assets = int(np.sum(weights > 1e-8))

    scenario_perf = scenario_returns @ weights

    return {
        "Portfolio": name,
        "Expected_Return": port_return,
        "Variance": port_var,
        "Objective": objective,
        "Active_Assets": active_assets,
        "Scenario_Mean": np.mean(scenario_perf),
        "Worst_Case": np.min(scenario_perf),
        "P5": np.percentile(scenario_perf, 5),
        "CVaR": cvar(scenario_perf),
    }


# -----------------------------
# LOAD DATA
# -----------------------------
assets_df = pd.read_csv(
    "investment_dataset_assets.csv"
)
cov_df = pd.read_csv(
    "investment_dataset_covariance.csv",
    index_col=0,
)
scenarios_df = pd.read_csv("investment_dataset_scenarios.csv")

# matched 4-asset data
mu_matched = (
    assets_df.set_index("asset_id")
    .loc[selected_assets]["exp_return"]
    .to_numpy()
)
sigma_matched = cov_df.loc[selected_assets, selected_assets].to_numpy()
scenario_returns = scenarios_df[selected_assets].to_numpy()

# full 50-asset data
mu_full = assets_df["exp_return"].to_numpy()
sigma_full = cov_df.to_numpy()

# -----------------------------
# LOAD CLASSICAL RESULTS
# -----------------------------

# Matched classical weights
matched_weights_df = pd.read_csv(
    "matched_outputs/classical_matched_weights.csv"
)
classical_matched_weights = matched_weights_df["Weight"].to_numpy()

# Challenger weights
challenger_df = pd.read_csv(
    "challenger_outputs/classical_challenger_weights.csv"
)
classical_challenger_weights = challenger_df["discretized_weight"].to_numpy()

scenario_returns_full = scenarios_df[cov_df.columns].to_numpy()


# -----------------------------
# COMPUTE METRICS
# -----------------------------
results = []

# Quantum
results.append(
    compute_metrics(
        quantum_weights,
        mu_matched,
        sigma_matched,
        scenario_returns,
        "Quantum",
    )
)

# Equal weight
results.append(
    compute_metrics(
        equal_weights,
        mu_matched,
        sigma_matched,
        scenario_returns,
        "Equal Weight",
    )
)

# Classical matched
results.append(
    compute_metrics(
        classical_matched_weights,
        mu_matched,
        sigma_matched,
        scenario_returns,
        "Classical Matched",
    )
)

# Classical challenger
results.append(
    compute_metrics(
        classical_challenger_weights,
        mu_full,
        sigma_full,
        scenario_returns_full,
        "Classical Challenger",
    )
)

# -----------------------------
# SAVE RESULTS
# -----------------------------
df = pd.DataFrame(results)

df.to_csv("final_portfolio_comparison.csv", index=False)

print("\n--- FINAL COMPARISON ---")
print(df.round(6))

print("\nSaved to final_portfolio_comparison.csv")