import { motion } from 'framer-motion'
import {
  Binary,
  Cpu,
  Database,
  GitBranch,
  Share2,
  Sigma,
} from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

const steps = [
  {
    icon: Database,
    title: 'Market data',
    body: 'Expected returns and covariance for the tradable set—four liquid names for the quantum slice, extended universe for challengers.',
  },
  {
    icon: Sigma,
    title: 'QUBO formulation',
    body: 'Objective and penalties encoded as a quadratic pseudo-Boolean: discrete weights, budget, and risk terms in one energy landscape.',
  },
  {
    icon: Binary,
    title: 'Ising Hamiltonian',
    body: 'Spin variables replace binary decisions so the problem slots into VQE / QAOA-style circuits and simulators.',
  },
  {
    icon: Cpu,
    title: 'Quantum optimization',
    body: 'Eight qubits explore the energy landscape—four assets × two qubits per asset—searching for low-energy, feasible allocations.',
  },
  {
    icon: Share2,
    title: 'Portfolio weights',
    body: 'Decoded spins become implementable weights, then compared with classical solvers under identical stress scenarios.',
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
  return (
    <section id="method" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            Method
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl">
            From quotes to qubits to allocations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-mist">
            A tight pipeline keeps the story honest: the same risk inputs feed quantum and classical
            programs so judges see a controlled comparison, not a moving target.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="relative"
        >
          <div className="mb-10 hidden justify-center md:flex" aria-hidden>
            <GitBranch className="size-10 text-white/15" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} variants={item} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-10 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-white/12 to-transparent lg:block"
                    aria-hidden
                  />
                )}
                <GlassCard className="flex h-full flex-col p-5 sm:p-6">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-300 ring-1 ring-white/10">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-semibold text-frost">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
                  <span className="mt-4 text-xs font-mono text-white/25">0{i + 1}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-12"
        >
          <GlassCard hover={false} className="relative overflow-hidden p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-frost">
                  Eight-qubit encoding
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
                  Four economically meaningful assets, each represented with two qubits, give four
                  discrete allocation levels per name. The combinatorics are nontrivial but still
                  legible on stage—perfect for a live walkthrough of the spin configuration.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['4 assets', '2 qubits / asset', 'Discrete grid', 'Budget-feasible'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-frost/90 uppercase"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
