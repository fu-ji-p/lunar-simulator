import type { Milestone } from '../../data/phases';

const CATEGORY_ICONS: Record<Milestone['category'], string> = {
  mission: '🚀',
  infrastructure: '🏗️',
  science: '🔬',
  industry: '🏭',
};

const CATEGORY_COLORS: Record<Milestone['category'], string> = {
  mission: 'text-blue-400',
  infrastructure: 'text-amber-400',
  science: 'text-purple-400',
  industry: 'text-green-400',
};

interface Props {
  milestones: Milestone[];
}

export function MilestoneList({ milestones }: Props) {
  return (
    <div>
      <h3 className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">マイルストーン</h3>
      <div className="space-y-1.5">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="font-spacemono text-[#9CA3AF] shrink-0 w-10">{m.year}</span>
            <span className="shrink-0">{CATEGORY_ICONS[m.category]}</span>
            <span className={`${CATEGORY_COLORS[m.category]} leading-tight`}>{m.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
