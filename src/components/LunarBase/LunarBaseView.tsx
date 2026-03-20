import { AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE } from '../../data/infrastructure';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { CorrelationLines } from './CorrelationLines';
import { GatewayLayer } from './GatewayLayer';
import { InfraElementComponent } from './InfraElement';
import { MoonSurface } from './MoonSurface';
import { ResourceOverlay } from './ResourceOverlay';
import { SpaceBackground } from './SpaceBackground';

// IDs handled by GatewayLayer (orbital elements)
const ORBITAL_IDS = new Set([
  'gateway_core', 'gateway_full', 'relay_satellite', 'relay_satellite_full', 'lunar_lander'
]);

export function LunarBaseView() {
  const {
    currentPhase, selectInfra,
    showCorrelations, toggleCorrelations,
    showResourceOverlay, toggleResourceOverlay,
  } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;

  // Surface infrastructure (not orbital)
  const surfaceInfra = INFRASTRUCTURE.filter(
    infra => phase.activeInfraIds.includes(infra.id) && !ORBITAL_IDS.has(infra.id)
  );

  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      {/* Map overlay toggle buttons */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1.5">
        {/* Resource overlay toggle */}
        <button
          onClick={toggleResourceOverlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all border ${
            showResourceOverlay
              ? 'bg-cyan-700/80 text-white border-cyan-400/60 shadow-lg shadow-cyan-900/50'
              : 'bg-[#0A0E1A]/80 text-[#9CA3AF] border-white/15 hover:border-white/30 hover:text-white'
          }`}
          aria-pressed={showResourceOverlay}
        >
          {/* Layered map icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1L11 3.5L6 6L1 3.5L6 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M1 6L6 8.5L11 6"             stroke="currentColor" strokeWidth="1" />
            <path d="M1 8.5L6 11L11 8.5"          stroke="currentColor" strokeWidth="1" />
          </svg>
          {showResourceOverlay ? '資源マップを非表示' : '資源マップを表示'}
        </button>

        {/* Correlation toggle */}
        <button
          onClick={toggleCorrelations}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all border ${
            showCorrelations
              ? 'bg-indigo-600/80 text-white border-indigo-400/60 shadow-lg shadow-indigo-900/50'
              : 'bg-[#0A0E1A]/80 text-[#9CA3AF] border-white/15 hover:border-white/30 hover:text-white'
          }`}
          aria-pressed={showCorrelations}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="2"  cy="2"  r="1.5" fill="currentColor" />
            <circle cx="10" cy="2"  r="1.5" fill="currentColor" />
            <circle cx="6"  cy="10" r="1.5" fill="currentColor" />
            <line x1="2"  y1="2"  x2="10" y2="2"  stroke="currentColor" strokeWidth="1" />
            <line x1="2"  y1="2"  x2="6"  y2="10" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="2"  x2="6"  y2="10" stroke="currentColor" strokeWidth="1" />
          </svg>
          {showCorrelations ? '相関関係を非表示' : '相関関係を表示'}
        </button>
      </div>

      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        style={{ display: 'block' }}
        aria-label="月面基地シミュレーターマップ"
      >
        {/* Layer 1: Space background */}
        <SpaceBackground />

        {/* Layer 2: Orbital elements (Gateway, satellites, lander) */}
        <GatewayLayer onSelectInfra={selectInfra} />

        {/* Layer 3: Moon surface terrain */}
        <MoonSurface />

        {/* Layer 3.5: Resource overlay (water ice + solar irradiance zones) */}
        <AnimatePresence>
          {showResourceOverlay && <ResourceOverlay />}
        </AnimatePresence>

        {/* Layer 4: Correlation lines (behind infrastructure icons) */}
        {showCorrelations && <CorrelationLines />}

        {/* Layer 5: Surface infrastructure */}
        <AnimatePresence mode="sync">
          {surfaceInfra.map(infra => (
            <InfraElementComponent key={`${infra.id}-${currentPhase}`} infra={infra} />
          ))}
        </AnimatePresence>

        {/* Phase label overlay */}
        <text
          x="500"
          y="298"
          textAnchor="middle"
          fill={phase.color}
          fontSize="11"
          fontFamily="'Orbitron', monospace"
          opacity="0.8"
        >
          {phase.period} — {phase.crewCount}名常駐
        </text>
      </svg>
    </div>
  );
}
