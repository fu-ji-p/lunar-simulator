export interface Industry {
  id: string;
  name: string;
  category: 'space' | 'lunar_surface' | 'earth';
  location: string;
  description: string;
  phase: 1 | 2 | 3 | 4;
  revenueModel: string;
  examples: string[];
}

export const INDUSTRIES: Industry[] = [
  // 地球〜月軌道間
  { id: 'launch', name: '宇宙輸送サービス', category: 'space', location: '地球〜月', description: '人・物資の月面輸送を民間が担うサービス産業', phase: 2, revenueModel: '打上費・輸送費', examples: ['民間ランダー', 'ロジスティクス', '燃料補給'] },
  { id: 'satcom', name: '月通信・測位サービス', category: 'space', location: '月軌道', description: '月面活動者・ロボットへの通信/測位サービス提供', phase: 3, revenueModel: '利用料金', examples: ['データ通信', 'ナビゲーション', '遠隔作業支援'] },
  { id: 'remote_sensing', name: '月面リモートセンシング', category: 'space', location: '月軌道', description: '月面の詳細マッピング・資源分布情報の販売', phase: 2, revenueModel: 'データ販売', examples: ['鉱物分布図', '地形データ', '環境モニタリング'] },
  // 月面（露出環境）
  { id: 'mining', name: '月資源採掘', category: 'lunar_surface', location: '月面（露出）', description: '水氷・レゴリス・レアメタルの採掘事業', phase: 3, revenueModel: '資源売却', examples: ['水氷→推薬', 'ヘリウム3', 'チタン・アルミ'] },
  { id: 'isru_biz', name: 'ISRUサービス', category: 'lunar_surface', location: '月面（露出）', description: '他事業者への推薬・酸素・水の供給事業', phase: 3, revenueModel: '供給契約', examples: ['推薬販売', '飲料水', '工業用酸素'] },
  { id: 'construction', name: '月面建設業', category: 'lunar_surface', location: '月面（露出）', description: '月面インフラの建設・整備サービス', phase: 3, revenueModel: '請負契約', examples: ['基地建設', '着陸パッド整備', 'インフラ保守'] },
  { id: 'manufacturing', name: '宇宙向け製造業', category: 'lunar_surface', location: '月面（露出）', description: '真空・低重力環境を活用した特殊製造', phase: 4, revenueModel: '製品販売', examples: ['光学素子', '半導体', '宇宙構造材料'] },
  // 月面（居住区内）
  { id: 'agriculture', name: '宇宙農業', category: 'lunar_surface', location: '月面（与圧）', description: '閉鎖型生態系での食料・バイオマス生産', phase: 4, revenueModel: '食料供給', examples: ['野菜栽培', 'タンパク質生産', '食料安保への応用'] },
  { id: 'medical', name: '宇宙医療・創薬', category: 'lunar_surface', location: '月面（与圧）', description: '月面環境（低重力・放射線）を活用した医薬品研究', phase: 4, revenueModel: '研究受託・特許', examples: ['タンパク質結晶化', '放射線医療研究', '宇宙生理学'] },
  { id: 'tourism', name: '月面観光', category: 'lunar_surface', location: '月面（与圧）', description: '月面体験・地球の出観覧・低重力スポーツ', phase: 4, revenueModel: '観光料金', examples: ['EVAツアー', 'Earthrise観覧', '低重力スポーツ'] },
  { id: 'education', name: '教育・研究プラットフォーム', category: 'lunar_surface', location: '月面（与圧）', description: '月面からのSTEM教育・科学実験配信', phase: 4, revenueModel: 'サブスクリプション', examples: ['ライブ授業', '実験受託', 'バーチャルツアー'] },
  // 地球
  { id: 'spinoff', name: 'スピンオフ産業', category: 'earth', location: '地球', description: '宇宙開発で生まれた技術の地上応用', phase: 2, revenueModel: '製品・ライセンス', examples: ['環境制御技術', 'ロボティクス', '新材料'] },
  { id: 'data_economy', name: '月面データ経済', category: 'earth', location: '地球/宇宙', description: '月面から得られる科学・産業データのビジネス化', phase: 3, revenueModel: 'データ販売', examples: ['科学データ', '資源情報', '技術ノウハウ'] },
];
