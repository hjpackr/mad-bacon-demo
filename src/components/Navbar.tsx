import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/madBaconLogo.png'
import { business, navLinks } from '../data'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-forest/10 sm:h-11 sm:w-11"
          />
          <span className="font-display text-lg font-semibold leading-tight text-forest sm:text-xl">
            Mad Bacon
            <span className="hidden text-grass sm:inline"> Landscaping</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-grass"
          >
            Free estimate
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-forest/10 bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-forest"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-forest px-4 py-3 text-center text-sm font-semibold text-cream"
              >
                Free estimate
              </a>
              <a
                href={business.phoneHref}
                className="px-3 py-2 text-center text-sm text-muted"
              >
                Call or text {business.contact} · {business.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
