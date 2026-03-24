import { ChevronLeft, BookOpen } from 'lucide-react';
import type { InfraElement } from '../../data/infrastructure';
import { useSimulatorStore } from '../../store/simulatorStore';
import { useT } from '../../hooks/useT';
import { Badge } from '../UI/Badge';
import { INFRA_PARTNERS, PARTNERS } from '../../data/partners';

interface Props {
  infra: InfraElement;
}

export function ElementDetail({ infra }: Props) {
  const { selectInfra } = useSimulatorStore();
  const { t, lang, EN } = useT();
  const partnerKeys = INFRA_PARTNERS[infra.id] ?? [];

  const enInfra = EN.infra[infra.id];
  const description = lang === 'en' ? (enInfra?.description ?? infra.description) : infra.description;

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={() => selectInfra(null)}
        className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition-colors"
        aria-label={t('戻る', 'Back')}
      >
        <ChevronLeft size={14} />
        <span>{t('フェーズ概要に戻る', EN.backToPhase)}</span>
      </button>

      {/* Header */}
      <div className="bg-[#1F2937] rounded-lg p-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{infra.emoji}</span>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-sm font-bold leading-tight">
              {lang === 'en' ? infra.nameEn : infra.name}
            </h2>
            <p className="text-[#6B7280] text-[10px] mt-0.5">
              {lang === 'en' ? infra.name : infra.nameEn}
            </p>
            <div className="mt-2">
              <Badge category={infra.category} />
            </div>
          </div>
        </div>
        <p className="text-[#9CA3AF] text-xs mt-2 leading-relaxed">{description}</p>
      </div>

      {/* International Partners */}
      {partnerKeys.length > 0 && (
        <div className="bg-[#1F2937] rounded p-3">
          <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-2">
            {t('国際パートナー', EN.sectionPartners)}
          </h3>
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
      <DetailSection title={t('目的・役割', EN.sectionPurpose)} content={infra.detail.purpose} />
      <DetailSection title={t('主要技術', EN.sectionTechnology)} content={infra.detail.technology} />
      <DetailSection title={t('JAXAの役割', EN.sectionJapanRole)} content={infra.detail.japanRole} highlight />

      {/* Specs */}
      <div className="bg-[#1F2937] rounded p-3">
        <h3 className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-2">
          {t('スペック', EN.sectionSpecs)}
        </h3>
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
          <span className="text-[#9CA3AF]">{t('参照：', EN.refPrefix)}</span>
          {infra.detail.scenarioRef}
        </p>
      </div>

      {/* 情報源バッジ */}
      {infra.source === 'fund' ? (
        <div className="flex items-center justify-between bg-[#3D2A0A] rounded p-3 border border-[#F59E0B]/25">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}
              title="宇宙戦略基金"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '14px', height: '14px',
                  backgroundImage: 'url(/SSF_logo_white.png)',
                  backgroundSize: '35px auto',
                  backgroundPosition: '-1px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#F59E0B',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <span className="text-[9px]" style={{ color: '#F59E0B' }}>SSF</span>
            </span>
            <span className="text-[9px] text-[#9CA3AF]">
              {t('JAXA 探査テーマ', EN.jaxa_exploration_theme)}
            </span>
          </div>
          {infra.fundUrl && (
            <a
              href={infra.fundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] text-[#F59E0B] hover:text-[#FCD34D] transition-colors underline underline-offset-1 shrink-0"
            >
              {t('公式ページ→', EN.official_page)}
            </a>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-[#1E3A5F] rounded p-3 border border-[#60A5FA]/25">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: 'rgba(96,165,250,0.15)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.35)' }}
          >
            {t('探査シナリオ', EN.exploration_scenario_label)}
          </span>
          <span className="text-[9px] text-[#9CA3AF]">
            {t('国際宇宙探査シナリオ案2025', EN.scenario_source)}
          </span>
        </div>
      )}
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
