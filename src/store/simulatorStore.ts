import { create } from 'zustand';
import type { PhaseId } from '../data/phases';

interface SimulatorStore {
  currentPhase: PhaseId;
  selectedInfraId: string | null;
  activeView: 'base' | 'industry';
  isAnimating: boolean;

  setPhase: (phase: PhaseId) => void;
  selectInfra: (id: string | null) => void;
  setView: (view: 'base' | 'industry') => void;
  setAnimating: (val: boolean) => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  currentPhase: 'phase1',
  selectedInfraId: null,
  activeView: 'base',
  isAnimating: false,

  setPhase: (phase) => set({ currentPhase: phase, selectedInfraId: null, isAnimating: true }),
  selectInfra: (id) => set({ selectedInfraId: id }),
  setView: (view) => set({ activeView: view, selectedInfraId: null }),
  setAnimating: (val) => set({ isAnimating: val }),
}));
