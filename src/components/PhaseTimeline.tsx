import { PHASES } from '../data/phases';
import { useSimulatorStore } from '../store/simulatorStore';

export function PhaseTimeline() {
  const {
    currentPhase, setPhase,
    activeView,
    industryFilter, setIndustryFilter,
  } = useSimulatorStore();

  // ── クルー健康管理・火星展望タブでは非表示 ───────────────────────────
  if (activeView === 'health' || activeView === 'mars') return null;

  // ── 産業ビジョンタブ：全フェーズ + P1〜P4 フィルター ──────────────────
  if (activeView === 'industry') {
    return (
      <div className="bg-[#111827] border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 justify-center">
          {/* 全フェーズボタン */}
          <button
            onClick={() => setIndustryFilter(null)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              industryFilter === null
                ? 'bg-white text-black'
                : 'bg-white/10 text-[#9CA3AF] hover:bg-white/20'
            }`}
            aria-pressed={industryFilter === null}
          >
            全フェーズ
          </button>

          <div className="w-px h-5 bg-white/20" />

          {/* P1〜P4ボタン */}
          {PHASES.map(phase => {
            const num = parseInt(phase.id.replace('phase', ''));
            const isActive = industryFilter === num;
            return (
              <button
                key={phase.id}
                onClick={() => setIndustryFilter(num)}
                className={`flex flex-col items-center px-3 py-1 rounded transition-all text-xs font-medium ${
                  isActive ? 'text-black' : 'bg-white/10 text-[#9CA3AF] hover:bg-white/20'
                }`}
                style={isActive ? { backgroundColor: phase.color } : {}}
                aria-pressed={isActive}
              >
                <span>{phase.label}</span>
                <span className={`text-[9px] ${isActive ? 'text-black/70' : 'text-[#6B7280]'}`}>
                  {phase.period}
                </span>
              </button>
            );
          })}
        </div>

        {/* サブタイトル */}
        <p className="text-center text-xs text-[#6B7280] mt-2">
          {industryFilter === null
            ? '全フェーズの産業・経済ロードマップを表示'
            : (() => {
                const phase = PHASES.find(p => parseInt(p.id.replace('phase', '')) === industryFilter);
                return phase ? phase.subtitle : '';
              })()
          }
        </p>
      </div>
    );
  }

  // ── 月面基地タブ：従来のフェーズ選択 ─────────────────────────────────
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
