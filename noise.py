"""
Post-processing noise on quantum portfolio weights (hardware-inspired heuristics).

This is not Bloqade circuit noise; it models **readout / calibration uncertainty** on the
recovered weight vector used by ``evaluation`` and ``comparison``:

- **dirichlet**: sample ``w' ~ Dirichlet(α w)`` then normalize — higher ``α`` = tighter around ``w``.
- **gaussian**: multiplicative log-normal style ``w' ∝ max(w ⊙ exp(σ ε), ε)`` then normalize.
"""

from __future__ import annotations

from typing import Literal

import numpy as np

NoiseMode = Literal["dirichlet", "gaussian", "none"]


def apply_dirichlet_noise(
    weights: np.ndarray,
    concentration: float,
    rng: np.random.Generator,
) -> np.ndarray:
    """
    Dirichlet perturbation around normalized ``weights``.

    Args:
        weights: Non-negative, will be normalized before sampling.
        concentration: α in Dirichlet(α w). Larger α → less dispersion (≈ more "shots").
    """
    w = np.asarray(weights, dtype=float)
    w = w / w.sum()
    alpha = np.maximum(concentration * w, 1e-12)
    sample = rng.dirichlet(alpha)
    return sample / sample.sum()


def apply_gaussian_multiplicative_noise(
    weights: np.ndarray,
    sigma: float,
    rng: np.random.Generator,
) -> np.ndarray:
    """
    Multiplicative log-normal noise: ``w' ∝ clip(w * exp(sigma * z), eps)``, renormalized.
    """
    w = np.asarray(weights, dtype=float)
    w = w / w.sum()
    z = rng.standard_normal(w.shape)
    w2 = w * np.exp(sigma * z)
    w2 = np.maximum(w2, 1e-12)
    return w2 / w2.sum()


def apply_weight_noise(
    weights: np.ndarray,
    mode: NoiseMode,
    *,
    concentration: float = 80.0,
    sigma: float = 0.15,
    rng: np.random.Generator | None = None,
) -> np.ndarray:
    """
    Apply configured noise; ``mode=\"none\"`` returns normalized weights unchanged (up to float error).
    """
    w = np.asarray(weights, dtype=float)
    if rng is None:
        rng = np.random.default_rng()
    if mode == "none":
        return w / w.sum()
    if mode == "dirichlet":
        return apply_dirichlet_noise(w, concentration, rng)
    if mode == "gaussian":
        return apply_gaussian_multiplicative_noise(w, sigma, rng)
    raise ValueError(f"Unknown noise mode: {mode!r}")
