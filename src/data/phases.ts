export type PhaseId = 'phase1' | 'phase2' | 'phase3' | 'phase4';

export interface Phase {
  id: PhaseId;
  label: string;
  period: string;
  subtitle: string;
  color: string;
  crewCount: number;
  activeInfraIds: string[];
  newInPhase: string[];
  milestones: Milestone[];
  stats: PhaseStats;
}

export interface Milestone {
  year: string;
  event: string;
  category: 'mission' | 'infrastructure' | 'science' | 'industry';
}

export interface PhaseStats {
  totalCrew: number;
  powerKw: number;
  waterKgPerDay: number;
  oxygenKgPerDay: number;
  propellantTonPerYear: number;
  scienceInstruments: number;
  industryTypes: number;
}

export const PHASES: Phase[] = [
  {
    id: 'phase1',
    label: 'フェーズ1',
    period: '2020年代',
    subtitle: '探査の始まり：ロボット先行調査',
    color: '#3B82F6',
    crewCount: 0,
    activeInfraIds: [
      'slim', 'lupex', 'gateway_core', 'relay_satellite',
      'fund_thz_ground', 'fund_precision_lander'
    ],
    newInPhase: [
      'slim', 'lupex', 'gateway_core', 'relay_satellite',
      'fund_thz_ground', 'fund_precision_lander'
    ],
    milestones: [
      { year: '2024', event: 'SLIM月面着陸成功（日本初）', category: 'mission' },
      { year: '2025', event: 'Artemis II：有人月周回飛行', category: 'mission' },
      { year: '2026', event: 'LUPEX：月極域での水氷探査開始', category: 'mission' },
      { year: '2027', event: 'Gateway：第1モジュール打上', category: 'infrastructure' },
      { year: '2028', event: 'Artemis III：有人月面着陸（アルテミス計画）', category: 'mission' },
      { year: '2029', event: 'Gateway：日本のECLSS技術提供', category: 'infrastructure' },
    ],
    stats: {
      totalCrew: 0,
      powerKw: 10,
      waterKgPerDay: 0,
      oxygenKgPerDay: 0,
      propellantTonPerYear: 0,
      scienceInstruments: 4,
      industryTypes: 2,
    }
  },
  {
    id: 'phase2',
    label: 'フェーズ2',
    period: '2030年代前半',
    subtitle: '拠点構築：有人月面活動の開始',
    color: '#8B5CF6',
    crewCount: 4,
    activeInfraIds: [
      'slim', 'lupex', 'gateway_full', 'relay_satellite',
      'lunar_lander', 'surface_habitat_s', 'pressurized_rover',
      'solar_power_s', 'isru_pilot', 'seismometer_net',
      'fund_thz_ground', 'fund_regen_fc', 'fund_lnss_ground', 'fund_comm_ground'
    ],
    newInPhase: [
      'gateway_full', 'lunar_lander', 'surface_habitat_s',
      'pressurized_rover', 'solar_power_s', 'isru_pilot', 'seismometer_net',
      'fund_regen_fc', 'fund_lnss_ground', 'fund_comm_ground'
    ],
    milestones: [
      { year: '2030', event: 'Gateway：完成（HALO＋居住モジュール）', category: 'infrastructure' },
      { year: '2031', event: '有人月面着陸機：初期運用開始', category: 'mission' },
      { year: '2032', event: '月面居住ユニット第1号：設置', category: 'infrastructure' },
      { year: '2032', event: '有人与圧ローバー：月面探査開始', category: 'infrastructure' },
      { year: '2033', event: 'ISRU実証プラント：水電解テスト開始', category: 'science' },
      { year: '2034', event: '月震計ネットワーク：4点設置完了', category: 'science' },
    ],
    stats: {
      totalCrew: 4,
      powerKw: 40,
      waterKgPerDay: 5,
      oxygenKgPerDay: 3,
      propellantTonPerYear: 0.5,
      scienceInstruments: 12,
      industryTypes: 5,
    }
  },
  {
    id: 'phase3',
    label: 'フェーズ3',
    period: '2030年代後半〜2040年代前半',
    subtitle: '定常化：月面インフラの本格整備',
    color: '#F59E0B',
    crewCount: 10,
    activeInfraIds: [
      'gateway_full', 'relay_satellite_full',
      'lunar_lander', 'surface_habitat_m', 'pressurized_rover',
      'solar_power_m', 'nuclear_power', 'isru_full',
      'propellant_plant', 'seismometer_net', 'lunar_telescope',
      'sample_return', 'construction_robot', 'mining_robot',
      'fund_thz_ground', 'fund_regen_fc', 'fund_lnss_ground', 'fund_comm_ground',
      'fund_am241_power', 'fund_infra_demo'
    ],
    newInPhase: [
      'relay_satellite_full', 'surface_habitat_m', 'solar_power_m',
      'nuclear_power', 'isru_full', 'propellant_plant',
      'lunar_telescope', 'sample_return', 'construction_robot', 'mining_robot',
      'fund_am241_power', 'fund_infra_demo'
    ],
    milestones: [
      { year: '2035', event: '月面天文台：建設開始（電波干渉計）', category: 'science' },
      { year: '2036', event: 'ISRU本格プラント：推薬生産開始（LH₂/LOX）', category: 'infrastructure' },
      { year: '2037', event: '月面居住区：拡張（10名対応）', category: 'infrastructure' },
      { year: '2038', event: '建設ロボット：月面レゴリス活用型構造物建設', category: 'infrastructure' },
      { year: '2039', event: '小型原子力電源：月夜越え電力供給開始', category: 'infrastructure' },
      { year: '2040', event: 'サンプルリターン：有人採取・地球帰還', category: 'science' },
    ],
    stats: {
      totalCrew: 10,
      powerKw: 150,
      waterKgPerDay: 50,
      oxygenKgPerDay: 30,
      propellantTonPerYear: 10,
      scienceInstruments: 28,
      industryTypes: 12,
    }
  },
  {
    id: 'phase4',
    label: 'フェーズ4',
    period: '2040年代',
    subtitle: '社会化：40人が暮らす月面コミュニティ',
    color: '#10B981',
    crewCount: 40,
    activeInfraIds: [
      'gateway_full', 'relay_satellite_full',
      'lunar_lander', 'surface_habitat_l', 'pressurized_rover',
      'solar_power_l', 'nuclear_power', 'isru_full',
      'propellant_plant', 'seismometer_net', 'lunar_telescope',
      'sample_return', 'construction_robot', 'mining_robot',
      'biolab', 'manufacturing_hub', 'tourism_hub',
      'regolith_3dprint', 'lunar_comms_net', 'medical_center',
      'fund_thz_ground', 'fund_regen_fc', 'fund_lnss_ground', 'fund_comm_ground',
      'fund_am241_power', 'fund_infra_demo'
    ],
    newInPhase: [
      'surface_habitat_l', 'solar_power_l', 'biolab',
      'manufacturing_hub', 'tourism_hub', 'regolith_3dprint',
      'lunar_comms_net', 'medical_center'
    ],
    milestones: [
      { year: '2042', event: '月面居住区：大規模拡張（40名常駐対応）', category: 'infrastructure' },
      { year: '2043', event: 'レゴリス3Dプリント建設：居住棟を現地資材で建設', category: 'infrastructure' },
      { year: '2044', event: '月面バイオラボ：宇宙農業・医療研究稼働', category: 'science' },
      { year: '2045', event: '月面製造ハブ：宇宙向け高付加価値製造開始', category: 'industry' },
      { year: '2046', event: '月面観光：民間クルー受入開始', category: 'industry' },
      { year: '2047', event: '月面通信網：自律分散型LunarNetworks整備完了', category: 'infrastructure' },
    ],
    stats: {
      totalCrew: 40,
      powerKw: 500,
      waterKgPerDay: 200,
      oxygenKgPerDay: 120,
      propellantTonPerYear: 50,
      scienceInstruments: 60,
      industryTypes: 24,
    }
  }
];
