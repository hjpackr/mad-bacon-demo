import { motion, useReducedMotion } from 'framer-motion'
import { business } from '../data'
import { fadeUp, stagger } from '../motion'
import { GrassDivider } from './GrassDivider'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-forest pt-16 text-cream"
    >
      <div className="turf-grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-4 pb-36 pt-16 sm:px-6 sm:pb-44 sm:pt-20">
        <motion.div
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-lime"
          >
            Locally owned and family operated
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            Mad Bacon
            <span className="block text-lime">Landscaping</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg text-cream/85 sm:text-xl"
          >
            Weekends belong outside. We work hard so you don’t have to.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-base text-cream/70"
          >
            Neighbors in St. Johns taking care of residential and commercial
            lawns, backed by a real service guarantee.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-lime px-6 text-sm font-semibold text-forest transition hover:bg-leaf hover:text-cream"
            >
              Get a free estimate
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/25 px-6 text-sm font-semibold text-cream transition hover:border-lime hover:text-lime"
            >
              Call or text {business.contact} · {business.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>
      </div>
      <GrassDivider rise />
    </section>
  )
}
