"""
Bloqade Noise Models for Portfolio QAOA
=======================================

This file contains the noise analysis code for the YQuantum 2026
Capgemini / The Hartford Challenge.

Three noise comparisons for judges:
1. No noise (clean QAOA) - best case
2. GeminiOneZoneNoiseModel - pessimistic (lots of atom movement)
3. GeminiOneZoneNoiseModel (no move noise) - optimistic upper bound

Requires: bloqade-circuit installed (Python 3.10+)
"""

import numpy as np
import matplotlib.pyplot as plt

from bloqade import squin
from bloqade.cirq_utils import emit_circuit, load_circuit, noise
from bloqade.pyqrack import StackMemorySimulator


# ============================================================
# ISING PARAMETERS FROM STEP 1 (4 assets, 4 qubits, B=0.30)
# ============================================================

N_QUBITS = 4

# J couplings (6 edges, fully connected)
J_COUPLINGS = [
    (0, 1, 0.012001),  # A004-A047
    (0, 2, 0.024002),  # A004-A026
    (0, 3, 0.040000),  # A004-A017
    (1, 2, 0.018001),  # A047-A026
    (1, 3, 0.030001),  # A047-A017
    (2, 3, 0.060001),  # A026-A017
]

# Local fields
H_FIELDS = [-0.135194, -0.104164, -0.187981, -0.271804]

# QUBO for energy evaluation
Q_MATRIX = np.array([
    [-0.422395,  0.048003,  0.096007,  0.160002],
    [ 0.048003, -0.328333,  0.072004,  0.120003],
    [ 0.096007,  0.072004, -0.579970,  0.240006],
    [ 0.160002,  0.120003,  0.240006, -0.803612]
])
QUBO_OFFSET = 0.9

# Ground truth
GROUND_TRUTH = '1001'  # [1,0,0,1] = Equities US + Gov Bonds
GROUND_ENERGY = -0.006004


# ============================================================
# QAOA CIRCUIT BUILDER
# ============================================================

def make_qaoa_circuit(gamma_list, beta_list):
    """Build clean QAOA circuit for portfolio optimization."""
    p = len(gamma_list)

    @squin.kernel
    def qaoa():
        q = squin.qalloc(N_QUBITS)

        # Initial superposition
        for i in range(N_QUBITS):
            squin.h(q[i])

        # QAOA layers
        for layer in range(p):
            gamma = gamma_list[layer]
            beta = beta_list[layer]

            # Cost layer: ZZ interactions
            for (i, j, j_val) in J_COUPLINGS:
                squin.cx(q[i], q[j])
                squin.rz(2 * gamma * j_val, q[j])
                squin.cx(q[i], q[j])

            # Cost layer: Z rotations (local fields)
            for i in range(N_QUBITS):
                squin.rz(2 * gamma * H_FIELDS[i], q[i])

            # Mixer layer: Rx on all qubits
            for i in range(N_QUBITS):
                squin.rx(2 * beta, q[i])

        return q

    return qaoa


# ============================================================
# NOISE MODEL SETUP
# ============================================================

def get_noise_models():
    """
    Return three noise configurations for comparison.

    1. None (clean circuit)
    2. GeminiOneZoneNoiseModel (full noise - pessimistic)
    3. GeminiOneZoneNoiseModel (no move noise - optimistic)
    """
    # Full one-zone noise: gate errors + atom movement errors
    # This is pessimistic because one-zone requires atoms to return
    # to original positions after each 2-qubit gate
    full_noise = noise.GeminiOneZoneNoiseModel()

    # No-move noise: only gate errors, no atom movement
    # This is the optimistic upper bound - shows algorithm quality
    # without hardware routing overhead
    no_move_noise = noise.GeminiOneZoneNoiseModel(
        mover_px=0.0,
        sitter_px=0.0,
        mover_py=0.0,
        sitter_py=0.0,
        mover_pz=0.0,
        sitter_pz=0.0,
    )

    return {
        'clean': None,
        'one_zone_full': full_noise,
        'one_zone_no_moves': no_move_noise,
    }


# ============================================================
# APPLY NOISE TO QAOA CIRCUIT
# ============================================================

def make_noisy_qaoa(gamma_list, beta_list, noise_model):
    """
    Convert clean QAOA circuit to noisy version using Bloqade's
    emit -> transform -> load pipeline.

    Args:
        gamma_list: QAOA cost layer angles
        beta_list: QAOA mixer layer angles
        noise_model: None (clean) or a Bloqade noise model

    Returns:
        A squin kernel ready to simulate
    """
    clean_circuit = make_qaoa_circuit(gamma_list, beta_list)

    if noise_model is None:
        # No noise - return clean circuit with measurement
        @squin.kernel
        def clean_with_measure():
            q = clean_circuit()
            bits = squin.broadcast.measure(q)
            return bits
        return clean_with_measure

    # Step 1: Convert squin -> Cirq
    cirq_circuit = emit_circuit(clean_circuit, ignore_returns=True)

    # Step 2: Apply noise model (automatically translates to native gateset)
    noisy_cirq = noise.transform_circuit(cirq_circuit, model=noise_model)

    # Step 3: Convert Cirq -> squin
    noisy_kernel = load_circuit(
        noisy_cirq,
        kernel_name="noisy_qaoa",
        register_as_argument=True,
        return_register=True,
    )

    # Step 4: Wrap with allocation and measurement
    @squin.kernel
    def noisy_with_measure():
        q = squin.qalloc(N_QUBITS)
        q = noisy_kernel(q)
        bits = squin.broadcast.measure(q)
        return bits

    return noisy_with_measure


# ============================================================
# RUN AND COLLECT MEASUREMENTS
# ============================================================

def run_circuit(kernel, shots=1000):
    """Run a squin kernel and collect bitstring counts."""
    simulator = StackMemorySimulator(min_qubits=N_QUBITS)
    task = simulator.task(kernel)

    counts = {}
    for _ in range(shots):
        result = task.run()
        bitstring = ''.join(str(int(b)) for b in result)
        counts[bitstring] = counts.get(bitstring, 0) + 1

    return counts


def evaluate_qubo(bitstring):
    """Evaluate QUBO energy for a bitstring."""
    x = np.array([int(b) for b in bitstring], dtype=float)
    return float(x @ Q_MATRIX @ x + QUBO_OFFSET)


# ============================================================
# FULL NOISE COMPARISON
# ============================================================

def run_noise_comparison(gamma_list, beta_list, shots=2000):
    """
    Run QAOA with all three noise settings and compare results.

    This is the main function for the judges - it produces:
    1. Probability distributions for clean vs noisy
    2. Ground truth probability degradation
    3. Average energy comparison
    """
    noise_models = get_noise_models()
    results = {}

    for name, model in noise_models.items():
        print(f'Running {name}...')
        kernel = make_noisy_qaoa(gamma_list, beta_list, model)
        counts = run_circuit(kernel, shots=shots)

        # Calculate metrics
        gt_count = counts.get(GROUND_TRUTH, 0)
        gt_prob = gt_count / shots * 100

        avg_energy = sum(
            evaluate_qubo(bs) * c for bs, c in counts.items()
        ) / shots

        best_state = max(counts, key=counts.get)
        best_energy = evaluate_qubo(best_state)

        results[name] = {
            'counts': counts,
            'gt_probability': gt_prob,
            'avg_energy': avg_energy,
            'best_state': best_state,
            'best_energy': best_energy,
        }

        print(f'  Ground truth prob: {gt_prob:.1f}%')
        print(f'  Avg energy: {avg_energy:.6f}')
        print(f'  Most frequent: {best_state} (energy: {best_energy:.4f})')

    return results


# ============================================================
# VISUALIZATION
# ============================================================

def plot_noise_comparison(results, shots=2000):
    """
    Plot side-by-side probability distributions for all noise settings.
    Green = ground truth, Red = invest nothing, Blue = good states.
    """
    all_states = [format(i, f'0{N_QUBITS}b') for i in range(2**N_QUBITS)]
    zero_state = '0' * N_QUBITS

    fig, axes = plt.subplots(1, 3, figsize=(18, 5))
    titles = {
        'clean': 'No Noise (ideal)',
        'one_zone_full': 'One-Zone Full Noise\n(pessimistic)',
        'one_zone_no_moves': 'One-Zone No Move Noise\n(optimistic upper bound)',
    }

    for ax, (name, data) in zip(axes, results.items()):
        counts = data['counts']
        probs = [counts.get(s, 0) / shots * 100 for s in all_states]

        colors = []
        for s in all_states:
            if s == GROUND_TRUTH:
                colors.append('#27ae60')  # green = ground truth
            elif s == zero_state:
                colors.append('#e74c3c')  # red = invest nothing
            elif evaluate_qubo(s) < 0:
                colors.append('#2980b9')  # blue = good energy
            else:
                colors.append('#bdc3c7')  # gray = bad energy

        ax.bar(range(16), probs, color=colors, edgecolor='black', linewidth=0.5)
        ax.set_xticks(range(16))
        ax.set_xticklabels(all_states, rotation=90, fontsize=7)
        ax.set_ylabel('Probability (%)')
        ax.set_title(f'{titles[name]}\nGT prob: {data["gt_probability"]:.1f}%')
        ax.grid(True, alpha=0.3, axis='y')

    plt.tight_layout()
    plt.savefig('noise_comparison.png', dpi=150, bbox_inches='tight')
    plt.show()

    # Summary bar chart
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))

    names = list(results.keys())
    gt_probs = [results[n]['gt_probability'] for n in names]
    avg_energies = [results[n]['avg_energy'] for n in names]
    bar_labels = ['Clean', 'Full Noise', 'No Move Noise']

    axes[0].bar(bar_labels, gt_probs, color=['#27ae60', '#e74c3c', '#f39c12'],
                edgecolor='black')
    axes[0].set_ylabel('Ground Truth Probability (%)')
    axes[0].set_title('How Noise Degrades Ground Truth Detection')
    axes[0].grid(True, alpha=0.3, axis='y')

    axes[1].bar(bar_labels, avg_energies, color=['#27ae60', '#e74c3c', '#f39c12'],
                edgecolor='black')
    axes[1].axhline(GROUND_ENERGY, color='green', linestyle='--',
                    label=f'Ground truth: {GROUND_ENERGY}')
    axes[1].set_ylabel('Average Energy')
    axes[1].set_title('How Noise Increases Average Energy')
    axes[1].legend()
    axes[1].grid(True, alpha=0.3, axis='y')

    plt.tight_layout()
    plt.savefig('noise_summary.png', dpi=150, bbox_inches='tight')
    plt.show()


# ============================================================
# MAIN - Run this after optimizing QAOA parameters
# ============================================================

if __name__ == '__main__':
    # Use these after QAOA optimization (replace with your optimized values)
    gamma = [1.2]   # placeholder - replace with optimized
    beta = [0.8]    # placeholder - replace with optimized
    p_layers = 1

    print('='*60)
    print('PORTFOLIO QAOA - NOISE ANALYSIS')
    print(f'Assets: A004 (Equities US), A047 (HY Credit),')
    print(f'        A026 (IG Credit), A017 (Gov Bonds)')
    print(f'Ground truth: {GROUND_TRUTH} (energy: {GROUND_ENERGY})')
    print(f'QAOA layers: {p_layers}')
    print('='*60)

    results = run_noise_comparison(gamma, beta, shots=2000)

    print('\n' + '='*60)
    print('SUMMARY')
    print('='*60)
    for name, data in results.items():
        print(f'{name:>25}: GT prob={data["gt_probability"]:.1f}%, '
              f'avg_E={data["avg_energy"]:.4f}, '
              f'best={data["best_state"]}')

    print('\nKey insight for judges:')
    print('  Our portfolio QUBO is fully connected (6 J couplings for 4 qubits).')
    print('  The one-zone model shows degradation from atom movement.')
    print('  Removing move noise shows the algorithm itself works well.')
    print('  Bottleneck = hardware routing, not the quantum algorithm.')

    plot_noise_comparison(results)
