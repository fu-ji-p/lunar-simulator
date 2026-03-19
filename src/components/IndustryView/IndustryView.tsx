import { useState } from 'react';
import { INDUSTRIES } from '../../data/industries';
import { PHASES } from '../../data/phases';
import type { PhaseId } from '../../data/phases';
import { IndustryCard } from './IndustryCard';

const ZONES = [
  { key: 'earth', label: '地球', icon: '🌍', description: '宇宙開発で生まれた技術の地上展開' },
  { key: 'space', label: '地球〜月軌道', icon: '🛸', description: '宇宙空間・月軌道での事業' },
  { key: 'lunar_surface', label: '月面（露出・与圧）', icon: '🌕', description: '月面での産業活動' },
] as const;

const PHASE_LABELS: Record<PhaseId, string> = {
  phase1: 'P1 (2020年代)',
  phase2: 'P2 (2030前半)',
  phase3: 'P3 (2030後半〜)',
  phase4: 'P4 (2040年代)',
};

export function IndustryView() {
  const [filterPhase, setFilterPhase] = useState<number | null>(null);

  const filteredIndustries = filterPhase
    ? INDUSTRIES.filter(i => i.phase <= filterPhase)
    : INDUSTRIES;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-orbitron text-white text-sm font-bold mb-1">産業ビジョン俯瞰</h2>
        <p className="text-[#9CA3AF] text-xs">JAXAシナリオ3.5節に基づく月面経済のロードマップ</p>
      </div>

      {/* Phase filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterPhase(null)}
          className={`px-3 py-1 rounded text-xs transition-all ${
            filterPhase === null ? 'bg-white text-black' : 'bg-white/10 text-[#9CA3AF] hover:bg-white/20'
          }`}
        >
          全フェーズ
        </button>
        {PHASES.map(p => {
          const num = parseInt(p.id.replace('phase', ''));
          return (
            <button
              key={p.id}
              onClick={() => setFilterPhase(num)}
              className={`px-3 py-1 rounded text-xs transition-all ${
                filterPhase === num ? 'text-black font-bold' : 'bg-white/10 text-[#9CA3AF] hover:bg-white/20'
              }`}
              style={filterPhase === num ? { backgroundColor: p.color } : {}}
            >
              {PHASE_LABELS[p.id]} まで
            </button>
          );
        })}
      </div>

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
