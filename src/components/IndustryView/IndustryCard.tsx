import type { Industry } from '../../data/industries';
import { useT } from '../../hooks/useT';

const PHASE_COLORS: Record<number, string> = {
  1: '#3B82F6',
  2: '#8B5CF6',
  3: '#F59E0B',
  4: '#10B981',
};

const SOURCE_META = {
  scenario: { label: '探査シナリオ', labelEn: 'Exploration Scenario', color: '#60A5FA', bg: '#1E3A5F' },
  fund:     { label: '宇宙戦略基金', labelEn: 'Space Strategy Fund',  color: '#F59E0B', bg: '#3D2A0A' },
} as const;

interface Props {
  industry: Industry;
}

export function IndustryCard({ industry }: Props) {
  const { t, lang, EN } = useT();
  const phaseColor = PHASE_COLORS[industry.phase];
  const sourceMeta = SOURCE_META[industry.source];

  const enData = EN.industries[industry.id];
  const name        = lang === 'en' ? (enData?.name        ?? industry.name)        : industry.name;
  const description = lang === 'en' ? (enData?.description ?? industry.description) : industry.description;
  const revenueModel = lang === 'en' ? (enData?.revenueModel ?? industry.revenueModel) : industry.revenueModel;
  const examples    = lang === 'en' ? (enData?.examples     ?? industry.examples)    : industry.examples;

  return (
    <div className="bg-[#1F2937] rounded-lg p-3 border border-white/10 hover:border-white/25 transition-colors flex flex-col gap-1.5">

      {/* Row 1: title + phase badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white text-xs font-bold leading-tight">{name}</h3>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded font-spacemono shrink-0"
          style={{ backgroundColor: `${phaseColor}20`, color: phaseColor, border: `1px solid ${phaseColor}40` }}
        >
          P{industry.phase}
        </span>
      </div>

      {/* Row 2: description */}
      <p className="text-[#9CA3AF] text-[10px] leading-relaxed">{description}</p>

      {/* Row 3: example tags */}
      <div className="flex flex-wrap gap-1">
        {examples.slice(0, 3).map(ex => (
          <span key={ex} className="text-[9px] bg-white/5 text-[#9CA3AF] px-1.5 py-0.5 rounded">
            {ex}
          </span>
        ))}
      </div>

      {/* Row 4: revenue + source badge */}
      <div className="flex items-center justify-between mt-0.5 gap-2">
        <span className="text-[9px] text-[#6B7280]">
          {industry.source === 'scenario'
            ? t('収益: ', EN.revenuePrefix)
            : t('制度: ', EN.policyPrefix)
          }
          {revenueModel}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {industry.source === 'fund' ? (
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: sourceMeta.bg, border: `1px solid ${sourceMeta.color}40` }}
              title={t('宇宙戦略基金', 'Space Strategy Fund')}
            >
              <span
                className="shrink-0 rounded-full"
                style={{
                  display: 'inline-block',
                  width: '12px', height: '12px',
                  backgroundImage: 'url(/SSF_logo_white.png)',
                  backgroundSize: '30px auto',
                  backgroundPosition: '-1px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#F59E0B',
                  borderRadius: '50%',
                }}
              />
              <span className="text-[8px]" style={{ color: sourceMeta.color }}>SSF</span>
            </span>
          ) : (
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: sourceMeta.bg, color: sourceMeta.color, border: `1px solid ${sourceMeta.color}40` }}
            >
              {lang === 'en' ? sourceMeta.labelEn : sourceMeta.label}
            </span>
          )}
          {industry.fundUrl && (
            <a
              href={industry.fundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] text-[#F59E0B] hover:text-[#FCD34D] transition-colors underline underline-offset-1"
              onClick={e => e.stopPropagation()}
            >
              {t('詳細→', EN.detailsLink)}
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
