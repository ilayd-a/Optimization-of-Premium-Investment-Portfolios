#!/usr/bin/env python3
"""CLI wrapper for quantum vs equal-weight stress test (see ``src/evaluation/stress_test.py``)."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

import config as project_config  # noqa: E402
from evaluation.stress_test import run_stress_test  # noqa: E402
from quantum.solver import get_quantum_weights  # noqa: E402
from utils.data_loader import load_scenarios  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="Portfolio stress tests on scenario data.")
    parser.add_argument(
        "--scenarios-file",
        type=str,
        default=str(project_config.PATHS["scenarios"]),
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=str(project_config.OUTPUTS["stress"]),
        help="Writes stress_scenarios.csv, stress_summary.csv, stress_comparison.csv.",
    )
    args = parser.parse_args()

    scenarios_df = load_scenarios(args.scenarios_file)
    run_stress_test(
        quantum_weights=get_quantum_weights(),
        selected_assets=project_config.SELECTED_ASSETS,
        scenarios_df=scenarios_df,
        output_dir=args.output_dir,
        verbose=True,
    )


if __name__ == "__main__":
    main()
