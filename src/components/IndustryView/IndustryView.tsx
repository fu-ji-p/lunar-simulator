import { INDUSTRIES } from '../../data/industries';
import { useSimulatorStore } from '../../store/simulatorStore';
import { IndustryCard } from './IndustryCard';
import { EconomicPanel } from './EconomicPanel';

const ZONES = [
  { key: 'earth', label: '地球', icon: '🌍', description: '宇宙開発で生まれた技術の地上展開' },
  { key: 'space', label: '地球〜月軌道', icon: '🛸', description: '宇宙空間・月軌道での事業' },
  { key: 'lunar_surface', label: '月面（露出・与圧）', icon: '🌕', description: '月面での産業活動' },
] as const;

export function IndustryView() {
  const { industryFilter } = useSimulatorStore();

  const filteredIndustries = industryFilter !== null
    ? INDUSTRIES.filter(i => i.phase <= industryFilter)
    : INDUSTRIES;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-orbitron text-white text-sm font-bold mb-1">産業ビジョン俯瞰</h2>
        <p className="text-[#9CA3AF] text-xs">JAXAシナリオ3.5節に基づく月面経済のロードマップ</p>
      </div>

      {/* Economic scale panel — フェーズフィルターと連動 */}
      <EconomicPanel filterPhase={industryFilter} />

      {/* Zones */}
      {ZONES.map(zone => {
        const items = filteredIndustries.filter(i => i.category === zone.key);
        if (items.length === 0) return null;

        return (
          <div key={zone.key} className="space-y-3">
            {/* Zone header */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="text-xl">{zone.icon}</span>
              <div>
                <h3 className="text-white text-sm font-bold">{zone.label}</h3>
                <p className="text-[#9CA3AF] text-[10px]">{zone.description}</p>
              </div>
              <span className="ml-auto text-[#6B7280] text-xs">{items.length}産業</span>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map(industry => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Footer note */}
      <div className="text-[#4B5563] text-[10px] text-center py-4">
        出典：JAXA「日本の国際宇宙探査シナリオ案2025」（EZA-2025001）3.5節
      </div>
    </div>
  );
}
