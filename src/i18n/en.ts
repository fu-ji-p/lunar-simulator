/**
 * English translations for LUNAR SOCIETY SIMULATOR
 */

export const EN = {
  // ── Header ────────────────────────────────────────────────────────────────
  headerSubtitle: 'JAXA International Space Exploration Scenario 2025',

  // ── Navigation ─────────────────────────────────────────────────────────────
  navBase: 'Lunar Base',
  navIndustry: 'Industry Vision',
  navHealth: 'Crew Health',
  navMars: '🔴 Mars Prospect',

  // ── Phase timeline ─────────────────────────────────────────────────────────
  allPhases: 'All Phases',
  allPhasesDesc: 'Show all-phase industry & economic roadmap',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statCrew: 'Crew',
  statPower: 'Power',
  statWater: 'Water',
  statOxygen: 'Oxygen',
  statPropellant: 'Propellant',
  statScience: 'Science',
  statIndustry: 'Industry',
  unitPerson: '',   // e.g. "4" (no unit suffix)
  unitKw: 'kW',
  unitKgDay: 'kg/d',
  unitTYear: 't/yr',
  unitPoints: 'pts',
  unitTypes: 'types',

  // ── Phase overview panel ───────────────────────────────────────────────────
  statCrewLabel: 'Resident Crew',
  statPowerLabel: 'Power Supply',
  statWaterLabel: 'Water Prod.',
  statOxygenLabel: 'Oxygen Prod.',
  statPropellantLabel: 'Propellant',
  statScienceLabel: 'Science Instr.',
  statIndustryLabel: 'Industry Types',
  milestonesLabel: 'Milestones',
  hintClickInfra: '← Click infrastructure on the map to view details',

  // ── Element detail panel ───────────────────────────────────────────────────
  backToPhase: '← Back to Phase Overview',
  sectionPartners: 'International Partners',
  sectionPurpose: 'Purpose & Role',
  sectionTechnology: 'Key Technology',
  sectionJapanRole: "Japan's Role",
  sectionSpecs: 'Specs',
  sectionRef: 'Reference',
  refPrefix: 'Ref: ',
  jaxa_exploration_theme: 'JAXA Exploration Theme',
  official_page: 'Official Page →',
  exploration_scenario_label: 'Exploration Scenario',
  scenario_source: 'JAXA International Space Exploration Scenario 2025',

  // ── LunarBaseView ──────────────────────────────────────────────────────────
  showResourceMap: 'Resource Map',
  hideResourceMap: 'Hide Resource Map',
  showCorrelations: 'Correlations',
  hideCorrelations: 'Hide Correlations',
  explorationScenario: 'Exploration Scenario',
  spaceFund: 'Space Strategy Fund',
  hiddenSuffix: '(off)',

  // ── IndustryView ───────────────────────────────────────────────────────────
  industryTitle: 'Industry Vision Overview',
  industrySubtitle: 'Lunar economic roadmap based on JAXA Scenario Section 3.5',
  sourceLabel: 'Source',
  itemsShown: (n: number) => `${n} shown`,
  zoneEarth: 'Earth',
  zoneEarthDesc: 'Terrestrial applications of space technology',
  zoneSpace: 'Earth–Moon Orbit',
  zoneSpaceDesc: 'Space and lunar orbit businesses',
  zoneLunar: 'Lunar Surface',
  zoneLunarDesc: 'Industrial activities on the lunar surface',
  sourceScenario: 'Exploration Scenario',
  sourceFund: 'Space Strategy Fund',
  revenuePrefix: 'Revenue: ',
  policyPrefix: 'Policy: ',
  detailsLink: 'Details →',
  footerNote: 'Source: JAXA "Japan\'s International Space Exploration Scenario 2025" (EZA-2025001) Sec. 3.5 / JAXA Space Strategy Fund',

  // ── MarsView ───────────────────────────────────────────────────────────────
  marsHeroTitle: 'Mars Prospect — Moon as Mars Testbed',
  marsHeroBody: 'The JAXA scenario positions lunar development not only as an end goal, but as a technology bridge to future crewed Mars exploration. Every technology demonstrated on the Moon connects to the final frontier of space exploration.',
  marsHeroSource: 'Source: International Space Exploration Scenario 2025 (EZA-2025001)',
  roadmapTitle: 'Lunar–Mars Roadmap',
  techBridgeTitle: 'Technology Transfer Map (Lunar Demo → Mars Application)',
  lunarDemoLabel: 'Lunar Demonstration',
  marsApplicationLabel: 'Mars Application',
  techTransferLabel: 'Tech Transfer',
  marsComparisonTitle: 'Moon vs. Mars Mission Comparison',
  compColItem: 'Item',
  compColMoon: '🌕 Lunar (Phase 4)',
  compColMars: '🔴 Mars Mission',
  marsFooter: 'Source: JAXA "Japan\'s International Space Exploration Scenario 2025" (EZA-2025001)',

  // ── Mission timeline banner steps ──────────────────────────────────────────
  timelineSteps: [
    { label: 'P1–P2', sub: '2025–2033', desc: 'Lunar tech demonstration' },
    { label: 'P3–P4', sub: '2034–2040', desc: 'Maturation & long-duration ops' },
    { label: 'Mars Prep', sub: 'Early 2040s', desc: 'Mission design & build' },
    { label: 'Mars Crewed', sub: 'Late 2040s', desc: 'First crewed Mars landing' },
  ] as { label: string; sub: string; desc: string }[],

  // ── Badge categories ───────────────────────────────────────────────────────
  categories: {
    transport: 'Transport',
    habitat: 'Habitat',
    energy: 'Energy',
    isru: 'ISRU',
    science: 'Science',
    exploration: 'Exploration',
    industry: 'Industry',
    communication: 'Comms',
  } as Record<string, string>,

  // ── Phase data ─────────────────────────────────────────────────────────────
  phases: {
    phase1: {
      label: 'Phase 1',
      period: '2020s',
      subtitle: 'Early Exploration: Robot Reconnaissance',
      milestones: [
        'SLIM successful lunar landing (Japan first)',
        'Artemis II: Crewed lunar flyby',
        'LUPEX: Polar water-ice exploration begins',
        'Gateway: First module launched',
        'Artemis III: Crewed lunar landing',
        'Gateway: Japan provides ECLSS technology',
      ],
    },
    phase2: {
      label: 'Phase 2',
      period: 'Early 2030s',
      subtitle: 'Base Building: Start of Crewed Lunar Activity',
      milestones: [
        'Gateway: Completed (HALO + habitation module)',
        'Human Landing System: Initial operations',
        'Surface habitat unit #1: Installed',
        'Pressurized rover: Lunar surface exploration begins',
        'ISRU demo plant: Electrolysis testing begins',
        'Seismometer network: 4 stations installed',
      ],
    },
    phase3: {
      label: 'Phase 3',
      period: 'Late 2030s–Early 2040s',
      subtitle: 'Normalization: Full Lunar Infrastructure',
      milestones: [
        'Lunar observatory: Construction begins (radio interferometer)',
        'Full-scale ISRU: Propellant production starts (LH₂/LOX)',
        'Habitat expansion: 10-person capacity',
        'Construction robots: Regolith-based structures built',
        'Small nuclear power: Night-crossing supply begins',
        'Sample return: Crewed collection & Earth return',
      ],
    },
    phase4: {
      label: 'Phase 4',
      period: '2040s',
      subtitle: 'Socialization: A Lunar Community of 40',
      milestones: [
        'Large-scale habitat expansion: 40-person capacity',
        'Regolith 3D-print: Habitats built from local materials',
        'Bio-lab: Space agriculture & medical research active',
        'Manufacturing hub: High-value space manufacturing begins',
        'Lunar tourism: Private crew reception begins',
        'Comms network: Autonomous distributed LunarNetworks complete',
      ],
    },
  } as Record<string, { label: string; period: string; subtitle: string; milestones: string[] }>,

  // ── Infrastructure descriptions ─────────────────────────────────────────────
  infra: {
    gateway_core:          { description: 'Near-lunar crewed station connecting Earth and the Moon as an intermediate hub.' },
    gateway_full:          { description: 'Completed Gateway serving as the permanent hub for all lunar surface operations.' },
    lunar_lander:          { description: 'Crewed vehicle for round trips between the Gateway and the lunar surface.' },
    relay_satellite:       { description: 'Relay satellite for communications between the lunar poles, far side, and Earth.' },
    relay_satellite_full:  { description: 'Full lunar comm & positioning network covering all lunar regions.' },
    surface_habitat_s:     { description: 'Initial pressurized habitat near the south pole for 4-person short-term stays.' },
    surface_habitat_m:     { description: 'Multi-module base for 10-person long-duration operations.' },
    surface_habitat_l:     { description: 'Full lunar community for 40 permanent residents combining living, research, and industry.' },
    medical_center:        { description: 'Lunar medical facility for emergency care, long-term treatment, and radiation monitoring.' },
    solar_power_s:         { description: 'Initial power supply for the lunar base (no generation during 14-day lunar nights).' },
    solar_power_m:         { description: 'Large-scale solar array on a ridge with near-continuous generation.' },
    solar_power_l:         { description: '500 kW hybrid power system combining solar and nuclear.' },
    nuclear_power:         { description: 'Small nuclear fission reactor providing stable power through lunar nights.' },
    isru_pilot:            { description: 'Pilot plant demonstrating water electrolysis and O₂/H₂ production from lunar ice.' },
    isru_full:             { description: 'Full-scale ISRU plant producing 10 t/yr of liquid H₂/O₂ propellant.' },
    propellant_plant:      { description: 'Large-scale propellant production and storage facility for HLS refueling.' },
    seismometer_net:       { description: 'Seismometer network mapping the lunar interior and monitoring regolith stability.' },
    lunar_telescope:       { description: 'Radio telescope array exploiting the low-noise far-side lunar environment.' },
    sample_return:         { description: 'Facility for sample collection, curation, and crewed return to Earth.' },
    construction_robot:    { description: 'Robot system autonomously constructing habitats and pads from regolith.' },
    mining_robot:          { description: 'Automated mining robot for extracting water ice and lunar regolith.' },
    biolab:                { description: 'Biotechnology lab for space agriculture, protein production, and physiology research.' },
    manufacturing_hub:     { description: 'Precision manufacturing leveraging lunar vacuum and low-gravity.' },
    tourism_hub:           { description: 'Visitor center with EVA tours, Earthrise viewing, and low-g sports.' },
    regolith_3dprint:      { description: '3D printing facility producing building components from local regolith.' },
    lunar_comms_net:       { description: 'Distributed autonomous communication network for the entire lunar community.' },
    pressurized_rover:     { description: 'Pressurized rover enabling multi-day crewed exploration up to 100 km from base.' },
    slim:                  { description: "Japan's first lunar lander demonstrating pinpoint landing technology." },
    lupex:                 { description: 'JAXA–ISRO joint lunar polar explorer for water-ice distribution mapping.' },
    fund_thz_satellite:    { description: 'Micro-satellite in lunar orbit with passive THz sensor for wide-area south-pole water-ice mapping.' },
    fund_precision_lander: { description: 'Commercial precision lander with SLIM-class accuracy for polar regions and ISRU site delivery.' },
    fund_regen_fc:         { description: 'Regenerative fuel cell providing large-capacity energy storage through 14-day lunar nights.' },
    fund_lnss_ground:      { description: 'LNSS ground station supporting real-time positioning across the lunar surface.' },
    fund_comm_ground:      { description: 'High-capacity Earth–Moon relay supporting 4K/8K video and optical communications.' },
    fund_am241_power:      { description: 'Am-241 thermoelectric RTG providing maintenance-free long-duration power in extreme lunar temperatures.' },
    fund_infra_demo:       { description: 'Infrastructure demo facility for pressurized rovers, construction robots, and advanced materials.' },
  } as Record<string, { description: string }>,

  // ── Industry data ──────────────────────────────────────────────────────────
  industries: {
    launch:               { name: 'Space Transportation Services', location: 'Earth–Moon', description: 'Commercial service industry transporting crew and cargo to the lunar surface', revenueModel: 'Launch & transport fees', examples: ['Commercial landers', 'Logistics', 'Refueling'] },
    satcom:               { name: 'Lunar Comms & Navigation', location: 'Lunar orbit', description: 'Communication and positioning services for lunar operators and robots', revenueModel: 'Service fees', examples: ['Data comms', 'Navigation', 'Remote ops support'] },
    remote_sensing:       { name: 'Lunar Remote Sensing', location: 'Lunar orbit', description: 'Detailed lunar mapping and resource distribution data sales', revenueModel: 'Data sales', examples: ['Mineral maps', 'Terrain data', 'Env. monitoring'] },
    mining:               { name: 'Lunar Resource Mining', location: 'Lunar surface', description: 'Extraction of water ice, regolith, and rare metals', revenueModel: 'Resource sales', examples: ['Ice→propellant', 'Helium-3', 'Ti & Al'] },
    isru_biz:             { name: 'ISRU Services', location: 'Lunar surface', description: 'Propellant, oxygen, and water supply services to other operators', revenueModel: 'Supply contracts', examples: ['Propellant sales', 'Drinking water', 'Industrial O₂'] },
    construction:         { name: 'Lunar Construction', location: 'Lunar surface', description: 'Lunar infrastructure construction and maintenance services', revenueModel: 'Contract work', examples: ['Base construction', 'Landing pad prep', 'Infra maintenance'] },
    manufacturing:        { name: 'Space Manufacturing', location: 'Lunar surface', description: 'Specialized manufacturing leveraging vacuum and low-gravity', revenueModel: 'Product sales', examples: ['Optical components', 'Semiconductors', 'Space structures'] },
    agriculture:          { name: 'Space Agriculture', location: 'Lunar surface (pressurized)', description: 'Food and biomass production in closed ecosystems', revenueModel: 'Food supply', examples: ['Vegetable cultivation', 'Protein production', 'Food security'] },
    medical:              { name: 'Space Medicine & Pharma', location: 'Lunar surface (pressurized)', description: 'Pharmaceutical research using low-g and radiation environment', revenueModel: 'Contract research & patents', examples: ['Protein crystallization', 'Radiation medicine', 'Space physiology'] },
    tourism:              { name: 'Lunar Tourism', location: 'Lunar surface (pressurized)', description: 'Lunar surface experiences, Earthrise viewing, low-g sports', revenueModel: 'Tour fees', examples: ['EVA tours', 'Earthrise viewing', 'Low-g sports'] },
    education:            { name: 'Education & Research Platform', location: 'Lunar surface (pressurized)', description: 'STEM education and science experiments broadcast from the Moon', revenueModel: 'Subscription', examples: ['Live classes', 'Experiment contracts', 'Virtual tours'] },
    spinoff:              { name: 'Spinoff Industries', location: 'Earth', description: 'Terrestrial applications of technologies born from space development', revenueModel: 'Products & licenses', examples: ['Environmental control', 'Robotics', 'New materials'] },
    data_economy:         { name: 'Lunar Data Economy', location: 'Earth / Space', description: 'Monetization of scientific and industrial data from the Moon', revenueModel: 'Data sales', examples: ['Science data', 'Resource info', 'Tech know-how'] },
    fund_water_sensing:   { name: 'Lunar Water Resource Sensing', location: 'Lunar orbit', description: 'Passive remote sensing from lunar orbit via terahertz waves for high-accuracy south-pole water-ice mapping.', revenueModel: 'Gov. contracts & data supply', examples: ['THz wave sensor', 'Micro-satellite', 'Water-ice mapping'] },
    fund_moonearth_comm:  { name: 'Moon–Earth Communications System', location: 'Lunar orbit–Earth', description: 'High-capacity comms including 4K/8K real-time video, lunar 5G, optical comms, and DTN protocol.', revenueModel: 'Gov. contracts & comms services', examples: ['Optical ground station', 'Lunar 5G', 'DTN protocol'] },
    fund_lunar_positioning: { name: 'Lunar Navigation System (LNSS)', location: 'Lunar orbit', description: 'Real-time self-positioning via multiple lunar positioning satellites, integrating with US/EU LunaNet.', revenueModel: 'Gov. contracts & commercial use', examples: ['GNSS-derived tech', 'Positioning signals', 'High-accuracy orbit det.'] },
    fund_precision_landing: { name: 'Lunar Polar Precision Landing', location: 'Moon / Lunar orbit', description: 'Landing capability anywhere on the Moon including polar regions with SLIM-class accuracy (<100 m).', revenueModel: 'Gov. contracts & payload delivery', examples: ['Precision guidance/nav', 'Terrain-adaptive landing', 'Polar-capable lander'] },
    fund_regen_fuel_cell: { name: 'Regenerative Fuel Cell System', location: 'Lunar surface', description: 'Large-capacity energy storage for ~14-day solar-zero lunar nights; develops pure-O₂ and low-g electrolysis.', revenueModel: 'Gov. contracts & power supply', examples: ['Regen. fuel cell', 'Pure O₂ electrolysis', 'Large-capacity storage'] },
    fund_semiperm_power:  { name: 'Semi-permanent Power (Am-241 RTG)', location: 'Lunar surface', description: 'Long-life thermoelectric power using americium-241; withstands extreme lunar temperature swings (−170 to +110 °C).', revenueModel: 'Gov. contracts & power system sales', examples: ['Am-241 thermoelectric', 'Semiconductor thermocouple', 'Long-life autonomous power'] },
    fund_lunar_infra:     { name: 'Lunar Infrastructure Components', location: 'Lunar surface', description: 'Cross-sector R&D for pressurized rovers and Japanese astronaut lunar landing; promotes non-space sector entry.', revenueModel: 'Gov. contracts & commercial deployment', examples: ['Pressurized rover', 'Construction robots', 'Infra material tech'] },
  } as Record<string, { name: string; location: string; description: string; revenueModel: string; examples: string[] }>,

  // ── Tech bridges ───────────────────────────────────────────────────────────
  techBridges: {
    isru: {
      title: 'ISRU Propellant Production',
      lunar: { label: 'Moon: Water ice → H₂/O₂', description: 'Electrolyze water ice from polar permanently shadowed regions to produce hydrogen and oxygen as rocket propellant.', milestone: 'ISRU demo plant achieves 10 t/yr propellant production (Phase 3)' },
      mars:  { label: 'Mars: CO₂ + H₂O → CH₄/O₂', description: 'Produce methane propellant via Sabatier reaction from Martian atmosphere (95% CO₂) and subsurface ice — eliminating propellant transport from Earth.', challenge: 'Scaling chemical processes under Martian low pressure and temperature' },
      bridge: 'Demonstrating autonomous in-situ propellant production on the Moon directly informs the design of Mars ISRU systems.',
    },
    health: {
      title: 'Long-Duration Health Management',
      lunar: { label: 'Moon: Stays up to 1 year', description: 'Establish medical protocols for bone loss, muscle atrophy, and radiation exposure in 1/6-g. Progressively extend stays from 90 days to 1 year.', milestone: '10-crew safe 1-year operation demonstrated (Phase 3→4)' },
      mars:  { label: 'Mars: ~2.5-year round trip', description: '7-month transit + 18-month surface stay. Long-term response to microgravity and intense radiation is essential.', challenge: 'Fully autonomous medical capability — no emergency return possible' },
      bridge: 'Lunar long-duration stay data provides the medical evidence base for Mars mission health standards and treatment protocols.',
    },
    bioregenerative: {
      title: 'Closed Ecological Life Support',
      lunar: { label: 'Moon: Bioregenerative system', description: 'Closed-loop ecosystem recycling CO₂, water, and waste — integrating plant cultivation, protein production, and air purification.', milestone: 'Improved food production and water recycling self-sufficiency demonstrated in habitat' },
      mars:  { label: 'Mars: Full food self-sufficiency', description: 'No resupply possible (2-year minimum wait) — all calories must be produced locally.', challenge: 'Optimizing plant growth under Mars gravity (0.38 g) and high-CO₂ environment' },
      bridge: 'The closed-loop agricultural system demonstrated on the Moon scales directly to Mars food self-sufficiency.',
    },
    nuclear_power: {
      title: 'Fission Power System',
      lunar: { label: 'Moon: Surviving 14-day lunar nights', description: 'Provide stable 40 kW+ power during 14-day lunar nights when solar is unavailable. Demonstrate power independence with a compact fission reactor.', milestone: 'Night-crossing power enables 24 h ISRU & life support (Phase 3→4)' },
      mars:  { label: 'Mars: Power through dust storms', description: 'Martian dust storms (up to several months) greatly reduce solar generation. A fission reactor is the only reliable power source.', challenge: 'Starting and maintaining the reactor in Martian cryogenic conditions (min −125 °C)' },
      bridge: 'Design and operations knowledge from the lunar fission reactor becomes the reference design for Mars power systems.',
    },
    autonomous_robot: {
      title: 'Autonomous Construction Robots',
      lunar: { label: 'Moon: Regolith 3D-print construction', description: 'Construction robots autonomously build radiation-shielding walls and structures from lunar regolith. Base preparation completed before crew arrival.', milestone: 'Local-materials construction by robots demonstrated (Phase 3→4)' },
      mars:  { label: 'Mars: Pre-arrival autonomous build', description: 'For years before the crewed mission, robots autonomously complete habitat modules and landing pads on the Martian surface.', challenge: 'Fully autonomous decision-making with 20-minute one-way comm delay' },
      bridge: "Autonomous construction on the Moon (with Earth support) is the design foundation for fully autonomous Mars construction (10–20 min delay).",
    },
    psychology: {
      title: 'Psychological & Social Adaptation',
      lunar: { label: 'Moon: 2.5-sec delay isolation', description: 'Establish protocols for a 2.5-second comm delay, long-duration isolation, and small closed-community psychology.', milestone: '40-person community sustained long-term: social adaptation demonstrated' },
      mars:  { label: 'Mars: Up to 48-min delay / full isolation', description: '4–24 min one-way delay (avg 12 min). A truly autonomous community that cannot rely on real-time Earth support.', challenge: 'Cultural separation from Earth and formation of an independent community order' },
      bridge: "Lessons from the lunar community directly inform Mars crew selection, team composition, and psychological support protocols.",
    },
  } as Record<string, { title: string; lunar: { label: string; description: string; milestone: string }; mars: { label: string; description: string; challenge: string }; bridge: string }>,

  // ── Mission comparisons ─────────────────────────────────────────────────────
  missionComparisons: [
    { label: 'Max Stay Duration',      moon: '1+ year (Phase 4)',               mars: '~18 months (surface)' },
    { label: 'Round-trip Comm Delay',  moon: '~2.5 seconds',                    mars: '8–48 min (avg 24 min)' },
    { label: 'Emergency Return',       moon: '~4 days (via Gateway)',           mars: 'Min 6 months (orbit-dependent)' },
    { label: 'Gravity',                moon: '1/6 g  (1.62 m/s²)',              mars: '3/8 g  (3.72 m/s²)' },
    { label: 'Radiation (annual)',      moon: '~300–600 mSv',                    mars: '~200–300 mSv (atm. shielding)' },
    { label: 'Food Self-sufficiency',  moon: 'Resupply possible (<2 wk)',       mars: 'Full self-sufficiency required' },
  ] as { label: string; moon: string; mars: string }[],
} as const;
