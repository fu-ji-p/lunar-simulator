import type { InfraCategory } from '../../data/infrastructure';
import { useT } from '../../hooks/useT';

const CATEGORY_LABELS_JA: Record<InfraCategory, string> = {
  transport: '輸送',
  habitat: '居住',
  energy: 'エネルギー',
  isru: 'ISRU',
  science: '科学',
  exploration: '探査',
  industry: '産業',
  communication: '通信',
};

const CATEGORY_COLORS: Record<InfraCategory, string> = {
  transport: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  habitat: 'bg-green-500/20 text-green-300 border-green-500/40',
  energy: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  isru: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  science: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  exploration: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  industry: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
  communication: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
};

interface Props {
  category: InfraCategory;
}

export function Badge({ category }: Props) {
  const { lang, EN } = useT();
  const label = lang === 'en'
    ? (EN.categories[category] ?? category)
    : CATEGORY_LABELS_JA[category];

  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded border ${CATEGORY_COLORS[category]}`}>
      {label}
    </span>
  );
}
