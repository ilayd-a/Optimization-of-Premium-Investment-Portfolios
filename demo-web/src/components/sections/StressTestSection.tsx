import { motion } from 'framer-motion'
import { Radio, Scale, Sparkles, Target, TrendingDown } from 'lucide-react'
import {
  QAOA_4F1Q_COBYLA_BY_P,
  QAOA_4F1Q_GROUND_TRUTH_ENERGY,
  QUBO_4F4Q_RANKED,
} from '../../data/presentationData'
import { GlassCard } from '../ui/GlassCard'

export function StressTestSection() {
  const ground = QUBO_4F4Q_RANKED[0]
  const worst = QUBO_4F4Q_RANKED[15]
  const qaoaP3 = QAOA_4F1Q_COBYLA_BY_P[2]
  const eGround = QAOA_4F1Q_GROUND_TRUTH_ENERGY
  const gapEnergy = qaoaP3.expectedEnergy - eGround

  const findings = [
    {
      icon: Target,
      title: 'The QUBO ranking has a clear head',
      line: (
        <>
          Full enumeration of the 4Q problem puts the best allocation at bitstring{' '}
          <strong className="text-frost/95">{ground.state}</strong> with objective{' '}
          <strong className="text-frost/95">{ground.objective.toFixed(4)}</strong>. That is the classical
          discrete story we compare everything else against.
        </>
      ),
      accent: 'from-violet-500/25',
    },
    {
      icon: TrendingDown,
      title: 'QAOA depth helped—but did not close the gap',
      line: (
        <>
          From P = 1 → 3 we saw ⟨E⟩ fall sharply; at P = 3 the strongest sampled bitstring matches the
          ground state <strong className="text-frost/95">{ground.state}</strong>. Even so, ⟨E⟩ at P = 3
          remains about <strong className="text-frost/95">{gapEnergy.toFixed(3)}</strong> above the
          classical Ising ground energy ({eGround.toFixed(4)}).
        </>
      ),
      accent: 'from-amber-500/25',
    },
    {
      icon: Scale,
      title: 'Most discrete states are nowhere near optimal',
      line: (
        <>
          The objective spread from best to worst is enormous on the same scale—the tail includes values
          near <strong className="text-frost/95">{worst.objective.toFixed(2)}</strong> ({worst.state}).
          Stress here means: a wrong bitstring is not a small miss.
        </>
      ),
      accent: 'from-rose-500/20',
    },
    {
      icon: Radio,
      title: 'Noise lifted average energy in our runs',
      line: (
        <>
          In the notebook noise sweeps, clean simulations sat lowest; one-zone noise models pushed{' '}
          <strong className="text-frost/95">average energy</strong> up, with full noise worst and a
          “no move” upper bound in between—still far from the target line. Plots are on Results.
        </>
      ),
      accent: 'from-cyan-500/20',
    },
  ] as const

  return (
    <section id="stress" className="px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <p className="deck-section-eyebrow text-amber-400">What we found</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-frost sm:text-3xl md:text-4xl">
            Under discrete stress
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-snug text-mist sm:text-lg">
            Concrete outcomes from the 4Q QUBO table, the QAOA depth sweep, and the noise summaries—not
            generic advice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 text-center sm:px-8 sm:py-6"
        >
          <p className="text-xs font-semibold tracking-widest text-amber-300/90 uppercase">
            Bottom line from the runs
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-base font-medium leading-snug text-frost sm:text-lg">
            Enumeration is decisive on the discrete grid; QAOA moves probability and ⟨E⟩ in the right
            direction with depth, but energy and noise still leave headroom versus the classical ground.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {findings.map(({ icon: Icon, title, line, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <GlassCard className="relative h-full overflow-hidden p-6 sm:p-7">
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 size-44 rounded-full bg-gradient-to-br ${accent} to-transparent blur-2xl`}
                  aria-hidden
                />
                <div className="relative">
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                    <Icon className="size-6 text-frost" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-frost sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-mist sm:text-[1.05rem]">{line}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-amber-400/95">
            <Sparkles className="size-5 shrink-0" aria-hidden />
            <span className="text-xs font-bold tracking-widest uppercase">Figures &amp; curves</span>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-medium leading-snug text-frost sm:text-xl">
            Depth sweeps, marginals, and noise panels are on <strong className="text-frost/95">Results</strong>
            —this slide states what those runs showed in words.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
