import { create } from 'zustand';
import type { PhaseId } from '../data/phases';

interface SimulatorStore {
  currentPhase: PhaseId;
  selectedInfraId: string | null;
  activeView: 'base' | 'industry';
  isAnimating: boolean;
  showCorrelations: boolean;
  showResourceOverlay: boolean;

  setPhase: (phase: PhaseId) => void;
  selectInfra: (id: string | null) => void;
  setView: (view: 'base' | 'industry') => void;
  setAnimating: (val: boolean) => void;
  toggleCorrelations: () => void;
  toggleResourceOverlay: () => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  currentPhase: 'phase1',
  selectedInfraId: null,
  activeView: 'base',
  isAnimating: false,
  showCorrelations: false,
  showResourceOverlay: false,

  setPhase: (phase) => set({ currentPhase: phase, selectedInfraId: null, isAnimating: true }),
  selectInfra: (id) => set({ selectedInfraId: id }),
  setView: (view) => set({ activeView: view, selectedInfraId: null }),
  setAnimating: (val) => set({ isAnimating: val }),
  toggleCorrelations: () => set((s) => ({ showCorrelations: !s.showCorrelations })),
  toggleResourceOverlay: () => set((s) => ({ showResourceOverlay: !s.showResourceOverlay })),
}));
