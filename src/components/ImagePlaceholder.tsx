const palettes = [
  ['#163524', '#2d6a3e', '#8bc34a'],
  ['#0f2a1a', '#3d8b4a', '#c5e1a5'],
  ['#1b3d28', '#4caf50', '#dce775'],
  ['#12301f', '#2e7d32', '#aed581'],
  ['#0d2418', '#66bb6a', '#f4f1e8'],
  ['#18432a', '#81c784', '#8bc34a'],
]

type ImagePlaceholderProps = {
  title: string
  location: string
  variant: number
  className?: string
}

export function ImagePlaceholder({
  title,
  location,
  variant,
  className = '',
}: ImagePlaceholderProps) {
  const [a, b, c] = palettes[variant % palettes.length]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      role="img"
      aria-label={`${title} in ${location}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(155deg, ${a} 0%, ${b} 48%, ${c} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            108deg,
            transparent 0 9px,
            rgba(15, 42, 26, 0.18) 9px 10px
          ), repeating-linear-gradient(
            -18deg,
            transparent 0 14px,
            rgba(255, 255, 255, 0.08) 14px 15px
          )`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest/80 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium tracking-wide text-cream backdrop-blur-sm">
        Photo placeholder
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <p className="font-display text-xl font-semibold">{title}</p>
        <p className="mt-1 text-sm text-cream/80">{location}</p>
      </div>
    </div>
  )
}
