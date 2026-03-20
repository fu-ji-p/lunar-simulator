/**
 * Economic scale & industrial ripple data
 * Based on 国際宇宙探査シナリオ案2025, Section 3.5
 */

export interface InvestmentPhase {
  phaseLabel: string;
  period: string;
  totalBillionUSD: number;
  color: string;
  driver: string;
  keyMilestone: string;
}

export interface MarketSegment {
  name: string;
  icon: string;
  billionUSD: number;
  phase: number;
  color: string;
  description: string;
}

export interface SpinoffIndustry {
  name: string;
  icon: string;
  color: string;
  applications: string[];
  expectedImpact: string;
}

/** 民間投資額の推移（累計・試算） */
export const INVESTMENT_PHASES: InvestmentPhase[] = [
  {
    phaseLabel: 'Phase 1',
    period: '2020年代',
    totalBillionUSD: 25,
    color: '#3B82F6',
    driver: '政府主導',
    keyMilestone: 'Artemis計画・Gateway建設・LUPEX探査',
  },
  {
    phaseLabel: 'Phase 2',
    period: '2030年代前半',
    totalBillionUSD: 80,
    color: '#8B5CF6',
    driver: '民間参入加速',
    keyMilestone: '月面輸送市場の民間化・ISRU実証',
  },
  {
    phaseLabel: 'Phase 3',
    period: '2030年代後半',
    totalBillionUSD: 200,
    color: '#F59E0B',
    driver: '民間主導へ移行',
    keyMilestone: 'ISRU本格稼働・月面建設業参入',
  },
  {
    phaseLabel: 'Phase 4',
    period: '2040年代',
    totalBillionUSD: 500,
    color: '#10B981',
    driver: '月面経済自立',
    keyMilestone: '40名常駐・複合産業確立・観光開始',
  },
];

/** 主要市場セグメント（P4時点想定規模） */
export const MARKET_SEGMENTS: MarketSegment[] = [
  {
    name: '宇宙輸送\nサービス',
    icon: '🚀',
    billionUSD: 28,
    phase: 2,
    color: '#3B82F6',
    description: '民間ランダー・ロジスティクス・燃料補給',
  },
  {
    name: '通信・測位\nサービス',
    icon: '📡',
    billionUSD: 12,
    phase: 3,
    color: '#8B5CF6',
    description: '月面活動向け通信インフラ・ナビゲーション',
  },
  {
    name: 'ISRU・\n推薬供給',
    icon: '⛽',
    billionUSD: 18,
    phase: 3,
    color: '#F59E0B',
    description: '月面資源活用による推薬現地調達',
  },
  {
    name: '月面建設・\n製造',
    icon: '🏗️',
    billionUSD: 35,
    phase: 3,
    color: '#F97316',
    description: '月面インフラ整備・特殊材料製造',
  },
  {
    name: '観光・教育\nプラットフォーム',
    icon: '🌕',
    billionUSD: 22,
    phase: 4,
    color: '#EC4899',
    description: '月面ツーリズム・STEM教育配信',
  },
  {
    name: '月面\nデータ経済',
    icon: '💾',
    billionUSD: 15,
    phase: 3,
    color: '#06B6D4',
    description: '科学・資源データのビジネス化',
  },
];

/** 地球へのスピンオフ産業 */
export const SPINOFF_INDUSTRIES: SpinoffIndustry[] = [
  {
    name: '衛星測位・自動化',
    icon: '🛰️',
    color: '#3B82F6',
    applications: ['自動運転', '精密農業ドローン', '構造物モニタリング', 'GIS高度化'],
    expectedImpact: '測位精度cm級実現 → 全産業DX加速',
  },
  {
    name: '宇宙医療・創薬',
    icon: '🏥',
    color: '#F87171',
    applications: ['遠隔手術ロボット', 'タンパク質結晶化新薬', '放射線治療技術', '生命維持装置'],
    expectedImpact: '難治性疾患治療・医療格差解消に貢献',
  },
  {
    name: '宇宙農業技術',
    icon: '🌾',
    color: '#10B981',
    applications: ['閉鎖型水耕栽培', 'CO₂制御農業', 'バイオマス生産', '食料安保強化'],
    expectedImpact: '2050年100億人口の食料確保を支援',
  },
  {
    name: '環境・エネルギー',
    icon: '🌿',
    color: '#34D399',
    applications: ['高効率太陽電池', '水処理・再生技術', 'CO₂回収利用', '固体電池'],
    expectedImpact: '脱炭素社会実現の技術基盤を加速',
  },
];
