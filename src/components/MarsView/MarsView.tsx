import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_BRIDGES, MISSION_COMPARISONS } from '../../data/marsProspect';
import type { TechBridge } from '../../data/marsProspect';

const MARS_COLOR = '#F97316';
const MOON_COLOR = '#94A3B8';

// ── Technology Bridge Card ─────────────────────────────────────────────────

function TechBridgeCard({ bridge }: { bridge: TechBridge }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: `${bridge.color}30`, backgroundColor: `${bridge.color}08` }}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{bridge.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{bridge.title}</span>
              <span
                className="text-[8px] px-1.5 py-0.5 rounded-full font-spacemono"
                style={{ backgroundColor: `${bridge.color}25`, color: bridge.color }}
              >
                P{bridge.enabledFromPhase}〜
              </span>
            </div>
            {/* Mini bridge preview */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] text-[#94A3B8]">🌕 {bridge.lunar.label}</span>
              <span className="text-[9px] text-[#6B7280]">→</span>
              <span className="text-[9px] text-[#F97316]">🔴 {bridge.mars.label}</span>
            </div>
          </div>
        </div>
        {isOpen
          ? <ChevronDown size={14} className="text-[#6B7280] shrink-0" />
          : <ChevronRight size={14} className="text-[#6B7280] shrink-0" />
        }
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: `${bridge.color}18` }}>

              {/* Comparison grid */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                {/* Lunar side */}
                <div
                  className="rounded-lg p-3 border"
                  style={{ borderColor: `${MOON_COLOR}30`, backgroundColor: `${MOON_COLOR}0A` }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">🌕</span>
                    <span className="text-[10px] font-medium" style={{ color: MOON_COLOR }}>
                      月面での実証
                    </span>
                  </div>
                  <p className="text-[10px] text-[#D1D5DB] leading-relaxed mb-2">
                    {bridge.lunar.description}
                  </p>
                  <div
                    className="text-[9px] px-2 py-1 rounded leading-snug"
                    style={{ backgroundColor: `${MOON_COLOR}15`, color: MOON_COLOR }}
                  >
                    📌 {bridge.lunar.milestone}
                  </div>
                </div>

                {/* Mars side */}
                <div
                  className="rounded-lg p-3 border"
                  style={{ borderColor: `${MARS_COLOR}30`, backgroundColor: `${MARS_COLOR}0A` }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">🔴</span>
                    <span className="text-[10px] font-medium" style={{ color: MARS_COLOR }}>
                      火星への応用
                    </span>
                  </div>
                  <p className="text-[10px] text-[#D1D5DB] leading-relaxed mb-2">
                    {bridge.mars.description}
                  </p>
                  <div
                    className="text-[9px] px-2 py-1 rounded leading-snug"
                    style={{ backgroundColor: `${MARS_COLOR}15`, color: MARS_COLOR }}
                  >
                    ⚠️ {bridge.mars.challenge}
                  </div>
                </div>
              </div>

              {/* Bridge text */}
              <div
                className="rounded-lg p-3 border"
                style={{ borderColor: `${bridge.color}25`, backgroundColor: `${bridge.color}0C` }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-medium shrink-0" style={{ color: bridge.color }}>
                    技術継承
                  </span>
                  <span className="text-[10px] text-[#9CA3AF] leading-relaxed">→ {bridge.bridge}</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Mission Comparison Table ───────────────────────────────────────────────

function MissionComparisonTable() {
  return (
    <div className="bg-[#1F2937] rounded-lg border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="text-white text-xs font-bold font-orbitron tracking-wider">
          月面 vs 火星 ミッション比較
        </h3>
      </div>
      <div className="divide-y divide-white/5">
        {/* Header */}
        <div className="grid grid-cols-3 px-4 py-2 text-[9px] uppercase tracking-wider text-[#6B7280]">
          <span>項目</span>
          <span className="text-center" style={{ color: MOON_COLOR }}>🌕 月面（フェーズ4）</span>
          <span className="text-center" style={{ color: MARS_COLOR }}>🔴 火星ミッション</span>
        </div>
        {MISSION_COMPARISONS.map(item => (
          <div
            key={item.label}
            className="grid grid-cols-3 px-4 py-2.5 items-center hover:bg-white/3 transition-colors"
          >
            <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
            <span className="text-[10px] text-center font-spacemono" style={{ color: item.moonColor }}>
              {item.moon}
            </span>
            <span className="text-[10px] text-center font-spacemono" style={{ color: item.marsColor }}>
              {item.mars}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mission Timeline Banner ────────────────────────────────────────────────

function MissionTimelineBanner() {
  const steps = [
    { label: 'P1〜P2', sub: '2025–2033', icon: '🌕', color: '#3B82F6', desc: '月面基礎技術の実証' },
    { label: 'P3〜P4', sub: '2034–2040', icon: '🚀', color: '#10B981', desc: '技術成熟・長期滞在確立' },
    { label: '火星準備', sub: '2040年代前半', icon: '⚙️', color: '#F59E0B', desc: '火星ミッション設計・製造' },
    { label: '火星有人', sub: '2040年代後半', icon: '🔴', color: '#F97316', desc: '初の有人火星着陸' },
  ];

  return (
    <div className="bg-[#1F2937] rounded-lg border border-white/10 px-4 py-4">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-5 h-px bg-white/10" style={{ zIndex: 0 }} />

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center flex-1 relative z-10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 mb-2"
              style={{ borderColor: step.color, backgroundColor: `${step.color}20` }}
            >
              {step.icon}
            </div>
            <span className="text-[10px] font-medium text-white text-center">{step.label}</span>
            <span className="text-[9px] text-[#6B7280] text-center">{step.sub}</span>
            <span
              className="text-[8px] text-center mt-0.5 leading-snug max-w-[70px]"
              style={{ color: step.color }}
            >
              {step.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main MarsView ──────────────────────────────────────────────────────────

export function MarsView() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">

      {/* Hero header */}
      <div
        className="rounded-lg p-4 border"
        style={{ borderColor: `${MARS_COLOR}40`, backgroundColor: `${MARS_COLOR}0C` }}
      >
        <div className="flex items-start gap-3">
          <span className="text-4xl">🔴</span>
          <div>
            <h2 className="font-orbitron text-white text-sm font-bold tracking-wider mb-1">
              火星展望 — 月は火星のテストベッド
            </h2>
            <p className="text-[#D1D5DB] text-xs leading-relaxed">
              JAXAシナリオは月面開発を目的とするのみでなく、
              その先にある有人火星探査への技術的架け橋として位置づけています。
              月面で実証されたすべての技術が、宇宙探査の最終フロンティアへと繋がります。
            </p>
            <p className="text-[9px] text-[#6B7280] mt-1">
              出典：国際宇宙探査シナリオ案2025（EZA-2025001）全体方針
            </p>
          </div>
        </div>
      </div>

      {/* Mission timeline */}
      <div>
        <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
          月面〜火星 ロードマップ
        </h3>
        <MissionTimelineBanner />
      </div>

      {/* Tech bridge cards */}
      <div>
        <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-3">
          技術継承マップ（月面実証 → 火星応用）
        </h3>
        <div className="space-y-3">
          {TECH_BRIDGES.map(bridge => (
            <TechBridgeCard key={bridge.id} bridge={bridge} />
          ))}
        </div>
      </div>

      {/* Mission comparison */}
      <MissionComparisonTable />

      {/* Footer */}
      <div className="text-[#4B5563] text-[10px] text-center py-2">
        出典：JAXA「日本の国際宇宙探査シナリオ案2025」（EZA-2025001）
      </div>

    </div>
  );
}
