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
import { CircuitShowcase } from './CircuitShowcase'
import { GlassCard } from '../ui/GlassCard'

const steps = [
  {
    icon: Database,
    title: 'Market data',
    body: 'Expected returns and covariance on four liquid sleeves—the core tradable set for the quantum formulation.',
    detail:
      'Timestamps aligned, outliers controlled, and moments frozen so every optimizer sees identical inputs.',
  },
  {
    icon: Sigma,
    title: 'QUBO formulation',
    body: 'Objective and penalties as a quadratic pseudo-Boolean: discrete weights, budget, and risk in one energy landscape.',
    detail:
      'Binary variables stand in for sleeve inclusion; penalties enforce the budget and rule out infeasible patterns.',
  },
  {
    icon: Binary,
    title: 'Ising Hamiltonian',
    body: 'Spins replace binary decisions so the problem runs on VQE / QAOA-style circuits and simulators.',
    detail: 'A standard change of variables maps QUBO → Ising so energies match measurable qubit expectations.',
  },
  {
    icon: Cpu,
    title: 'Quantum optimization',
    body: 'Four qubits—one per sleeve—search the discrete energy landscape for low-energy, budget-feasible allocations.',
    detail:
      'Parameterized circuits prepare trial states; classical outer loops tune angles until bitstrings decode to implementable weights.',
  },
  {
    icon: Share2,
    title: 'Portfolio weights',
    body: 'Decoded spins become sleeve weights, then stack against classical baselines on the same moments.',
    detail:
      'Post-processing enforces budgets and maps bits to economic sleeves before any risk comparison.',
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
            One pipeline: identical risk inputs for every solver so comparisons stay fair.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-xs text-mist/75 sm:text-sm">Select a step for detail.</p>
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
