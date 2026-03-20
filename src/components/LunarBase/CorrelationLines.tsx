import { motion, AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE } from '../../data/infrastructure';
import {
  CORRELATIONS,
  CORRELATION_COLORS,
  CORRELATION_TYPE_LABELS,
  type CorrelationType,
} from '../../data/correlations';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';

// Same coordinate mapping as InfraElement.tsx
function toSVG(pos: { x: number; y: number }) {
  const svgX = (pos.x / 100) * 1000;
  const svgY = 300 + ((pos.y - 40) / 60) * 280;
  return { x: svgX, y: Math.max(300, Math.min(580, svgY)) };
}

// Hardcoded SVG positions for orbital elements (from GatewayLayer.tsx)
const ORBITAL_SVG_POS: Record<string, { x: number; y: number }> = {
  gateway_core:        { x: 500, y: 54 },
  gateway_full:        { x: 500, y: 54 },
  relay_satellite:     { x: 750, y: 90 },
  relay_satellite_full:{ x: 750, y: 90 },
  lunar_lander:        { x: 350, y: 256 },
};

export function CorrelationLines() {
  const { currentPhase, selectedInfraId } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const activeIds = new Set(phase.activeInfraIds);

  // Build SVG position map for all infra elements
  const posMap = new Map<string, { x: number; y: number }>();
  for (const infra of INFRASTRUCTURE) {
    posMap.set(
      infra.id,
      ORBITAL_SVG_POS[infra.id] ?? toSVG(infra.position)
    );
  }

  // Only show correlations where BOTH endpoints are active in this phase
  const activeCorrelations = CORRELATIONS.filter(
    c => activeIds.has(c.from) && activeIds.has(c.to)
  );

  return (
    <AnimatePresence>
      <g>
        {/* Lines */}
        {activeCorrelations.map((corr, i) => {
          const from = posMap.get(corr.from);
          const to   = posMap.get(corr.to);
          if (!from || !to) return null;

          const color = CORRELATION_COLORS[corr.type];

          // Highlight logic: dim lines not related to selected element
          const isRelated =
            !selectedInfraId ||
            corr.from === selectedInfraId ||
            corr.to   === selectedInfraId;
          const lineOpacity = isRelated ? 0.75 : 0.08;

          // Midpoint for label
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;

          return (
            <motion.g
              key={`${corr.from}--${corr.to}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: lineOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
            >
              {/* Static background line (low opacity base) */}
              <line
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.3}
              />

              {/* Flowing animated dashes */}
              <motion.line
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                stroke={color}
                strokeWidth={1.5}
                strokeDasharray="5 5"
                strokeLinecap="round"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{
                  strokeDashoffset: {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'linear',
                  }
                }}
              />

              {/* Arrowhead at destination */}
              <CorrelationArrow from={from} to={to} color={color} />

              {/* Label at midpoint — only show when this line is highlighted */}
              {isRelated && selectedInfraId && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <rect
                    x={mx - 22} y={my - 9}
                    width={44}   height={12}
                    rx={3}
                    fill="#0A0E1A"
                    fillOpacity={0.75}
                  />
                  <text
                    x={mx} y={my}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={color}
                    fontSize="7"
                    fontFamily="'Noto Sans JP', sans-serif"
                  >
                    {corr.label}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}

        {/* Legend — bottom-left of surface area */}
        <CorrelationLegend />
      </g>
    </AnimatePresence>
  );
}

// Small triangle arrowhead pointing from → to
function CorrelationArrow({
  from, to, color
}: {
  from: { x: number; y: number };
  to:   { x: number; y: number };
  color: string;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;

  const ux = dx / len;
  const uy = dy / len;
  const size = 6;

  // Place arrowhead 8px before destination (so it doesn't overlap the circle)
  const tipX = to.x - ux * 8;
  const tipY = to.y - uy * 8;
  const b1x  = tipX - ux * size + uy * (size * 0.5);
  const b1y  = tipY - uy * size - ux * (size * 0.5);
  const b2x  = tipX - ux * size - uy * (size * 0.5);
  const b2y  = tipY - uy * size + ux * (size * 0.5);

  return (
    <polygon
      points={`${tipX},${tipY} ${b1x},${b1y} ${b2x},${b2y}`}
      fill={color}
      opacity={0.9}
    />
  );
}

// Legend box in bottom-left corner of SVG
function CorrelationLegend() {
  const types = Object.entries(CORRELATION_TYPE_LABELS) as [CorrelationType, string][];
  const x0 = 8;
  const y0 = 390;
  const rowH = 14;
  const boxH = 10 + types.length * rowH;

  return (
    <g>
      <rect
        x={x0 - 4} y={y0 - 6}
        width={100} height={boxH}
        rx={4}
        fill="#0A0E1A"
        fillOpacity={0.82}
        stroke="white"
        strokeOpacity={0.1}
        strokeWidth={0.5}
      />
      <text
        x={x0 + 44} y={y0 + 3}
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="7"
        fontFamily="'Orbitron', monospace"
      >
        相関関係
      </text>
      {types.map(([type, label], i) => {
        const color = CORRELATION_COLORS[type];
        const y = y0 + 12 + i * rowH;
        return (
          <g key={type}>
            <line
              x1={x0} y1={y + 2}
              x2={x0 + 16} y2={y + 2}
              stroke={color}
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <text
              x={x0 + 20} y={y + 5}
              fill={color}
              fontSize="7.5"
              fontFamily="'Noto Sans JP', sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
