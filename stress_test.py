import argparse
from pathlib import Path

import numpy as np
import pandas as pd


def compute_metrics(portfolio_returns: np.ndarray, name: str) -> dict:
    """Compute summary statistics for a portfolio return series."""
    return {
        "Portfolio": name,
        "Mean_Return": portfolio_returns.mean(),
        "Std_Dev": portfolio_returns.std(),
        "Worst_Scenario": portfolio_returns.min(),
        "Best_Scenario": portfolio_returns.max(),
        "Median_Return": np.median(portfolio_returns),
        "5th_Percentile": np.percentile(portfolio_returns, 5),
        "95th_Percentile": np.percentile(portfolio_returns, 95),
    }


def format_pct(x: float) -> str:
    """Format decimal return as percentage string."""
    return f"{x:.4%}"


def main():
    parser = argparse.ArgumentParser(description="Run portfolio stress tests on scenario data.")
    parser.add_argument(
        "--scenarios-file",
        type=str,
        default="investment_dataset_scenarios.csv",
        help="Path to CSV containing scenario returns.",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="stress_test_outputs",
        help="Directory to save output CSV files.",
    )
    args = parser.parse_args()

    # =========================
    # 1. Load scenario data
    # =========================
    scenarios_path = Path(args.scenarios_file)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    if not scenarios_path.exists():
        raise FileNotFoundError(f"Scenario file not found: {scenarios_path}")

    scenarios_df = pd.read_csv(scenarios_path)

    # =========================
    # 2. Define assets + weights
    # =========================
    # 4 assets x 2 qubits model
    # Cash (A007), Gov Bond (A014), US Equity (A004), Real Estate (A022)
    selected_assets = ["A007", "A014", "A004", "A022"]

    missing_assets = [asset for asset in selected_assets if asset not in scenarios_df.columns]
    if missing_assets:
        raise ValueError(
            f"The following selected assets are missing from the scenario file: {missing_assets}"
        )

    # Replace these with the actual discrete output from your team
    # Example: solver output [2, 1, 3, 0]
    raw_quantum_weights = np.array([2, 1, 3, 0], dtype=float)

    if np.any(raw_quantum_weights < 0):
        raise ValueError("Quantum weights must be nonnegative for this stress test.")

    if raw_quantum_weights.sum() == 0:
        raise ValueError("Quantum weights sum to zero. Please provide a valid solution.")

    # Normalize for comparison against equal-weight baseline
    quantum_weights = raw_quantum_weights / raw_quantum_weights.sum()

    # Classical baseline
    equal_weights = np.full(len(selected_assets), 1 / len(selected_assets))

    # =========================
    # 3. Calculate scenario performance
    # =========================
    scenario_returns = scenarios_df[selected_assets].to_numpy()

    quantum_perf = scenario_returns @ quantum_weights
    equal_perf = scenario_returns @ equal_weights
    difference = quantum_perf - equal_perf

    # =========================
    # 4. Scenario-by-scenario results
    # =========================
    stress_test_results = pd.DataFrame(
        {
            "Scenario_ID": np.arange(1, len(quantum_perf) + 1),
            "Quantum_Return": quantum_perf,
            "Equal_Weight_Return": equal_perf,
            "Difference": difference,
            "Quantum_Better": quantum_perf > equal_perf,
        }
    )

    # =========================
    # 5. Summary metrics
    # =========================
    quantum_metrics = compute_metrics(quantum_perf, "Quantum")
    equal_metrics = compute_metrics(equal_perf, "Equal_Weight")

    summary_df = pd.DataFrame([quantum_metrics, equal_metrics])

    resilience_advantage = quantum_perf.min() - equal_perf.min()
    mean_advantage = quantum_perf.mean() - equal_perf.mean()
    win_rate = np.mean(quantum_perf > equal_perf)

    comparison_df = pd.DataFrame(
        [
            {
                "Metric": "Mean_Advantage",
                "Value": mean_advantage,
            },
            {
                "Metric": "Worst_Case_Advantage",
                "Value": resilience_advantage,
            },
            {
                "Metric": "Win_Rate",
                "Value": win_rate,
            },
            {
                "Metric": "5th_Percentile_Advantage",
                "Value": np.percentile(quantum_perf, 5) - np.percentile(equal_perf, 5),
            },
        ]
    )

    # =========================
    # 6. Print report
    # =========================
    print("\n--- STRESS TEST SUMMARY ---")
    print(f"Total Scenarios Analyzed: {len(quantum_perf)}")
    print(f"Selected Assets: {selected_assets}")
    print(f"Raw Quantum Weights: {raw_quantum_weights.tolist()}")
    print(f"Normalized Quantum Weights: {quantum_weights.round(4).tolist()}")
    print(f"Equal Weights: {equal_weights.round(4).tolist()}")

    print("\n--- QUANTUM PORTFOLIO ---")
    print(f"Average Return: {format_pct(quantum_metrics['Mean_Return'])}")
    print(f"Std Dev: {format_pct(quantum_metrics['Std_Dev'])}")
    print(f"Worst Scenario: {format_pct(quantum_metrics['Worst_Scenario'])}")
    print(f"Best Scenario: {format_pct(quantum_metrics['Best_Scenario'])}")
    print(f"5th Percentile: {format_pct(quantum_metrics['5th_Percentile'])}")
    print(f"95th Percentile: {format_pct(quantum_metrics['95th_Percentile'])}")

    print("\n--- EQUAL WEIGHT BASELINE ---")
    print(f"Average Return: {format_pct(equal_metrics['Mean_Return'])}")
    print(f"Std Dev: {format_pct(equal_metrics['Std_Dev'])}")
    print(f"Worst Scenario: {format_pct(equal_metrics['Worst_Scenario'])}")
    print(f"Best Scenario: {format_pct(equal_metrics['Best_Scenario'])}")
    print(f"5th Percentile: {format_pct(equal_metrics['5th_Percentile'])}")
    print(f"95th Percentile: {format_pct(equal_metrics['95th_Percentile'])}")

    print("\n--- COMPARISON ---")
    print(f"Mean Advantage (Quantum - Equal): {format_pct(mean_advantage)}")
    print(f"Worst-Case Advantage: {format_pct(resilience_advantage)}")
    print(
        f"5th Percentile Advantage: "
        f"{format_pct(np.percentile(quantum_perf, 5) - np.percentile(equal_perf, 5))}"
    )
    print(f"Quantum beats Equal in {win_rate:.2%} of scenarios")

    # =========================
    # 7. Save outputs
    # =========================
    stress_test_results.to_csv(output_dir / "portfolio_stress_results.csv", index=False)
    summary_df.to_csv(output_dir / "portfolio_summary_metrics.csv", index=False)
    comparison_df.to_csv(output_dir / "portfolio_comparison_metrics.csv", index=False)

    print(f"\nSaved detailed scenario results to: {output_dir / 'portfolio_stress_results.csv'}")
    print(f"Saved portfolio summary metrics to: {output_dir / 'portfolio_summary_metrics.csv'}")
    print(f"Saved comparison metrics to: {output_dir / 'portfolio_comparison_metrics.csv'}")


if __name__ == "__main__":
    main()