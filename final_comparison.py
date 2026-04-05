#!/usr/bin/env python3
"""CLI wrapper for final comparison table (see ``src/comparison/final_comparison.py``)."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

import config as project_config  # noqa: E402
from comparison.final_comparison import run_final_comparison  # noqa: E402
from quantum.solver import get_quantum_weights  # noqa: E402


def main() -> None:
    paths = project_config.PATHS
    out = project_config.OUTPUTS
    parser = argparse.ArgumentParser(description="Build final portfolio comparison CSV.")
    parser.add_argument("--assets-file", type=str, default=str(paths["assets"]))
    parser.add_argument("--cov-file", type=str, default=str(paths["covariance"]))
    parser.add_argument("--scenarios-file", type=str, default=str(paths["scenarios"]))
    parser.add_argument(
        "--matched-weights",
        type=str,
        default=str(out["matched"] / "classical_matched_weights.csv"),
    )
    parser.add_argument(
        "--challenger-weights",
        type=str,
        default=str(out["challenger"] / "classical_challenger_weights.csv"),
    )
    parser.add_argument(
        "--output",
        type=str,
        default=str(out["final"] / "final_comparison.csv"),
    )
    parser.add_argument(
        "--risk-aversion",
        type=float,
        default=project_config.RISK_AVERSION_Q,
    )
    args = parser.parse_args()

    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    run_final_comparison(
        selected_assets=project_config.SELECTED_ASSETS,
        q=args.risk_aversion,
        quantum_weights=get_quantum_weights(),
        assets_path=args.assets_file,
        cov_path=args.cov_file,
        scenarios_path=args.scenarios_file,
        matched_weights_csv=args.matched_weights,
        challenger_weights_csv=args.challenger_weights,
        output_path=args.output,
        verbose=True,
    )


if __name__ == "__main__":
    main()
