import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { business, navLinks } from '../data'

function BladeMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0f2a1a" />
      <path
        d="M16 26c0 0-1.2-9.5-5.8-14.2C7.4 8.8 9.2 6 12 7.4c1.4.7 2.4 2.4 2.8 4.1C15.2 8.2 17.1 5 20.6 6.2c2.6.9 2.2 4.2-.2 6.8C16.8 16.8 16 26 16 26z"
        fill="#8bc34a"
      />
      <path d="M16 26V11.2" stroke="#2d6a3e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <BladeMark className="h-9 w-9" />
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
