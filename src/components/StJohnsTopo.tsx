const INK = '#2d6a3e'
const WATER = '#5d93a8'

// The county sits behind the heading column; the coast lands in the gutter
// before the body copy starts.
const PLACE = 'translate(120 30) scale(0.885)'

// St. Johns County, FL: Duval line across the north, the Atlantic down the east,
// the Flagler line across the south, and the St. Johns River up the northwest.
const COUNTY = `M86 26
  L150 22 L240 16 L318 18 L332 28
  C340 92 332 152 324 198
  C314 252 302 302 290 354
  C282 402 274 432 270 454
  L190 462 L120 470 L58 476
  C52 400 50 330 54 272
  C66 232 48 186 72 140
  C56 92 66 56 86 26 Z`

// Drawn past the frame so the water never shows a cut edge.
const COAST = `M328 -60 L332 28
  C340 92 332 152 324 198
  C314 252 302 302 290 354
  C282 402 274 432 270 454
  L262 580`

const OCEAN = `${COAST}
  L358 580
  C370 420 380 230 388 40
  L392 -60 Z`

const INTRACOASTAL = `M320 -20
  C328 94 320 152 312 198
  C302 252 290 302 278 354
  C270 402 264 430 260 452`

const RIVER = `M90 30
  C66 88 80 106 77 142
  C55 186 72 230 60 272
  C56 286 55 292 55 300`

const towns = [
  { name: 'PONTE VEDRA BEACH', x: 308, y: 46, anchor: 'end' as const },
  { name: 'NOCATEE', x: 252, y: 80, anchor: 'end' as const },
  { name: 'FRUIT COVE', x: 92, y: 62, anchor: 'start' as const },
  // Pulled offshore on leader lines so the section heading stays clear of them.
  { name: 'VILANO BEACH', x: 326, y: 170, anchor: 'start' as const, dx: 34 },
  { name: 'ST. AUGUSTINE', x: 320, y: 204, anchor: 'start' as const, dx: 48 },
  { name: 'CRESCENT BEACH', x: 296, y: 302, anchor: 'end' as const },
  { name: 'ELKTON', x: 178, y: 356, anchor: 'start' as const },
  { name: 'HASTINGS', x: 108, y: 404, anchor: 'start' as const },
]

const roads = [
  // I-95
  { d: 'M264 18 C252 92 240 172 228 252 C218 332 210 402 202 464', w: 1.6, o: 0.22 },
  // US-1
  { d: 'M302 22 C294 98 286 170 276 242 C268 312 260 382 252 460', w: 1.1, o: 0.15 },
  // SR-13 along the river
  { d: 'M92 34 C80 90 84 140 98 194', w: 1, o: 0.14 },
  // SR-16 west out of St. Augustine
  { d: 'M318 200 C260 194 200 200 140 210', w: 1.1, o: 0.16 },
  // SR-207 southwest toward Hastings
  { d: 'M312 214 C270 254 210 302 150 344', w: 1.1, o: 0.16 },
]

// Coastal terraces run parallel to the shoreline.
const terraces = [
  'M266 -20 C276 92 266 192 252 302 C242 386 232 442 226 520',
  'M204 -20 C214 92 204 192 190 302 C180 386 170 442 164 520',
  'M142 -20 C152 92 142 192 128 302 C118 386 108 442 102 520',
  'M80 -20 C90 92 80 192 66 302 C56 386 46 442 40 520',
]

export function StJohnsTopo() {
  return (
    <svg
      viewBox="0 0 1200 520"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <clipPath id="county-clip">
          <path d={COUNTY} transform={PLACE} />
        </clipPath>
        <linearGradient id="ocean-fade" gradientUnits="userSpaceOnUse" x1="326" y1="0" x2="396" y2="0">
          <stop offset="0" stopColor={WATER} stopOpacity="0.09" />
          <stop offset="1" stopColor={WATER} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform={PLACE}>
        <path d={OCEAN} fill="url(#ocean-fade)" />
        <path d={COUNTY} fill={INK} fillOpacity="0.05" />
      </g>

      <g clipPath="url(#county-clip)">
        <g transform={PLACE} fill="none" stroke={INK}>
          {terraces.map((d, i) => (
            <path key={i} d={d} strokeWidth={i % 2 === 0 ? 1 : 0.7} strokeOpacity={i % 2 === 0 ? 0.14 : 0.1} />
          ))}
          {roads.map((road, i) => (
            <path key={`r${i}`} d={road.d} strokeWidth={road.w} strokeOpacity={road.o} strokeLinecap="round" />
          ))}
        </g>
      </g>

      <g transform={PLACE}>
        <path d={COUNTY} fill="none" stroke={INK} strokeOpacity="0.42" strokeWidth="2.2" strokeLinejoin="round" />
        <path d={COAST} fill="none" stroke={WATER} strokeOpacity="0.4" strokeWidth="2.4" />
        <path d={INTRACOASTAL} fill="none" stroke={WATER} strokeOpacity="0.26" strokeWidth="1.4" />
        <path d={RIVER} fill="none" stroke={WATER} strokeOpacity="0.34" strokeWidth="4.5" strokeLinecap="round" />

        {/* St. Augustine and Matanzas inlets */}
        <path
          d="M313 192 L325 190 M260 451 L270 453"
          stroke={WATER}
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <g fontFamily="Figtree, sans-serif" fontSize="11" letterSpacing="1.1">
          {towns.map((town) => {
            const gap = town.dx ?? 9
            const textX = town.anchor === 'end' ? town.x - gap : town.x + gap
            return (
              <g key={town.name}>
                <circle cx={town.x} cy={town.y} r="3" fill={INK} fillOpacity="0.4" />
                {town.dx ? (
                  <path
                    d={`M${town.x + 5} ${town.y} H${textX - 5}`}
                    stroke={INK}
                    strokeOpacity="0.28"
                    strokeWidth="0.9"
                  />
                ) : null}
                <text x={textX} y={town.y + 4} textAnchor={town.anchor} fill={INK} fillOpacity="0.4">
                  {town.name}
                </text>
              </g>
            )
          })}
        </g>

        <text
          transform="translate(380 320) rotate(90)"
          textAnchor="middle"
          fontFamily="Figtree, sans-serif"
          fontSize="12"
          letterSpacing="4"
          fill={WATER}
          fillOpacity="0.38"
        >
          ATLANTIC OCEAN
        </text>
        <text
          transform="translate(64 374) rotate(-84)"
          textAnchor="middle"
          fontFamily="Figtree, sans-serif"
          fontSize="10.5"
          letterSpacing="2.4"
          fill={WATER}
          fillOpacity="0.4"
        >
          ST. JOHNS RIVER
        </text>
      </g>

      <g fontFamily="Figtree, sans-serif" fill={INK}>
        <text x="770" y="44" fontSize="13" fontWeight="600" letterSpacing="3" fillOpacity="0.38">
          ST. JOHNS COUNTY
        </text>
        <text x="770" y="64" fontSize="10.5" letterSpacing="2.2" fillOpacity="0.26">
          FLORIDA · 30.10° N 81.54° W
        </text>
      </g>

      {/* North arrow and scale bar */}
      <g transform="translate(1096 400)" stroke={INK} strokeOpacity="0.3" fill="none">
        <path d="M0 34 L0 0 M0 0 L-6 10 M0 0 L6 10" strokeWidth="1.3" strokeLinecap="round" />
        <text
          x="0"
          y="50"
          textAnchor="middle"
          fontFamily="Figtree, sans-serif"
          fontSize="11"
          fontWeight="600"
          stroke="none"
          fill={INK}
          fillOpacity="0.34"
        >
          N
        </text>
      </g>
      <g transform="translate(1012 474)">
        <path d="M0 0 H72" stroke={INK} strokeOpacity="0.3" strokeWidth="1.3" />
        <path d="M0 -4 V4 M36 -3 V3 M72 -4 V4" stroke={INK} strokeOpacity="0.3" strokeWidth="1.1" />
        <text
          x="36"
          y="18"
          textAnchor="middle"
          fontFamily="Figtree, sans-serif"
          fontSize="10"
          letterSpacing="1.4"
          fill={INK}
          fillOpacity="0.28"
        >
          10 MI
        </text>
      </g>
    </svg>
  )
}
