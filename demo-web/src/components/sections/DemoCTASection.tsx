import { motion } from 'framer-motion'
import { ArrowUp, FileCode2 } from 'lucide-react'
import { usePresentation } from '../../presentation/PresentationProvider'

export function DemoCTASection() {
  const { goToId, goToIndex } = usePresentation()

  return (
    <section id="cta" className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight text-frost sm:text-3xl md:text-4xl">
            Built for the stage.
            <br />
            <span className="text-gradient">Ready to deploy.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-mist sm:text-base">
            The layout and motion are fixed; swap in your latest solver outputs and risk inputs when
            you move from demo to production—this structure is designed to survive that transition.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToId('method')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-semibold text-frost backdrop-blur-sm transition-colors hover:border-violet-400/40 hover:bg-white/10 sm:px-7 sm:py-3 sm:text-sm"
            >
              <FileCode2 className="size-4" aria-hidden />
              Technical path
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToIndex(0)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600/90 to-violet-600 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_40px_-10px_rgba(217,70,239,0.55)] sm:px-7 sm:py-3 sm:text-sm"
            >
              Back to opening
              <ArrowUp className="size-4" aria-hidden />
            </motion.button>
          </div>
          <p className="mt-10 text-[11px] text-mist/50 sm:text-xs">YQuantum · Quantum portfolio optimization</p>
        </motion.div>
      </div>
    </section>
  )
}
