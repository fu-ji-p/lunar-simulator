import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { INVESTMENT_PHASES, MARKET_SEGMENTS, SPINOFF_INDUSTRIES } from '../../data/economics';
import { useT } from '../../hooks/useT';

interface Props {
  /** null = 全フェーズ表示, 1〜4 = そのフェーズまでをアクティブ表示 */
  filterPhase: number | null;
}

export function EconomicPanel({ filterPhase }: Props) {
  const [expandedSpinoff, setExpandedSpinoff] = useState<string | null>(null);
  const { t, lang, EN } = useT();
  const ec = EN.economics;

  const maxInvestment = Math.max(...INVESTMENT_PHASES.map(p => p.totalBillionUSD));

  const isPhaseActive = (phaseNum: number) =>
    filterPhase === null || phaseNum <= filterPhase;

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden border border-white/10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="font-orbitron text-white text-xs font-bold tracking-wider">
          💰 {t('経済規模・産業波及予測', ec.headerTitle)}
        </h2>
        <p className="text-[#9CA3AF] text-[10px] mt-0.5">
          {t('国際宇宙探査シナリオ案2025 第3.5節に基づく試算', ec.headerSubtitle)}
        </p>
      </div>

      <div className="p-4 space-y-6">

        {/* ── 1. 民間投資額の推移 ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            {t('民間投資額の推移（累計・試算）', ec.investmentTitle)}
          </h3>
          <div className="space-y-3">
            {INVESTMENT_PHASES.map((phase, i) => {
              const phaseNum = i + 1;
              const active = isPhaseActive(phaseNum);
              const color = active ? phase.color : '#4B5563';
              const enPhase = ec.investmentPhases[i];
              const driver       = lang === 'en' ? (enPhase?.driver       ?? phase.driver)       : phase.driver;
              const keyMilestone = lang === 'en' ? (enPhase?.keyMilestone ?? phase.keyMilestone) : phase.keyMilestone;

              return (
                <div
                  key={phase.phaseLabel}
                  style={{ opacity: active ? 1 : 0.4 }}
                  className="transition-opacity duration-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-spacemono font-bold" style={{ color }}>
                        {phase.phaseLabel}
                      </span>
                      <span className="text-[9px] text-[#6B7280]">{phase.period}</span>
                      <span
                        className="text-[8px] px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {driver}
                      </span>
                      {!active && (
                        <span className="text-[8px] text-[#4B5563]">
                          {t('未到達', ec.notReached)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-spacemono font-bold" style={{ color }}>
                      ${phase.totalBillionUSD}B
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(phase.totalBillionUSD / maxInvestment) * 100}%`,
                        backgroundColor: color,
                        opacity: active ? 0.85 : 0.3,
                      }}
                    />
                  </div>
                  <p className="text-[#6B7280] text-[9px] mt-1">{keyMilestone}</p>
                </div>
              );
            })}
          </div>
          <p className="text-[#4B5563] text-[9px] mt-2">
            {t('※ 複数の宇宙経済調査レポートおよびシナリオを参考にした概算値', ec.investmentNote)}
          </p>
        </div>

        {/* ── 2. 主要市場セグメント ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            {t('主要市場セグメント（Phase 4 想定規模）', ec.marketTitle)}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {MARKET_SEGMENTS.map((seg, i) => {
              const active = isPhaseActive(seg.phase);
              const color = active ? seg.color : '#4B5563';
              const enSeg = ec.marketSegments[i];
              const name = lang === 'en' ? (enSeg?.name ?? seg.name) : seg.name;

              return (
                <div
                  key={seg.name}
                  className="rounded-lg p-2.5 border text-center transition-opacity duration-300"
                  style={{
                    borderColor: active ? `${seg.color}35` : '#374151',
                    backgroundColor: active ? `${seg.color}0D` : '#1a2030',
                    opacity: active ? 1 : 0.4,
                  }}
                >
                  <div className="text-xl mb-1" style={{ filter: active ? 'none' : 'grayscale(1)' }}>
                    {seg.icon}
                  </div>
                  <div className="text-[9px] text-[#D1D5DB] leading-snug mb-1 whitespace-pre-line">
                    {name}
                  </div>
                  <div className="font-spacemono text-sm font-bold" style={{ color }}>
                    ${seg.billionUSD}B
                  </div>
                  <div
                    className="text-[8px] px-1 py-0.5 rounded-full inline-block mt-1"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    P{seg.phase}〜
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. スピンオフ産業 ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            {t('地球へのスピンオフ産業', ec.spinoffTitle)}
          </h3>
          <div className="space-y-2">
            {SPINOFF_INDUSTRIES.map((spinoff, i) => {
              const enSpinoff = ec.spinoffs[i];
              const name         = lang === 'en' ? (enSpinoff?.name         ?? spinoff.name)         : spinoff.name;
              const applications = lang === 'en' ? (enSpinoff?.applications ?? spinoff.applications) : spinoff.applications;
              const impact       = lang === 'en' ? (enSpinoff?.expectedImpact ?? spinoff.expectedImpact) : spinoff.expectedImpact;
              const isOpen = expandedSpinoff === spinoff.name;

              return (
                <div
                  key={spinoff.name}
                  className="rounded-lg border overflow-hidden"
                  style={{ borderColor: `${spinoff.color}30`, backgroundColor: `${spinoff.color}08` }}
                >
                  <button
                    onClick={() => setExpandedSpinoff(isOpen ? null : spinoff.name)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{spinoff.icon}</span>
                      <span className="text-[11px] text-[#D1D5DB] font-medium">{name}</span>
                    </div>
                    {isOpen
                      ? <ChevronDown size={12} className="text-[#6B7280] shrink-0" />
                      : <ChevronRight size={12} className="text-[#6B7280] shrink-0" />
                    }
                  </button>

                  {isOpen && (
                    <div
                      className="px-3 pb-3 space-y-2 border-t"
                      style={{ borderColor: `${spinoff.color}18` }}
                    >
                      <div className="flex flex-wrap gap-1 pt-2">
                        {applications.map(app => (
                          <span
                            key={app}
                            className="text-[9px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${spinoff.color}15`, color: spinoff.color }}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] leading-relaxed" style={{ color: spinoff.color }}>
                        → {impact}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
