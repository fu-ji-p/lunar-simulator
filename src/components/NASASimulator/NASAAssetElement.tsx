import { motion } from 'framer-motion';
import type { NASAAsset } from '../../data/nasaAssets';

interface Props {
  asset: NASAAsset;
  isSelected: boolean;
  isNew: boolean;
  phaseColor: string;
  onSelect: (id: string) => void;
}

function toSVG(pos: { x: number; y: number }) {
  const svgX = (pos.x / 100) * 1000;
  const svgY = 300 + ((pos.y - 40) / 60) * 280;
  return { x: svgX, y: Math.max(300, Math.min(580, svgY)) };
}

const TYPE_COLORS: Record<string, string> = {
  rover:   '#3B82F6',
  power:   '#F59E0B',
  habitat: '#10B981',
  comms:   '#6366F1',
  isru:    '#06B6D4',
  science: '#8B5CF6',
  lander:  '#60A5FA',
  drone:   '#F97316',
};

export function NASAAssetElement({ asset, isSelected, isNew, phaseColor, onSelect }: Props) {
  const { x, y } = toSVG(asset.position);
  const sz = Math.min(Math.round(55 * asset.displaySize), 130);
  const imgX = x - sz / 2;
  const imgY = y - sz;
  const color = asset.color ?? TYPE_COLORS[asset.type] ?? '#9CA3AF';

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(asset.id)}
    >
      {/* Selection ring */}
      {isSelected && (
        <circle cx={x} cy={y - sz / 2} r={sz / 2 + 8} fill={color} opacity="0.15" />
      )}
      {/* New pulse */}
      {isNew && (
        <motion.circle
          cx={x} cy={y - sz / 2} r={sz / 2 + 4}
          fill="none" stroke={phaseColor} strokeWidth="1.5"
          initial={{ r: sz / 2, opacity: 0.8 }}
          animate={{ r: sz / 2 + 20, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {asset.cgImage ? (
        <image
          href={asset.cgImage}
          x={imgX} y={imgY}
          width={sz} height={sz}
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: 'screen' as const, filter: `drop-shadow(0 0 6px ${color}CC) brightness(1.05)` }}
        />
      ) : (
        // Emoji fallback
        <g>
          <circle cx={x} cy={y - sz / 2} r={sz / 2}
            fill={`${color}18`} stroke={color} strokeWidth="1" opacity="0.7" />
          <text x={x} y={y - sz / 2 + sz * 0.13}
            textAnchor="middle" fontSize={sz * 0.45} dominantBaseline="middle">
            {asset.icon ?? '🔧'}
          </text>
        </g>
      )}

      {/* Label */}
      <text
        x={x} y={y + 6}
        textAnchor="middle"
        fill={isSelected ? color : '#E5E7EB'}
        fontSize="9"
        fontFamily="sans-serif"
        style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
      >
        {asset.name.length > 22 ? asset.name.substring(0, 20) + '…' : asset.name}
      </text>

      {/* Source badge: international = 🌐, commercial = 🏢 */}
      {asset.source !== 'nasa' && (
        <text x={imgX + sz - 2} y={imgY + 10}
          textAnchor="end" fontSize="9" opacity="0.85">
          {asset.source === 'international' ? '🌐' : '🏢'}
        </text>
      )}
    </motion.g>
  );
}
