#!/usr/bin/env python3
"""
Regenerate noiseless ⟨E⟩ samples for CLASSICAL_SOLUTION_GD_TRACES['clean'] in demo-web.

Requires: pip install qiskit qiskit-aer numpy
Same 8Q Hamiltonian and P=1 QAOA as Classical_Solution.ipynb (noiseless GD cell).
"""
from __future__ import annotations

import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

N = 8
H_TERMS = [
    (0, -0.019730),
    (1, -0.039461),
    (2, -0.014721),
    (3, -0.029441),
    (4, -0.028659),
    (5, -0.057318),
    (6, -0.047267),
    (7, -0.094534),
]
J_TERMS = [
    (0, 1, 0.007132),
    (0, 2, 0.002667),
    (0, 3, 0.005334),
    (0, 4, 0.005334),
    (0, 5, 0.010667),
    (0, 6, 0.008889),
    (0, 7, 0.017778),
    (1, 2, 0.005334),
    (1, 3, 0.010667),
    (1, 4, 0.010667),
    (1, 5, 0.021335),
    (1, 6, 0.017778),
    (1, 7, 0.035555),
    (2, 3, 0.004005),
    (2, 4, 0.004000),
    (2, 5, 0.008000),
    (2, 6, 0.006667),
    (2, 7, 0.013335),
    (3, 4, 0.008000),
    (3, 5, 0.016000),
    (3, 6, 0.013335),
    (3, 7, 0.026665),
    (4, 5, 0.016005),
    (4, 6, 0.013335),
    (4, 7, 0.026667),
    (5, 6, 0.026667),
    (5, 7, 0.053335),
    (6, 7, 0.044450),
]

h = np.zeros(N)
J = np.zeros((N, N))
for i, hi in H_TERMS:
    h[i] = hi
for i, j, jij in J_TERMS:
    J[i, j] = jij
    J[j, i] = jij


def ising_e(bits: str) -> float:
    s = np.array([1 if bits[k] == "1" else -1 for k in range(N)], dtype=float)
    e = 0.0
    for i in range(N):
        e += h[i] * s[i]
    for i in range(N):
        for j in range(i + 1, N):
            e += J[i, j] * s[i] * s[j]
    return float(e)


def qaoa_statevector(gamma: float, beta: float) -> Statevector:
    qc = QuantumCircuit(N)
    for i in range(N):
        qc.h(i)
    for i in range(N):
        qc.rz(2 * gamma * h[i], i)
    for i in range(N):
        for j in range(i + 1, N):
            if J[i, j] != 0:
                qc.cx(i, j)
                qc.rz(2 * gamma * J[i, j], j)
                qc.cx(i, j)
    for i in range(N):
        qc.rx(2 * beta, i)
    return Statevector(qc)


def expected_e(gamma: float, beta: float) -> float:
    sv = qaoa_statevector(gamma, beta)
    e = 0.0
    for idx in range(2**N):
        amp = sv[idx]
        p = float(abs(amp) ** 2)
        bits = format(idx, f"0{N}b")
        e += p * ising_e(bits)
    return e


def grad(theta: np.ndarray, eps: float) -> np.ndarray:
    g = np.zeros(2)
    for i in range(2):
        tp = theta.copy()
        tp[i] += eps
        tm = theta.copy()
        tm[i] -= eps
        g[i] = (expected_e(tp[0], tp[1]) - expected_e(tm[0], tm[1])) / (2 * eps)
    return g


def main() -> None:
    lr = 0.5
    eps = 1e-4
    epochs = 1000
    sample = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 999]
    theta = np.array([0.3, 0.2], dtype=float)
    for epoch in range(epochs):
        cur = expected_e(theta[0], theta[1])
        if epoch in sample:
            print(f"{epoch}\t{cur:.9f}")
        theta = theta - lr * grad(theta, eps)


if __name__ == "__main__":
    main()
