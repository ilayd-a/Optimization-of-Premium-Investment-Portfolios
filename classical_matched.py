import argparse
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.optimize import minimize


def portfolio_return(weights: np.ndarray, mu: np.ndarray) -> float:
    return float(np.dot(mu, weights))


def portfolio_variance(weights: np.ndarray, sigma: np.ndarray) -> float:
    return float(weights.T @ sigma @ weights)


def objective(weights: np.ndarray, mu: np.ndarray, sigma: np.ndarray, q: float) -> float:
    # Minimize: q * risk - return
    return q * portfolio_variance(weights, sigma) - portfolio_return(weights, mu)


def cvar(returns: np.ndarray, alpha: float = 5.0) -> float:
    """
    Conditional Value at Risk (CVaR):
    average return in the worst alpha% of scenarios.
    """
    threshold = np.percentile(returns, alpha)
    tail = returns[returns <= threshold]
    if len(tail) == 0:
        return float(threshold)
    return float(np.mean(tail))


def main():
    parser = argparse.ArgumentParser(
        description="Matched classical baseline on the same 4 assets as the quantum portfolio."
    )
    parser.add_argument(
        "--assets-file",
        type=str,
        default="investment_dataset_assets.csv",
        help="CSV file containing asset information and expected returns.",
    )
    parser.add_argument(
        "--cov-file",
        type=str,
        default="investment_dataset_covariance.csv",
        help="CSV file containing covariance matrix.",
    )
    parser.add_argument(
        "--scenarios-file",
        type=str,
        default="investment_dataset_scenarios.csv",
        help="CSV file containing scenario returns for stress testing.",
    )
    parser.add_argument(
        "--risk-aversion",
        type=float,
        default=0.5,
        help="Risk aversion parameter q.",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="matched_outputs",
        help="Directory to save outputs.",
    )
    args = parser.parse_args()

    selected_assets = ["A004", "A047", "A026", "A017"]

    assets_path = Path(args.assets_file)
    cov_path = Path(args.cov_file)
    scenarios_path = Path(args.scenarios_file)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    if not assets_path.exists():
        raise FileNotFoundError(f"Assets file not found: {assets_path}")
    if not cov_path.exists():
        raise FileNotFoundError(f"Covariance file not found: {cov_path}")
    if not scenarios_path.exists():
        raise FileNotFoundError(f"Scenarios file not found: {scenarios_path}")

    # Load data
    assets_df = pd.read_csv(assets_path)
    cov_df = pd.read_csv(cov_path, index_col=0)
    scenarios_df = pd.read_csv(scenarios_path)

    # Basic validation
    if "asset_id" not in assets_df.columns:
        raise ValueError("Assets file must contain an 'asset_id' column.")
    if "exp_return" not in assets_df.columns:
        raise ValueError("Assets file must contain an 'exp_return' column.")

    missing_assets_assets = [a for a in selected_assets if a not in assets_df["asset_id"].values]
    if missing_assets_assets:
        raise ValueError(f"These selected assets are missing from assets file: {missing_assets_assets}")

    missing_assets_cov = [a for a in selected_assets if a not in cov_df.index or a not in cov_df.columns]
    if missing_assets_cov:
        raise ValueError(f"These selected assets are missing from covariance file: {missing_assets_cov}")

    missing_assets_scen = [a for a in selected_assets if a not in scenarios_df.columns]
    if missing_assets_scen:
        raise ValueError(f"These selected assets are missing from scenarios file: {missing_assets_scen}")

    # Filter to the same 4 assets as the quantum model
    matched_assets_df = (
        assets_df.set_index("asset_id")
        .loc[selected_assets]
        .reset_index()
    )
    matched_cov_df = cov_df.loc[selected_assets, selected_assets]

    mu = matched_assets_df["exp_return"].to_numpy(dtype=float)
    sigma = matched_cov_df.to_numpy(dtype=float)
    n_assets = len(selected_assets)
    q = args.risk_aversion

    # Classical optimization with same 4 assets
    bounds = [(0.0, 1.0) for _ in range(n_assets)]
    constraints = [{"type": "eq", "fun": lambda w: np.sum(w) - 1.0}]
    initial_guess = np.full(n_assets, 1.0 / n_assets)

    result = minimize(
        objective,
        initial_guess,
        args=(mu, sigma, q),
        method="SLSQP",
        bounds=bounds,
        constraints=constraints,
    )

    if not result.success:
        raise RuntimeError(f"Optimization failed: {result.message}")

    classical_weights = result.x

    # Portfolio metrics
    expected_return = portfolio_return(classical_weights, mu)
    variance = portfolio_variance(classical_weights, sigma)
    obj_value = objective(classical_weights, mu, sigma, q)
    active_assets = int(np.sum(classical_weights > 1e-8))

    # Stress test on the same scenarios
    scenario_returns = scenarios_df[selected_assets].to_numpy(dtype=float)
    scenario_perf = scenario_returns @ classical_weights

    mean_return = float(np.mean(scenario_perf))
    std_dev = float(np.std(scenario_perf))
    worst_case = float(np.min(scenario_perf))
    best_case = float(np.max(scenario_perf))
    p5 = float(np.percentile(scenario_perf, 5))
    p95 = float(np.percentile(scenario_perf, 95))
    cvar_5 = cvar(scenario_perf, alpha=5)

    # Save asset weights
    weights_df = pd.DataFrame(
        {
            "Asset_ID": selected_assets,
            "Weight": classical_weights,
            "Expected_Return": mu,
        }
    ).sort_values("Weight", ascending=False)

    # Save summary
    summary_df = pd.DataFrame(
        [
            {
                "Portfolio": "Classical_Matched_4_Asset",
                "Risk_Aversion_q": q,
                "Expected_Return": expected_return,
                "Variance": variance,
                "Objective": obj_value,
                "Active_Assets": active_assets,
                "Scenario_Mean_Return": mean_return,
                "Scenario_Std_Dev": std_dev,
                "Scenario_Worst_Case": worst_case,
                "Scenario_Best_Case": best_case,
                "Scenario_5th_Percentile": p5,
                "Scenario_95th_Percentile": p95,
                "Scenario_CVaR_5": cvar_5,
            }
        ]
    )

    # Save detailed scenario results
    scenario_results_df = pd.DataFrame(
        {
            "Scenario_ID": np.arange(1, len(scenario_perf) + 1),
            "Classical_Matched_Return": scenario_perf,
        }
    )

    weights_df.to_csv(output_dir / "classical_matched_weights.csv", index=False)
    summary_df.to_csv(output_dir / "classical_matched_summary.csv", index=False)
    scenario_results_df.to_csv(output_dir / "classical_matched_scenarios.csv", index=False)

    # Print clean report
    print("\n--- CLASSICAL MATCHED BASELINE RESULTS ---")
    print(f"Selected Assets: {selected_assets}")
    print(f"Risk aversion q: {q}")
    print(f"Expected Return: {expected_return:.4%}")
    print(f"Variance: {variance:.6f}")
    print(f"Objective: {obj_value:.6f}")
    print(f"Active Assets: {active_assets}")
    print(f"Weight Sum: {classical_weights.sum():.6f}")

    print("\nWeights:")
    for asset, weight in zip(selected_assets, classical_weights):
        print(f"  {asset}: {weight:.4%}")

    print("\n--- STRESS TEST METRICS ---")
    print(f"Mean Return: {mean_return:.4%}")
    print(f"Std Dev: {std_dev:.4%}")
    print(f"Worst Case: {worst_case:.4%}")
    print(f"Best Case: {best_case:.4%}")
    print(f"5th Percentile: {p5:.4%}")
    print(f"95th Percentile: {p95:.4%}")
    print(f"CVaR (Worst 5% Avg): {cvar_5:.4%}")

    print(f"\nSaved weights to: {output_dir / 'classical_matched_weights.csv'}")
    print(f"Saved summary to: {output_dir / 'classical_matched_summary.csv'}")
    print(f"Saved scenario results to: {output_dir / 'classical_matched_scenarios.csv'}")


if __name__ == "__main__":
    main()