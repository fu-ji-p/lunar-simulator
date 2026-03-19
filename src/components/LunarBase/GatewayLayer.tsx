import { motion } from 'framer-motion';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';

interface Props {
  onSelectInfra: (id: string) => void;
}

export function GatewayLayer({ onSelectInfra }: Props) {
  const { currentPhase, selectedInfraId } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;

  const showGateway = phase.activeInfraIds.includes('gateway_core') || phase.activeInfraIds.includes('gateway_full');
  const gatewayFull = phase.activeInfraIds.includes('gateway_full');
  const showRelay = phase.activeInfraIds.includes('relay_satellite') || phase.activeInfraIds.includes('relay_satellite_full');
  const isGatewayNew = phase.newInPhase.includes('gateway_core') || phase.newInPhase.includes('gateway_full');
  const isRelayNew = phase.newInPhase.includes('relay_satellite') || phase.newInPhase.includes('relay_satellite_full');

  const gatewayId = gatewayFull ? 'gateway_full' : 'gateway_core';
  const relayId = phase.activeInfraIds.includes('relay_satellite_full') ? 'relay_satellite_full' : 'relay_satellite';

  return (
    <g>
      {/* Orbit arc */}
      {showGateway && (
        <ellipse
          cx="500"
          cy="260"
          rx="200"
          ry="50"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="0.5"
          strokeDasharray="8,6"
          opacity="0.3"
        />
      )}

      {/* Gateway station */}
      {showGateway && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectInfra(gatewayId)}
          aria-label="Gateway宇宙ステーション"
        >
          {/* Glow effect if selected */}
          {selectedInfraId === gatewayId && (
            <circle cx="500" cy="48" r="28" fill="#3B82F6" opacity="0.15" />
          )}
          {/* New pulse ring */}
          {isGatewayNew && (
            <motion.circle
              cx="500"
              cy="48"
              r="24"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 16, opacity: 0.8 }}
              animate={{ r: 28, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* Station body - central hub */}
          <rect x="488" y="42" width="24" height="12" rx="3" fill={gatewayFull ? '#8B5CF6' : '#3B82F6'} />
          {/* Solar panels */}
          <rect x="460" y="45" width="26" height="6" rx="1" fill="#FCD34D" opacity="0.9" />
          <rect x="514" y="45" width="26" height="6" rx="1" fill="#FCD34D" opacity="0.9" />
          {gatewayFull && (
            <>
              <rect x="452" y="41" width="12" height="14" rx="1" fill="#FCD34D" opacity="0.7" />
              <rect x="536" y="41" width="12" height="14" rx="1" fill="#FCD34D" opacity="0.7" />
            </>
          )}
          {/* Label */}
          <text x="500" y="74" textAnchor="middle" fill="#E5E7EB" fontSize="9" fontFamily="sans-serif">
            {gatewayFull ? 'Gateway（完成）' : 'Gateway'}
          </text>
          <text x="500" y="83" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
            🛸
          </text>
        </motion.g>
      )}

      {/* Relay satellite */}
      {showRelay && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectInfra(relayId)}
          aria-label="月中継衛星"
        >
          {selectedInfraId === relayId && (
            <circle cx="750" cy="90" r="20" fill="#6366F1" opacity="0.15" />
          )}
          {isRelayNew && (
            <motion.circle
              cx="750"
              cy="90"
              r="18"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 12, opacity: 0.8 }}
              animate={{ r: 22, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* Satellite body */}
          <rect x="744" y="84" width="12" height="12" rx="2" fill="#6366F1" />
          {/* Antenna dish */}
          <path d="M750,84 L750,76 L756,80 Z" fill="#9CA3AF" />
          {/* Solar panels */}
          <rect x="730" y="87" width="12" height="4" rx="1" fill="#FCD34D" opacity="0.9" />
          <rect x="758" y="87" width="12" height="4" rx="1" fill="#FCD34D" opacity="0.9" />
          <text x="750" y="106" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
            📡 中継衛星
          </text>
        </motion.g>
      )}

      {/* Lander (when active) */}
      {phase.activeInfraIds.includes('lunar_lander') && (
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectInfra('lunar_lander')}
          aria-label="有人月離着陸機"
        >
          {selectedInfraId === 'lunar_lander' && (
            <circle cx="350" cy="250" r="20" fill="#F59E0B" opacity="0.15" />
          )}
          {phase.newInPhase.includes('lunar_lander') && (
            <motion.circle
              cx="350"
              cy="250"
              r="18"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 12, opacity: 0.8 }}
              animate={{ r: 24, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* Lander shape */}
          <polygon points="350,238 344,256 356,256" fill="#F59E0B" />
          <rect x="342" y="254" width="16" height="6" rx="1" fill="#D97706" />
          {/* Landing legs */}
          <line x1="342" y1="260" x2="336" y2="268" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="358" y1="260" x2="364" y2="268" stroke="#9CA3AF" strokeWidth="1.5" />
          <text x="350" y="278" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
            🚀 着陸機
          </text>
        </motion.g>
      )}

      {/* Docking line from lander to gateway */}
      {phase.activeInfraIds.includes('lunar_lander') && showGateway && (
        <line
          x1="350"
          y1="250"
          x2="488"
          y2="48"
          stroke="#F59E0B"
          strokeWidth="0.5"
          strokeDasharray="5,8"
          opacity="0.2"
        />
      )}
    </g>
  );
}
