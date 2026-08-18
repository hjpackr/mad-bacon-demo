type GuaranteeStampProps = {
  className?: string
}

export function GuaranteeStamp({ className = '' }: GuaranteeStampProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`stamp-mark h-auto w-full ${className}`}
      role="img"
      aria-label="100 percent service guarantee"
    >
      <defs>
        <radialGradient id="stamp-face" cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff6d2" />
          <stop offset="42%" stopColor="#e8d48a" />
          <stop offset="100%" stopColor="#c4a24a" />
        </radialGradient>
        <linearGradient id="stamp-ring" x1="16%" y1="6%" x2="88%" y2="96%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="35%" stopColor="#e6c86a" />
          <stop offset="70%" stopColor="#9a7420" />
          <stop offset="100%" stopColor="#6e5214" />
        </linearGradient>
        <filter id="stamp-deboss" x="-18%" y="-18%" width="136%" height="136%">
          <feOffset dx="1.1" dy="1.2" in="SourceAlpha" result="down" />
          <feFlood floodColor="#fff8dc" floodOpacity="0.7" result="light" />
          <feComposite in="light" in2="down" operator="in" result="lit" />
          <feOffset dx="-1" dy="-1.1" in="SourceAlpha" result="up" />
          <feFlood floodColor="#6a4e12" floodOpacity="0.55" result="shade" />
          <feComposite in="shade" in2="up" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="lit" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="stamp-arc-top" d="M58,160 A102,102 0 0 1 262,160" />
        <path id="stamp-arc-bottom" d="M258,168 A98,98 0 0 1 62,168" />
      </defs>

      <circle cx="164" cy="168" r="148" fill="#5a4312" opacity="0.16" />
      <circle cx="160" cy="160" r="148" fill="url(#stamp-ring)" />
      <circle cx="160" cy="160" r="132" fill="url(#stamp-face)" />
      <circle cx="160" cy="160" r="126" fill="none" stroke="#8a6a18" strokeWidth="2" opacity="0.35" />
      <circle
        cx="160"
        cy="160"
        r="108"
        fill="none"
        stroke="#8a6a18"
        strokeWidth="1.6"
        strokeDasharray="4 6"
        opacity="0.45"
      />

      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2 - Math.PI / 2
        const x = 160 + Math.cos(angle) * 140
        const y = 160 + Math.sin(angle) * 140
        return <circle key={i} cx={x} cy={y} r="3" fill="#8a6a18" opacity="0.45" />
      })}

      <g filter="url(#stamp-deboss)" fill="#7a5814">
        <text
          fontFamily="Figtree, sans-serif"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="3.4"
        >
          <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
            MAD BACON LANDSCAPING
          </textPath>
        </text>
        <text
          fontFamily="Figtree, sans-serif"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="3"
        >
          <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
            ST. JOHNS · FLORIDA
          </textPath>
        </text>
        <g textAnchor="middle">
          <text
            x="160"
            y="154"
            fontFamily="Figtree, sans-serif"
            fontSize="64"
            fontWeight="700"
          >
            100%
          </text>
          <text
            x="160"
            y="186"
            fontFamily="Figtree, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="3.4"
          >
            SERVICE
          </text>
          <text
            x="160"
            y="208"
            fontFamily="Figtree, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="2.6"
          >
            GUARANTEE
          </text>
        </g>
      </g>
    </svg>
  )
}
