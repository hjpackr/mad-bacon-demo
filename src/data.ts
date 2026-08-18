export const business = {
  name: 'Mad Bacon Landscaping',
  phone: '904-534-5747',
  phoneDisplay: '(904) 534-5747',
  phoneHref: 'tel:9045345747',
  email: 'madbaconcompany@gmail.com',
  emailHref: 'mailto:madbaconcompany@gmail.com',
  location: 'St. Johns, FL',
  contact: 'Kristy',
}

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
] as const

export const services = [
  {
    title: 'Weekly mowing',
    body: 'Steady, careful cuts so the lawn stays even — and weekends stay yours.',
  },
  {
    title: 'Mulch installation',
    body: 'Fresh beds that hold moisture, block weeds, and look finished from the curb.',
  },
  {
    title: 'Hedge and shrub pruning',
    body: 'Clean lines and healthy growth, without the over-sheared look.',
  },
  {
    title: 'Sod installation',
    body: 'A new lawn in days, rolled tight and watered in for a strong start.',
  },
  {
    title: 'Landscaping',
    body: 'Plantings, beds, and outdoor details that make the whole yard feel intentional.',
  },
] as const

export const projects = [
  { title: 'Fresh sod install', location: 'St. Johns', variant: 0 },
  { title: 'Front-yard mulch refresh', location: 'Julington Creek', variant: 1 },
  { title: 'Hedge shaping', location: 'World Golf Village', variant: 2 },
  { title: 'Weekly lawn care', location: 'Nocatee', variant: 3 },
  { title: 'Backyard landscaping', location: 'Fruit Cove', variant: 4 },
  { title: 'Seasonal bed cleanup', location: 'Durbin Crossing', variant: 5 },
] as const

export const testimonials = [
  {
    quote:
      'They show up when they say they will, and the lawn actually looks better every week — not just mowed shorter.',
    name: 'Jenna R.',
    neighborhood: 'St. Johns',
  },
  {
    quote:
      'Kristy made the quote easy. The crew was careful around our kids’ play set and left the beds looking sharp.',
    name: 'Marcus T.',
    neighborhood: 'Nocatee',
  },
  {
    quote:
      'We finally have a yard we want to be in on the weekend. That’s the whole point.',
    name: 'The Callahans',
    neighborhood: 'Julington Creek',
  },
] as const

export const trustMarks = [
  'Fully insured',
  'Reliable & trustworthy',
  'Professional & experienced',
] as const
