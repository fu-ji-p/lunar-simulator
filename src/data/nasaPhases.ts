export interface NASAPhase {
  id: number;
  label: string;
  name: string;
  period: string;
  color: string;
  launchCount: number;
  landingCount: number;
  payloadTons: number;
  crewCount: number;
  description: string;
  highlights: string[];
  activeAssetIds: string[];
  newInPhase: string[];
  keyMissions: string[];
}

export const NASA_PHASES: NASAPhase[] = [
  {
    id: 1,
    label: 'Phase 1',
    name: 'Experiment & Learn',
    period: '2026–2029',
    color: '#3B82F6',
    launchCount: 25,
    landingCount: 21,
    payloadTons: 4,
    crewCount: 4,
    description: 'Commercial robotic precursors + first Artemis crewed landings. Bipartisan budget: ~$20B over 7 years.',
    highlights: [
      '21 robotic landings via CLPS 2.0 ($6B, 10-yr contract)',
      'Artemis IV: First crewed Moon landing (2028)',
      'Artemis V: Second crewed landing (late 2028)',
      'VIPER rover: water ice prospecting at south pole',
      'Lunar Terrain Vehicle (LTV) deployment',
      'MoonFall hopper drone system',
      '5-satellite LunaNet constellation',
    ],
    activeAssetIds: ['lunanet_1', 'artemis_lander', 'viper', 'ltv', 'moonfall_drone', 'clps_lander', 'lusee_night'],
    newInPhase: ['lunanet_1', 'artemis_lander', 'viper', 'ltv', 'moonfall_drone', 'clps_lander', 'lusee_night'],
    keyMissions: [
      'Artemis II: Crewed lunar flyby (2026)',
      'Artemis III: Earth-orbit rendezvous & docking test (2027)',
      'Artemis IV: First crewed Moon landing (2028)',
      'Artemis V: Second crewed landing (late 2028)',
      'CLPS 2.0: 30 robotic landings 2027–2030',
      'SR-1 Freedom nuclear spacecraft launch (Dec 2028)',
    ],
  },
  {
    id: 2,
    label: 'Phase 2',
    name: 'Initial Infrastructure',
    period: '2029–2033',
    color: '#8B5CF6',
    launchCount: 27,
    landingCount: 24,
    payloadTons: 60,
    crewCount: 4,
    description: 'Semi-permanent infrastructure. 60 tons delivered. Biannual crew rotations. Nuclear power demonstration.',
    highlights: [
      'JAXA Pressurized Rover (Toyota, 15,000 kg, 2-crew, 10-yr life)',
      'Solar power station: 10kW+ / 360 kWh shadow storage',
      'RTG power station for permanently shadowed regions',
      'Nuclear fission power demo',
      'Initial semi-permanent habitat module',
      'Surface LunaNet "cell towers" for multi-user comms',
    ],
    activeAssetIds: ['lunanet_1', 'lunanet_2', 'artemis_lander', 'viper', 'ltv', 'jaxa_rover', 'solar_station', 'rtg_power', 'initial_habitat', 'surface_comms'],
    newInPhase: ['lunanet_2', 'jaxa_rover', 'solar_station', 'rtg_power', 'initial_habitat', 'surface_comms'],
    keyMissions: [
      'Biannual crew rotations begin',
      'JAXA Pressurized Rover delivered',
      'LR-1 fission reactor land (2030)',
      'Nuclear power demo on surface',
      'CLPS Phase 2 capacity: up to 8 MT/landing',
    ],
  },
  {
    id: 3,
    label: 'Phase 3',
    name: 'Sustained Human Presence',
    period: '2033–2036+',
    color: '#10B981',
    launchCount: 29,
    landingCount: 28,
    payloadTons: 150,
    crewCount: 8,
    description: 'Permanent human presence. 150 tons delivered. Fission power, full ISRU, international modules.',
    highlights: [
      'Fission Surface Power LR-1 (nuclear reactor, landed 2030)',
      'Full ISRU: O₂, H₂O, H₂ extraction from regolith & PSRs',
      'Permanent habitat: 100m³+ living space, nuclear-powered',
      'ASI Multipurpose Habitat — Italy (ESA partner)',
      'Lunar Utility Vehicle — Canada (CSA)',
      'Annual supply up to 38 tons, 500 kg return capability',
    ],
    activeAssetIds: ['lunanet_1', 'lunanet_2', 'artemis_lander', 'ltv', 'jaxa_rover', 'fission_power', 'isru_plant', 'permanent_habitat', 'surface_comms', 'asi_habitat', 'lunar_utility_vehicle', 'science_lab'],
    newInPhase: ['fission_power', 'isru_plant', 'permanent_habitat', 'asi_habitat', 'lunar_utility_vehicle', 'science_lab'],
    keyMissions: [
      'LR-1 fission reactor fully operational',
      'ASI multipurpose habitat module delivered',
      'CSA Lunar Utility Vehicle deployed',
      'Full ISRU water ice extraction operational',
      '500 kg cargo return from lunar surface',
    ],
  },
];
