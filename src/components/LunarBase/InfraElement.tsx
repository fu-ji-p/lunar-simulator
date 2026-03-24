import { motion } from 'framer-motion';
import type { InfraElement as InfraElementType } from '../../data/infrastructure';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { INFRA_PARTNERS, PARTNERS } from '../../data/partners';

// Convert 0-100 percent position to SVG coordinates
// Moon surface area: x: 0-1000, y: 300-580
function toSVG(pos: { x: number; y: number }) {
  const svgX = (pos.x / 100) * 1000;
  const svgY = 300 + ((pos.y - 40) / 60) * 280;
  return { x: svgX, y: Math.max(300, Math.min(580, svgY)) };
}

interface Props {
  infra: InfraElementType;
}

const CATEGORY_COLORS: Record<string, string> = {
  transport: '#3B82F6',
  habitat: '#10B981',
  energy: '#F59E0B',
  isru: '#06B6D4',
  science: '#8B5CF6',
  exploration: '#F97316',
  industry: '#EC4899',
  communication: '#6366F1',
};

// CG image mapping: infra id → public image path
const INFRA_CG_IMAGES: Record<string, string> = {
  // Habitat
  surface_habitat_s:  '/Gemini_Generated_Image_uaxiipuaxiipuaxi.png',
  surface_habitat_m:  '/Gemini_Generated_Image_uaxiipuaxiipuaxi.png',
  surface_habitat_l:  '/Gemini_Generated_Image_uaxiipuaxiipuaxi.png',
  // Energy
  solar_power_s:      '/Gemini_Generated_Image_coewiicoewiicoew.png',
  solar_power_m:      '/Gemini_Generated_Image_coewiicoewiicoew.png',
  solar_power_l:      '/Gemini_Generated_Image_coewiicoewiicoew.png',
  nuclear_power:      '/Gemini_Generated_Image_gu2odqgu2odqgu2o.png',
  // ISRU
  lupex:              '/Gemini_Generated_Image_r4xis3r4xis3r4xi.png',
  isru_pilot:         '/Gemini_Generated_Image_y8gpzqy8gpzqy8gp.png',
  isru_full:          '/Gemini_Generated_Image_y8gpzqy8gpzqy8gp.png',
  propellant_plant:   '/Gemini_Generated_Image_y8gpzqy8gpzqy8gp.png',
  mining_robot:       '/Gemini_Generated_Image_v0iw8fv0iw8fv0iw.png',
  // Exploration
  pressurized_rover:  '/Gemini_Generated_Image_umj65eumj65eumj6.png',
  // Industry
  biolab:             '/Gemini_Generated_Image_4ulfb34ulfb34ulf.png',
};

// Partner badge constants
const BADGE_W = 16;
const BADGE_H = 7;
const BADGE_GAP = 2;
const BADGE_MAX = 3;

export function InfraElementComponent({ infra }: Props) {
  const { currentPhase, selectedInfraId, selectInfra } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const isNew = phase.newInPhase.includes(infra.id);
  const isSelected = selectedInfraId === infra.id;
  const color = CATEGORY_COLORS[infra.category] || '#9CA3AF';
  const { x, y } = toSVG(infra.position);

  // Scale radius based on real-world size. Base r=16 = standard unit.
  const r = Math.round(16 * (infra.displaySize ?? 1));
  const fontSize = Math.max(7, Math.round(13 * Math.min(infra.displaySize ?? 1, 1.4)));

  // Partner badges
  const partnerKeys = INFRA_PARTNERS[infra.id] ?? [];
  const shownKeys = partnerKeys.slice(0, BADGE_MAX);
  const extraCount = partnerKeys.length - shownKeys.length;
  const totalBadgeW = shownKeys.length * BADGE_W + (shownKeys.length - 1) * BADGE_GAP + (extraCount > 0 ? BADGE_GAP + 18 : 0);
  const badgeStartX = x - totalBadgeW / 2;
  const badgeY = y + r + 14;

  const cgImage = INFRA_CG_IMAGES[infra.id];
  const clipId = `cg-clip-${infra.id}`;

  return (
    <motion.g
      key={`${infra.id}-${currentPhase}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
      onClick={() => selectInfra(isSelected ? null : infra.id)}
      aria-label={infra.name}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectInfra(isSelected ? null : infra.id); }}
    >
      {/* Selection glow */}
      {isSelected && (
        <circle cx={x} cy={y} r={r + 8} fill={color} opacity={0.2} />
      )}

      {/* New-in-phase pulse ring */}
      {isNew && (
        <motion.circle
          cx={x}
          cy={y}
          r={r + 2}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ r: r - 2, opacity: 0.9 }}
          animate={{ r: r + 12, opacity: 0 }}
          transition={{ duration: 2, repeat: 3, ease: 'easeOut' }}
        />
      )}

      {cgImage ? (
        <>
          {/* Clip path for circular CG icon */}
          <defs>
            <clipPath id={clipId}>
              <circle cx={x} cy={y} r={r - 1} />
            </clipPath>
          </defs>
          {/* Dark background so image edges don't bleed */}
          <circle cx={x} cy={y} r={r} fill="#050A14" opacity={0.75} />
          {/* CG image clipped to circle */}
          <image
            href={cgImage}
            x={x - r}
            y={y - r}
            width={r * 2}
            height={r * 2}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="xMidYMid slice"
          />
          {/* Colored border ring */}
          <circle
            cx={x} cy={y} r={r}
            fill="none"
            stroke={color}
            strokeWidth={isSelected ? 2.5 : 1.5}
            opacity={isSelected ? 1 : 0.85}
          />
          {/* Selection inner highlight */}
          {isSelected && (
            <circle cx={x} cy={y} r={r - 1} fill={color} opacity={0.18} />
          )}
        </>
      ) : (
        <>
          {/* Background circle (emoji fallback) */}
          <circle
            cx={x}
            cy={y}
            r={r}
            fill={isSelected ? color : '#1F2937'}
            stroke={color}
            strokeWidth={isSelected ? 2 : 1.5}
            opacity={isSelected ? 0.95 : 0.85}
          />
          {/* Emoji icon */}
          <text
            x={x}
            y={y + Math.round(fontSize * 0.4)}
            textAnchor="middle"
            fontSize={fontSize}
            style={{ userSelect: 'none' }}
          >
            {infra.emoji}
          </text>
        </>
      )}

      {/* Label */}
      <text
        x={x}
        y={y + r + 10}
        textAnchor="middle"
        fill={isSelected ? '#F9FAFB' : '#D1D5DB'}
        fontSize="8"
        fontFamily="'Noto Sans JP', sans-serif"
        fontWeight={isSelected ? 'bold' : 'normal'}
      >
        {infra.name.length > 10 ? infra.name.slice(0, 9) + '…' : infra.name}
      </text>

      {/* 宇宙戦略基金バッジ（鶴マーク） */}
      {infra.source === 'fund' && (
        <g transform={`translate(${x + r - 2}, ${y - r + 2})`}>
          <defs>
            <clipPath id={`fund-crane-${infra.id}`}>
              <circle cx="0" cy="0" r="5" />
            </clipPath>
          </defs>
          <circle cx="0" cy="0" r="5" fill="#F59E0B" fillOpacity="0.95" />
          <image
            href="/SSF_logo_white.png"
            x="-5.5" y="-6"
            width="24" height="12"
            clipPath={`url(#fund-crane-${infra.id})`}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}

      {/* Partner badges */}
      {shownKeys.map((key, i) => {
        const partner = PARTNERS[key];
        const bx = badgeStartX + i * (BADGE_W + BADGE_GAP);
        return (
          <g key={key}>
            <rect
              x={bx} y={badgeY}
              width={BADGE_W} height={BADGE_H}
              rx={2}
              fill={partner.color}
              fillOpacity={0.22}
              stroke={partner.color}
              strokeOpacity={0.6}
              strokeWidth={0.5}
            />
            <text
              x={bx + BADGE_W / 2}
              y={badgeY + BADGE_H / 2 + 0.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={partner.color}
              fontSize="5"
              fontFamily="monospace"
            >
              {key === 'Private' ? '民間' : key}
            </text>
          </g>
        );
      })}
      {/* "+N more" badge */}
      {extraCount > 0 && (
        <g>
          <rect
            x={badgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP)}
            y={badgeY}
            width={18} height={BADGE_H}
            rx={2}
            fill="#374151"
            fillOpacity={0.8}
            stroke="#6B7280"
            strokeOpacity={0.5}
            strokeWidth={0.5}
          />
          <text
            x={badgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP) + 9}
            y={badgeY + BADGE_H / 2 + 0.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9CA3AF"
            fontSize="5"
            fontFamily="monospace"
          >
            +{extraCount}
          </text>
        </g>
      )}
    </motion.g>
  );
}
