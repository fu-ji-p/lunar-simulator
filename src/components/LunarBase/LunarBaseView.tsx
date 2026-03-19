import { AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE } from '../../data/infrastructure';
import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { GatewayLayer } from './GatewayLayer';
import { InfraElementComponent } from './InfraElement';
import { MoonSurface } from './MoonSurface';
import { SpaceBackground } from './SpaceBackground';

// IDs handled by GatewayLayer (orbital elements)
const ORBITAL_IDS = new Set([
  'gateway_core', 'gateway_full', 'relay_satellite', 'relay_satellite_full', 'lunar_lander'
]);

export function LunarBaseView() {
  const { currentPhase, selectInfra } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;

  // Surface infrastructure (not orbital)
  const surfaceInfra = INFRASTRUCTURE.filter(
    infra => phase.activeInfraIds.includes(infra.id) && !ORBITAL_IDS.has(infra.id)
  );

  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
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

        {/* Layer 4: Surface infrastructure */}
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
