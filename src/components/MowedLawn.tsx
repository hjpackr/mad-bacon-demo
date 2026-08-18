import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

const STRIPES = 10
const PASS_SECONDS = 2.1
const SHIFT_SECONDS = 0.55
const START_DELAY_MS = 900

const STRIPE_WIDTH = 100 / STRIPES

function columnCenter(index: number) {
  return (index + 0.5) * STRIPE_WIDTH
}

function Mower() {
  return (
    <svg viewBox="0 0 64 104" className="h-full w-full" aria-hidden>
      <g stroke="#20130f" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M22 62h20v30h-20z" fill="none" stroke="#2b2b2b" strokeWidth="2.6" />
        <rect x="18" y="88" width="28" height="6" rx="3" fill="#2b2b2b" />

        <rect x="6" y="18" width="52" height="50" rx="9" fill="#b8392c" />
        <rect x="10" y="22" width="44" height="18" rx="6" fill="#cf4b39" />

        <rect x="4" y="24" width="9" height="16" rx="3" fill="#1b1b1b" />
        <rect x="51" y="24" width="9" height="16" rx="3" fill="#1b1b1b" />
        <rect x="2" y="50" width="11" height="19" rx="4" fill="#1b1b1b" />
        <rect x="51" y="50" width="11" height="19" rx="4" fill="#1b1b1b" />

        <rect x="21" y="30" width="22" height="26" rx="5" fill="#3c3c3c" />
        <rect x="25" y="34" width="14" height="11" rx="3" fill="#5e5e5e" />
        <circle cx="32" cy="52" r="3.4" fill="#9a9a9a" />
        <path d="M44 20v-6h6" fill="none" stroke="#3c3c3c" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function MowedLawn() {
  const reduce = useReducedMotion()
  const travel = useMotionValue(0)
  const mowerX = useMotionValue(columnCenter(0))
  const mowerY = useMotionValue(100)
  const [cutCount, setCutCount] = useState(0)
  const [headingUp, setHeadingUp] = useState(true)
  const [mowing, setMowing] = useState(false)
  const runningRef = useRef<{ stop: () => void }[]>([])

  const mowerLeft = useTransform(mowerX, (v) => `${v}%`)
  const mowerTop = useTransform(mowerY, (v) => `${v}%`)

  useEffect(() => {
    if (reduce) {
      setCutCount(STRIPES)
      return
    }

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms))
      })

    const track = <T extends { stop: () => void; finished: Promise<unknown> }>(controls: T) => {
      runningRef.current.push(controls)
      return controls.finished
    }

    async function mow() {
      await wait(START_DELAY_MS)
      if (cancelled) return
      setMowing(true)

      for (let i = 0; i < STRIPES; i += 1) {
        const up = i % 2 === 0
        travel.set(0)
        setHeadingUp(up)

        await track(
          animate(mowerX, columnCenter(i), {
            duration: i === 0 ? 0.8 : SHIFT_SECONDS,
            ease: 'easeInOut',
          }),
        )
        if (cancelled) return

        const pass = { duration: PASS_SECONDS, ease: 'linear' } as const
        await Promise.all([
          track(animate(travel, 1, pass)),
          track(animate(mowerY, up ? 0 : 100, pass)),
        ])
        if (cancelled) return

        setCutCount(i + 1)
      }

      await track(animate(mowerX, 118, { duration: 1.6, ease: 'easeIn' }))
      if (cancelled) return
      setMowing(false)
    }

    void mow()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      runningRef.current.forEach((controls) => controls.stop())
      runningRef.current = []
    }
  }, [reduce, travel, mowerX, mowerY])

  return (
    <div className="aerial-turf pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: STRIPES }, (_, i) => {
        const shared = `lawn-cut absolute inset-y-0 ${i % 2 === 1 ? 'lawn-cut--alt' : ''}`
        const box = { left: `${i * STRIPE_WIDTH}%`, width: `${STRIPE_WIDTH}%` }

        if (i < cutCount) {
          return <div key={i} className={shared} style={box} />
        }

        if (i === cutCount && mowing) {
          return (
            <motion.div
              key={i}
              className={shared}
              style={{
                ...box,
                scaleY: travel,
                transformOrigin: headingUp ? 'bottom center' : 'top center',
              }}
            />
          )
        }

        return null
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a3a1f]/45 via-[#0a3a1f]/12 to-transparent" />

      {mowing && (
        <motion.div
          className="absolute z-10 w-10 sm:w-12"
          style={{
            left: mowerLeft,
            top: mowerTop,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: headingUp ? 0 : 180 }}
          transition={{ opacity: { duration: 0.4 }, rotate: { duration: 0.5 } }}
        >
          <motion.div
            className="mower-shadow aspect-[64/104]"
            animate={{ x: [0, -0.7, 0, 0.7, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
          >
            <Mower />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
