import { motion } from 'framer-motion';
import type { InfraElement as InfraElementType } from '../../data/infrastructure';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';

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

export function InfraElementComponent({ infra }: Props) {
  const { currentPhase, selectedInfraId, selectInfra } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const isNew = phase.newInPhase.includes(infra.id);
  const isSelected = selectedInfraId === infra.id;
  const color = CATEGORY_COLORS[infra.category] || '#9CA3AF';
  const { x, y } = toSVG(infra.position);

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
        <circle cx={x} cy={y} r={22} fill={color} opacity={0.2} />
      )}

      {/* New-in-phase pulse ring */}
      {isNew && (
        <motion.circle
          cx={x}
          cy={y}
          r={18}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ r: 14, opacity: 0.9 }}
          animate={{ r: 26, opacity: 0 }}
          transition={{ duration: 2, repeat: 3, ease: 'easeOut' }}
        />
      )}

      {/* Background circle */}
      <circle
        cx={x}
        cy={y}
        r={16}
        fill={isSelected ? color : '#1F2937'}
        stroke={color}
        strokeWidth={isSelected ? 2 : 1.5}
        opacity={isSelected ? 0.95 : 0.85}
      />

      {/* Emoji icon */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="13"
        style={{ userSelect: 'none' }}
      >
        {infra.emoji}
      </text>

      {/* Label */}
      <text
        x={x}
        y={y + 26}
        textAnchor="middle"
        fill={isSelected ? '#F9FAFB' : '#D1D5DB'}
        fontSize="8"
        fontFamily="'Noto Sans JP', sans-serif"
        fontWeight={isSelected ? 'bold' : 'normal'}
      >
        {infra.name.length > 10 ? infra.name.slice(0, 9) + '…' : infra.name}
      </text>
    </motion.g>
  );
}
