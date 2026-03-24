import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  PHASE_TRANSITIONS,
  CONDITION_CATEGORY_META,
  type TransitionCondition,
} from '../../data/phaseTransitions';
import { PHASES, type PhaseId } from '../../data/phases';
import { useSimulatorStore } from '../../store/simulatorStore';
import { useT } from '../../hooks/useT';

interface Props {
  currentPhase: PhaseId;
}

export function PhaseTransitionPanel({ currentPhase }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCondition, setExpandedCondition] = useState<number | null>(null);
  const { selectInfra } = useSimulatorStore();
  const { t, lang, EN } = useT();
  const pt = EN.phaseTransitions;

  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);
  const isLastPhase = phaseIndex === PHASES.length - 1;

  const transition = PHASE_TRANSITIONS.find(tr => tr.fromPhase === currentPhase);

  if (isLastPhase) {
    return <FinalPhaseCard />;
  }

  if (!transition) return null;

  const nextLabel = lang === 'en'
    ? (pt.nextLabels[transition.fromPhase] ?? transition.nextLabel)
    : transition.nextLabel;

  return (
    <div className="bg-[#1F2937] rounded overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">
            {t('次フェーズへの移行条件', pt.headerTitle)}
          </span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: '#F59E0B20', color: '#F59E0B', border: '1px solid #F59E0B40' }}
          >
            → {nextLabel}
          </span>
        </div>
        {isOpen
          ? <ChevronDown size={12} className="text-[#6B7280] shrink-0" />
          : <ChevronRight size={12} className="text-[#6B7280] shrink-0" />
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
            <div className="px-3 pb-3 space-y-1.5 border-t border-white/5 pt-2">
              {transition.conditions.map((cond, i) => (
                <ConditionItem
                  key={i}
                  condition={cond}
                  conditionIndex={i}
                  phaseId={transition.fromPhase}
                  index={i}
                  isExpanded={expandedCondition === i}
                  onToggle={() => setExpandedCondition(expandedCondition === i ? null : i)}
                  onInfraClick={cond.infraRef ? () => selectInfra(cond.infraRef!) : undefined}
                />
              ))}

              <p className="text-[#4B5563] text-[9px] pt-1 leading-relaxed">
                {t('国際宇宙探査シナリオ案2025 に基づくGo/No-Go判断基準', pt.footerNote)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Individual condition item ────────────────────────────────────────────────

function ConditionItem({
  condition,
  conditionIndex,
  phaseId,
  index,
  isExpanded,
  onToggle,
  onInfraClick,
}: {
  condition: TransitionCondition;
  conditionIndex: number;
  phaseId: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onInfraClick?: () => void;
}) {
  const { t, lang, EN } = useT();
  const pt = EN.phaseTransitions;
  const meta = CONDITION_CATEGORY_META[condition.category];
  const categoryLabel = lang === 'en'
    ? (pt.categoryLabels[condition.category] ?? meta.label)
    : meta.label;

  const enConds = pt.conditions[phaseId];
  const enCond  = enConds?.[conditionIndex];
  const label  = lang === 'en' ? (enCond?.label  ?? condition.label)  : condition.label;
  const detail = lang === 'en' ? (enCond?.detail ?? condition.detail) : condition.detail;

  return (
    <div
      className="rounded border overflow-hidden"
      style={{ borderColor: `${meta.color}25`, backgroundColor: `${meta.color}08` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-2 px-2.5 py-2 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <span className="text-[11px]">{meta.icon}</span>
          <span
            className="text-[8px] font-spacemono w-3 text-center"
            style={{ color: meta.color, opacity: 0.7 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <span className="text-[11px] text-[#D1D5DB] leading-snug flex-1 text-left">
          {label}
        </span>

        <span
          className="text-[8px] px-1 py-0.5 rounded shrink-0 mt-0.5"
          style={{ color: meta.color, backgroundColor: `${meta.color}20` }}
        >
          {categoryLabel}
        </span>
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
            <div className="px-2.5 pb-2.5 space-y-2 border-t" style={{ borderColor: `${meta.color}15` }}>
              <p className="text-[#9CA3AF] text-[10px] leading-relaxed pt-2">
                {detail}
              </p>
              {onInfraClick && (
                <button
                  onClick={(e) => { e.stopPropagation(); onInfraClick(); }}
                  className="text-[9px] flex items-center gap-1 transition-colors"
                  style={{ color: meta.color }}
                >
                  <span>→</span>
                  <span>{t('マップで関連インフラを確認', pt.viewOnMap)}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Final phase card ─────────────────────────────────────────────────────────

function FinalPhaseCard() {
  const { currentPhase } = useSimulatorStore();
  const { t, EN } = useT();
  const pt = EN.phaseTransitions;
  const phase = PHASES.find(p => p.id === currentPhase)!;

  return (
    <div
      className="rounded p-3 border text-center space-y-1"
      style={{ borderColor: `${phase.color}40`, backgroundColor: `${phase.color}10` }}
    >
      <div className="text-lg">🌙</div>
      <div className="text-xs font-medium" style={{ color: phase.color }}>
        {t('最終フェーズ達成', pt.finalPhaseTitle)}
      </div>
      <p className="text-[#9CA3AF] text-[10px] leading-relaxed whitespace-pre-line">
        {t('40名が常駐する月面コミュニティの実現。\nここからは火星探査への技術転用が始まる。', pt.finalPhaseDesc)}
      </p>
    </div>
  );
}
