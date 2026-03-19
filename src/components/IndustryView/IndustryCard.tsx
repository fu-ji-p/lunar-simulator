import type { Industry } from '../../data/industries';

const PHASE_COLORS: Record<number, string> = {
  1: '#3B82F6',
  2: '#8B5CF6',
  3: '#F59E0B',
  4: '#10B981',
};

interface Props {
  industry: Industry;
}

export function IndustryCard({ industry }: Props) {
  const phaseColor = PHASE_COLORS[industry.phase];

  return (
    <div
      className="bg-[#1F2937] rounded-lg p-3 border border-white/10 hover:border-white/25 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-white text-xs font-bold leading-tight">{industry.name}</h3>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded font-spacemono shrink-0"
          style={{ backgroundColor: `${phaseColor}20`, color: phaseColor, border: `1px solid ${phaseColor}40` }}
        >
          P{industry.phase}
        </span>
      </div>
      <p className="text-[#9CA3AF] text-[10px] leading-relaxed mb-2">{industry.description}</p>
      <div className="flex flex-wrap gap-1">
        {industry.examples.slice(0, 3).map(ex => (
          <span key={ex} className="text-[9px] bg-white/5 text-[#9CA3AF] px-1.5 py-0.5 rounded">
            {ex}
          </span>
        ))}
      </div>
      <div className="mt-1.5 text-[9px] text-[#6B7280]">
        収益: {industry.revenueModel}
      </div>
    </div>
  );
}
