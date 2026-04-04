import { motion } from 'framer-motion'
import { ArrowDownRight, Orbit } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92dvh] flex-col justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-8"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" />
      <div className="glow-orb absolute -left-32 top-1/4 size-[420px] rounded-full bg-violet-600" />
      <div className="glow-orb absolute -right-20 bottom-1/4 size-[380px] rounded-full bg-cyan-500" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-frost/90 backdrop-blur-sm sm:text-sm"
        >
          <Orbit className="size-4 text-cyan-glow" aria-hidden />
          YQuantum · Discrete allocation under real constraints
        </motion.div>

        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-frost sm:text-6xl md:text-7xl">
          <span className="text-gradient">Quantum</span>
          <br />
          Portfolio Optimization
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-mist sm:text-lg">
          We encode a risk–return objective with a strict budget into a QUBO, map it to an Ising
          Hamiltonian, and optimize with an eight-qubit program—then stack the outcome against
          classical baselines on the same four names and a fifty-asset challenger.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('comparison')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] transition-shadow hover:shadow-[0_0_56px_-6px_rgba(34,211,238,0.35)]"
          >
            Explore results
            <ArrowDownRight className="size-4" aria-hidden />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('stress')}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-frost backdrop-blur-sm transition-colors hover:border-cyan-glow/40 hover:bg-white/10"
          >
            See stress test
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-mist/60"
        aria-hidden
      >
        <span className="font-medium tracking-widest uppercase">Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}
