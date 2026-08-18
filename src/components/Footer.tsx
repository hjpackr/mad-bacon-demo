import { business, navLinks } from '../data'
import { GrassDivider } from './GrassDivider'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest pt-16 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-28 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">Mad Bacon Landscaping</p>
          <p className="mt-2 max-w-sm text-sm text-cream/65">
            Locally owned in {business.location}. We work hard so you don’t have
            to.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              Visit
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="hover:text-lime" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              Reach Kristy
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>{business.location}</li>
              <li>
                <a className="hover:text-lime" href={business.phoneHref}>
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="hover:text-lime" href={business.emailHref}>
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="relative z-10 px-4 pb-6 text-center text-xs text-cream/45 sm:px-6">
        © {new Date().getFullYear()} Mad Bacon Landscaping. All rights reserved.
      </p>
      <GrassDivider />
    </footer>
  )
}
