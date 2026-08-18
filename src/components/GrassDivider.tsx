type GrassDividerProps = {
  className?: string
  rise?: boolean
  count?: number
}

function bladeSeed(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function GrassDivider({
  className = '',
  rise = false,
  count = 72,
}: GrassDividerProps) {
  const blades = Array.from({ length: count }, (_, i) => {
    const n = bladeSeed(i, 1)
    const n2 = bladeSeed(i, 2)
    const n3 = bladeSeed(i, 3)
    const height = 38 + n * 62
    const left = (i / count) * 100 + (n2 - 0.5) * 1.4
    const width = 5 + n3 * 7
    const tilt = (n - 0.5) * 14
    const greens = ['#2d9154', '#3aa15c', '#4caf50', '#6bbf4e', '#8fd08a']
    const fill = greens[i % greens.length]

    return { height, left, width, tilt, fill, delay: n * 2.1, dur: 2.4 + n2 * 2.2, riseDelay: n3 * 0.45 }
  })

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden sm:h-36 ${className}`}
      aria-hidden
    >
      {blades.map((blade, i) => (
        <span
          key={i}
          className={rise ? 'grass-blade-rise absolute bottom-0' : 'grass-blade absolute bottom-0'}
          style={{
            left: `${blade.left}%`,
            width: blade.width,
            height: blade.height,
            ['--tilt' as string]: `${blade.tilt}deg`,
            ['--delay' as string]: `${blade.delay}s`,
            ['--dur' as string]: `${blade.dur}s`,
            ['--rise-delay' as string]: `${blade.riseDelay}s`,
          }}
        >
          <svg viewBox="0 0 10 100" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M5 100 C 1 68 0 38 4.2 0 C 7.6 36 9.4 70 5 100 Z"
              fill={blade.fill}
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
