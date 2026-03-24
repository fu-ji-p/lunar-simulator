import type { Milestone } from '../../data/phases';
import { useT } from '../../hooks/useT';

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
  phaseId: string;
}

export function MilestoneList({ milestones, phaseId }: Props) {
  const { t, lang, EN } = useT();
  const enMilestones = EN.phases[phaseId]?.milestones ?? [];

  return (
    <div>
      <h3 className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">
        {t('マイルストーン', EN.milestonesLabel)}
      </h3>
      <div className="space-y-1.5">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="font-spacemono text-[#9CA3AF] shrink-0 w-10">{m.year}</span>
            <span className="shrink-0">{CATEGORY_ICONS[m.category]}</span>
            <span className={`${CATEGORY_COLORS[m.category]} leading-tight`}>
              {lang === 'en' ? (enMilestones[i] ?? m.event) : m.event}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
