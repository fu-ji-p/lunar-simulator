import { PHASES } from '../data/phases';
import { useSimulatorStore } from '../store/simulatorStore';

export function PhaseTimeline() {
  const { currentPhase, setPhase } = useSimulatorStore();

  return (
    <div className="bg-[#111827] border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {PHASES.map((phase, idx) => {
          const isActive = phase.id === currentPhase;
          return (
            <div key={phase.id} className="flex items-center flex-1">
              {/* Phase button */}
              <button
                onClick={() => setPhase(phase.id)}
                className="flex flex-col items-center group flex-1"
                aria-pressed={isActive}
                aria-label={`${phase.label}: ${phase.period}`}
              >
                {/* Dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 mb-1 ${
                    isActive
                      ? 'scale-125 shadow-lg'
                      : 'border-white/30 bg-transparent group-hover:border-white/60'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: phase.color, borderColor: phase.color, boxShadow: `0 0 12px ${phase.color}80` }
                      : {}
                  }
                />
                {/* Label */}
                <span
                  className={`text-xs font-medium font-orbitron transition-colors ${
                    isActive ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'
                  }`}
                >
                  {phase.label}
                </span>
                {/* Period */}
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? 'text-[#9CA3AF]' : 'text-[#4B5563] group-hover:text-[#6B7280]'
                  }`}
                >
                  {phase.period}
                </span>
                {/* Crew count */}
                <span
                  className={`text-[10px] font-spacemono transition-colors ${
                    isActive ? '' : 'text-[#4B5563]'
                  }`}
                  style={isActive ? { color: phase.color } : {}}
                >
                  👥 {phase.crewCount}名
                </span>
              </button>

              {/* Connector line */}
              {idx < PHASES.length - 1 && (
                <div className="flex-none w-8 h-px bg-white/20 mx-1" />
              )}
            </div>
          );
        })}
      </div>
      {/* Subtitle */}
      {PHASES.filter(p => p.id === currentPhase).map(phase => (
        <p
          key={phase.id}
          className="text-center text-xs text-[#9CA3AF] mt-2"
          style={{ color: phase.color }}
        >
          {phase.subtitle}
        </p>
      ))}
    </div>
  );
}
