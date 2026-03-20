export type CorrelationType =
  | 'energy'
  | 'transport'
  | 'resource'
  | 'science'
  | 'habitat'
  | 'communication';

export interface Correlation {
  from: string;
  to: string;
  type: CorrelationType;
  label: string;
}

export const CORRELATION_COLORS: Record<CorrelationType, string> = {
  transport:     '#3B82F6', // blue
  energy:        '#F59E0B', // amber
  resource:      '#06B6D4', // cyan
  science:       '#A855F7', // purple
  habitat:       '#10B981', // green
  communication: '#6366F1', // indigo
};

export const CORRELATION_TYPE_LABELS: Record<CorrelationType, string> = {
  transport:     '輸送',
  energy:        '電力供給',
  resource:      '資源利用',
  science:       '科学連携',
  habitat:       '生活支援',
  communication: '通信・測位',
};

export const CORRELATIONS: Correlation[] = [
  // ===== 輸送 / Transport =====
  { from: 'gateway_core',     to: 'lunar_lander',      type: 'transport', label: 'ドッキング' },
  { from: 'gateway_full',     to: 'lunar_lander',      type: 'transport', label: 'ドッキング' },
  { from: 'lunar_lander',     to: 'surface_habitat_s', type: 'transport', label: 'クルー輸送' },
  { from: 'lunar_lander',     to: 'surface_habitat_m', type: 'transport', label: 'クルー輸送' },
  { from: 'lunar_lander',     to: 'surface_habitat_l', type: 'transport', label: 'クルー輸送' },
  { from: 'propellant_plant', to: 'lunar_lander',      type: 'transport', label: '推薬補給' },
  { from: 'propellant_plant', to: 'pressurized_rover', type: 'transport', label: '推薬補給' },
  { from: 'sample_return',    to: 'gateway_full',      type: 'transport', label: 'Gateway経由帰還' },

  // ===== 通信・測位 / Communication =====
  { from: 'relay_satellite',      to: 'gateway_core',  type: 'communication', label: '通信中継' },
  { from: 'relay_satellite',      to: 'lunar_lander',  type: 'communication', label: '航法支援' },
  { from: 'relay_satellite_full', to: 'gateway_full',  type: 'communication', label: '通信中継' },
  { from: 'relay_satellite_full', to: 'lunar_comms_net', type: 'communication', label: '測位信号' },
  { from: 'lunar_comms_net',      to: 'pressurized_rover',   type: 'communication', label: '測位' },
  { from: 'lunar_comms_net',      to: 'construction_robot',  type: 'communication', label: '遠隔制御' },
  { from: 'lunar_comms_net',      to: 'mining_robot',        type: 'communication', label: '遠隔制御' },

  // ===== 電力供給 / Energy =====
  { from: 'solar_power_s', to: 'surface_habitat_s', type: 'energy', label: '電力供給' },
  { from: 'solar_power_s', to: 'isru_pilot',         type: 'energy', label: '電力供給' },
  { from: 'solar_power_m', to: 'surface_habitat_m', type: 'energy', label: '電力供給' },
  { from: 'solar_power_m', to: 'isru_full',          type: 'energy', label: '電力供給' },
  { from: 'solar_power_l', to: 'surface_habitat_l', type: 'energy', label: '電力供給' },
  { from: 'solar_power_l', to: 'isru_full',          type: 'energy', label: '電力供給' },
  { from: 'nuclear_power', to: 'isru_pilot',         type: 'energy', label: '月夜電力' },
  { from: 'nuclear_power', to: 'isru_full',          type: 'energy', label: '月夜電力' },
  { from: 'nuclear_power', to: 'propellant_plant',   type: 'energy', label: '月夜電力' },

  // ===== 資源利用 / Resource & ISRU chain =====
  { from: 'lupex',        to: 'isru_pilot',        type: 'resource', label: '水氷データ' },
  { from: 'mining_robot', to: 'isru_pilot',         type: 'resource', label: '水氷原料' },
  { from: 'mining_robot', to: 'isru_full',           type: 'resource', label: '水氷原料' },
  { from: 'isru_pilot',   to: 'propellant_plant',   type: 'resource', label: 'LH₂/LOX生成' },
  { from: 'isru_full',    to: 'propellant_plant',   type: 'resource', label: 'LH₂/LOX生成' },
  { from: 'isru_full',    to: 'surface_habitat_l',  type: 'resource', label: '水・酸素供給' },
  { from: 'regolith_3dprint', to: 'construction_robot', type: 'resource', label: '建設連携' },
  { from: 'regolith_3dprint', to: 'surface_habitat_l',  type: 'resource', label: '建設材料' },
  { from: 'construction_robot', to: 'surface_habitat_s', type: 'resource', label: '建設' },
  { from: 'construction_robot', to: 'surface_habitat_m', type: 'resource', label: '建設' },
  { from: 'construction_robot', to: 'surface_habitat_l', type: 'resource', label: '建設' },

  // ===== 生活支援 / Habitat & Social =====
  { from: 'surface_habitat_s', to: 'medical_center',    type: 'habitat', label: '医療' },
  { from: 'surface_habitat_m', to: 'medical_center',    type: 'habitat', label: '医療' },
  { from: 'surface_habitat_l', to: 'medical_center',    type: 'habitat', label: '医療' },
  { from: 'surface_habitat_l', to: 'biolab',            type: 'habitat', label: '食料生産' },
  { from: 'surface_habitat_l', to: 'tourism_hub',       type: 'habitat', label: '観光' },
  { from: 'biolab',            to: 'manufacturing_hub', type: 'habitat', label: '研究連携' },

  // ===== 科学連携 / Science =====
  { from: 'slim',             to: 'lupex',            type: 'science', label: '着陸技術継承' },
  { from: 'pressurized_rover', to: 'seismometer_net', type: 'science', label: '展開・保守' },
  { from: 'pressurized_rover', to: 'sample_return',   type: 'science', label: 'サンプル採取' },
  { from: 'seismometer_net',   to: 'lunar_telescope', type: 'science', label: '科学協調' },
  { from: 'lunar_telescope',   to: 'sample_return',   type: 'science', label: '観測目標設定' },
];
