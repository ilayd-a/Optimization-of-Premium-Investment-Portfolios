#!/usr/bin/env python3
"""CLI wrapper for matched classical baseline (see ``src/classical/matched.py``)."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

import config as project_config  # noqa: E402
from classical.matched import run_classical_matched  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Matched classical baseline on the same assets as the quantum portfolio."
    )
    parser.add_argument("--assets-file", type=str, default=str(project_config.PATHS["assets"]))
    parser.add_argument("--cov-file", type=str, default=str(project_config.PATHS["covariance"]))
    parser.add_argument("--scenarios-file", type=str, default=str(project_config.PATHS["scenarios"]))
    parser.add_argument(
        "--risk-aversion",
        type=float,
        default=project_config.RISK_AVERSION_Q,
        help="Risk aversion parameter q.",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=str(project_config.OUTPUTS["matched"]),
        help="Directory for classical_matched_*.csv outputs.",
    )
    args = parser.parse_args()

    run_classical_matched(
        selected_assets=project_config.SELECTED_ASSETS,
        q=args.risk_aversion,
        assets_path=args.assets_file,
        cov_path=args.cov_file,
        scenarios_path=args.scenarios_file,
        output_dir=args.output_dir,
        verbose=True,
    )


if __name__ == "__main__":
    main()
