import { motion, useReducedMotion } from 'framer-motion'
import { business } from '../data'
import { fadeUp, stagger } from '../motion'
import { GuaranteeStamp } from './GuaranteeStamp'
import { MowedLawn } from './MowedLawn'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-forest pt-16 text-cream"
    >
      <MowedLawn />
      <div className="relative mx-auto grid min-h-[88svh] max-w-6xl items-center gap-8 px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-6 lg:gap-8">
        <motion.div
          className="order-2 max-w-xl justify-self-start md:order-1"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-lime md:text-left"
          >
            Locally owned and family operated
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-center font-display text-4xl font-semibold leading-[1.08] sm:text-6xl md:text-left lg:text-7xl"
          >
            Mad Bacon
            <span className="block text-lime">Landscaping</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-lg text-cream/85 sm:text-xl md:text-left"
          >
            Weekends belong outside. We work hard so you don’t have to.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-base text-cream/70 md:text-left"
          >
            Neighbors in St. Johns taking care of residential and commercial
            lawns. Every job is stamped with a 100% service guarantee.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start"
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

        <motion.div
          className="order-1 flex justify-center md:order-2 md:self-center"
          initial={reduce ? false : { opacity: 0, scale: 1.35, y: -20, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -8 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.18, 0.9, 0.2, 1.05] }}
        >
          <GuaranteeStamp className="w-44 sm:w-56 md:w-60 lg:w-72 xl:w-80" />
        </motion.div>
      </div>
    </section>
  )
}
