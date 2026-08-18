const palettes = [
  ['#7ec27a', '#4caf50', '#dce8b8'],
  ['#63b36a', '#3d9a55', '#efe7c4'],
  ['#8fd08a', '#2d9154', '#f3ecc8'],
  ['#6bbb72', '#1f7a45', '#e7f0c4'],
  ['#9ad48a', '#4caf50', '#f7f4eb'],
  ['#74c47c', '#3aa15c', '#cfe89a'],
]

type ImagePlaceholderProps = {
  title?: string
  location?: string
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
  const label = title && location ? `${title} in ${location}` : title ?? 'Photo placeholder'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-leaf/20 ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(155deg, ${a} 0%, ${b} 48%, ${c} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `repeating-linear-gradient(
            108deg,
            transparent 0 9px,
            rgba(31, 122, 69, 0.16) 9px 10px
          ), repeating-linear-gradient(
            -18deg,
            transparent 0 14px,
            rgba(255, 255, 255, 0.16) 14px 15px
          )`,
        }}
      />
      {title ? (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest/70 to-transparent" />
      ) : null}
      <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-forest shadow-sm">
        Photo placeholder
      </div>
      {title ? (
        <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
          <p className="font-display text-xl font-semibold">{title}</p>
          {location ? <p className="mt-1 text-sm text-cream/85">{location}</p> : null}
        </div>
      ) : null}
    </div>
  )
}
