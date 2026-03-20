export type InfraCategory =
  | 'transport'
  | 'habitat'
  | 'energy'
  | 'isru'
  | 'science'
  | 'exploration'
  | 'industry'
  | 'communication';

export interface InfraElement {
  id: string;
  name: string;
  nameEn: string;
  category: InfraCategory;
  icon: string;
  emoji: string;
  position: { x: number; y: number };
  /** Display scale factor. 1.0 = standard 16px radius circle. */
  displaySize: number;
  description: string;
  detail: InfraDetail;
}

export interface InfraDetail {
  purpose: string;
  technology: string;
  japanRole: string;
  specs: Record<string, string>;
  scenarioRef: string;
}

export const INFRASTRUCTURE: InfraElement[] = [
  // ===== 輸送系 =====
  {
    id: 'gateway_core',
    name: 'Gateway（初期）',
    nameEn: 'Lunar Gateway (Initial)',
    category: 'transport',
    icon: 'Orbit',
    emoji: '🛸',
    position: { x: 50, y: 8 },
    displaySize: 1.8,
    description: '月近傍の有人宇宙ステーション。地球と月面を結ぶ中継拠点。',
    detail: {
      purpose: '地球からの宇宙飛行士と物資を月面へ中継する有人拠点。月面着陸機のドッキング先。',
      technology: 'HALOモジュール（アメリカ）、推進モジュール（ESA）、居住モジュール（JAXA提供ECLSS）',
      japanRole: 'JAXAは環境制御・生命維持システム（ECLSS）を居住モジュールへ提供。宇宙飛行士の搭乗権を獲得。',
      specs: { '軌道': '月近傍極軌道（NRHO）', '周期': '約6.5日', '滞在定員': '4名', '連続滞在': '30日' },
      scenarioRef: '6.2.1節「月近傍拠点」、10.2節「Gateway居住モジュールへのECLSS技術提供」'
    }
  },
  {
    id: 'gateway_full',
    name: 'Gateway（完成）',
    nameEn: 'Lunar Gateway (Full)',
    category: 'transport',
    icon: 'Orbit',
    emoji: '🛸',
    position: { x: 50, y: 8 },
    displaySize: 1.8,
    description: '完成したGateway。月面活動の恒久的中継拠点として機能。',
    detail: {
      purpose: '月面活動の完全な中継基地。科学実験・居住・物資補給を一体的に行う。',
      technology: '全モジュール接続完了。太陽電池パドル、推進系、通信系を完備。',
      japanRole: 'JAXA提供のECLSS（水回収・空気管理）が全乗組員の生命を支える。',
      specs: { '定員': '4名', '物資補給': 'HTV-X（JAXA）で輸送', '寿命': '15年以上' },
      scenarioRef: '6.2.1節、10.2節'
    }
  },
  {
    id: 'lunar_lander',
    name: '有人月離着陸機',
    nameEn: 'Human Landing System',
    category: 'transport',
    icon: 'Rocket',
    emoji: '🚀',
    position: { x: 35, y: 25 },
    displaySize: 1.3,
    description: 'GatewayとApolloから月面に往復する有人着陸船。',
    detail: {
      purpose: '月面とGatewayの間を宇宙飛行士が往復するための主要輸送手段。',
      technology: '液水/液酸エンジン（再着火可能）、自動着陸・障害物回避、ISRU推薬との連携。',
      japanRole: 'JAXAは月面の推薬生成（ISRU）と連携し、将来的には現地調達燃料での運用を目指す。',
      specs: { '乗員': '4名', 'ペイロード': '約1t', '滞在時間': '7日間', '推薬': 'LH₂/LOX' },
      scenarioRef: '6.2.3節「有人月離着陸機」'
    }
  },
  {
    id: 'relay_satellite',
    name: '月中継衛星（初期）',
    nameEn: 'Lunar Relay Satellite',
    category: 'communication',
    icon: 'Radio',
    emoji: '📡',
    position: { x: 75, y: 15 },
    displaySize: 0.85,
    description: '月裏側・極域と地球の通信を中継する衛星。',
    detail: {
      purpose: '月の極域（日照条件の悪い地域）や裏側での通信・測位を可能にする。',
      technology: '楕円軌道（フローズンオービット）による継続的な極域カバレッジ。',
      japanRole: 'JAXAは月測位システム（Lunar Positioning System）の技術開発を推進。',
      specs: { '軌道': '楕円軌道', 'カバレッジ': '南極周辺', '帯域': '〜Gbps' },
      scenarioRef: '6.2.7節「通信・測位アーキテクチャ」'
    }
  },
  {
    id: 'relay_satellite_full',
    name: '月通信測位網',
    nameEn: 'Lunar Navigation & Comm Network',
    category: 'communication',
    icon: 'Radio',
    emoji: '📡',
    position: { x: 75, y: 15 },
    displaySize: 0.85,
    description: '複数衛星と月面中継局からなる月全域通信・測位インフラ。',
    detail: {
      purpose: '月面どこでも通信・測位（GPS相当）を可能にする。自動ロボットの遠隔操作にも不可欠。',
      technology: '低軌道衛星コンステレーション＋月面中継局のハイブリッド構成。',
      japanRole: 'JAXAが月測位システムの標準化を国際的に主導。',
      specs: { '測位精度': '数cm〜m級', '通信速度': '100Mbps+', '遅延': '往復2.6秒' },
      scenarioRef: '6.2.7節'
    }
  },

  // ===== 居住 =====
  {
    id: 'surface_habitat_s',
    name: '月面居住ユニット（小）',
    nameEn: 'Lunar Surface Habitat (Small)',
    category: 'habitat',
    icon: 'Home',
    emoji: '🏠',
    position: { x: 56, y: 52 },
    displaySize: 1.3,
    description: '月南極付近に設置された初期居住モジュール。4名が1〜2週間滞在可能。',
    detail: {
      purpose: '月面での短期有人滞在を実現。宇宙放射線・隕石から保護された与圧環境を提供。',
      technology: '輸送ロケットで打上後、ロボットで自動組立。耐放射線・断熱二重構造。',
      japanRole: 'JAXAはECLSS（空気・水循環管理）技術をGatewayから月面用に応用・発展させる。',
      specs: { '定員': '4名', '与圧容積': '約100m³', '放射線遮蔽': 'レゴリス袋で補強', '滞在期間': '2週間' },
      scenarioRef: '5.1節「有人月面基地構想」、6.2.6節「月面有人拠点」'
    }
  },
  {
    id: 'surface_habitat_m',
    name: '月面居住区（中）',
    nameEn: 'Lunar Surface Habitat (Medium)',
    category: 'habitat',
    icon: 'Building',
    emoji: '🏗️',
    position: { x: 57, y: 52 },
    displaySize: 1.8,
    description: '複数モジュールを連結した10名規模の月面基地。定常運用フェーズ。',
    detail: {
      purpose: '10名のクルーが長期（数か月）滞在できる拠点。科学・産業活動の生活基盤。',
      technology: '月面でのモジュール連結・レゴリスシールド設置。太陽フレア時の緊急退避シェルター完備。',
      japanRole: 'JAXAはISSで培った長期滞在技術・健康管理ノウハウを月面に適用。',
      specs: { '定員': '10名', '与圧面積': '約500m²', '滞在': '6か月', '電力': '150kW' },
      scenarioRef: '5.1節、7.10節「有人宇宙滞在・拠点システム技術」'
    }
  },
  {
    id: 'surface_habitat_l',
    name: '月面コミュニティ（大）',
    nameEn: 'Lunar Surface Community',
    category: 'habitat',
    icon: 'Building2',
    emoji: '🌆',
    position: { x: 57, y: 51 },
    displaySize: 2.3,
    description: '40名が常駐する月面社会の中核拠点。居住・研究・産業が複合化。',
    detail: {
      purpose: '単なる基地を超え、医療・食料生産・レクリエーション・産業を含む「月面コミュニティ」として機能。',
      technology: 'レゴリス3Dプリント構造体、分散型生命維持システム、月面農業区画、テレワーク施設。',
      japanRole: 'JAXAのQOL維持技術（7.10.5節）が長期滞在者の精神的・肉体的健康を支える。',
      specs: { '定員': '40名', '与圧面積': '3,000m²以上', '食料自給率': '30%目標', '滞在': '1〜2年' },
      scenarioRef: '3.4.4節「2040年代の40人が滞在するプログラム構想」'
    }
  },
  {
    id: 'medical_center',
    name: '月面医療センター',
    nameEn: 'Lunar Medical Center',
    category: 'habitat',
    icon: 'HeartPulse',
    emoji: '🏥',
    position: { x: 65, y: 57 },
    displaySize: 1.1,
    description: '緊急処置・長期医療・宇宙放射線対応を行う月面医療施設。',
    detail: {
      purpose: '40名コミュニティの健康管理。地球への緊急帰還が困難なため、月面での完結的医療が不可欠。',
      technology: 'AIによる遠隔診断支援、無重力・低重力対応医療機器、放射線量モニタリング。',
      japanRole: 'JAXAのISS医療実績を元に、月面特有の低重力環境・放射線影響の対処プロトコルを開発。',
      specs: { '対応': '外科・内科・歯科', '遠隔支援': '地球の医師と連携', '緊急帰還': 'Gateway経由で対応' },
      scenarioRef: '7.10.5節「健康管理技術」'
    }
  },

  // ===== エネルギー =====
  {
    id: 'solar_power_s',
    name: '太陽電池アレイ（初期）',
    nameEn: 'Solar Power Array (Initial)',
    category: 'energy',
    icon: 'Sun',
    emoji: '☀️',
    position: { x: 82, y: 44 },
    displaySize: 1.1,
    description: '月面基地への初期電力供給。ただし月夜（14日間）は発電不可。',
    detail: {
      purpose: '月面での電力供給。月の昼間（14日）は発電、月の夜（14日）は蓄電池で乗り切る。',
      technology: '展開型フレキシブル太陽電池パネル＋蓄電池（リチウム二次電池）。',
      japanRole: 'JAXAは軽量・高効率の宇宙用太陽電池技術を持ち、国際チームと協力。',
      specs: { '出力': '10〜40kW', '展開面積': '約100m²', '蓄電': '月夜越えに限界あり' },
      scenarioRef: '7.3節「エネルギー技術」'
    }
  },
  {
    id: 'solar_power_m',
    name: '大型太陽電池アレイ',
    nameEn: 'Large Solar Power Array',
    category: 'energy',
    icon: 'Sun',
    emoji: '☀️',
    position: { x: 84, y: 43 },
    displaySize: 1.4,
    description: '稜線（リッジ）に設置し、ほぼ連続発電できる大型太陽電池システム。',
    detail: {
      purpose: 'シャクルトンクレーター縁などの永久日照地帯に設置し、月夜の問題を回避。',
      technology: '永久日照地帯への大型太陽電池アレイ＋遠距離電力伝送（ケーブルまたは無線）。',
      japanRole: 'JAXAは月面での電力インフラ設計・宇宙向け高効率太陽電池の研究を牽引。',
      specs: { '出力': '150kW', '設置場所': '永久日照稜線', 'ケーブル延長': '数km' },
      scenarioRef: '7.3節'
    }
  },
  {
    id: 'solar_power_l',
    name: '大規模電力インフラ',
    nameEn: 'Large-scale Power Infrastructure',
    category: 'energy',
    icon: 'Zap',
    emoji: '⚡',
    position: { x: 81, y: 41 },
    displaySize: 1.7,
    description: '500kW規模の複合電力システム。太陽電池＋原子力の組み合わせ。',
    detail: {
      purpose: '40名コミュニティとISRUプラント・製造施設を含む大規模電力需要を満たす。',
      technology: '大型太陽電池アレイ（300kW）＋小型核分裂炉（200kW）のハイブリッド構成。',
      japanRole: '日本の宇宙用電源技術を応用した高信頼電力管理システムを提供。',
      specs: { '総出力': '500kW', '核分裂炉': '200kW（月夜補完）', '配電': '月面全域ネットワーク' },
      scenarioRef: '7.3節'
    }
  },
  {
    id: 'nuclear_power',
    name: '小型核分裂炉',
    nameEn: 'Small Fission Reactor',
    category: 'energy',
    icon: 'Atom',
    emoji: '⚛️',
    position: { x: 12, y: 62 },
    displaySize: 0.9,
    description: '14日間の月夜でも安定電力を供給できる小型原子力電源。',
    detail: {
      purpose: '月の夜（14日間の暗闇）でも電力を途切れなく供給し、ISRU・生命維持を継続。',
      technology: '核分裂式（FissionPower）。熱電変換により電力生成。遠隔地でも自律運用。',
      japanRole: 'JAXAはNASAとの連携で月面原子力電源の設計・安全評価に参画。',
      specs: { '出力': '10〜40kW', '寿命': '10年以上', '遮蔽': '砂囲い型月面設置' },
      scenarioRef: '7.3節'
    }
  },

  // ===== ISRU（資源利用）=====
  {
    id: 'lupex',
    name: 'LUPEX（水氷探査）',
    nameEn: 'Lunar Polar Exploration',
    category: 'isru',
    icon: 'Search',
    emoji: '🔭',
    position: { x: 16, y: 78 },
    displaySize: 0.8,
    description: 'JAXAとISROが共同開発する月南極水氷探査ローバー。',
    detail: {
      purpose: '月の永久影クレーター内に存在する水氷の量・形態・採掘可能性を調査する。',
      technology: 'ドリル・中性子分光計・質量分析計を搭載。インドのランダーで着陸、JAXAのローバーで走破。',
      japanRole: 'JAXAがローバー本体を担当。ISRO（インド）がランダー担当。日印初の共同月探査。',
      specs: { '重量': '約350kg', '移動距離': '数km', '調査深度': '1m以上', '稼働': '14日間' },
      scenarioRef: '10.1節「LUPEX」'
    }
  },
  {
    id: 'isru_pilot',
    name: 'ISRUパイロットプラント',
    nameEn: 'ISRU Pilot Plant',
    category: 'isru',
    icon: 'Factory',
    emoji: '🏭',
    position: { x: 34, y: 63 },
    displaySize: 1.2,
    description: '月の水氷から水・酸素・水素を小規模生産する実証プラント。',
    detail: {
      purpose: '月の水資源を採掘・精製し、飲料水・呼吸用酸素・ロケット推薬の原料を生産する技術を実証。',
      technology: '水氷採掘→電気分解→LH₂/LOX生成→液化保存。太陽熱やマイクロ波で氷を融解。',
      japanRole: 'JAXAは推薬生成プラント（7.7節）の設計・開発を国内産業と共同推進。',
      specs: { '水生産': '5kg/日', '電力消費': '20kW', '規模': 'テストベッド相当' },
      scenarioRef: '6.2.5節「推薬生成プラント」、7.7節'
    }
  },
  {
    id: 'isru_full',
    name: 'ISRU本格プラント',
    nameEn: 'Full-scale ISRU Plant',
    category: 'isru',
    icon: 'Factory',
    emoji: '🏭',
    position: { x: 33, y: 63 },
    displaySize: 1.5,
    description: '月面で水・推薬・酸素を本格的に量産するインフラ。',
    detail: {
      purpose: '地球からの輸送コストを劇的に削減。月で作った推薬でロケットを月から飛ばせる。',
      technology: '月面レゴリスの加熱脱水、電気分解、液化設備を大型化。採掘ロボットと連携。',
      japanRole: 'JAXAが国際的なISRUアーキテクチャ検討に参加し、水処理・推薬生成系を担当。',
      specs: { '水生産': '50kg/日', '推薬生産': '10t/年', '電力': '100kW以上' },
      scenarioRef: '6.2.5節、7.6節「資源開発技術」'
    }
  },
  {
    id: 'propellant_plant',
    name: '推薬生成・補給設備',
    nameEn: 'Propellant Production & Supply',
    category: 'isru',
    icon: 'Fuel',
    emoji: '⛽',
    position: { x: 25, y: 70 },
    displaySize: 1.3,
    description: '月面で生産したLH₂/LOXを着陸機・ローバーに充填する補給設備。',
    detail: {
      purpose: '月で作った燃料を月面の乗り物に補給。地球からの燃料輸送コストを大幅削減。',
      technology: '液体水素・液体酸素の貯蔵タンク＋月面充填カプラー。極低温管理が技術難関。',
      japanRole: 'JAXAは推薬生成システムの概念設計・パイロットプラント開発をリード（7.7節）。',
      specs: { '保管容量': '数十トン', '温度管理': '極低温（LH₂: -253℃）', '用途': '着陸機・ローバー' },
      scenarioRef: '6.2.5節、7.7節'
    }
  },

  // ===== 探査・移動 =====
  {
    id: 'slim',
    name: 'SLIM（月面着陸実証）',
    nameEn: 'Smart Lander for Investigating Moon',
    category: 'exploration',
    icon: 'MapPin',
    emoji: '🎯',
    position: { x: 74, y: 77 },
    displaySize: 0.75,
    description: '2024年に世界初のピンポイント着陸を実現した日本の月探査機。',
    detail: {
      purpose: '誤差100m以内のピンポイント着陸技術を実証。将来の月探査の精密着陸の扉を開いた。',
      technology: 'AI画像認識による地形照合、軽量着陸脚。傾いても科学観測を継続。',
      japanRole: '100%日本開発。JAXAが世界に先駆けてピンポイント月面着陸を達成（2024年1月）。',
      specs: { '着陸精度': '55m（目標100m以内）', '傾斜角': '約70°で着陸', '科学機器': 'MBC・SBC搭載' },
      scenarioRef: 'JAXAの実績（2024年実施済み）'
    }
  },
  {
    id: 'pressurized_rover',
    name: '有人与圧ローバー',
    nameEn: 'Pressurized Rover',
    category: 'exploration',
    icon: 'Car',
    emoji: '🚙',
    position: { x: 69, y: 60 },
    displaySize: 1.1,
    description: 'スペースシャトル2台分の大きさの移動型月面基地。',
    detail: {
      purpose: '与圧された居住スペースを持ち、宇宙服を脱いで数週間の長距離月面探査が可能。',
      technology: '全輪電動駆動、燃料電池電源、太陽電池充電。内部に睡眠・食事・実験スペース。',
      japanRole: 'JAXAがトヨタと共同開発。Artera（月面向け）として2030年代前半の運用を目指す。',
      specs: { '乗員': '4名', '航続距離': '1000km以上', '内容積': '13m³', '充電': '太陽電池' },
      scenarioRef: '6.2.4節「有人与圧ローバ」、10.3節'
    }
  },
  {
    id: 'construction_robot',
    name: '建設ロボット',
    nameEn: 'Construction Robot',
    category: 'exploration',
    icon: 'Wrench',
    emoji: '🤖',
    position: { x: 51, y: 70 },
    displaySize: 0.9,
    description: 'レゴリスを用いた月面構造物の建設・整地を自律的に行うロボット群。',
    detail: {
      purpose: '人手をかけずに月面基地の拡張・整備を実施。着陸パッドの整地、覆土（遮蔽）作業など。',
      technology: 'AIによる自律作業、レゴリス3Dプリント用ノズル搭載、遠隔操作モード。',
      japanRole: 'JAXAは建設ロボのアーキテクチャ・制御系の研究を進めている（8.2節）。',
      specs: { '自律性': 'AI自律＋地球遠隔操作', '作業': '掘削・整地・搬送', '電源': 'バッテリー交換式' },
      scenarioRef: '7.5節「探査技術（表面移動・作業技術）」、8.2節'
    }
  },
  {
    id: 'mining_robot',
    name: '採掘ロボット',
    nameEn: 'Mining Robot',
    category: 'isru',
    icon: 'HardHat',
    emoji: '⛏️',
    position: { x: 21, y: 75 },
    displaySize: 0.9,
    description: '月面のレゴリスや永久影クレーターの水氷を採掘するロボット。',
    detail: {
      purpose: 'ISRUプラントへの原料（水氷・レゴリス）を継続的に供給する無人採掘システム。',
      technology: '自律走行、ドリル・バケット式採掘、ホッパーによる搬送。極低温対応。',
      japanRole: 'JAXAは月資源開発技術（7.6節）において採掘ロボの要素技術研究を実施。',
      specs: { '採掘量': '1t/日', '稼働': '自律連続稼働', '電源': '核電池 or ケーブル電源' },
      scenarioRef: '7.6節「資源開発技術（月資源開発技術）」'
    }
  },

  // ===== 科学 =====
  {
    id: 'seismometer_net',
    name: '月震計ネットワーク',
    nameEn: 'Lunar Seismometer Network',
    category: 'science',
    icon: 'Activity',
    emoji: '📊',
    position: { x: 85, y: 68 },
    displaySize: 0.85,
    description: '月面4か所以上に設置し、月の内部構造を解明する地震観測網。',
    detail: {
      purpose: '月の地殻・マントル・核の構造を解明。将来の資源探査・基地建設場所選定にも活用。',
      technology: '広帯域地震計、太陽電池・蓄電池電源、無線データ伝送。有人活動とも連携。',
      japanRole: '日本の月震計開発の伝統（アポロ時代から）を継承し、次世代センサーの開発をリード。',
      specs: { '設置数': '4か所以上', '感度': '広帯域（10⁻³〜1Hz）', 'データ': '常時地球へ送信' },
      scenarioRef: '4.5.3節「月震計ネットワーク」'
    }
  },
  {
    id: 'lunar_telescope',
    name: '月面天文台',
    nameEn: 'Lunar Astronomical Observatory',
    category: 'science',
    icon: 'Telescope',
    emoji: '🔭',
    position: { x: 89, y: 51 },
    displaySize: 1.0,
    description: 'ノイズのない月面から宇宙全体を観測する革命的な天文台。',
    detail: {
      purpose: '大気・電波雑音ゼロの月面（特に裏側）から、地球では不可能な宇宙観測を実現。',
      technology: '電波干渉計（裏側）、光学望遠鏡、X線望遠鏡。複数地点に分散配置。',
      japanRole: '日本の天文学コミュニティが月面天文台の国際科学ミッションを牽引（4.5.1節）。',
      specs: { '種別': '電波・光学・X線', '解像度': 'ハッブル超え', '観測域': '宇宙背景放射〜近傍天体' },
      scenarioRef: '4.5.1節「月面天文台」、4.2.3節'
    }
  },
  {
    id: 'sample_return',
    name: 'サンプルリターン施設',
    nameEn: 'Sample Return Facility',
    category: 'science',
    icon: 'FlaskConical',
    emoji: '⚗️',
    position: { x: 72, y: 63 },
    displaySize: 1.0,
    description: '有人採取による高品質な月サンプルを地球へ持ち帰る施設・システム。',
    detail: {
      purpose: '月の起源・太陽系の歴史を解明する高価値サンプルを人の判断で採取し地球で分析。',
      technology: '有人コア採取、クリーン保管ケース、帰還カプセル。JAXA/NASAキュレーション施設。',
      japanRole: 'JAXAは「はやぶさ」で磨いたサンプルキュレーション技術を月面有人探査に応用。',
      specs: { '採取量': '〜数kg', '保管': '無汚染クリーンケース', '帰還': 'Gateway経由で地球帰還' },
      scenarioRef: '4.5.2節「月面サンプルリターン」、4.6.3節「有人活動によるサンプルの採取」'
    }
  },

  // ===== 産業 =====
  {
    id: 'biolab',
    name: '月面バイオラボ',
    nameEn: 'Lunar BioLab',
    category: 'industry',
    icon: 'Microscope',
    emoji: '🔬',
    position: { x: 48, y: 60 },
    displaySize: 1.0,
    description: '月の低重力・放射線環境を活かした生物・医学研究施設と食料生産区画。',
    detail: {
      purpose: '月独自の環境で医薬品・新素材の研究開発。同時に宇宙農業で食料自給率を向上。',
      technology: '低重力バイオリアクター、宇宙農業（閉鎖型生態系）、放射線影響研究。',
      japanRole: 'JAXAは宇宙実験技術（7.11節）・宇宙農業（7.12節）の知見を月面施設に展開。',
      specs: { '農業区画': '100m²（野菜・大豆）', '医薬研究': '微重力結晶化タンパク質', '食料': '30%自給目標' },
      scenarioRef: '3.5.3節「月面上 月面居住区内で発生し得る産業」、7.11節、7.12節'
    }
  },
  {
    id: 'manufacturing_hub',
    name: '月面製造ハブ',
    nameEn: 'Lunar Manufacturing Hub',
    category: 'industry',
    icon: 'Cog',
    emoji: '⚙️',
    position: { x: 63, y: 64 },
    displaySize: 1.3,
    description: '月の低重力・高真空環境を活かした宇宙向け高付加価値製造施設。',
    detail: {
      purpose: '地球では作れない新材料・デバイスを宇宙向けに月で製造し、宇宙産業に供給。',
      technology: '真空蒸着、低重力結晶成長、半導体製造（月のシリコン活用）、3Dプリント。',
      japanRole: '日本の精密製造技術を宇宙環境に応用する民間宇宙企業との連携（3.5節）。',
      specs: { '製品': '光学素子・半導体・新素材', '製法': '真空成膜・低重力結晶化', '市場': '宇宙産業向け' },
      scenarioRef: '3.5.2節「月面上 月面居住区外で発生し得る産業」、3.5.3節'
    }
  },
  {
    id: 'tourism_hub',
    name: '月面観光施設',
    nameEn: 'Lunar Tourism Hub',
    category: 'industry',
    icon: 'Hotel',
    emoji: '🏨',
    position: { x: 57, y: 65 },
    displaySize: 1.2,
    description: '月面の景色・低重力体験・地球の出（Earthrise）観覧を提供する民間観光施設。',
    detail: {
      purpose: '月面観光という新産業の確立。民間資金の月面経済への投入を促進する。',
      technology: '展望ドーム付き居住棟、EVA（月面歩行）ツアー装備、地球通信VR接続。',
      japanRole: '日本の宇宙旅行ビジネス（宇宙スタートアップ）と連携した月面観光インフラ整備。',
      specs: { '定員': '4〜8名/回', '滞在': '2週間', '体験': '月面歩行・地球の出観覧・低重力スポーツ' },
      scenarioRef: '3.5節「産業に関するビジョン」'
    }
  },
  {
    id: 'regolith_3dprint',
    name: 'レゴリス3Dプリント',
    nameEn: 'Regolith 3D Printing',
    category: 'industry',
    icon: 'Printer',
    emoji: '🖨️',
    position: { x: 44, y: 55 },
    displaySize: 1.0,
    description: '月の土（レゴリス）を材料に、シェルター・インフラを現地で製造するシステム。',
    detail: {
      purpose: '地球から資材を輸送するコストを削減。月の資源だけで大型構造物を建設できる。',
      technology: 'マイクロ波焼結・結合剤噴射式3Dプリント。太陽熱を熱源に活用。',
      japanRole: 'JAXAはレゴリス活用構造物建設の可能性研究を5章・6.2.6節で詳細検討。',
      specs: { '材料': '月レゴリス（地場調達）', '精度': '数cm', '構造': '放射線遮蔽壁・着陸パッド等' },
      scenarioRef: '5.1節、6.2.6節「月面有人拠点」'
    }
  },
  {
    id: 'lunar_comms_net',
    name: '月面通信インフラ',
    nameEn: 'Lunar Communications Network',
    category: 'communication',
    icon: 'Wifi',
    emoji: '📶',
    position: { x: 77, y: 54 },
    displaySize: 1.0,
    description: '月面全域をカバーする自律分散型通信・測位ネットワーク。',
    detail: {
      purpose: '人・ロボット・センサーが月面全域でシームレスに通信・位置把握できる環境を整備。',
      technology: '月面中継局（ビーコン）、衛星コンステレーション、光通信（レーザー）。',
      japanRole: 'JAXAは月測位システムの標準化に向けてNASA・ESAと協議（6.2.7節、7.4節）。',
      specs: { '帯域': 'Gbps級（光通信）', '測位': '数m以内', 'カバー': '月面全域' },
      scenarioRef: '6.2.7節、6.2.8節、7.4節'
    }
  },
];
