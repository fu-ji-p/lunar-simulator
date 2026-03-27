import type { NASAPhase } from '../../data/nasaPhases';
import type { NASAAsset } from '../../data/nasaAssets';

interface Props {
  phase: NASAPhase;
  selectedAsset: NASAAsset | null;
  onClose: () => void;
}

const SOURCE_LABEL: Record<string, string> = {
  nasa: 'NASA',
  commercial: 'Commercial',
  international: 'International Partner',
};

const SOURCE_COLOR: Record<string, string> = {
  nasa: '#3B82F6',
  commercial: '#10B981',
  international: '#F59E0B',
};

export function NASAInfoPanel({ phase, selectedAsset, onClose }: Props) {
  return (
    <div className="h-full bg-[#111827] border-l border-white/10 flex flex-col overflow-hidden">
      {selectedAsset ? (
        /* Asset detail */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            ← Back to Phase Overview
          </button>

          {/* Asset header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ backgroundColor: `${SOURCE_COLOR[selectedAsset.source]}20`, color: SOURCE_COLOR[selectedAsset.source] }}
              >
                {SOURCE_LABEL[selectedAsset.source]}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded font-medium capitalize"
                style={{ backgroundColor: `${selectedAsset.color}20`, color: selectedAsset.color }}
              >
                {selectedAsset.type}
              </span>
            </div>
            <h2 className="text-white font-bold text-base leading-tight">{selectedAsset.name}</h2>
          </div>

          {selectedAsset.cgImage && (
            <div className="rounded-lg overflow-hidden bg-black/40" style={{ aspectRatio: '16/9' }}>
              <img
                src={selectedAsset.cgImage}
                alt={selectedAsset.name}
                className="w-full h-full object-cover"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          )}

          <p className="text-[#D1D5DB] text-sm leading-relaxed">{selectedAsset.description}</p>

          {/* Specs */}
          {Object.keys(selectedAsset.details).length > 0 && (
            <div className="bg-[#1F2937] rounded-lg p-3 border border-white/10">
              <h3 className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Specifications</h3>
              <div className="space-y-1.5">
                {Object.entries(selectedAsset.details).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-sm">
                    <span className="text-[#6B7280] capitalize shrink-0" style={{ minWidth: '100px' }}>
                      {k.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-[#D1D5DB]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-[#6B7280] text-xs">
            Introduced: {selectedAsset.phaseIntroduced === 1 ? 'Phase 1 (2026–2029)' : selectedAsset.phaseIntroduced === 2 ? 'Phase 2 (2029–2033)' : 'Phase 3 (2033–2036+)'}
          </p>
        </div>
      ) : (
        /* Phase overview */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Phase header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-orbitron text-base font-bold" style={{ color: phase.color }}>{phase.label}</span>
              <span className="text-white font-semibold text-base">{phase.name}</span>
            </div>
            <p className="text-[#9CA3AF] text-sm">{phase.period}</p>
          </div>

          <p className="text-[#D1D5DB] text-sm leading-relaxed">{phase.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Launches', value: phase.launchCount, icon: '🚀' },
              { label: 'Landings', value: phase.landingCount, icon: '🛬' },
              { label: 'Payload', value: `${phase.payloadTons}t`, icon: '📦' },
              { label: 'Crew', value: phase.crewCount, icon: '👩‍🚀' },
            ].map(s => (
              <div key={s.label} className="bg-[#1F2937] rounded-lg p-3 border border-white/10 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-spacemono font-bold text-sm" style={{ color: phase.color }}>{s.value}</div>
                <div className="text-[#9CA3AF] text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Phase Highlights</h3>
            <ul className="space-y-1.5">
              {phase.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
                  <span style={{ color: phase.color }} className="shrink-0 mt-0.5">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Key missions */}
          <div>
            <h3 className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">Key Missions</h3>
            <ul className="space-y-1.5">
              {phase.keyMissions.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
                  <span style={{ color: phase.color }} className="shrink-0 mt-0.5 text-xs font-spacemono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="text-[#4B5563] text-xs text-center py-2 border-t border-white/5">
            Source: NASA Ignition — March 24, 2026<br />
            nasa.gov/ignition
          </div>
        </div>
      )}
    </div>
  );
}
