import { PHASES } from '../data/phases';
import { useSimulatorStore } from '../store/simulatorStore';
import { AnimatedNumber } from './UI/AnimatedNumber';

export function StatsBar() {
  const { currentPhase } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const { stats } = phase;

  const items = [
    { icon: '👥', label: 'クルー', value: stats.totalCrew, unit: '名', decimals: 0 },
    { icon: '⚡', label: '電力', value: stats.powerKw, unit: 'kW', decimals: 0 },
    { icon: '💧', label: '水生産', value: stats.waterKgPerDay, unit: 'kg/日', decimals: 0 },
    { icon: '🌬️', label: '酸素', value: stats.oxygenKgPerDay, unit: 'kg/日', decimals: 0 },
    { icon: '⛽', label: '推薬', value: stats.propellantTonPerYear, unit: 't/年', decimals: 1 },
    { icon: '🔬', label: '科学機器', value: stats.scienceInstruments, unit: '点', decimals: 0 },
    { icon: '🏭', label: '産業種別', value: stats.industryTypes, unit: '種', decimals: 0 },
  ];

  return (
    <div className="bg-[#0A0E1A] border-t border-white/10 px-4 py-2">
      <div className="flex items-center justify-around flex-wrap gap-2">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="text-sm">{item.icon}</span>
            <div className="text-center">
              <div className="font-spacemono text-white text-xs font-bold">
                <AnimatedNumber value={item.value} decimals={item.decimals} />
                <span className="text-[#9CA3AF] ml-0.5 text-[10px]">{item.unit}</span>
              </div>
              <div className="text-[#6B7280] text-[9px]">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
