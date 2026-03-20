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

interface Props {
  currentPhase: PhaseId;
}

export function PhaseTransitionPanel({ currentPhase }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCondition, setExpandedCondition] = useState<number | null>(null);
  const { selectInfra } = useSimulatorStore();

  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);
  const isLastPhase = phaseIndex === PHASES.length - 1;

  // Get transition FROM current phase
  const transition = PHASE_TRANSITIONS.find(t => t.fromPhase === currentPhase);

  if (isLastPhase) {
    return <FinalPhaseCard />;
  }

  if (!transition) return null;

  // Conditions in earlier phases are already "achieved"
  const isAchieved = (phaseIndex: number) => phaseIndex < PHASES.findIndex(p => p.id === currentPhase);

  return (
    <div className="bg-[#1F2937] rounded overflow-hidden">
      {/* Header — toggle open/close */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">
            次フェーズへの移行条件
          </span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: '#F59E0B20',
              color: '#F59E0B',
              border: '1px solid #F59E0B40',
            }}
          >
            → {transition.nextLabel}
          </span>
        </div>
        {isOpen
          ? <ChevronDown size={12} className="text-[#6B7280] shrink-0" />
          : <ChevronRight size={12} className="text-[#6B7280] shrink-0" />
        }
      </button>

      {/* Expandable body */}
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
                  index={i}
                  isExpanded={expandedCondition === i}
                  onToggle={() => setExpandedCondition(expandedCondition === i ? null : i)}
                  onInfraClick={cond.infraRef ? () => selectInfra(cond.infraRef!) : undefined}
                />
              ))}

              {/* Footer note */}
              <p className="text-[#4B5563] text-[9px] pt-1 leading-relaxed">
                国際宇宙探査シナリオ案2025 に基づくGo/No-Go判断基準
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
  index,
  isExpanded,
  onToggle,
  onInfraClick,
}: {
  condition: TransitionCondition;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onInfraClick?: () => void;
}) {
  const meta = CONDITION_CATEGORY_META[condition.category];

  return (
    <div
      className="rounded border overflow-hidden"
      style={{ borderColor: `${meta.color}25`, backgroundColor: `${meta.color}08` }}
    >
      {/* Condition header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-2 px-2.5 py-2 text-left hover:bg-white/5 transition-colors"
      >
        {/* Category icon & number */}
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <span className="text-[11px]">{meta.icon}</span>
          <span
            className="text-[8px] font-spacemono w-3 text-center"
            style={{ color: meta.color, opacity: 0.7 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Condition label */}
        <span className="text-[11px] text-[#D1D5DB] leading-snug flex-1 text-left">
          {condition.label}
        </span>

        {/* Category badge */}
        <span
          className="text-[8px] px-1 py-0.5 rounded shrink-0 mt-0.5"
          style={{ color: meta.color, backgroundColor: `${meta.color}20` }}
        >
          {meta.label}
        </span>
      </button>

      {/* Detail — shown when expanded */}
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
                {condition.detail}
              </p>
              {onInfraClick && (
                <button
                  onClick={(e) => { e.stopPropagation(); onInfraClick(); }}
                  className="text-[9px] flex items-center gap-1 transition-colors"
                  style={{ color: meta.color }}
                >
                  <span>→</span>
                  <span>マップで関連インフラを確認</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Final phase card (Phase 4 reached) ──────────────────────────────────────

function FinalPhaseCard() {
  const { currentPhase } = useSimulatorStore();
  const phase = PHASES.find(p => p.id === currentPhase)!;

  return (
    <div
      className="rounded p-3 border text-center space-y-1"
      style={{ borderColor: `${phase.color}40`, backgroundColor: `${phase.color}10` }}
    >
      <div className="text-lg">🌙</div>
      <div className="text-xs font-medium" style={{ color: phase.color }}>
        最終フェーズ達成
      </div>
      <p className="text-[#9CA3AF] text-[10px] leading-relaxed">
        40名が常駐する月面コミュニティの実現。<br />
        ここからは火星探査への技術転用が始まる。
      </p>
    </div>
  );
}
