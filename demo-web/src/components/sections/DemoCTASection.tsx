import { motion } from 'framer-motion'
import { ArrowUp, FileCode2 } from 'lucide-react'
import { usePresentation } from '../../presentation/PresentationProvider'

export function DemoCTASection() {
  const { goToId, goToIndex } = usePresentation()

  return (
    <section id="cta" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl md:text-5xl">
            Built for the stage.
            <br />
            <span className="text-gradient">Ready for your numbers.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-mist sm:text-lg">
            Swap the mock objects for your latest Bloqade / QAOA run and stress-test CSVs—the layout,
            motion, and chart shells stay put so you can rehearse once and present with confidence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToId('method')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-frost backdrop-blur-sm transition-colors hover:border-violet-400/40 hover:bg-white/10 sm:text-base"
            >
              <FileCode2 className="size-4" aria-hidden />
              Technical path
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToIndex(0)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600/90 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(217,70,239,0.55)] sm:text-base"
            >
              Back to opening
              <ArrowUp className="size-4" aria-hidden />
            </motion.button>
          </div>
          <p className="mt-12 text-xs text-mist/50 sm:text-sm">
            YQuantum · Quantum portfolio optimization · Replace mock data in{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-mist/70">src/data/mockPortfolioData.ts</code>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
