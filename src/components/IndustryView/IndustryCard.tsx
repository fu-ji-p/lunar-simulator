import type { Industry } from '../../data/industries';

const PHASE_COLORS: Record<number, string> = {
  1: '#3B82F6',
  2: '#8B5CF6',
  3: '#F59E0B',
  4: '#10B981',
};

const SOURCE_META = {
  scenario: { label: '探査シナリオ', color: '#60A5FA', bg: '#1E3A5F' },
  fund:     { label: '宇宙戦略基金', color: '#F59E0B', bg: '#3D2A0A' },
} as const;

interface Props {
  industry: Industry;
}

export function IndustryCard({ industry }: Props) {
  const phaseColor = PHASE_COLORS[industry.phase];
  const sourceMeta = SOURCE_META[industry.source];

  return (
    <div className="bg-[#1F2937] rounded-lg p-3 border border-white/10 hover:border-white/25 transition-colors flex flex-col gap-1.5">

      {/* Row 1: title + phase badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white text-xs font-bold leading-tight">{industry.name}</h3>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded font-spacemono shrink-0"
          style={{ backgroundColor: `${phaseColor}20`, color: phaseColor, border: `1px solid ${phaseColor}40` }}
        >
          P{industry.phase}
        </span>
      </div>

      {/* Row 2: description */}
      <p className="text-[#9CA3AF] text-[10px] leading-relaxed">{industry.description}</p>

      {/* Row 3: example tags */}
      <div className="flex flex-wrap gap-1">
        {industry.examples.slice(0, 3).map(ex => (
          <span key={ex} className="text-[9px] bg-white/5 text-[#9CA3AF] px-1.5 py-0.5 rounded">
            {ex}
          </span>
        ))}
      </div>

      {/* Row 4: revenue + source badge */}
      <div className="flex items-center justify-between mt-0.5 gap-2">
        <span className="text-[9px] text-[#6B7280]">
          {industry.source === 'scenario' ? '収益: ' : '制度: '}{industry.revenueModel}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: sourceMeta.bg, color: sourceMeta.color, border: `1px solid ${sourceMeta.color}40` }}
          >
            {sourceMeta.label}
          </span>
          {industry.fundUrl && (
            <a
              href={industry.fundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] text-[#F59E0B] hover:text-[#FCD34D] transition-colors underline underline-offset-1"
              onClick={e => e.stopPropagation()}
            >
              詳細→
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
