import { motion } from 'framer-motion';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';

interface Props {
  onSelectInfra: (id: string) => void;
}

export function GatewayLayer({ onSelectInfra }: Props) {
  const { currentPhase, selectedInfraId, showFund } = useSimulatorStore();
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
          cy="240"
          rx="220"
          ry="55"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="0.5"
          strokeDasharray="8,6"
          opacity="0.25"
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
            <circle cx="500" cy="52" r="65" fill={gatewayFull ? '#8B5CF6' : '#3B82F6'} opacity="0.12" />
          )}
          {/* New pulse ring */}
          {isGatewayNew && (
            <motion.circle
              cx="500"
              cy="52"
              r="30"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 20, opacity: 0.8 }}
              animate={{ r: 55, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* CG Gateway station image */}
          <image
            href="/Gemini_Generated_Image_sav6pisav6pisav6.jpg"
            x="427"
            y="5"
            width="146"
            height="95"
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'screen' as const, filter: gatewayFull ? 'drop-shadow(0 0 12px rgba(139,92,246,0.9)) brightness(1.1)' : 'drop-shadow(0 0 10px rgba(59,130,246,0.9)) brightness(1.05)' }}
          />
          {/* Invisible click overlay */}
          <rect x="427" y="5" width="146" height="95" fill="transparent" />
          {/* Label */}
          <text x="500" y="112" textAnchor="middle" fill="#E5E7EB" fontSize="9" fontFamily="sans-serif">
            {gatewayFull ? 'Gateway（完成）' : 'Gateway'}
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
            <circle cx="750" cy="90" r="42" fill="#6366F1" opacity="0.12" />
          )}
          {isRelayNew && (
            <motion.circle
              cx="750"
              cy="90"
              r="20"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 14, opacity: 0.8 }}
              animate={{ r: 36, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* CG relay satellite image */}
          <image
            href="/Gemini_Generated_Image_k0riblk0riblk0ri.jpg"
            x="708"
            y="52"
            width="84"
            height="84"
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.9)) brightness(1.05)' }}
          />
          <rect x="708" y="52" width="84" height="84" fill="transparent" />
          <text x="750" y="146" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
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
            <circle cx="350" cy="248" r="38" fill="#F59E0B" opacity="0.12" />
          )}
          {phase.newInPhase.includes('lunar_lander') && (
            <motion.circle
              cx="350"
              cy="248"
              r="20"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 14, opacity: 0.8 }}
              animate={{ r: 34, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* CG lander image */}
          <image
            href="/Gemini_Generated_Image_y4knh3y4knh3y4kn.jpg"
            x="316"
            y="210"
            width="68"
            height="90"
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.9)) brightness(1.05)' }}
          />
          <rect x="316" y="210" width="68" height="90" fill="transparent" />
          <text x="350" y="312" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">
            🚀 着陸機
          </text>
        </motion.g>
      )}

      {/* Docking line from lander to gateway */}
      {phase.activeInfraIds.includes('lunar_lander') && showGateway && (
        <line
          x1="350"
          y1="248"
          x2="490"
          y2="100"
          stroke="#F59E0B"
          strokeWidth="0.5"
          strokeDasharray="5,8"
          opacity="0.25"
        />
      )}

      {/* THz Water Resource Sensing Satellite (宇宙戦略基金) */}
      {showFund && phase.activeInfraIds.includes('fund_thz_satellite') && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectInfra('fund_thz_satellite')}
          aria-label="テラヘルツ水資源探査衛星"
        >
          {selectedInfraId === 'fund_thz_satellite' && (
            <circle cx="220" cy="155" r="20" fill="#8B5CF6" opacity="0.15" />
          )}
          {phase.newInPhase.includes('fund_thz_satellite') && (
            <motion.circle
              cx="220"
              cy="155"
              r="16"
              fill="none"
              stroke={phase.color}
              strokeWidth="2"
              initial={{ r: 10, opacity: 0.8 }}
              animate={{ r: 20, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* CG THz satellite image */}
          <image
            href="/Gemini_Generated_Image_8r70cg8r70cg8r70.jpg"
            x="188" y="128"
            width="64" height="64"
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.9)) brightness(1.05)' }}
          />
          <rect x="188" y="128" width="64" height="64" fill="transparent" />
          {/* SSF badge */}
          <g transform="translate(253, 130)">
            <defs>
              <clipPath id="thz-sat-crane-clip">
                <circle cx="0" cy="0" r="5" />
              </clipPath>
            </defs>
            <circle cx="0" cy="0" r="5" fill="#F59E0B" fillOpacity="0.95" />
            <image
              href="/SSF_logo_white.png"
              x="-4.2" y="-4.7"
              width="19" height="9.5"
              clipPath="url(#thz-sat-crane-clip)"
            />
          </g>
          <text x="220" y="200" textAnchor="middle" fill="#C4B5FD" fontSize="8" fontFamily="sans-serif">
            THz探査衛星
          </text>
        </motion.g>
      )}
    </g>
  );
}
