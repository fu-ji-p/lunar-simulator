/**
 * Mars Prospect — Technology Bridge Data
 * Based on 国際宇宙探査シナリオ案2025
 * "月は火星探査のテストベッド" という視点
 */

export interface TechBridge {
  id: string;
  icon: string;
  title: string;
  color: string;
  /** 月面でこの技術が成熟するフェーズ */
  enabledFromPhase: number;
  lunar: {
    label: string;
    description: string;
    milestone: string;
  };
  mars: {
    label: string;
    description: string;
    challenge: string;
  };
  /** 月→火星の技術継承ポイント */
  bridge: string;
}

export interface MissionComparison {
  label: string;
  moon: string;
  mars: string;
  moonColor: string;
  marsColor: string;
}

/** 月→火星 技術ブリッジ 一覧 */
export const TECH_BRIDGES: TechBridge[] = [
  {
    id: 'isru',
    icon: '⛽',
    title: 'ISRU推薬生成',
    color: '#F59E0B',
    enabledFromPhase: 2,
    lunar: {
      label: '月面：水氷→H₂/O₂',
      description: '南極永久影領域の水氷から電気分解で水素・酸素を生成し、ロケット推薬として利用。',
      milestone: 'ISRU実証プラントによる推薬年産10t達成（フェーズ3）',
    },
    mars: {
      label: '火星：CO₂+H₂O→CH₄/O₂',
      description: '火星大気（95% CO₂）と地下水氷からサバティエ反応でメタン推薬を生成。地球からの推薬輸送を不要にする。',
      challenge: '火星の低気圧・低温下での大規模化学プロセス制御',
    },
    bridge: '現地資源を使った自律的な推薬製造プロセスの実証。月面での量産技術が火星ISRU設計の直接的な基盤になる。',
  },
  {
    id: 'health',
    icon: '🦴',
    title: '長期健康管理',
    color: '#F87171',
    enabledFromPhase: 2,
    lunar: {
      label: '月面：最長1年間滞在',
      description: '1/6重力環境での骨密度低下・筋萎縮・放射線被ばくに対する医療プロトコルを確立。90日→1年と段階的に延伸。',
      milestone: '10名クルーの1年間安全運用実証（フェーズ3→4）',
    },
    mars: {
      label: '火星：往復約2.5年ミッション',
      description: '片道7ヶ月の宇宙飛行＋18ヶ月の火星滞在。微小重力と強放射線への長期対応が必須。',
      challenge: '緊急帰還不能環境での完全自律医療体制',
    },
    bridge: '月面の段階的長期滞在実績が、火星ミッション向け健康基準・治療プロトコルの医学的根拠となる。',
  },
  {
    id: 'bioregenerative',
    icon: '🌱',
    title: '閉鎖生態系・食料自給',
    color: '#10B981',
    enabledFromPhase: 3,
    lunar: {
      label: '月面：バイオリジェネラティブシステム',
      description: 'CO₂・水・廃棄物を再循環する閉鎖型生態系。植物栽培・タンパク質生産・空気浄化を統合管理。',
      milestone: '与圧居住区での食料生産・水再生の自給率向上実証',
    },
    mars: {
      label: '火星：完全食料自給',
      description: '地球から食料補給不可能（最短2年待ち）。滞在中の全カロリーを現地生産で賄う必要がある。',
      challenge: '火星重力（地球の0.38倍）・高CO₂環境での植物生育最適化',
    },
    bridge: '月面で実証した閉鎖型農業システムが、規模を拡大して火星の食料自給基盤に直結する。',
  },
  {
    id: 'nuclear_power',
    icon: '⚛️',
    title: '核分裂動力システム',
    color: '#818CF8',
    enabledFromPhase: 3,
    lunar: {
      label: '月面：14日間の月夜を乗り越える',
      description: '太陽電池が使えない月夜（約14日間）に40kW以上の安定電力を供給。小型核分裂炉で電力自立を実証。',
      milestone: '月夜連続電力供給実証によりISRU・居住システムの24h稼働を保障',
    },
    mars: {
      label: '火星：砂嵐時の電力確保',
      description: '火星の砂嵐（最長数ヶ月）で太陽光発電が大幅低下。核分裂炉が唯一の信頼できる電力源となる。',
      challenge: '火星の低温環境（最低-125℃）での炉の起動・長期維持',
    },
    bridge: '月面で実証した核分裂炉の設計・運用ノウハウが、火星向け電力システムのリファレンス設計になる。',
  },
  {
    id: 'autonomous_robot',
    icon: '🤖',
    title: '自律建設ロボット',
    color: '#A78BFA',
    enabledFromPhase: 3,
    lunar: {
      label: '月面：レゴリス3Dプリント建設',
      description: '建設ロボットが月面土壌（レゴリス）を素材に放射線遮蔽壁・構造物を自律建設。有人到着前に基地整備を完了。',
      milestone: '建設ロボットによる現地資材活用型構造物の実証（フェーズ3→4）',
    },
    mars: {
      label: '火星：先行自律建設',
      description: '有人ミッション到着前に数年間、ロボットが火星表面で居住モジュール・ランディングパッドを建設完了させる。',
      challenge: '片道20分の通信遅延下での完全自律判断・例外処理',
    },
    bridge: '月面での地球通信支援下における自律建設実績が、完全自律（通信遅延数十分）の火星建設システムの設計基礎となる。',
  },
  {
    id: 'psychology',
    icon: '🧠',
    title: '心理・社会的適応',
    color: '#A855F7',
    enabledFromPhase: 2,
    lunar: {
      label: '月面：2.5秒遅延の孤立環境',
      description: '地球との往復通信遅延2.5秒、長期隔離ストレス、少人数閉鎖コミュニティでの心理的・社会的適応プロトコルを確立。',
      milestone: '40名常駐コミュニティの長期安定運用による社会的適応の実証',
    },
    mars: {
      label: '火星：最大48分遅延・完全孤立',
      description: '片道通信遅延4〜24分（平均12分）。緊急時に地球の支援を受けられない真の自律コミュニティが必要。',
      challenge: '地球との文化的断絶と独自コミュニティ秩序の形成',
    },
    bridge: '月面コミュニティ運営の実績が、火星クルー選定基準・チーム構成・心理支援プロトコルの直接的な根拠になる。',
  },
];

/** ミッション比較データ */
export const MISSION_COMPARISONS: MissionComparison[] = [
  {
    label: '最長滞在期間',
    moon: '1年以上（フェーズ4）',
    mars: '約18ヶ月（地表）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
  {
    label: '往復通信遅延',
    moon: '約2.5秒',
    mars: '8〜48分（平均24分）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
  {
    label: '緊急帰還時間',
    moon: '約4日（Gateway経由）',
    mars: '最短6ヶ月以上（軌道条件依存）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
  {
    label: '重力環境',
    moon: '地球の1/6（1.62 m/s²）',
    mars: '地球の3/8（3.72 m/s²）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
  {
    label: '放射線被ばく（年間）',
    moon: '約300〜600 mSv',
    mars: '約200〜300 mSv（大気遮蔽あり）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
  {
    label: '食料自給要件',
    moon: '補給可（2週間以内）',
    mars: '完全自給必須（補給2年待ち）',
    moonColor: '#94A3B8',
    marsColor: '#F97316',
  },
];
