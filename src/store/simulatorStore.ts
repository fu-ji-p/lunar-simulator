import { create } from 'zustand';
import type { PhaseId } from '../data/phases';

interface SimulatorStore {
  currentPhase: PhaseId;
  selectedInfraId: string | null;
  activeView: 'base' | 'industry' | 'health' | 'mars';
  isAnimating: boolean;
  showCorrelations: boolean;
  showResourceOverlay: boolean;
  /** 産業ビジョンのフェーズフィルター: null = 全フェーズ, 1〜4 = そのフェーズまで */
  industryFilter: number | null;
  /** 情報源フィルター */
  showScenario: boolean;
  showFund: boolean;

  setPhase: (phase: PhaseId) => void;
  selectInfra: (id: string | null) => void;
  setView: (view: 'base' | 'industry' | 'health' | 'mars') => void;
  setAnimating: (val: boolean) => void;
  toggleCorrelations: () => void;
  toggleResourceOverlay: () => void;
  setIndustryFilter: (filter: number | null) => void;
  toggleShowScenario: () => void;
  toggleShowFund: () => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  currentPhase: 'phase1',
  selectedInfraId: null,
  activeView: 'base',
  isAnimating: false,
  showCorrelations: false,
  showResourceOverlay: false,
  industryFilter: null,
  showScenario: true,
  showFund: true,

  setPhase: (phase) => set({ currentPhase: phase, selectedInfraId: null, isAnimating: true }),
  selectInfra: (id) => set({ selectedInfraId: id }),
  setView: (view) => set({ activeView: view, selectedInfraId: null }),
  setAnimating: (val) => set({ isAnimating: val }),
  toggleCorrelations: () => set((s) => ({ showCorrelations: !s.showCorrelations })),
  toggleResourceOverlay: () => set((s) => ({ showResourceOverlay: !s.showResourceOverlay })),
  setIndustryFilter: (filter) => set({ industryFilter: filter }),
  toggleShowScenario: () => set((s) => ({ showScenario: !s.showScenario })),
  toggleShowFund: () => set((s) => ({ showFund: !s.showFund })),
}));
