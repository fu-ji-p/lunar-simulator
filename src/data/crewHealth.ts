/**
 * Crew health & life support data
 * Based on 国際宇宙探査シナリオ案2025, Section 7.10
 * 「有人宇宙滞在・拠点システム技術」
 */

export interface CounterMeasure {
  name: string;
  detail: string;
}

export interface HealthCategory {
  id: string;
  icon: string;
  title: string;
  color: string;
  risks: string[];
  countermeasures: CounterMeasure[];
}

export interface EmergencyStep {
  time: string;
  action: string;
  location: string;
}

/** 健康リスクカテゴリと対策 */
export const HEALTH_CATEGORIES: HealthCategory[] = [
  {
    id: 'musculoskeletal',
    icon: '🦴',
    title: '筋骨格系への影響と対策',
    color: '#F59E0B',
    risks: [
      '月面重力（地球の1/6）による骨密度の年間1〜2%低下',
      '筋萎縮：特に抗重力筋（大腿・脊椎傍脊柱筋）が顕著',
      '長期滞在後の骨折リスク上昇・宇宙骨粗しょう症',
    ],
    countermeasures: [
      {
        name: '高強度運動プログラム',
        detail: '1日2時間の負荷運動を義務化（抵抗バンド・振動プレート・加圧トレーニング）。ISSの10年分データを基に月重力特化型プログラムを設計。',
      },
      {
        name: '栄養管理プロトコル',
        detail: 'カルシウム・ビタミンD摂取量をISS基準の1.5倍に設定。月面農業で生産した食材の栄養バランスをAIが常時最適化。',
      },
      {
        name: 'EVA運動負荷の積極活用',
        detail: '月面活動（EVA）を「重力負荷運動」として医療的に位置づけ。週3回以上のEVAを推奨し、滞在中の総運動時間に統合管理。',
      },
    ],
  },
  {
    id: 'radiation',
    icon: '☢️',
    title: '放射線被ばく管理プロトコル',
    color: '#F87171',
    risks: [
      '宇宙放射線：月面での年間被ばく量 約300〜600 mSv（地表の100〜200倍）',
      '太陽フレア（SPE）：数時間で1,000 mSv超の急性被ばくリスク',
      '長期影響：白内障・がん・中枢神経系障害のリスク上昇',
    ],
    countermeasures: [
      {
        name: '多層レゴリス遮蔽構造',
        detail: '月面土壌（レゴリス）を3m以上積層した遮蔽材で年間被ばくを50%低減。プラスチック系素材で二次宇宙線（中性子線）も対策。',
      },
      {
        name: 'リアルタイム線量モニタリング',
        detail: '個人被ばく計をIoT化し、累積線量・瞬間線量をフライトコントロールとリアルタイム共有。年間上限（500 mSv）到達時に自動警告。',
      },
      {
        name: 'SPE緊急シェルター体制',
        detail: '太陽フレア予報（1〜3時間前）を受信次第、全クルーが重遮蔽シェルターへ退避。居住区の水タンク壁面を追加遮蔽として活用する設計を採用。',
      },
    ],
  },
  {
    id: 'psychology',
    icon: '🧠',
    title: '心理的サポート（隔離環境のQOL）',
    color: '#A855F7',
    risks: [
      '通信遅延：地球〜月間の往復遅延 約2.5秒（リアルタイム会話が困難）',
      '長期孤立：家族・社会から切り離された隔離生活による累積ストレス',
      '閉鎖集団リスク：少人数コミュニティでの対人摩擦・権威勾配の問題',
    ],
    countermeasures: [
      {
        name: 'チーム構成の科学的最適化',
        detail: '心理的適性・文化的多様性・リーダーシップバランスを考慮した選抜プロセス。宇宙飛行士間の相性検査を月面コミュニティ規模（40名）に拡張適用。',
      },
      {
        name: 'プライベート空間と公共QOLスペース',
        detail: '個室保証（最低6m²）とともに、カフェ・運動施設・植物栽培エリアを「公共QOLスペース」として整備。月面ならではの「地球の出」鑑賞スポットも設置。',
      },
      {
        name: '高速通信による地球接続保障',
        detail: '高スループット通信（最大1 Gbps）で家族とのビデオ通話・ストリーミング配信を保障。スポーツ中継・音楽コンサートのリアルタイム視聴も可能にする。',
      },
      {
        name: '専属メンタルヘルスチーム',
        detail: '地上に専属の宇宙飛行士サポートチームを配置。非同期カウンセリング（録音メッセージ）と緊急時のライブセッションの2本立て体制で24時間対応。',
      },
    ],
  },
];

/** 緊急帰還タイムライン：Gateway経由の地球帰還シナリオ */
export const EMERGENCY_TIMELINE: {
  title: string;
  subtitle: string;
  color: string;
  steps: EmergencyStep[];
} = {
  title: '緊急地球帰還タイムライン',
  subtitle: 'Gateway（NRHO）経由シナリオ',
  color: '#3B82F6',
  steps: [
    { time: '0 h',  action: '緊急帰還決定（医療緊急・設備重大障害等）', location: '月面基地' },
    { time: '2 h',  action: 'HLS（月面着陸船）への乗り込み・打ち上げ準備完了', location: '月面基地' },
    { time: '4 h',  action: 'HLS 月面離脱・NRHOへの軌道遷移開始', location: '月軌道' },
    { time: '20 h', action: 'Gateway到着・ドッキング・乗員移送完了', location: 'Gateway' },
    { time: '22 h', action: 'Orion帰還船への移送・推薬充填・最終確認', location: 'Gateway' },
    { time: '24 h', action: 'Gateway出発・地球帰還軌道（TEI）への遷移', location: '月〜地球間' },
    { time: '94 h', action: '大気圏再突入・太平洋着水', location: '地球大気圏' },
    { time: '96 h', action: '海上回収・医療チームによる初期診断・搬送', location: '地球' },
  ],
};
