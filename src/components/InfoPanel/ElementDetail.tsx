import { ChevronLeft, BookOpen } from 'lucide-react';
import type { InfraElement } from '../../data/infrastructure';
import { useSimulatorStore } from '../../store/simulatorStore';
import { Badge } from '../UI/Badge';
import { INFRA_PARTNERS, PARTNERS } from '../../data/partners';

interface Props {
  infra: InfraElement;
}

export function ElementDetail({ infra }: Props) {
  const { selectInfra } = useSimulatorStore();
  const partnerKeys = INFRA_PARTNERS[infra.id] ?? [];

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={() => selectInfra(null)}
        className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition-colors"
        aria-label="戻る"
      >
        <ChevronLeft size={14} />
        <span>フェーズ概要に戻る</span>
      </button>

      {/* Header */}
      <div className="bg-[#1F2937] rounded-lg p-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{infra.emoji}</span>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-sm font-bold leading-tight">{infra.name}</h2>
            <p className="text-[#6B7280] text-[10px] mt-0.5">{infra.nameEn}</p>
            <div className="mt-2">
              <Badge category={infra.category} />
            </div>
          </div>
        </div>
        <p className="text-[#9CA3AF] text-xs mt-2 leading-relaxed">{infra.description}</p>
      </div>

      {/* International Partners */}
      {partnerKeys.length > 0 && (
        <div className="bg-[#1F2937] rounded p-3">
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-2">国際パートナー</h3>
          <div className="flex flex-wrap gap-1.5">
            {partnerKeys.map(key => {
              const p = PARTNERS[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    backgroundColor: p.color + '22',
                    border: `1px solid ${p.color}55`,
                    color: p.color,
                  }}
                >
                  <span>{p.flag}</span>
                  <span>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Details */}
      <DetailSection title="目的・役割" content={infra.detail.purpose} />
      <DetailSection title="主要技術" content={infra.detail.technology} />
      <DetailSection title="JAXAの役割" content={infra.detail.japanRole} highlight />

      {/* Specs */}
      <div className="bg-[#1F2937] rounded p-3">
        <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-2">スペック</h3>
        <div className="space-y-1">
          {Object.entries(infra.detail.specs).map(([key, val]) => (
            <div key={key} className="flex gap-2 text-xs">
              <span className="text-[#9CA3AF] shrink-0 w-20">{key}</span>
              <span className="font-spacemono text-[#E5E7EB]">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="flex items-start gap-2 bg-[#1F2937] rounded p-3">
        <BookOpen size={12} className="text-[#6B7280] mt-0.5 shrink-0" />
        <p className="text-[#6B7280] text-[10px] leading-relaxed">
          <span className="text-[#9CA3AF]">参照：</span>{infra.detail.scenarioRef}
        </p>
      </div>
    </div>
  );
}

function DetailSection({ title, content, highlight = false }: { title: string; content: string; highlight?: boolean }) {
  return (
    <div className={`rounded p-3 ${highlight ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-[#1F2937]'}`}>
      <h3 className={`text-[10px] uppercase tracking-wider mb-1.5 ${highlight ? 'text-blue-400' : 'text-[#9CA3AF]'}`}>
        {title}
      </h3>
      <p className="text-[#D1D5DB] text-xs leading-relaxed">{content}</p>
    </div>
  );
}
