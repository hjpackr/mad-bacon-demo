import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { testimonials, trustMarks } from '../data'
import { fadeUp, stagger, viewport } from '../motion'

const HOLD_SECONDS = 7

export function Testimonials() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const review = testimonials[index]

  function goTo(next: number) {
    setIndex((next + testimonials.length) % testimonials.length)
  }

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

        <div
          className="mt-12 min-h-[22rem] sm:min-h-[18rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={review.name}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">
                {review.label}
              </p>
              <blockquote className="mt-4 max-w-4xl font-display text-xl leading-relaxed text-cream sm:text-2xl lg:text-[1.7rem] lg:leading-snug">
                “{review.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/20 text-sm font-semibold text-lime"
                  aria-hidden
                >
                  {review.initials}
                </span>
                <p className="text-sm font-semibold text-cream">{review.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-2 sm:gap-3"
          role="tablist"
          aria-label="Customer reviews"
        >
          {testimonials.map((item, i) => {
            const selected = i === index
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`relative overflow-hidden rounded-full px-3 py-2 text-left text-sm font-semibold transition sm:px-4 ${
                  selected ? 'bg-cream/10 text-cream' : 'text-cream/50 hover:text-cream/80'
                }`}
                onClick={() => goTo(i)}
              >
                {item.name}
                {selected && !reduce && (
                  <motion.span
                    key={`${item.name}-${paused ? 'paused' : 'run'}`}
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-lime sm:inset-x-4"
                    initial={{ scaleX: paused ? 0 : 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                      duration: paused ? 0 : HOLD_SECONDS,
                      ease: 'linear',
                    }}
                    onAnimationComplete={() => {
                      if (!paused) {
                        setIndex((current) =>
                          current === i ? (i + 1) % testimonials.length : current,
                        )
                      }
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

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
