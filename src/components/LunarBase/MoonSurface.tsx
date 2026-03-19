export function MoonSurface() {
  return (
    <g>
      <defs>
        {/* Moon surface gradient - darker on left (shadow), brighter on right (sunlit) */}
        <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="40%" stopColor="#6B7280" />
          <stop offset="70%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#D1D5DB" />
        </linearGradient>
        {/* Dark crater shadow gradient */}
        <radialGradient id="craterGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#374151" />
        </radialGradient>
        {/* Permanently shadowed region */}
        <radialGradient id="psrGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1F2937" />
        </radialGradient>
      </defs>

      {/* Main moon surface - irregular terrain */}
      <path
        d="M0,320 C50,310 80,305 120,308 C160,311 180,295 220,300 C260,305 290,290 340,285 C380,280 420,288 460,282 C500,276 530,270 570,275 C620,281 660,272 700,265 C750,257 800,260 850,255 C900,250 940,258 1000,252 L1000,600 L0,600 Z"
        fill="url(#moonGrad)"
      />

      {/* Surface texture / subtle ridges */}
      <path
        d="M0,340 C80,335 160,328 250,332 C340,336 420,322 510,318 C600,314 700,308 800,305 C900,302 950,310 1000,308"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M100,355 C180,350 260,345 360,348 C460,351 540,338 640,334 C740,330 850,335 950,330"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="0.5"
        opacity="0.15"
      />

      {/* Permanently Shadowed Region (PSR) - left area with water ice */}
      <ellipse cx="140" cy="450" rx="120" ry="60" fill="url(#psrGrad)" opacity="0.85" />
      <text x="80" y="470" fill="#6B7280" fontSize="9" fontFamily="sans-serif">永久影</text>
      <text x="75" y="481" fill="#6B7280" fontSize="9" fontFamily="sans-serif">（水氷あり）</text>

      {/* Main crater - left side */}
      <ellipse cx="150" cy="390" rx="55" ry="20" fill="#374151" opacity="0.7" />
      <ellipse cx="150" cy="387" rx="45" ry="15" fill="url(#craterGrad)" opacity="0.5" />

      {/* Smaller craters */}
      <ellipse cx="350" cy="360" rx="30" ry="10" fill="#374151" opacity="0.4" />
      <ellipse cx="700" cy="330" rx="20" ry="7" fill="#4B5563" opacity="0.4" />
      <ellipse cx="850" cy="345" rx="15" ry="5" fill="#4B5563" opacity="0.35" />

      {/* Sunlit ridge (right-upper side - Shackleton crater rim equivalent) */}
      <path
        d="M780,252 C800,248 820,244 840,246 C860,248 880,243 910,240 C940,237 970,242 1000,238"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="3"
        opacity="0.7"
      />
      <text x="810" y="238" fill="#D1D5DB" fontSize="9" fontFamily="sans-serif">永久日照稜線</text>

      {/* Horizon line highlight */}
      <path
        d="M0,320 C50,310 80,305 120,308 C160,311 180,295 220,300 C260,305 290,290 340,285 C380,280 420,288 460,282 C500,276 530,270 570,275 C620,281 660,272 700,265 C750,257 800,260 850,255 C900,250 940,258 1000,252"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </g>
  );
}
