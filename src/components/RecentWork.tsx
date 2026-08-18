import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data'
import { fadeUp, stagger, viewport } from '../motion'
import { ImagePlaceholder } from './ImagePlaceholder'

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
            A look at yards we’ve been in lately. Photos here are placeholders
            until the next round of job shots goes up.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          {projects.map((project) => (
            <motion.li key={project.title} variants={fadeUp}>
              <ImagePlaceholder
                title={project.title}
                location={project.location}
                variant={project.variant}
                className="photo-shadow aspect-[4/3] transition duration-300 hover:-translate-y-1.5"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
