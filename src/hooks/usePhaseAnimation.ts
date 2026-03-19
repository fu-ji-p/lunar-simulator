import { useEffect } from 'react';
import { useSimulatorStore } from '../store/simulatorStore';

export function usePhaseAnimation() {
  const { isAnimating, setAnimating } = useSimulatorStore();

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, setAnimating]);

  return { isAnimating };
}
