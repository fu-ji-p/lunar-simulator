import { INDUSTRIES } from '../../data/industries';
import { useSimulatorStore } from '../../store/simulatorStore';
import { useT } from '../../hooks/useT';
import { IndustryCard } from './IndustryCard';
import { EconomicPanel } from './EconomicPanel';

const ZONES = [
  { key: 'earth',         jaLabel: '地球',              jaDesc: '宇宙開発で生まれた技術の地上展開',        icon: '🌍' },
  { key: 'space',         jaLabel: '地球〜月軌道',       jaDesc: '宇宙空間・月軌道での事業',               icon: '🛸' },
  { key: 'lunar_surface', jaLabel: '月面（露出・与圧）', jaDesc: '月面での産業活動',                       icon: '🌕' },
] as const;

const SOURCE_META = {
  scenario: { jaLabel: '探査シナリオ', enLabel: 'Exploration Scenario', activeColor: '#60A5FA', activeBg: '#1E3A5F' },
  fund:     { jaLabel: '宇宙戦略基金', enLabel: 'Space Strategy Fund',  activeColor: '#F59E0B', activeBg: '#3D2A0A' },
} as const;

export function IndustryView() {
  const {
    industryFilter,
    showScenario, toggleShowScenario,
    showFund, toggleShowFund,
  } = useSimulatorStore();
  const { t, lang, EN } = useT();

  // フェーズ × 情報源 の二段フィルター
  const filteredIndustries = INDUSTRIES.filter(i => {
    const passPhase = industryFilter === null || i.phase <= industryFilter;
    const passSource = (i.source === 'scenario' && showScenario) || (i.source === 'fund' && showFund);
    return passPhase && passSource;
  });

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">

      {/* Header */}
      <div>
        <h2 className="font-orbitron text-white text-sm font-bold mb-1">
          {t('産業ビジョン俯瞰', EN.industryTitle)}
        </h2>
        <p className="text-[#9CA3AF] text-xs">
          {t('JAXAシナリオ3.5節に基づく月面経済のロードマップ', EN.industrySubtitle)}
        </p>
      </div>

      {/* 情報源フィルター */}
      <div className="bg-[#1A2235] rounded-lg border border-white/10 px-4 py-3">
        <p className="text-[#6B7280] text-[9px] uppercase tracking-wider mb-2">
          {t('情報源', EN.sourceLabel)}
        </p>
        <div className="flex gap-2">
          {(['scenario', 'fund'] as const).map(src => {
            const meta = SOURCE_META[src];
            const isOn = src === 'scenario' ? showScenario : showFund;
            const toggle = src === 'scenario' ? toggleShowScenario : toggleShowFund;
            return (
              <button
                key={src}
                onClick={toggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
                style={
                  isOn
                    ? { backgroundColor: meta.activeBg, color: meta.activeColor, borderColor: `${meta.activeColor}50` }
                    : { backgroundColor: 'transparent', color: '#4B5563', borderColor: '#374151' }
                }
                aria-pressed={isOn}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isOn ? meta.activeColor : '#4B5563' }} />
                {lang === 'en' ? meta.enLabel : meta.jaLabel}
                {!isOn && <span className="text-[9px] opacity-60">{t('（非表示）', ' (off)')}</span>}
              </button>
            );
          })}
          <span className="ml-auto text-[10px] text-[#4B5563] self-center">
            {EN.itemsShown(filteredIndustries.length)}
          </span>
        </div>
      </div>

      {/* Economic scale panel */}
      <EconomicPanel filterPhase={industryFilter} />

      {/* Zones */}
      {ZONES.map(zone => {
        const items = filteredIndustries.filter(i => i.category === zone.key);
        if (items.length === 0) return null;

        const label = lang === 'en'
          ? (zone.key === 'earth' ? EN.zoneEarth : zone.key === 'space' ? EN.zoneSpace : EN.zoneLunar)
          : zone.jaLabel;
        const desc = lang === 'en'
          ? (zone.key === 'earth' ? EN.zoneEarthDesc : zone.key === 'space' ? EN.zoneSpaceDesc : EN.zoneLunarDesc)
          : zone.jaDesc;

        return (
          <div key={zone.key} className="space-y-3">
            {/* Zone header */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="text-xl">{zone.icon}</span>
              <div>
                <h3 className="text-white text-sm font-bold">{label}</h3>
                <p className="text-[#9CA3AF] text-[10px]">{desc}</p>
              </div>
              <span className="ml-auto text-[#6B7280] text-xs">
                {items.length}{t('件', '')}
              </span>
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
        {t(
          '出典：JAXA「日本の国際宇宙探査シナリオ案2025」（EZA-2025001）3.5節 ／ JAXA宇宙戦略基金',
          EN.footerNote,
        )}
      </div>
    </div>
  );
}
