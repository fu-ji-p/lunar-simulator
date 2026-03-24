export interface Industry {
  id: string;
  name: string;
  category: 'space' | 'lunar_surface' | 'earth';
  location: string;
  description: string;
  phase: 1 | 2 | 3 | 4;
  revenueModel: string;
  examples: string[];
  /** 情報源タグ */
  source: 'scenario' | 'fund';
  /** 宇宙戦略基金の詳細ページURL（fund の場合のみ） */
  fundUrl?: string;
}

// ── 探査シナリオ（JAXAシナリオ3.5節）────────────────────────────────────

export const INDUSTRIES: Industry[] = [
  // 地球〜月軌道間
  { id: 'launch', name: '宇宙輸送サービス', category: 'space', location: '地球〜月', description: '人・物資の月面輸送を民間が担うサービス産業', phase: 2, revenueModel: '打上費・輸送費', examples: ['民間ランダー', 'ロジスティクス', '燃料補給'], source: 'scenario' },
  { id: 'satcom', name: '月通信・測位サービス', category: 'space', location: '月軌道', description: '月面活動者・ロボットへの通信/測位サービス提供', phase: 3, revenueModel: '利用料金', examples: ['データ通信', 'ナビゲーション', '遠隔作業支援'], source: 'scenario' },
  { id: 'remote_sensing', name: '月面リモートセンシング', category: 'space', location: '月軌道', description: '月面の詳細マッピング・資源分布情報の販売', phase: 2, revenueModel: 'データ販売', examples: ['鉱物分布図', '地形データ', '環境モニタリング'], source: 'scenario' },
  // 月面（露出環境）
  { id: 'mining', name: '月資源採掘', category: 'lunar_surface', location: '月面（露出）', description: '水氷・レゴリス・レアメタルの採掘事業', phase: 3, revenueModel: '資源売却', examples: ['水氷→推薬', 'ヘリウム3', 'チタン・アルミ'], source: 'scenario' },
  { id: 'isru_biz', name: 'ISRUサービス', category: 'lunar_surface', location: '月面（露出）', description: '他事業者への推薬・酸素・水の供給事業', phase: 3, revenueModel: '供給契約', examples: ['推薬販売', '飲料水', '工業用酸素'], source: 'scenario' },
  { id: 'construction', name: '月面建設業', category: 'lunar_surface', location: '月面（露出）', description: '月面インフラの建設・整備サービス', phase: 3, revenueModel: '請負契約', examples: ['基地建設', '着陸パッド整備', 'インフラ保守'], source: 'scenario' },
  { id: 'manufacturing', name: '宇宙向け製造業', category: 'lunar_surface', location: '月面（露出）', description: '真空・低重力環境を活用した特殊製造', phase: 4, revenueModel: '製品販売', examples: ['光学素子', '半導体', '宇宙構造材料'], source: 'scenario' },
  // 月面（居住区内）
  { id: 'agriculture', name: '宇宙農業', category: 'lunar_surface', location: '月面（与圧）', description: '閉鎖型生態系での食料・バイオマス生産', phase: 4, revenueModel: '食料供給', examples: ['野菜栽培', 'タンパク質生産', '食料安保への応用'], source: 'scenario' },
  { id: 'medical', name: '宇宙医療・創薬', category: 'lunar_surface', location: '月面（与圧）', description: '月面環境（低重力・放射線）を活用した医薬品研究', phase: 4, revenueModel: '研究受託・特許', examples: ['タンパク質結晶化', '放射線医療研究', '宇宙生理学'], source: 'scenario' },
  { id: 'tourism', name: '月面観光', category: 'lunar_surface', location: '月面（与圧）', description: '月面体験・地球の出観覧・低重力スポーツ', phase: 4, revenueModel: '観光料金', examples: ['EVAツアー', 'Earthrise観覧', '低重力スポーツ'], source: 'scenario' },
  { id: 'education', name: '教育・研究プラットフォーム', category: 'lunar_surface', location: '月面（与圧）', description: '月面からのSTEM教育・科学実験配信', phase: 4, revenueModel: 'サブスクリプション', examples: ['ライブ授業', '実験受託', 'バーチャルツアー'], source: 'scenario' },
  // 地球
  { id: 'spinoff', name: 'スピンオフ産業', category: 'earth', location: '地球', description: '宇宙開発で生まれた技術の地上応用', phase: 2, revenueModel: '製品・ライセンス', examples: ['環境制御技術', 'ロボティクス', '新材料'], source: 'scenario' },
  { id: 'data_economy', name: '月面データ経済', category: 'earth', location: '地球/宇宙', description: '月面から得られる科学・産業データのビジネス化', phase: 3, revenueModel: 'データ販売', examples: ['科学データ', '資源情報', '技術ノウハウ'], source: 'scenario' },

  // ── 宇宙戦略基金（探査第一期・第二期）────────────────────────────────

  // 地球〜月軌道
  {
    id: 'fund_water_sensing',
    name: '月面水資源探査技術（センシング）',
    category: 'space',
    location: '月周回軌道',
    description: 'テラヘルツ波を用いた月周回衛星による受動リモートセンシング。南極域の水氷分布を広域・高精度で探査する。',
    phase: 1,
    revenueModel: '政府契約・データ提供',
    examples: ['テラヘルツ波センサ', '超小型衛星', '水氷マッピング'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme4-2/',
  },
  {
    id: 'fund_moonearth_comm',
    name: '月-地球間通信システム',
    category: 'space',
    location: '月軌道〜地球',
    description: '4K/8Kリアルタイム映像伝送を含む大容量通信システム。月面5G・光通信・遅延耐性ネットワーク（DTN）技術を開発。',
    phase: 2,
    revenueModel: '政府契約・通信サービス',
    examples: ['光通信地上局', '月面5G', 'DTNプロトコル'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme5/',
  },
  {
    id: 'fund_lunar_positioning',
    name: '月測位システム技術（LNSS）',
    category: 'space',
    location: '月周回軌道',
    description: '複数の月周回測位衛星によるリアルタイム自己位置把握インフラ。米欧のLunaNet構想と連携し、日本の測位技術を月圏へ展開。',
    phase: 2,
    revenueModel: '政府契約・民間利用料',
    examples: ['GNSS発展技術', '測位信号生成', '高精度軌道決定'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme15/',
  },
  {
    id: 'fund_precision_landing',
    name: '月極域高精度着陸技術',
    category: 'space',
    location: '月面〜月周回軌道',
    description: 'SLIMと同等以上の精度（100m以下）で月極域を含むあらゆる地点に着陸可能な技術。民間ランダーの国際競争力強化を目指す。',
    phase: 2,
    revenueModel: '政府契約・ペイロード輸送',
    examples: ['精密誘導航法', '地形適応着陸', '極域対応ランダー'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme2_16/',
  },

  // 月面
  {
    id: 'fund_regen_fuel_cell',
    name: '再生型燃料電池システム',
    category: 'lunar_surface',
    location: '月面',
    description: '月夜（約14日間）の太陽電池発電ゼロ期間に対応する大容量蓄電システム。純酸素対応・低重力環境での水電解技術を開発。',
    phase: 2,
    revenueModel: '政府契約・電力供給',
    examples: ['再生型燃料電池', '純酸素電解', '大容量蓄電'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme3/',
  },
  {
    id: 'fund_semiperm_power',
    name: '半永久電源システム（Am-241熱電変換）',
    category: 'lunar_surface',
    location: '月面',
    description: '燃料補給不要で長期使用可能なアメリシウム241を利用した熱電変換電源。極端な月面温度変化（-170〜110℃）に耐え、火星圏以遠にも対応。',
    phase: 3,
    revenueModel: '政府契約・電力システム販売',
    examples: ['Am-241熱電変換', '半導体熱電素子', '長期自律電源'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme20/',
  },
  {
    id: 'fund_lunar_infra',
    name: '月面インフラ構築要素技術',
    category: 'lunar_surface',
    location: '月面',
    description: '与圧ローバ・日本人宇宙飛行士の月面着陸を見据えた産学横断の要素技術開発。非宇宙分野からの参入も促進し月面経済圏構築を支援。',
    phase: 3,
    revenueModel: '政府契約・民間展開',
    examples: ['与圧ローバ', '月面建設ロボット', 'インフラ材料技術'],
    source: 'fund',
    fundUrl: 'https://fund.jaxa.jp/techlist/theme2_15/',
  },
];
