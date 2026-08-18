import { type FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { business } from '../data'
import { fadeUp, stagger, viewport } from '../motion'

function composeMailto(name: string, email: string, message: string) {
  const subject = `Website inquiry from ${name}`
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
  return `${business.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function Contact() {
  const reduce = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [mailtoHref, setMailtoHref] = useState(business.emailHref)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const href = composeMailto(name, email, message)

    setMailtoHref(href)
    window.location.href = href
    setSubmitted(true)
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.2em] text-grass">
            Contact us
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold text-forest sm:text-5xl">
            Tell us about your yard
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted">
            Free estimates for homes and businesses around St. Johns. Call or
            text Kristy and we’ll take it from there.
          </motion.p>
          <motion.address variants={fadeUp} className="mt-8 not-italic text-forest">
            <p className="font-semibold">{business.location}</p>
            <p className="mt-2">
              <a className="hover:text-grass" href={business.phoneHref}>
                {business.phoneDisplay}
              </a>
            </p>
            <p className="mt-1">
              <a className="hover:text-grass" href={business.emailHref}>
                {business.email}
              </a>
            </p>
          </motion.address>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
        >
          {submitted ? (
            <div className="rounded-3xl border border-grass/20 bg-leaf/10 p-8 sm:p-10">
              <p className="font-display text-2xl font-semibold text-forest">
                Thanks, we got your note.
              </p>
              <p className="mt-3 text-muted">
                Your email app should open with a message ready to send to{' '}
                {business.email}. If it didn’t,{' '}
                <a className="underline hover:text-grass" href={mailtoHref}>
                  tap here to try again
                </a>{' '}
                or call Kristy at {business.phoneDisplay}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-forest/10 bg-white/60 p-6 shadow-sm shadow-forest/5 sm:p-8"
            >
              <label className="block text-sm font-medium text-forest">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-xl border border-forest/15 bg-cream px-4 text-ink outline-none ring-lime/40 transition focus:ring-2"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-forest">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 min-h-12 w-full rounded-xl border border-forest/15 bg-cream px-4 text-ink outline-none ring-lime/40 transition focus:ring-2"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-forest">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-forest/15 bg-cream px-4 py-3 text-ink outline-none ring-lime/40 transition focus:ring-2"
                  placeholder="What do you need help with?"
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream transition hover:bg-grass sm:w-auto"
              >
                Send message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
