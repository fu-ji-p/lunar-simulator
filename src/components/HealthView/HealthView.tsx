import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEALTH_CATEGORIES, EMERGENCY_TIMELINE } from '../../data/crewHealth';
import { useT } from '../../hooks/useT';

// ── Health category card ───────────────────────────────────────────────────

function HealthCategoryCard({
  category,
  categoryIndex,
}: {
  category: (typeof HEALTH_CATEGORIES)[number];
  categoryIndex: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMeasure, setExpandedMeasure] = useState<string | null>(null);
  const { t, lang, EN } = useT();
  const hd = EN.healthData;

  const enCat = hd.categories[categoryIndex];
  const title          = lang === 'en' ? (enCat?.title          ?? category.title)          : category.title;
  const risks          = lang === 'en' ? (enCat?.risks          ?? category.risks)          : category.risks;
  const countermeasures = lang === 'en' ? (enCat?.countermeasures ?? category.countermeasures) : category.countermeasures;

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: `${category.color}30`, backgroundColor: `${category.color}08` }}
    >
      <button
        onClick={() => { setIsOpen(v => !v); setExpandedMeasure(null); }}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <span className="text-base font-medium text-white">{title}</span>
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
                <h4 className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-2">
                  {t('リスク', hd.risksLabel)}
                </h4>
                <ul className="space-y-1.5">
                  {risks.map((risk, ri) => (
                    <li key={ri} className="flex items-start gap-2 text-sm text-[#D1D5DB] leading-relaxed">
                      <span className="shrink-0 mt-0.5 text-xs" style={{ color: category.color }}>▸</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Countermeasures */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-2">
                  {t('対策・技術', hd.countermeasuresLabel)}
                </h4>
                <div className="space-y-1.5">
                  {countermeasures.map((cm, ci) => {
                    const isExpanded = expandedMeasure === `${categoryIndex}-${ci}`;
                    return (
                      <div
                        key={ci}
                        className="rounded border overflow-hidden"
                        style={{ borderColor: `${category.color}25`, backgroundColor: `${category.color}0A` }}
                      >
                        <button
                          onClick={() => setExpandedMeasure(isExpanded ? null : `${categoryIndex}-${ci}`)}
                          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm text-[#E5E7EB] font-medium">{cm.name}</span>
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
                                className="px-3 pb-3 pt-1 text-xs leading-relaxed border-t"
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
  const { t, lang, EN } = useT();
  const hd = EN.healthData;
  const tl = EMERGENCY_TIMELINE;
  const totalHours = parseInt(tl.steps[tl.steps.length - 1].time);

  // Use English steps if in EN mode
  const enSteps = hd.emergency.steps;
  const title    = lang === 'en' ? hd.emergency.title    : tl.title;
  const subtitle = lang === 'en' ? hd.emergency.subtitle : tl.subtitle;

  // Location color map (Japanese keys for JA mode, English keys for EN mode)
  const locationColors_ja: Record<string, string> = {
    '月面基地':   '#F59E0B',
    '月軌道':     '#8B5CF6',
    'Gateway':    '#3B82F6',
    '月〜地球間': '#06B6D4',
    '地球大気圏': '#F87171',
    '地球':       '#10B981',
  };

  const getLocationColor = (location: string): string => {
    if (lang === 'en') return hd.emergency.locationColors[location] ?? '#9CA3AF';
    return locationColors_ja[location] ?? '#9CA3AF';
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
            <h3 className="text-base font-medium text-white">{title}</h3>
            <p className="text-xs text-[#9CA3AF]">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          <div
            className="absolute left-[38px] top-2 bottom-2 w-px"
            style={{ backgroundColor: `${tl.color}20` }}
          />

          <div className="space-y-0">
            {tl.steps.map((step, i) => {
              const hours = parseFloat(step.time);
              const enStep = enSteps[i];
              const action   = lang === 'en' ? (enStep?.action   ?? step.action)   : step.action;
              const location = lang === 'en' ? (enStep?.location ?? step.location) : step.location;
              const locationColor = getLocationColor(location);
              const isLast = i === tl.steps.length - 1;

              return (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-xs font-spacemono font-bold" style={{ color: tl.color }}>
                      {step.time}
                    </span>
                  </div>

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

                  <div className="flex-1 pb-3">
                    <p className="text-sm text-[#D1D5DB] leading-snug">{action}</p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full inline-block mt-1"
                      style={{ backgroundColor: `${locationColor}20`, color: locationColor }}
                    >
                      {location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[#4B5563] text-xs mt-3">
          {t('※ 所要時間は軌道条件により変動。最短シナリオを示す（JAXA資料参照）', hd.emergencyNote1)}
        </p>
        <p className="text-[#4B5563] text-xs">
          {lang === 'en'
            ? hd.emergencyTotalHours(totalHours)
            : `※ 総帰還時間：約${totalHours}時間（約4日間）`
          }
        </p>
      </div>
    </div>
  );
}

// ── Main HealthView ────────────────────────────────────────────────────────

export function HealthView() {
  const { t, EN } = useT();
  const hd = EN.healthData;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">

      {/* Header */}
      <div>
        <h2 className="font-orbitron text-white text-base font-bold mb-1">
          {t('クルー健康管理・生活環境', hd.headerTitle)}
        </h2>
        <p className="text-[#9CA3AF] text-sm">
          {t('JAXAシナリオ 7.10節「有人宇宙滞在・拠点システム技術」に基づく', hd.headerSubtitle)}
        </p>
      </div>

      {/* Living stats banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '👥', labelJa: '最終常駐クルー', labelEn: hd.statFinalCrewLabel, value: hd.statFinalCrewValue, valueJa: '40名',    color: '#3B82F6' },
          { icon: '📅', labelJa: '最長連続滞在',   labelEn: hd.statMaxStayLabel,   value: hd.statMaxStayValue,   valueJa: '1年〜',   color: '#8B5CF6' },
          { icon: '🌍', labelJa: '帰還所要時間',   labelEn: hd.statReturnLabel,    value: hd.statReturnValue,    valueJa: '約96時間', color: '#10B981' },
        ].map(stat => (
          <div
            key={stat.labelJa}
            className="rounded-lg p-3 border text-center"
            style={{ borderColor: `${stat.color}30`, backgroundColor: `${stat.color}0D` }}
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="font-spacemono text-base font-bold" style={{ color: stat.color }}>
              {t(stat.valueJa, stat.value)}
            </div>
            <div className="text-[#9CA3AF] text-xs">
              {t(stat.labelJa, stat.labelEn)}
            </div>
          </div>
        ))}
      </div>

      {/* Health category cards */}
      <div className="space-y-3">
        {HEALTH_CATEGORIES.map((cat, i) => (
          <HealthCategoryCard key={cat.id} category={cat} categoryIndex={i} />
        ))}
      </div>

      {/* Emergency timeline */}
      <EmergencyTimelineSection />

      {/* Footer */}
      <div className="text-[#4B5563] text-xs text-center py-2">
        {t('出典：JAXA「日本の国際宇宙探査シナリオ案2025」（EZA-2025001）7.10節', hd.footerNote)}
      </div>
    </div>
  );
}
