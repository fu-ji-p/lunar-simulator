import { create } from 'zustand';
import type { PhaseId } from '../data/phases';

interface SimulatorStore {
  currentPhase: PhaseId;
  selectedInfraId: string | null;
  activeView: 'base' | 'industry' | 'health';
  isAnimating: boolean;
  showCorrelations: boolean;
  showResourceOverlay: boolean;
  /** 産業ビジョンのフェーズフィルター: null = 全フェーズ, 1〜4 = そのフェーズまで */
  industryFilter: number | null;

  setPhase: (phase: PhaseId) => void;
  selectInfra: (id: string | null) => void;
  setView: (view: 'base' | 'industry' | 'health') => void;
  setAnimating: (val: boolean) => void;
  toggleCorrelations: () => void;
  toggleResourceOverlay: () => void;
  setIndustryFilter: (filter: number | null) => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  currentPhase: 'phase1',
  selectedInfraId: null,
  activeView: 'base',
  isAnimating: false,
  showCorrelations: false,
  showResourceOverlay: false,
  industryFilter: null,

  setPhase: (phase) => set({ currentPhase: phase, selectedInfraId: null, isAnimating: true }),
  selectInfra: (id) => set({ selectedInfraId: id }),
  setView: (view) => set({ activeView: view, selectedInfraId: null }),
  setAnimating: (val) => set({ isAnimating: val }),
  toggleCorrelations: () => set((s) => ({ showCorrelations: !s.showCorrelations })),
  toggleResourceOverlay: () => set((s) => ({ showResourceOverlay: !s.showResourceOverlay })),
  setIndustryFilter: (filter) => set({ industryFilter: filter }),
}));
