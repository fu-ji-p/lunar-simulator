import { motion } from 'framer-motion';

/**
 * ResourceOverlay
 *
 * Shows two resource zones on the lunar south pole map (viewBox 0 0 1000 600):
 *   - Water ice (PSR / Permanently Shadowed Region) — left area, cyan/blue
 *   - Solar irradiance (Shackleton crater rim / sunlit ridge) — right area, amber/yellow
 *
 * Based on 国際宇宙探査シナリオ案2025, section 4 & 10 (LUPEX survey zone).
 */
export function ResourceOverlay() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <defs>
        {/* Water ice gradient — radiates from deep PSR center */}
        <radialGradient id="iceGrad" cx="20%" cy="55%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#06B6D4" stopOpacity="0.55" />
          <stop offset="40%"  stopColor="#0EA5E9" stopOpacity="0.30" />
          <stop offset="75%"  stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>

        {/* Solar irradiance gradient — radiates from Shackleton rim */}
        <radialGradient id="sunGrad" cx="80%" cy="48%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#FCD34D" stopOpacity="0.55" />
          <stop offset="40%"  stopColor="#F59E0B" stopOpacity="0.28" />
          <stop offset="75%"  stopColor="#F97316" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>

        {/* Clip to moon surface area only (y ≥ 295) */}
        <clipPath id="surfaceClip">
          <rect x="0" y="295" width="1000" height="305" />
        </clipPath>
      </defs>

      {/* ── Water ice zone (PSR) ── */}
      <g clipPath="url(#surfaceClip)">
        {/* Main glow blob */}
        <ellipse
          cx={195} cy={430}
          rx={230} ry={160}
          fill="url(#iceGrad)"
        />
        {/* Secondary smaller concentration */}
        <ellipse
          cx={100} cy={370}
          rx={110} ry={75}
          fill="#06B6D4"
          fillOpacity={0.18}
        />

        {/* Zone label */}
        <text
          x={60} y={308}
          fill="#67E8F9"
          fontSize="8"
          fontFamily="'Orbitron', monospace"
          opacity={0.9}
        >
          PSR / 水氷堆積域
        </text>
        <text
          x={60} y={319}
          fill="#67E8F9"
          fontSize="7"
          fontFamily="'Noto Sans JP', sans-serif"
          opacity={0.7}
        >
          永久影領域 — LUPEX探査ターゲット
        </text>

        {/* Probability markers */}
        <IceProbabilityDot cx={150} cy={400} label="高" probability="high" />
        <IceProbabilityDot cx={90}  cy={360} label="中" probability="mid"  />
        <IceProbabilityDot cx={280} cy={450} label="中" probability="mid"  />
        <IceProbabilityDot cx={55}  cy={430} label="低" probability="low"  />
        <IceProbabilityDot cx={330} cy={390} label="低" probability="low"  />
      </g>

      {/* ── Solar irradiance zone (Shackleton rim) ── */}
      <g clipPath="url(#surfaceClip)">
        {/* Main glow blob */}
        <ellipse
          cx={820} cy={400}
          rx={210} ry={145}
          fill="url(#sunGrad)"
        />
        {/* Ridge highlight strip */}
        <ellipse
          cx={880} cy={350}
          rx={110} ry={60}
          fill="#FCD34D"
          fillOpacity={0.20}
        />

        {/* Zone label */}
        <text
          x={680} y={308}
          fill="#FDE68A"
          fontSize="8"
          fontFamily="'Orbitron', monospace"
          opacity={0.9}
        >
          日照尾根 / Shackleton縁
        </text>
        <text
          x={680} y={319}
          fill="#FDE68A"
          fontSize="7"
          fontFamily="'Noto Sans JP', sans-serif"
          opacity={0.7}
        >
          年間日照率 ≥ 80% — 太陽電池最適地
        </text>

        {/* Irradiance markers */}
        <SunDot cx={870} cy={365} label="最高" intensity="peak" />
        <SunDot cx={800} cy={410} label="高"   intensity="high" />
        <SunDot cx={940} cy={400} label="高"   intensity="high" />
        <SunDot cx={730} cy={440} label="中"   intensity="mid"  />
      </g>

      {/* ── Legend (top-right of surface area) ── */}
      <ResourceLegend />
    </motion.g>
  );
}

// ── Sub-components ────────────────────────────────────────────

function IceProbabilityDot({
  cx, cy, label, probability,
}: {
  cx: number; cy: number; label: string;
  probability: 'high' | 'mid' | 'low';
}) {
  const opacity = probability === 'high' ? 0.85 : probability === 'mid' ? 0.60 : 0.38;
  const r       = probability === 'high' ? 5    : probability === 'mid' ? 4    : 3;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} fill="#06B6D4" fillOpacity={opacity * 0.18} />
      <circle cx={cx} cy={cy} r={r}     fill="#06B6D4" fillOpacity={opacity} />
      <text
        x={cx + r + 3} y={cy + 3}
        fill="#67E8F9"
        fontSize="6"
        fontFamily="'Noto Sans JP', sans-serif"
        opacity={0.85}
      >
        {label}
      </text>
    </g>
  );
}

function SunDot({
  cx, cy, label, intensity,
}: {
  cx: number; cy: number; label: string;
  intensity: 'peak' | 'high' | 'mid';
}) {
  const opacity = intensity === 'peak' ? 0.90 : intensity === 'high' ? 0.65 : 0.42;
  const r       = intensity === 'peak' ? 6    : intensity === 'high' ? 4    : 3;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 5} fill="#FCD34D" fillOpacity={opacity * 0.15} />
      <circle cx={cx} cy={cy} r={r}     fill="#FBBF24" fillOpacity={opacity} />
      <text
        x={cx + r + 3} y={cy + 3}
        fill="#FDE68A"
        fontSize="6"
        fontFamily="'Noto Sans JP', sans-serif"
        opacity={0.85}
      >
        {label}
      </text>
    </g>
  );
}

function ResourceLegend() {
  const x0 = 430;
  const y0 = 302;
  return (
    <g>
      <rect
        x={x0 - 4} y={y0 - 4}
        width={148} height={34}
        rx={4}
        fill="#0A0E1A"
        fillOpacity={0.82}
        stroke="white"
        strokeOpacity={0.1}
        strokeWidth={0.5}
      />
      {/* Water ice entry */}
      <circle cx={x0 + 6}   cy={y0 + 8}  r={5} fill="#06B6D4" fillOpacity={0.7} />
      <text x={x0 + 14} y={y0 + 12}
        fill="#67E8F9" fontSize="7"
        fontFamily="'Noto Sans JP', sans-serif"
      >
        水氷堆積（PSR）
      </text>
      {/* Sunlight entry */}
      <circle cx={x0 + 6}   cy={y0 + 24} r={5} fill="#FBBF24" fillOpacity={0.7} />
      <text x={x0 + 14} y={y0 + 28}
        fill="#FDE68A" fontSize="7"
        fontFamily="'Noto Sans JP', sans-serif"
      >
        高日照率（年間80%+）
      </text>
    </g>
  );
}
