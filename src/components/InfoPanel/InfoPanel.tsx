import { motion, AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE } from '../../data/infrastructure';
import { useSimulatorStore } from '../../store/simulatorStore';
import { ElementDetail } from './ElementDetail';
import { PhaseOverview } from './PhaseOverview';

export function InfoPanel() {
  const { selectedInfraId } = useSimulatorStore();
  const selectedInfra = selectedInfraId
    ? INFRASTRUCTURE.find(i => i.id === selectedInfraId)
    : null;

  return (
    <div className="h-full overflow-y-auto bg-[#111827] border-l border-white/10 p-4">
      <AnimatePresence mode="wait">
        {selectedInfra ? (
          <motion.div
            key="detail"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ElementDetail infra={selectedInfra} />
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PhaseOverview />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
