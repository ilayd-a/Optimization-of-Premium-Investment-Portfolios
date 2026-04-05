#!/usr/bin/env python3
"""Decode embedded image/png outputs from Jupyter notebooks into demo-web/public/notebook-figures/."""

from __future__ import annotations

import base64
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "demo-web" / "public" / "notebook-figures"

NOTEBOOKS = [
    ("QUBO_ISING_4F4Q.ipynb", "qubo_4f4q"),
    ("QUBO_ISING_8F8Q.ipynb", "qubo_8f8q"),
    ("QAOA_4F1Q_4Q.ipynb", "qaoa_4f1q_4q"),
    ("QAOA_4F2Q_8Q.ipynb", "qaoa_4f2q_8q"),
    ("QAOA_8F1Q_8Q.ipynb", "qaoa_8f1q_8q"),
    ("Classical_Solution.ipynb", "classical_solution"),
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest: list[dict[str, str]] = []
    for fname, slug in NOTEBOOKS:
        nb_path = ROOT / fname
        if not nb_path.is_file():
            print("skip (missing):", nb_path)
            continue
        nb = json.loads(nb_path.read_text())
        idx = 0
        for cell in nb.get("cells", []):
            for out in cell.get("outputs", []):
                data = out.get("data") or {}
                b64 = data.get("image/png")
                if not b64:
                    continue
                if isinstance(b64, list):
                    b64 = "".join(b64)
                raw = base64.b64decode(b64)
                name = f"{slug}_{idx:02d}.png"
                (OUT / name).write_bytes(raw)
                manifest.append({"file": name, "notebook": slug})
                idx += 1
        print(f"{fname}: {idx} images")
    (OUT / "_manifest.json").write_text(json.dumps(manifest, indent=2))
    print("wrote", OUT, "total", len(manifest))


if __name__ == "__main__":
    main()
