import { motion, useReducedMotion } from 'framer-motion'
import { testimonials, trustMarks } from '../data'
import { fadeUp, stagger, viewport } from '../motion'

function Stars() {
  return (
    <div className="flex gap-1 text-lime" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.6l2.3 4.7 5.2.8-3.8 3.6.9 5.1L10 13.4 5.4 15.8l.9-5.1L2.5 7.1l5.2-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const reduce = useReducedMotion()

  return (
    <section id="reviews" className="scroll-mt-24 bg-forest py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">
            Reviews
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
            What neighbors are saying
          </motion.h2>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 md:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          {testimonials.map((item) => (
            <motion.li
              key={item.name}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-cream/10 bg-forest-mid/80 p-6"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-cream/85">
                “{item.quote}”
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-lime">{item.name}</p>
              <p className="text-sm text-cream/55">{item.neighborhood}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          className="mt-14 grid gap-4 border-t border-cream/10 pt-10 sm:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          {trustMarks.map((mark) => (
            <motion.li
              key={mark}
              variants={fadeUp}
              className="flex items-center justify-center gap-3 rounded-full border border-cream/10 bg-cream/5 px-4 py-3 text-center text-sm font-semibold tracking-wide text-cream"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
              {mark}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
