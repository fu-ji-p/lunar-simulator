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
  surface_habitat_s:    '/Gemini_Generated_Image_ixusbtixusbtixus.png',
  surface_habitat_m:    '/Gemini_Generated_Image_ixusbtixusbtixus.png',
  surface_habitat_l:    '/Gemini_Generated_Image_ixusbtixusbtixus.png',
  // Medical
  medical_center:       '/Gemini_Generated_Image_ne9co3ne9co3ne9c.png',
  // Energy
  solar_power_s:        '/Gemini_Generated_Image_629fd629fd629fd6.png',
  solar_power_m:        '/Gemini_Generated_Image_629fd629fd629fd6.png',
  solar_power_l:        '/Gemini_Generated_Image_629fd629fd629fd6.png',
  nuclear_power:        '/Gemini_Generated_Image_2g3x4c2g3x4c2g3x.png',
  fund_regen_fc:        '/Gemini_Generated_Image_38wbir38wbir38wb.png',
  fund_am241_power:     '/Gemini_Generated_Image_p5gijkp5gijkp5gi.png',
  // ISRU
  lupex:                '/Gemini_Generated_Image_7t8fkg7t8fkg7t8f.png',
  isru_pilot:           '/Gemini_Generated_Image_b0c8spb0c8spb0c8.png',
  isru_full:            '/Gemini_Generated_Image_b0c8spb0c8spb0c8.png',
  propellant_plant:     '/Gemini_Generated_Image_b0c8spb0c8spb0c8.png',
  mining_robot:         '/Gemini_Generated_Image_s2xyuos2xyuos2xy.png',
  // Exploration
  slim:                 '/Gemini_Generated_Image_sh4cmnsh4cmnsh4c.png',
  pressurized_rover:    '/Gemini_Generated_Image_ehuimlehuimlehui.png',
  construction_robot:   '/Gemini_Generated_Image_vuob3evuob3evuob.png',
  fund_precision_lander:'/Gemini_Generated_Image_h2e0geh2e0geh2e0.png',
  // Science
  seismometer_net:      '/Gemini_Generated_Image_heaxfjheaxfjheax.png',
  lunar_telescope:      '/Gemini_Generated_Image_x617ksx617ksx617.png',
  sample_return:        '/Gemini_Generated_Image_7gbdzj7gbdzj7gbd.png',
  fund_infra_demo:      '/Gemini_Generated_Image_s3dv35s3dv35s3dv.png',
  // Industry
  biolab:               '/Gemini_Generated_Image_4ulfb34ulfb34ulf.png',
  manufacturing_hub:    '/Gemini_Generated_Image_esnox6esnox6esno.png',
  tourism_hub:          '/Gemini_Generated_Image_us5c1wus5c1wus5c.png',
  regolith_3dprint:     '/Gemini_Generated_Image_udom1tudom1tudom.png',
  // Communication
  lunar_comms_net:      '/Gemini_Generated_Image_ihkch5ihkch5ihkc.png',
  fund_lnss_ground:     '/Gemini_Generated_Image_kmp0mskmp0mskmp0.png',
  fund_comm_ground:     '/Gemini_Generated_Image_br0pbpbr0pbpbr0p.png',
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

  // CG image: square bounding box sized by displaySize, bottom anchored at (x, y)
  const sz = Math.min(Math.round(55 * (infra.displaySize ?? 1)), 130);
  const imgX = x - sz / 2;
  const imgY = y - sz;

  // Badge row: just below the label
  const cgBadgeY = y + 18;
  const cgBadgeStartX = x - totalBadgeW / 2;

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
      {cgImage ? (
        <>
          {/* Selection highlight behind image */}
          {isSelected && (
            <rect
              x={imgX - 4} y={imgY - 4}
              width={sz + 8} height={sz + 8}
              rx={4} fill={color} opacity={0.15}
            />
          )}

          {/* New-in-phase pulse at base (ground level) */}
          {isNew && (
            <motion.circle
              cx={x} cy={y}
              r={8}
              fill="none"
              stroke={color}
              strokeWidth="2"
              initial={{ r: 5, opacity: 0.9 }}
              animate={{ r: sz * 0.6, opacity: 0 }}
              transition={{ duration: 2, repeat: 3, ease: 'easeOut' }}
            />
          )}

          {/* CG image — black background removed via screen blend */}
          <image
            href={cgImage}
            x={imgX}
            y={imgY}
            width={sz}
            height={sz}
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'screen' as const }}
          />

          {/* Invisible click overlay */}
          <rect x={imgX} y={imgY} width={sz} height={sz} fill="transparent" />

          {/* Selection border */}
          {isSelected && (
            <rect
              x={imgX - 3} y={imgY - 3}
              width={sz + 6} height={sz + 6}
              rx={4} fill="none"
              stroke={color} strokeWidth={2} opacity={0.9}
            />
          )}

          {/* Label */}
          <text
            x={x} y={y + 10}
            textAnchor="middle"
            fill={isSelected ? '#F9FAFB' : '#D1D5DB'}
            fontSize="8"
            fontFamily="'Noto Sans JP', sans-serif"
            fontWeight={isSelected ? 'bold' : 'normal'}
          >
            {infra.name.length > 10 ? infra.name.slice(0, 9) + '…' : infra.name}
          </text>

          {/* 宇宙戦略基金バッジ */}
          {infra.source === 'fund' && (
            <g transform={`translate(${imgX + sz - 2}, ${imgY + 2})`}>
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
            const bx = cgBadgeStartX + i * (BADGE_W + BADGE_GAP);
            return (
              <g key={key}>
                <rect x={bx} y={cgBadgeY} width={BADGE_W} height={BADGE_H} rx={2}
                  fill={partner.color} fillOpacity={0.22}
                  stroke={partner.color} strokeOpacity={0.6} strokeWidth={0.5} />
                <text x={bx + BADGE_W / 2} y={cgBadgeY + BADGE_H / 2 + 0.5}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={partner.color} fontSize="5" fontFamily="monospace">
                  {key === 'Private' ? '民間' : key}
                </text>
              </g>
            );
          })}
          {extraCount > 0 && (
            <g>
              <rect x={cgBadgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP)} y={cgBadgeY}
                width={18} height={BADGE_H} rx={2}
                fill="#374151" fillOpacity={0.8} stroke="#6B7280" strokeOpacity={0.5} strokeWidth={0.5} />
              <text x={cgBadgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP) + 9} y={cgBadgeY + BADGE_H / 2 + 0.5}
                textAnchor="middle" dominantBaseline="middle"
                fill="#9CA3AF" fontSize="5" fontFamily="monospace">
                +{extraCount}
              </text>
            </g>
          )}
        </>
      ) : (
        <>
          {/* Selection glow (emoji fallback) */}
          {isSelected && (
            <circle cx={x} cy={y} r={r + 8} fill={color} opacity={0.2} />
          )}

          {/* New-in-phase pulse ring */}
          {isNew && (
            <motion.circle
              cx={x} cy={y} r={r + 2}
              fill="none" stroke={color} strokeWidth="2"
              initial={{ r: r - 2, opacity: 0.9 }}
              animate={{ r: r + 12, opacity: 0 }}
              transition={{ duration: 2, repeat: 3, ease: 'easeOut' }}
            />
          )}

          {/* Background circle */}
          <circle cx={x} cy={y} r={r}
            fill={isSelected ? color : '#1F2937'}
            stroke={color}
            strokeWidth={isSelected ? 2 : 1.5}
            opacity={isSelected ? 0.95 : 0.85}
          />

          {/* Emoji icon */}
          <text x={x} y={y + Math.round(fontSize * 0.4)}
            textAnchor="middle" fontSize={fontSize}
            style={{ userSelect: 'none' }}>
            {infra.emoji}
          </text>

          {/* Label */}
          <text x={x} y={y + r + 10}
            textAnchor="middle"
            fill={isSelected ? '#F9FAFB' : '#D1D5DB'}
            fontSize="8"
            fontFamily="'Noto Sans JP', sans-serif"
            fontWeight={isSelected ? 'bold' : 'normal'}>
            {infra.name.length > 10 ? infra.name.slice(0, 9) + '…' : infra.name}
          </text>

          {/* 宇宙戦略基金バッジ */}
          {infra.source === 'fund' && (
            <g transform={`translate(${x + r - 2}, ${y - r + 2})`}>
              <defs>
                <clipPath id={`fund-crane-${infra.id}`}>
                  <circle cx="0" cy="0" r="5" />
                </clipPath>
              </defs>
              <circle cx="0" cy="0" r="5" fill="#F59E0B" fillOpacity="0.95" />
              <image href="/SSF_logo_white.png" x="-5.5" y="-6" width="24" height="12"
                clipPath={`url(#fund-crane-${infra.id})`} preserveAspectRatio="xMidYMid meet" />
            </g>
          )}

          {/* Partner badges */}
          {shownKeys.map((key, i) => {
            const partner = PARTNERS[key];
            const bx = badgeStartX + i * (BADGE_W + BADGE_GAP);
            return (
              <g key={key}>
                <rect x={bx} y={badgeY} width={BADGE_W} height={BADGE_H} rx={2}
                  fill={partner.color} fillOpacity={0.22}
                  stroke={partner.color} strokeOpacity={0.6} strokeWidth={0.5} />
                <text x={bx + BADGE_W / 2} y={badgeY + BADGE_H / 2 + 0.5}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={partner.color} fontSize="5" fontFamily="monospace">
                  {key === 'Private' ? '民間' : key}
                </text>
              </g>
            );
          })}
          {extraCount > 0 && (
            <g>
              <rect x={badgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP)} y={badgeY}
                width={18} height={BADGE_H} rx={2}
                fill="#374151" fillOpacity={0.8} stroke="#6B7280" strokeOpacity={0.5} strokeWidth={0.5} />
              <text x={badgeStartX + shownKeys.length * (BADGE_W + BADGE_GAP) + 9} y={badgeY + BADGE_H / 2 + 0.5}
                textAnchor="middle" dominantBaseline="middle"
                fill="#9CA3AF" fontSize="5" fontFamily="monospace">
                +{extraCount}
              </text>
            </g>
          )}
        </>
      )}
    </motion.g>
  );
}
