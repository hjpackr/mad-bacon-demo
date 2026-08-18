import { useCallback, useRef, useState, type PointerEvent } from 'react'
import after1 from '../assets/after1.png'
import after2 from '../assets/after2.png'
import after3 from '../assets/after3.png'
import before1 from '../assets/before1.png'
import before2 from '../assets/before2.png'
import before3 from '../assets/before3.png'

const pairs = [
  {
    before: before1,
    after: after1,
    beforeAlt: 'Before: a St. Johns front yard prior to the landscape refresh',
    afterAlt: 'After: finished front-yard bed with new plantings and dark mulch',
    caption: 'Front-yard bed refresh · St. Johns',
  },
  {
    before: before2,
    after: after2,
    beforeAlt: 'Before: an overgrown hedge and bare bed along the house',
    afterAlt: 'After: new plantings, mulch, and a cleaned-up foundation bed',
    caption: 'Foundation planting · St. Johns',
  },
  {
    before: before3,
    after: after3,
    beforeAlt: 'Before: dense foundation shrubs crowding a St. Johns front yard',
    afterAlt: 'After: a mulched foundation bed with new plantings and a trimmed hedge',
    caption: 'Foundation bed cleanup · St. Johns',
  },
] as const

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

export function BeforeAfterSlider() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [position, setPosition] = useState(52)
  const [dragging, setDragging] = useState(false)
  const pair = pairs[index]

  const moveTo = useCallback((clientX: number) => {
    const frame = frameRef.current
    if (!frame) return
    const { left, width } = frame.getBoundingClientRect()
    setPosition(clamp(((clientX - left) / width) * 100))
  }, [])

  function goTo(next: number) {
    setIndex((next + pairs.length) % pairs.length)
    setPosition(52)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    moveTo(event.clientX)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    moveTo(event.clientX)
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId)
    setDragging(false)
  }

  return (
    <div>
      <div
        ref={frameRef}
        className="photo-shadow relative aspect-[4/5] cursor-ew-resize touch-none overflow-hidden rounded-2xl bg-forest sm:aspect-[5/4] lg:aspect-[16/10]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={pair.after}
          alt={pair.afterAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={pair.before}
            alt={pair.beforeAlt}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-forest shadow-md shadow-ink/25 sm:left-4 sm:top-4 sm:px-3.5 sm:text-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream shadow-md shadow-ink/25 sm:right-4 sm:top-4 sm:px-3.5 sm:text-sm">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-cream"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-forest text-cream shadow-lg shadow-forest/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M8 7 4 12l4 5M16 7l4 5-4 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <label className="sr-only">
          Drag to compare before and after
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <p className="text-sm text-muted">{pair.caption}</p>
        <div className="flex items-center gap-3" role="tablist" aria-label="Before and after projects">
          {pairs.map((item, i) => {
            const selected = i === index
            return (
              <button
                key={item.caption}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show ${item.caption}`}
                className={`relative h-16 w-16 overflow-hidden rounded-full shadow-sm transition sm:h-[4.5rem] sm:w-[4.5rem] ${
                  selected
                    ? 'ring-2 ring-forest ring-offset-2 ring-offset-cream'
                    : 'opacity-75 hover:opacity-100'
                }`}
                onClick={() => goTo(i)}
              >
                <img
                  src={item.after}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
