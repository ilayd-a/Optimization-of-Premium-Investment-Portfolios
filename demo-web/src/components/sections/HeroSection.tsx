import { motion } from 'framer-motion'
import { ArrowDownRight, Orbit } from 'lucide-react'
import { usePresentation } from '../../presentation/PresentationProvider'

export function HeroSection() {
  const { goToId } = usePresentation()

  return (
    <section
      id="hero"
      className="relative flex min-h-full flex-col justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-14"
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
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-3 flex flex-col items-center gap-1.5"
        >
          <div className="inline-flex items-center justify-center rounded-2xl border border-amber-500/35 bg-gradient-to-r from-amber-500/15 to-orange-500/10 px-6 py-3 shadow-[0_0_24px_-8px_rgba(245,158,11,0.35)] backdrop-blur-sm sm:px-8 sm:py-3.5">
            <img
              src="/popeyes-logo.svg"
              alt="Popeyes"
              className="h-8 w-auto max-w-[min(100%,280px)] object-contain sm:h-10"
              width={280}
              height={44}
              loading="eager"
              decoding="async"
            />
          </div>
          <a
            href="https://commons.wikimedia.org/wiki/File:Popeyes_Logo_2020.svg"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[10px] text-mist/45 underline-offset-2 hover:text-mist/70 hover:underline"
          >
            Logo: Wikimedia Commons (CC BY-SA 4.0)
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-frost/90 backdrop-blur-sm sm:text-xs"
        >
          <Orbit className="size-3.5 text-cyan-glow sm:size-4" aria-hidden />
          YQuantum · Discrete allocation under real constraints
        </motion.div>

        <h1 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-frost sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-gradient">Quantum</span>
          <br />
          Portfolio Optimization
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-mist sm:text-base">
          Four liquid assets, one qubit per asset: we encode mean–variance risk with a hard budget as
          a QUBO, map to Ising, and validate with QAOA depth sweeps. A finer eight-qubit encoding (two
          qubits per asset) was evaluated separately and sits outside the main storyline.
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-center text-[11px] leading-relaxed text-mist/85 sm:text-xs">
          <span className="text-frost/90">Ilayda Dilek</span>
          <span className="mx-1.5 text-mist/40" aria-hidden>
            ·
          </span>
          <span className="text-frost/90">Harmandeep Kaur</span>
          <span className="mx-1.5 text-mist/40" aria-hidden>
            ·
          </span>
          <span className="text-frost/90">Tanish Singh Rajpal</span>
          <span className="mx-1.5 text-mist/40" aria-hidden>
            ·
          </span>
          <span className="text-frost/90">Edward Chang</span>
          <span className="mx-1.5 text-mist/40" aria-hidden>
            ·
          </span>
          <span className="text-frost/90">Hiram Zuniga</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => goToId('results')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] transition-shadow hover:shadow-[0_0_56px_-6px_rgba(34,211,238,0.35)] sm:px-7 sm:py-3 sm:text-sm"
          >
            View results
            <ArrowDownRight className="size-4" aria-hidden />
          </motion.button>
        </div>

        <p className="mx-auto mt-6 max-w-md text-[11px] leading-relaxed text-mist/60 sm:text-xs">
          Navigate with the bar below, <strong className="text-frost/80">← →</strong> or{' '}
          <strong className="text-frost/80">Space</strong>; <strong className="text-frost/80">↑ ↓</strong>{' '}
          scrolls inside a slide.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] text-mist/55 sm:bottom-8 sm:text-xs"
        aria-hidden
      >
        <span className="font-medium tracking-widest uppercase">Next</span>
        <span className="block h-5 w-px bg-gradient-to-b from-white/35 to-transparent sm:h-6" />
      </motion.div>
    </section>
  )
}
