import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../motion'

export function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div className="lg:col-span-5" variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-grass">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-5xl">
            Your neighbors here in St. Johns
          </h2>
        </motion.div>
        <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7">
          <motion.p variants={fadeUp}>
            Ours is a small, family-owned landscape company. We take care of the
            dirty work so you can spend the weekend outside — not chasing the
            mower.
          </motion.p>
          <motion.p variants={fadeUp}>
            Why Mad Bacon? We get that a lot. The company is named after our
            kids — Madeline, Baylor, and Connor. Mad-Bay-Con.
          </motion.p>
          <motion.p variants={fadeUp}>
            Residential or commercial, the promise is the same: a customer-first
            crew and results that hold up past the first cut.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
