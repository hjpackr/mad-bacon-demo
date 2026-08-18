import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../data'
import { fadeUp, stagger, viewport } from '../motion'

const icons = [
  <path key="mow" d="M4 16h16M6 16c0-5 3-8 6-8s6 3 6 8M8 20h2m4 0h2" />,
  <path key="mulch" d="M12 4v4m0 12v2M5 10c2 4 4 6 7 8 3-2 5-4 7-8-2-1.5-4.5-2.5-7-2.5S7 8.5 5 10z" />,
  <path key="hedge" d="M5 19V9l3.5-4L12 9l3.5-4L19 9v10H5z" />,
  <path key="sod" d="M4 18h16M5 18c1-5 4-8 7-8s6 3 7 8M8 10V6m8 4V7" />,
  <path key="land" d="M4 18c3-6 5-9 8-12 3 3 5 6 8 12H4zm8-12v12" />,
]

export function Services() {
  const reduce = useReducedMotion()

  return (
    <section id="services" className="scroll-mt-24 bg-forest-mid py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">
            Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
            Lawn care for home and business
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-cream/75">
            Residential and commercial. Every visit is backed by a 100% service
            guarantee.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              variants={fadeUp}
              className={`rounded-2xl border border-cream/10 bg-forest/40 p-6 transition hover:-translate-y-1 hover:border-lime/40 ${
                i === services.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 text-lime">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {icons[i]}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{service.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
