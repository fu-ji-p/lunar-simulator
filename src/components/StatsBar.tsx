import { PHASES } from '../data/phases';
import { useSimulatorStore } from '../store/simulatorStore';
import { useT } from '../hooks/useT';
import { AnimatedNumber } from './UI/AnimatedNumber';

export function StatsBar() {
  const { currentPhase } = useSimulatorStore();
  const { t, EN } = useT();
  const phase = PHASES.find(p => p.id === currentPhase)!;
  const { stats } = phase;

  const items = [
    { icon: '👥', label: t('クルー', EN.statCrew),        value: stats.totalCrew,            unit: t('名', ''), decimals: 0 },
    { icon: '⚡', label: t('電力', EN.statPower),          value: stats.powerKw,              unit: 'kW',        decimals: 0 },
    { icon: '💧', label: t('水生産', EN.statWater),        value: stats.waterKgPerDay,        unit: t('kg/日', 'kg/d'), decimals: 0 },
    { icon: '🌬️', label: t('酸素', EN.statOxygen),        value: stats.oxygenKgPerDay,       unit: t('kg/日', 'kg/d'), decimals: 0 },
    { icon: '⛽', label: t('推薬', EN.statPropellant),     value: stats.propellantTonPerYear, unit: t('t/年', 't/yr'),  decimals: 1 },
    { icon: '🔬', label: t('科学機器', EN.statScience),    value: stats.scienceInstruments,   unit: t('点', 'pts'),      decimals: 0 },
    { icon: '🏭', label: t('産業種別', EN.statIndustry),   value: stats.industryTypes,        unit: t('種', 'types'),    decimals: 0 },
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
