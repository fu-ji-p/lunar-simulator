import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NASA_PHASES } from '../../data/nasaPhases';
import { NASA_ASSETS } from '../../data/nasaAssets';
import { NASAAssetElement } from './NASAAssetElement';
import { NASAInfoPanel } from './NASAInfoPanel';
import { SpaceBackground } from '../LunarBase/SpaceBackground';
import { MoonSurface } from '../LunarBase/MoonSurface';

// Orbital satellite positions for LunaNet
const LUNANET_POSITIONS_3 = [
  { x: 62, y: 88 }, { x: 124, y: 65 }, { x: 186, y: 50 },
];
const LUNANET_POSITIONS_6 = [
  ...LUNANET_POSITIONS_3,
  { x: 248, y: 45 }, { x: 310, y: 50 }, { x: 372, y: 65 },
];

export function NASASimulatorView() {
  const [currentPhaseId, setCurrentPhaseId] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const phase = NASA_PHASES.find(p => p.id === currentPhaseId)!;

  const activeAssets = NASA_ASSETS.filter(a => phase.activeAssetIds.includes(a.id));
  const surfaceAssets = activeAssets.filter(a => a.type !== 'orbital' && a.type !== 'lander');

  const handleSelect = (id: string) => {
    setSelectedAssetId(prev => prev === id ? null : id);
  };

  const selectedAsset = NASA_ASSETS.find(a => a.id === selectedAssetId) ?? null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Phase selector */}
      <div className="bg-[#0A0E1A] border-b border-white/10 px-4 py-2 flex items-center gap-3">
        <span className="text-[#9CA3AF] text-xs font-medium mr-1">Phase:</span>
        {NASA_PHASES.map(p => (
          <button
            key={p.id}
            onClick={() => { setCurrentPhaseId(p.id); setSelectedAssetId(null); }}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all border ${
              currentPhaseId === p.id
                ? 'text-white border-transparent'
                : 'text-[#9CA3AF] border-white/10 hover:text-white hover:border-white/25'
            }`}
            style={currentPhaseId === p.id ? { backgroundColor: p.color, borderColor: p.color } : {}}
          >
            <span className="font-orbitron">{p.label}</span>
            <span className="ml-1.5 opacity-80">{p.name}</span>
            <span className="ml-1.5 opacity-60">{p.period}</span>
          </button>
        ))}
        {/* Phase stats */}
        <div className="ml-auto flex items-center gap-4 text-xs">
          <span className="text-[#9CA3AF]">🚀 <span className="text-white font-medium">{phase.launchCount}</span> launches</span>
          <span className="text-[#9CA3AF]">🛬 <span className="text-white font-medium">{phase.landingCount}</span> landings</span>
          <span className="text-[#9CA3AF]">📦 <span className="text-white font-medium">{phase.payloadTons}t</span> payload</span>
          <span className="text-[#9CA3AF]">👩‍🚀 <span className="text-white font-medium">{phase.crewCount}</span> crew</span>
        </div>
      </div>

      {/* Main content: map + info panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* SVG Map */}
        <div className="flex-1 overflow-hidden bg-[#0A0E1A] relative">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full"
            style={{ display: 'block' }}
            aria-label="NASA Ignition Moon Base Simulator Map"
          >
            <SpaceBackground />
            <MoonSurface />

            {/* NASA Moon Base title */}
            <text x="500" y="295" textAnchor="middle" fill={phase.color} fontSize="11"
              fontFamily="'Orbitron', monospace" opacity="0.8">
              NASA IGNITION — {phase.name.toUpperCase()} — {phase.period} — {phase.crewCount} crew
            </text>

            {/* LunaNet orbital satellites */}
            {phase.activeAssetIds.includes('lunanet_1') && (() => {
              const isSelected1 = selectedAssetId === 'lunanet_1';
              const isSelected2 = selectedAssetId === 'lunanet_2';
              const showExt = phase.activeAssetIds.includes('lunanet_2');
              const positions = showExt ? LUNANET_POSITIONS_6 : LUNANET_POSITIONS_3;
              const SAT_W = 36;
              return (
                <g>
                  {/* Orbit arc */}
                  <ellipse cx="500" cy="240" rx="420" ry="85" fill="none"
                    stroke="#6366F1" strokeWidth="0.4" strokeDasharray="6,8" opacity="0.12" />
                  {/* Sats group 1 (lunanet_1: first 3) */}
                  <g style={{ cursor: 'pointer' }} onClick={() => handleSelect('lunanet_1')}>
                    {positions.slice(0, 3).map((p, i) => (
                      <g key={i}>
                        {isSelected1 && <circle cx={p.x + SAT_W / 2} cy={p.y + SAT_W / 2} r={22} fill="#6366F1" opacity="0.15" />}
                        <image href="/Gemini_Generated_Image_ihkch5ihkch5ihkc.jpg"
                          x={p.x} y={p.y} width={SAT_W} height={SAT_W}
                          preserveAspectRatio="xMidYMid meet"
                          style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 5px rgba(99,102,241,0.8)) brightness(1.05)' }} />
                        <rect x={p.x} y={p.y} width={SAT_W} height={SAT_W} fill="transparent" />
                      </g>
                    ))}
                    <text x={positions[0].x + SAT_W / 2} y={positions[0].y + SAT_W + 12}
                      textAnchor="middle" fill="#A5B4FC" fontSize="8" fontFamily="sans-serif">
                      LunaNet (5 sats)
                    </text>
                  </g>
                  {/* Sats group 2 (lunanet_2: sats 4-6) */}
                  {showExt && (
                    <g style={{ cursor: 'pointer' }} onClick={() => handleSelect('lunanet_2')}>
                      {positions.slice(3).map((p, i) => (
                        <g key={i}>
                          {isSelected2 && <circle cx={p.x + SAT_W / 2} cy={p.y + SAT_W / 2} r={22} fill="#8B5CF6" opacity="0.15" />}
                          <image href="/Gemini_Generated_Image_ihkch5ihkch5ihkc.jpg"
                            x={p.x} y={p.y} width={SAT_W} height={SAT_W}
                            preserveAspectRatio="xMidYMid meet"
                            style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 5px rgba(139,92,246,0.8)) brightness(1.05)' }} />
                          <rect x={p.x} y={p.y} width={SAT_W} height={SAT_W} fill="transparent" />
                        </g>
                      ))}
                      <text x={positions[3].x + SAT_W / 2} y={positions[3].y + SAT_W + 12}
                        textAnchor="middle" fill="#C4B5FD" fontSize="8" fontFamily="sans-serif">
                        LunaNet Ext.
                      </text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* Artemis lander (orbital) */}
            {phase.activeAssetIds.includes('artemis_lander') && (() => {
              const isSelected = selectedAssetId === 'artemis_lander';
              const isNew = phase.newInPhase.includes('artemis_lander');
              return (
                <motion.g
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelect('artemis_lander')}
                >
                  {/* Orbit arc for lander */}
                  <ellipse cx="500" cy="240" rx="220" ry="55" fill="none"
                    stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="8,6" opacity="0.25" />
                  {isSelected && <circle cx="720" cy="185" r="52" fill="#3B82F6" opacity="0.12" />}
                  {isNew && (
                    <motion.circle cx="720" cy="185" r="35" fill="none" stroke="#3B82F6" strokeWidth="2"
                      initial={{ r: 25, opacity: 0.8 }} animate={{ r: 50, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }} />
                  )}
                  <image href="/Gemini_Generated_Image_y4knh3y4knh3y4kn.jpg"
                    x="692" y="157" width="56" height="56"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ mixBlendMode: 'screen' as const, filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.85)) brightness(1.05)' }} />
                  <rect x="692" y="157" width="56" height="56" fill="transparent" />
                  <text x="720" y="222" textAnchor="middle" fill="#93C5FD" fontSize="8" fontFamily="sans-serif">
                    Artemis HLS
                  </text>
                </motion.g>
              );
            })()}

            {/* Surface assets */}
            <AnimatePresence mode="sync">
              {surfaceAssets.map(asset => (
                <NASAAssetElement
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAssetId === asset.id}
                  isNew={phase.newInPhase.includes(asset.id)}
                  phaseColor={phase.color}
                  onSelect={handleSelect}
                />
              ))}
            </AnimatePresence>
          </svg>
        </div>

        {/* Info panel */}
        <div className="w-80 shrink-0 overflow-hidden">
          <NASAInfoPanel phase={phase} selectedAsset={selectedAsset} onClose={() => setSelectedAssetId(null)} />
        </div>
      </div>
    </div>
  );
}
