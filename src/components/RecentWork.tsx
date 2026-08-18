import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../motion'
import { BeforeAfterSlider } from './BeforeAfterSlider'

export function RecentWork() {
  const reduce = useReducedMotion()

  return (
    <section id="work" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-grass">
            Our latest work
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold text-forest sm:text-5xl">
            Recent work around St. Johns
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted">
            Drag to compare before and after, then flip through a couple of
            recent jobs.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
        >
          <BeforeAfterSlider />
        </motion.div>
      </div>
    </section>
  )
}
