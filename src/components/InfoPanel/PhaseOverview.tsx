import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { useT } from '../../hooks/useT';
import { MilestoneList } from './MilestoneList';
import { PhaseTransitionPanel } from './PhaseTransitionPanel';

export function PhaseOverview() {
  const { currentPhase } = useSimulatorStore();
  const { t, lang, EN } = useT();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const { stats } = phase;

  const phaseEn = EN.phases[phase.id];

  const statItems = [
    { icon: '👥', label: t('常駐クルー', EN.statCrewLabel),       value: `${stats.totalCrew}${t('名', '')}` },
    { icon: '⚡', label: t('電力供給', EN.statPowerLabel),         value: `${stats.powerKw} kW` },
    { icon: '💧', label: t('水生産', EN.statWaterLabel),           value: stats.waterKgPerDay > 0 ? `${stats.waterKgPerDay} ${t('kg/日', 'kg/d')}` : '—' },
    { icon: '🌬️', label: t('酸素生産', EN.statOxygenLabel),       value: stats.oxygenKgPerDay > 0 ? `${stats.oxygenKgPerDay} ${t('kg/日', 'kg/d')}` : '—' },
    { icon: '⛽', label: t('推薬生産', EN.statPropellantLabel),    value: stats.propellantTonPerYear > 0 ? `${stats.propellantTonPerYear} ${t('t/年', 't/yr')}` : '—' },
    { icon: '🔬', label: t('科学機器', EN.statScienceLabel),       value: `${stats.scienceInstruments}${t('点', ' pts')}` },
    { icon: '🏭', label: t('産業種別', EN.statIndustryLabel),      value: `${stats.industryTypes}${t('種', ' types')}` },
  ];

  const label  = lang === 'en' ? (phaseEn?.label  ?? phase.label)  : phase.label;
  const period = lang === 'en' ? (phaseEn?.period ?? phase.period) : phase.period;

  return (
    <div className="space-y-4">
      {/* Phase header */}
      <div
        className="rounded-lg p-3 border"
        style={{ borderColor: `${phase.color}40`, backgroundColor: `${phase.color}10` }}
      >
        <div className="font-orbitron text-sm font-bold" style={{ color: phase.color }}>
          {label}: {period}
        </div>
        <div className="text-[#D1D5DB] text-xs mt-1">
          {lang === 'en' ? (phaseEn?.subtitle ?? phase.subtitle) : phase.subtitle}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {statItems.map(item => (
          <div key={item.label} className="bg-[#1F2937] rounded p-2">
            <div className="text-sm mb-0.5">{item.icon}</div>
            <div className="font-spacemono text-white text-xs font-bold">{item.value}</div>
            <div className="text-[#6B7280] text-[10px]">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="bg-[#1F2937] rounded p-3">
        <MilestoneList milestones={phase.milestones} phaseId={phase.id} />
      </div>

      {/* Phase transition conditions */}
      <PhaseTransitionPanel currentPhase={phase.id} />

      {/* Hint */}
      <p className="text-[#6B7280] text-[10px] text-center">
        {t('← 月面マップのインフラをクリックして詳細を確認', EN.hintClickInfra)}
      </p>
    </div>
  );
}
