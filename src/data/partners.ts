export type PartnerKey = 'JAXA' | 'NASA' | 'ESA' | 'ISRO' | 'CSA' | 'Private';

export interface Partner {
  key: PartnerKey;
  label: string;
  flag: string;
  color: string;
}

export const PARTNERS: Record<PartnerKey, Partner> = {
  JAXA:    { key: 'JAXA',    label: 'JAXA（日本）',    flag: '🇯🇵', color: '#60A5FA' },
  NASA:    { key: 'NASA',    label: 'NASA（米国）',    flag: '🇺🇸', color: '#F87171' },
  ESA:     { key: 'ESA',     label: 'ESA（欧州）',     flag: '🇪🇺', color: '#A78BFA' },
  ISRO:    { key: 'ISRO',    label: 'ISRO（インド）',  flag: '🇮🇳', color: '#FB923C' },
  CSA:     { key: 'CSA',     label: 'CSA（カナダ）',   flag: '🇨🇦', color: '#F472B6' },
  Private: { key: 'Private', label: '民間企業',         flag: '🏢',  color: '#9CA3AF' },
};

// Which agencies are involved with each infrastructure element
// Based on 国際宇宙探査シナリオ案2025
export const INFRA_PARTNERS: Record<string, PartnerKey[]> = {
  // === Orbital / Gateway ===
  gateway_core:        ['NASA', 'JAXA', 'ESA', 'CSA'],
  gateway_full:        ['NASA', 'JAXA', 'ESA', 'CSA'],
  relay_satellite:     ['JAXA'],
  relay_satellite_full:['JAXA', 'NASA'],
  lunar_lander:        ['NASA'],

  // === Habitat ===
  surface_habitat_s:   ['NASA', 'JAXA'],
  surface_habitat_m:   ['NASA', 'JAXA', 'ESA'],
  surface_habitat_l:   ['NASA', 'JAXA', 'ESA', 'CSA'],
  medical_center:      ['JAXA'],

  // === Energy ===
  solar_power_s:       ['NASA', 'JAXA'],
  solar_power_m:       ['JAXA'],
  solar_power_l:       ['NASA', 'JAXA'],
  nuclear_power:       ['NASA', 'JAXA'],

  // === ISRU / Resource ===
  lupex:               ['JAXA', 'ISRO'],
  isru_pilot:          ['JAXA', 'NASA'],
  isru_full:           ['JAXA', 'NASA', 'ESA'],
  propellant_plant:    ['JAXA'],
  mining_robot:        ['JAXA', 'NASA'],
  regolith_3dprint:    ['JAXA', 'ESA'],

  // === Science ===
  slim:                ['JAXA'],
  seismometer_net:     ['JAXA'],
  lunar_telescope:     ['JAXA', 'NASA'],
  sample_return:       ['JAXA', 'NASA'],

  // === Exploration ===
  pressurized_rover:   ['JAXA', 'Private'],
  construction_robot:  ['JAXA'],

  // === Industry / Social ===
  biolab:              ['JAXA'],
  manufacturing_hub:   ['JAXA', 'Private'],
  tourism_hub:         ['Private'],

  // === Communication ===
  lunar_comms_net:     ['JAXA', 'NASA', 'ESA'],
};
