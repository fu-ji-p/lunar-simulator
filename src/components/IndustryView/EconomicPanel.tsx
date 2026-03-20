import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { INVESTMENT_PHASES, MARKET_SEGMENTS, SPINOFF_INDUSTRIES } from '../../data/economics';

export function EconomicPanel() {
  const [expandedSpinoff, setExpandedSpinoff] = useState<string | null>(null);

  const maxInvestment = Math.max(...INVESTMENT_PHASES.map(p => p.totalBillionUSD));

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden border border-white/10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="font-orbitron text-white text-xs font-bold tracking-wider">
          💰 経済規模・産業波及予測
        </h2>
        <p className="text-[#9CA3AF] text-[10px] mt-0.5">
          国際宇宙探査シナリオ案2025 第3.5節に基づく試算
        </p>
      </div>

      <div className="p-4 space-y-6">

        {/* ── 1. 民間投資額の推移 ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            民間投資額の推移（累計・試算）
          </h3>
          <div className="space-y-3">
            {INVESTMENT_PHASES.map(phase => (
              <div key={phase.phaseLabel}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-spacemono font-bold"
                      style={{ color: phase.color }}
                    >
                      {phase.phaseLabel}
                    </span>
                    <span className="text-[9px] text-[#6B7280]">{phase.period}</span>
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                    >
                      {phase.driver}
                    </span>
                  </div>
                  <span className="text-xs font-spacemono font-bold" style={{ color: phase.color }}>
                    ${phase.totalBillionUSD}B
                  </span>
                </div>
                {/* Bar */}
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(phase.totalBillionUSD / maxInvestment) * 100}%`,
                      backgroundColor: phase.color,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <p className="text-[#6B7280] text-[9px] mt-1">{phase.keyMilestone}</p>
              </div>
            ))}
          </div>
          <p className="text-[#4B5563] text-[9px] mt-2">
            ※ 複数の宇宙経済調査レポートおよびシナリオを参考にした概算値
          </p>
        </div>

        {/* ── 2. 主要市場セグメント ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            主要市場セグメント（Phase 4 想定規模）
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {MARKET_SEGMENTS.map(seg => (
              <div
                key={seg.name}
                className="rounded-lg p-2.5 border text-center"
                style={{
                  borderColor: `${seg.color}35`,
                  backgroundColor: `${seg.color}0D`,
                }}
              >
                <div className="text-xl mb-1">{seg.icon}</div>
                <div
                  className="text-[9px] text-[#D1D5DB] leading-snug mb-1 whitespace-pre-line"
                >
                  {seg.name}
                </div>
                <div
                  className="font-spacemono text-sm font-bold"
                  style={{ color: seg.color }}
                >
                  ${seg.billionUSD}B
                </div>
                <div
                  className="text-[8px] px-1 py-0.5 rounded-full inline-block mt-1"
                  style={{ backgroundColor: `${seg.color}20`, color: seg.color }}
                >
                  P{seg.phase}〜
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. スピンオフ産業 ── */}
        <div>
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
            地球へのスピンオフ産業
          </h3>
          <div className="space-y-2">
            {SPINOFF_INDUSTRIES.map(spinoff => {
              const isOpen = expandedSpinoff === spinoff.name;
              return (
                <div
                  key={spinoff.name}
                  className="rounded-lg border overflow-hidden"
                  style={{
                    borderColor: `${spinoff.color}30`,
                    backgroundColor: `${spinoff.color}08`,
                  }}
                >
                  <button
                    onClick={() => setExpandedSpinoff(isOpen ? null : spinoff.name)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{spinoff.icon}</span>
                      <span className="text-[11px] text-[#D1D5DB] font-medium">
                        {spinoff.name}
                      </span>
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
                        {spinoff.applications.map(app => (
                          <span
                            key={app}
                            className="text-[9px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${spinoff.color}15`,
                              color: spinoff.color,
                            }}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] leading-relaxed" style={{ color: spinoff.color }}>
                        → {spinoff.expectedImpact}
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
