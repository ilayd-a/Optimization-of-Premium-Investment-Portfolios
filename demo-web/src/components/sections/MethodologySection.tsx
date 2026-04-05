import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
  Binary,
  Cpu,
  Database,
  GitBranch,
  Share2,
  Sigma,
} from 'lucide-react'
import { MethodologyTechnicalDepth } from '../methodology/MethodologyTechnicalDepth'
import { CircuitShowcase } from './CircuitShowcase'
import { GlassCard } from '../ui/GlassCard'

const steps = [
  {
    icon: Database,
    title: 'Market data',
    body: 'Expected returns μ and covariance Σ on four liquid sleeves—identical moments for classical and quantum solvers.',
    detail:
      'Moments are frozen and shared: every pipeline stage sees the same μ, Σ, and scenario draws so energy gaps and Sharpe comparisons are apples-to-apples.',
  },
  {
    icon: Sigma,
    title: 'QUBO formulation',
    body: 'Turn the constrained portfolio problem into one quadratic energy: risk, return, and a budget penalty in a single objective.',
    detail:
      'The λ·(budget mismatch)² term lets the optimizer stay unconstrained in form; expanded, it feeds the Q matrix together with covariance and returns.',
  },
  {
    icon: Binary,
    title: 'Ising Hamiltonian',
    body: 'Bits become spins so the same energy can drive a quantum circuit: couplings J and fields h from the QUBO.',
    detail:
      'qubo_to_ising matches simulator and QAOA cost Hamiltonian to the discrete energy up to constants you add back when comparing numbers.',
  },
  {
    icon: Cpu,
    title: 'Quantum optimization',
    body: 'QAOA layers alternate a cost evolution with a mixer; classical loops tune the angles.',
    detail:
      'COBYLA, Powell, etc. adjust layer-wise parameters; measured bitstrings decode to sleeve weights and the same μ, Σ used everywhere else.',
  },
  {
    icon: Share2,
    title: 'Portfolio weights',
    body: 'Decoded allocations are turned into implementable weights and compared on the same risk–return footing.',
    detail:
      'Bits → weights respect w_max and budget; metrics in the deck reuse the same μ, Σ as the QUBO build so quantum vs classical is not re-fit on different inputs.',
  },
] as const

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function MethodologySection() {
  const [focused, setFocused] = useState(0)

  return (
    <section id="method" className="px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="deck-section-eyebrow text-cyan-400">Method</p>
          <h2 className="deck-section-title">From quotes to qubits to allocations</h2>
          <p className="deck-section-lead mt-3">
            Same data everywhere—then we compress the portfolio story into a single energy landscape the quantum
            stack can optimize.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-xs text-mist/75 sm:text-sm">
            Tap a step, or skip straight to the bite-sized breakdown below.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="relative"
        >
          <div className="mb-8 hidden justify-center md:flex" aria-hidden>
            <GitBranch className="size-8 text-white/15 sm:size-10" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} variants={item} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-9 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-white/12 to-transparent lg:block"
                    aria-hidden
                  />
                )}
                <GlassCard
                  selected={focused === i}
                  onClick={() => setFocused(i)}
                  className="flex h-full flex-col p-4 sm:p-5"
                >
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-300 ring-1 ring-white/10 sm:size-11">
                    <Icon className="size-[18px] sm:size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-frost sm:text-base">{title}</h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-mist sm:text-sm">{body}</p>
                  <span className="mt-3 text-[10px] font-mono text-white/25">0{i + 1}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 min-h-[5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={focused}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="glass-panel rounded-xl border border-violet-500/20 bg-violet-950/20 px-4 py-4 sm:rounded-2xl sm:px-5 sm:py-4"
            >
              <p className="text-[9px] font-bold tracking-widest text-violet-300/90 uppercase sm:text-[10px]">
                Focus · Step {String(focused + 1).padStart(2, '0')}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-mist sm:text-sm">
                {steps[focused]?.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <MethodologyTechnicalDepth />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10"
        >
          <GlassCard hover={false} className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-frost sm:text-lg md:text-xl">
                  Primary encoding: four qubits
                </h3>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-mist sm:text-sm">
                  One qubit per sleeve, four sleeves—compact, explainable, and aligned with how this
                  deck presents results. A richer eight-qubit model (two qubits per sleeve) refines the
                  allocation grid; we treat it as a follow-on benchmark, not the headline story.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['4 sleeves', '1 qubit each', 'Discrete', 'Budget-feasible'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium tracking-wide text-frost/90 uppercase sm:text-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <CircuitShowcase />
      </div>
    </section>
  )
}
