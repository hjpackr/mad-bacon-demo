import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../data'
import { fadeUp, stagger, viewport } from '../motion'
import { ImagePlaceholder } from './ImagePlaceholder'

export function Services() {
  const reduce = useReducedMotion()

  return (
    <section id="services" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-grass">
            Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold text-forest sm:text-5xl">
            Lawn care for home and business
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted">
            Residential and commercial. Drop your own photos into these slots
            when you’re ready.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              variants={fadeUp}
              className={i === services.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <ImagePlaceholder
                variant={i}
                className="photo-shadow aspect-[4/3] transition duration-300 hover:-translate-y-1.5"
              />
              <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
