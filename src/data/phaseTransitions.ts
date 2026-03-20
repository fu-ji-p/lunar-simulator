import type { PhaseId } from './phases';

export type ConditionCategory = 'mission' | 'infrastructure' | 'science' | 'operations';

export interface TransitionCondition {
  category: ConditionCategory;
  label: string;
  detail: string;
  infraRef?: string; // Related infrastructure element ID
}

export interface PhaseTransition {
  fromPhase: PhaseId;
  toPhase: PhaseId;
  nextLabel: string; // e.g., "フェーズ2"
  conditions: TransitionCondition[];
}

// Category metadata
export const CONDITION_CATEGORY_META: Record<ConditionCategory, { icon: string; color: string; label: string }> = {
  mission:        { icon: '🚀', color: '#3B82F6', label: 'ミッション' },
  infrastructure: { icon: '🏗️', color: '#F59E0B', label: 'インフラ' },
  science:        { icon: '🔬', color: '#A855F7', label: '科学' },
  operations:     { icon: '⚙️', color: '#10B981', label: '運用実証' },
};

/**
 * Go/No-Go criteria for advancing between each phase.
 * Based on 国際宇宙探査シナリオ案2025, sections 5–11.
 */
export const PHASE_TRANSITIONS: PhaseTransition[] = [
  // ── Phase 1 → Phase 2 ──────────────────────────────────────────────────────
  {
    fromPhase: 'phase1',
    toPhase:   'phase2',
    nextLabel: 'フェーズ2',
    conditions: [
      {
        category: 'science',
        label: 'LUPEX：月極域の水氷存在確認',
        detail: 'LUPEXローバーによる南極永久影領域（PSR）での水氷・揮発性物質の分布・量の確定。ISRU候補地点の優先度付けを完了。',
        infraRef: 'lupex',
      },
      {
        category: 'mission',
        label: 'Artemis III：有人月面着陸成功',
        detail: '米国主導Artemis IIIによる初の有人月面着陸実証。月南極域への精密着陸技術の確立と安全性評価を完了。',
      },
      {
        category: 'infrastructure',
        label: 'Gateway：コアモジュール軌道投入',
        detail: 'GatewayのHALO居住モジュール・PPEモジュールをNRHO軌道へ投入完了。月面活動の中継拠点として運用可能な状態。',
        infraRef: 'gateway_core',
      },
      {
        category: 'science',
        label: '月面着陸地点の最終確定（南極域）',
        detail: 'SLIM・LUPEX・Artemisデータを統合し、永続的な拠点建設に適した南極域着陸サイトを科学的・工学的に確定。',
        infraRef: 'slim',
      },
    ],
  },

  // ── Phase 2 → Phase 3 ──────────────────────────────────────────────────────
  {
    fromPhase: 'phase2',
    toPhase:   'phase3',
    nextLabel: 'フェーズ3',
    conditions: [
      {
        category: 'science',
        label: 'ISRU実証：水電解による推薬生成確認',
        detail: 'ISRUパイロットプラントで月面の水氷から水素・酸素を電気分解し、推薬として利用できる量・純度での生成を実証。',
        infraRef: 'isru_pilot',
      },
      {
        category: 'operations',
        label: '月面居住ユニット：90日長期滞在実証',
        detail: '月面環境での連続90日滞在運用を完了し、生命維持・放射線防護・心理支援の設計要件を検証。有人常駐の安全性を確立。',
        infraRef: 'surface_habitat_s',
      },
      {
        category: 'operations',
        label: '与圧ローバー：広域探査実証（累計500km）',
        detail: '有人与圧ローバーによる累計500km以上の月面移動を完了し、地形対応性・故障対応手順・EVA連携プロトコルを確立。',
        infraRef: 'pressurized_rover',
      },
      {
        category: 'infrastructure',
        label: '月面電力供給：40kW安定供給を確認',
        detail: '太陽電池アレイと蓄電システムの組み合わせにより、月の昼夜周期を通じて40kW以上の安定電力供給を実証。',
        infraRef: 'solar_power_s',
      },
    ],
  },

  // ── Phase 3 → Phase 4 ──────────────────────────────────────────────────────
  {
    fromPhase: 'phase3',
    toPhase:   'phase4',
    nextLabel: 'フェーズ4',
    conditions: [
      {
        category: 'infrastructure',
        label: 'ISRU本格稼働：推薬年産10t以上を達成',
        detail: 'ISRU本格プラントと推薬生成設備が連携し、年間10トン以上のLH₂/LOX推薬を量産。月面活動・帰還ミッションの現地調達を実現。',
        infraRef: 'propellant_plant',
      },
      {
        category: 'infrastructure',
        label: '小型核分裂炉：月夜14日間連続電力供給',
        detail: '小型核分裂炉が月夜（約14日間）全期間にわたり安定した電力を供給。太陽電池に依存しない電力自立を実証。',
        infraRef: 'nuclear_power',
      },
      {
        category: 'science',
        label: '建設ロボット：レゴリス活用型構造物を実証',
        detail: '建設ロボットとレゴリス3Dプリント技術を組み合わせ、月面現地資材のみで放射線遮蔽構造物・基礎構造物を建設実証。',
        infraRef: 'construction_robot',
      },
      {
        category: 'operations',
        label: '10名常駐：1年間の安全運用実績',
        detail: '月面基地で10名のクルーを1年間継続して安全に運用。緊急帰還手順・医療対応・メンタルヘルスケアの実効性を確認。',
        infraRef: 'surface_habitat_m',
      },
    ],
  },
];
