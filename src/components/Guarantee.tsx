import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../motion'

function GoldMedallion() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-full w-full"
      role="img"
      aria-label="100 percent service guarantee"
    >
      <defs>
        <radialGradient id="medal-face" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#fff6c2" />
          <stop offset="32%" stopColor="#f0d56a" />
          <stop offset="68%" stopColor="#c9962a" />
          <stop offset="100%" stopColor="#8a6414" />
        </radialGradient>
        <linearGradient id="medal-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1a8" />
          <stop offset="22%" stopColor="#e6c04a" />
          <stop offset="48%" stopColor="#9a7018" />
          <stop offset="72%" stopColor="#f3d56a" />
          <stop offset="100%" stopColor="#7a5410" />
        </linearGradient>
        <linearGradient id="medal-inner" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#7c5912" />
          <stop offset="40%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#5c420e" />
        </linearGradient>
        <radialGradient id="medal-sheen" cx="30%" cy="22%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="medal-emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#5a420c" floodOpacity="0.45" />
        </filter>
        <path id="medal-arc" d="M160,42 A118,118 0 1 1 159.99,42" />
      </defs>

      <circle cx="160" cy="168" r="146" fill="#6b4e12" opacity="0.22" />
      <circle cx="160" cy="160" r="148" fill="url(#medal-rim)" />
      <circle cx="160" cy="160" r="136" fill="url(#medal-inner)" />
      <circle cx="160" cy="160" r="128" fill="url(#medal-face)" />

      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2 - Math.PI / 2
        const x = 160 + Math.cos(angle) * 142
        const y = 160 + Math.sin(angle) * 142
        return <circle key={i} cx={x} cy={y} r="3.4" fill="#f7e38a" stroke="#8a6414" strokeWidth="0.6" />
      })}

      <circle cx="160" cy="160" r="118" fill="none" stroke="#a07818" strokeWidth="2.2" opacity="0.7" />
      <circle
        cx="160"
        cy="160"
        r="108"
        fill="none"
        stroke="#fff2b0"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        opacity="0.85"
      />

      <text
        fill="#6d5010"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3.4"
      >
        <textPath href="#medal-arc" startOffset="50%" textAnchor="middle">
          MAD BACON LANDSCAPING · ST. JOHNS
        </textPath>
      </text>

      <g filter="url(#medal-emboss)" textAnchor="middle">
        <text
          x="161.5"
          y="160"
          fill="#8a6414"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="72"
          fontWeight="700"
        >
          100%
        </text>
        <text
          x="160"
          y="157.5"
          fill="#fff4b8"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="72"
          fontWeight="700"
        >
          100%
        </text>
        <text
          x="160"
          y="192"
          fill="#6d5010"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="4"
        >
          SERVICE
        </text>
        <text
          x="160"
          y="214"
          fill="#6d5010"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="3.2"
        >
          GUARANTEE
        </text>
      </g>

      <ellipse cx="118" cy="92" rx="70" ry="28" fill="url(#medal-sheen)" />
    </svg>
  )
}

export function Guarantee() {
  const reduce = useReducedMotion()

  return (
    <section id="guarantee" className="scroll-mt-24 bg-cream py-16 sm:py-24">
      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex justify-center lg:col-span-5"
          style={{ perspective: 900 }}
        >
          <div className="medallion-float h-64 w-64 sm:h-80 sm:w-80">
            <GoldMedallion />
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-grass"
          >
            Our promise
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-semibold text-forest sm:text-5xl"
          >
            A 100% service guarantee — in writing, and in the yard.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            If a visit isn’t right, we make it right. No runaround, no extra
            charge for doing the job the way we said we would.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-muted">
            That covers weekly mowing, beds, pruning, sod, and full landscape
            work — residential and commercial.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
