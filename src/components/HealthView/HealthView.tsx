import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEALTH_CATEGORIES, EMERGENCY_TIMELINE } from '../../data/crewHealth';
import type { CounterMeasure } from '../../data/crewHealth';

// ── Health category card ───────────────────────────────────────────────────

function HealthCategoryCard({
  category,
}: {
  category: (typeof HEALTH_CATEGORIES)[number];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMeasure, setExpandedMeasure] = useState<string | null>(null);

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: `${category.color}30`, backgroundColor: `${category.color}08` }}
    >
      {/* Category header */}
      <button
        onClick={() => { setIsOpen(v => !v); setExpandedMeasure(null); }}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <span className="text-sm font-medium text-white">{category.title}</span>
        </div>
        {isOpen
          ? <ChevronDown size={14} className="text-[#6B7280] shrink-0" />
          : <ChevronRight size={14} className="text-[#6B7280] shrink-0" />
        }
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: `${category.color}18` }}>

              {/* Risks */}
              <div className="pt-3">
                <h4 className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">
                  リスク
                </h4>
                <ul className="space-y-1.5">
                  {category.risks.map(risk => (
                    <li key={risk} className="flex items-start gap-2 text-[11px] text-[#D1D5DB] leading-relaxed">
                      <span className="shrink-0 mt-0.5 text-[10px]" style={{ color: category.color }}>▸</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Countermeasures */}
              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">
                  対策・技術
                </h4>
                <div className="space-y-1.5">
                  {category.countermeasures.map((cm: CounterMeasure) => {
                    const isExpanded = expandedMeasure === cm.name;
                    return (
                      <div
                        key={cm.name}
                        className="rounded border overflow-hidden"
                        style={{ borderColor: `${category.color}25`, backgroundColor: `${category.color}0A` }}
                      >
                        <button
                          onClick={() => setExpandedMeasure(isExpanded ? null : cm.name)}
                          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-[11px] text-[#E5E7EB] font-medium">{cm.name}</span>
                          {isExpanded
                            ? <ChevronDown size={11} className="text-[#6B7280] shrink-0" />
                            : <ChevronRight size={11} className="text-[#6B7280] shrink-0" />
                          }
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <p
                                className="px-3 pb-3 pt-1 text-[10px] leading-relaxed border-t"
                                style={{ borderColor: `${category.color}15`, color: '#9CA3AF' }}
                              >
                                {cm.detail}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Emergency timeline ─────────────────────────────────────────────────────

function EmergencyTimelineSection() {
  const tl = EMERGENCY_TIMELINE;
  const totalHours = parseInt(tl.steps[tl.steps.length - 1].time);

  // Location color map
  const locationColors: Record<string, string> = {
    '月面基地': '#F59E0B',
    '月軌道':   '#8B5CF6',
    'Gateway':  '#3B82F6',
    '月〜地球間': '#06B6D4',
    '地球大気圏': '#F87171',
    '地球':     '#10B981',
  };

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: `${tl.color}30`, backgroundColor: `${tl.color}08` }}
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: `${tl.color}18` }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🚁</span>
          <div>
            <h3 className="text-sm font-medium text-white">{tl.title}</h3>
            <p className="text-[10px] text-[#9CA3AF]">{tl.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[38px] top-2 bottom-2 w-px"
            style={{ backgroundColor: `${tl.color}20` }}
          />

          <div className="space-y-0">
            {tl.steps.map((step, i) => {
              const hours = parseFloat(step.time);
              const locationColor = locationColors[step.location] ?? '#9CA3AF';
              const isLast = i === tl.steps.length - 1;

              return (
                <div key={i} className="flex items-start gap-3 relative">
                  {/* Time column */}
                  <div className="w-16 shrink-0 text-right">
                    <span
                      className="text-[10px] font-spacemono font-bold"
                      style={{ color: tl.color }}
                    >
                      {step.time}
                    </span>
                  </div>

                  {/* Node */}
                  <div className="relative flex flex-col items-center shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border-2 z-10 mt-0.5"
                      style={{
                        borderColor: locationColor,
                        backgroundColor: i === 0 || isLast ? locationColor : `${locationColor}50`,
                      }}
                    />
                    {!isLast && (
                      <div
                        className="w-px flex-1"
                        style={{
                          height: `${Math.max(16, (tl.steps[i + 1]
                            ? parseFloat(tl.steps[i + 1].time) - hours
                            : 2) * 1.5)}px`,
                          backgroundColor: `${tl.color}25`,
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-3">
                    <p className="text-[11px] text-[#D1D5DB] leading-snug">{step.action}</p>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full inline-block mt-1"
                      style={{ backgroundColor: `${locationColor}20`, color: locationColor }}
                    >
                      {step.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[#4B5563] text-[9px] mt-3">
          ※ 所要時間は軌道条件により変動。最短シナリオを示す（JAXA資料参照）
        </p>
        <p className="text-[#4B5563] text-[9px]">
          ※ 総帰還時間：約{totalHours}時間（約4日間）
        </p>
      </div>
    </div>
  );
}

// ── Main HealthView ────────────────────────────────────────────────────────

export function HealthView() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">

      {/* Header */}
      <div>
        <h2 className="font-orbitron text-white text-sm font-bold mb-1">
          クルー健康管理・生活環境
        </h2>
        <p className="text-[#9CA3AF] text-xs">
          JAXAシナリオ 7.10節「有人宇宙滞在・拠点システム技術」に基づく
        </p>
      </div>

      {/* Living stats banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '👥', label: '最終常駐クルー',  value: '40名',        color: '#3B82F6' },
          { icon: '📅', label: '最長連続滞在', value: '1年〜',       color: '#8B5CF6' },
          { icon: '🌍', label: '帰還所要時間', value: '約96時間',     color: '#10B981' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-lg p-3 border text-center"
            style={{ borderColor: `${stat.color}30`, backgroundColor: `${stat.color}0D` }}
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="font-spacemono text-sm font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[#9CA3AF] text-[10px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Health category cards */}
      <div className="space-y-3">
        {HEALTH_CATEGORIES.map(cat => (
          <HealthCategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      {/* Emergency timeline */}
      <EmergencyTimelineSection />

      {/* Footer */}
      <div className="text-[#4B5563] text-[10px] text-center py-2">
        出典：JAXA「日本の国際宇宙探査シナリオ案2025」（EZA-2025001）7.10節
      </div>
    </div>
  );
}
