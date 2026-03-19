import { PHASES } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { MilestoneList } from './MilestoneList';

export function PhaseOverview() {
  const { currentPhase } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const { stats } = phase;

  const statItems = [
    { icon: '👥', label: '常駐クルー', value: `${stats.totalCrew}名` },
    { icon: '⚡', label: '電力供給', value: `${stats.powerKw}kW` },
    { icon: '💧', label: '水生産', value: stats.waterKgPerDay > 0 ? `${stats.waterKgPerDay}kg/日` : '—' },
    { icon: '🌬️', label: '酸素生産', value: stats.oxygenKgPerDay > 0 ? `${stats.oxygenKgPerDay}kg/日` : '—' },
    { icon: '⛽', label: '推薬生産', value: stats.propellantTonPerYear > 0 ? `${stats.propellantTonPerYear}t/年` : '—' },
    { icon: '🔬', label: '科学機器', value: `${stats.scienceInstruments}点` },
    { icon: '🏭', label: '産業種別', value: `${stats.industryTypes}種` },
  ];

  return (
    <div className="space-y-4">
      {/* Phase header */}
      <div
        className="rounded-lg p-3 border"
        style={{ borderColor: `${phase.color}40`, backgroundColor: `${phase.color}10` }}
      >
        <div className="font-orbitron text-sm font-bold" style={{ color: phase.color }}>
          {phase.label}: {phase.period}
        </div>
        <div className="text-[#D1D5DB] text-xs mt-1">{phase.subtitle}</div>
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
        <MilestoneList milestones={phase.milestones} />
      </div>

      {/* Hint */}
      <p className="text-[#6B7280] text-[10px] text-center">
        ← 月面マップのインフラをクリックして詳細を確認
      </p>
    </div>
  );
}
