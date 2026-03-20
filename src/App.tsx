import './index.css';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { LunarBaseView } from './components/LunarBase/LunarBaseView';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { StatsBar } from './components/StatsBar';
import { IndustryView } from './components/IndustryView/IndustryView';
import { HealthView } from './components/HealthView/HealthView';
import { useSimulatorStore } from './store/simulatorStore';

function App() {
  const { activeView } = useSimulatorStore();

  return (
    <div className="flex flex-col h-screen bg-[#111827] text-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Phase timeline */}
      <PhaseTimeline />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {activeView === 'base' ? (
          <>
            {/* Lunar base view - main area */}
            <div className="flex-1 overflow-hidden bg-[#0A0E1A]">
              <LunarBaseView />
            </div>
            {/* Info panel - right sidebar */}
            <div className="w-80 shrink-0 overflow-hidden">
              <InfoPanel />
            </div>
          </>
        ) : activeView === 'industry' ? (
          /* Industry view - full width */
          <div className="flex-1 overflow-hidden bg-[#111827]">
            <IndustryView />
          </div>
        ) : (
          /* Health view - full width */
          <div className="flex-1 overflow-hidden bg-[#111827]">
            <HealthView />
          </div>
        )}
      </div>

      {/* Stats bar */}
      <StatsBar />
    </div>
  );
}

export default App;
