import './index.css';
import { Header } from './components/Header';
import { PhaseTimeline } from './components/PhaseTimeline';
import { LunarBaseView } from './components/LunarBase/LunarBaseView';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { StatsBar } from './components/StatsBar';
import { IndustryView } from './components/IndustryView/IndustryView';
import { HealthView } from './components/HealthView/HealthView';
import { MarsView } from './components/MarsView/MarsView';
import { NASASimulatorView } from './components/NASASimulator/NASASimulatorView';
import { useSimulatorStore } from './store/simulatorStore';

function App() {
  const { activeView, activeCountry, setCountry } = useSimulatorStore();

  return (
    <div className="flex flex-col h-screen bg-[#111827] text-white overflow-hidden">
      {/* Country selector - トップに大きく */}
      <div className="bg-[#070B14] border-b border-white/15 px-4 py-2 flex items-center gap-2">
        <span className="text-[#6B7280] text-xs mr-2">SCENARIO:</span>
        <button
          onClick={() => setCountry('japan')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all border ${
            activeCountry === 'japan'
              ? 'bg-[#1E3A5F] text-blue-300 border-blue-500/50 shadow-lg'
              : 'text-[#6B7280] border-white/10 hover:text-white hover:border-white/25'
          }`}
        >
          <span className="text-base">🇯🇵</span>
          <span className="font-orbitron tracking-wider">JAPAN</span>
          <span className="text-xs opacity-70">JAXA 2025</span>
        </button>
        <button
          onClick={() => setCountry('nasa')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all border ${
            activeCountry === 'nasa'
              ? 'bg-[#1C1A0A] text-[#E53E3E] border-[#E53E3E]/50 shadow-lg'
              : 'text-[#6B7280] border-white/10 hover:text-white hover:border-white/25'
          }`}
        >
          <span className="text-base">🇺🇸</span>
          <span className="font-orbitron tracking-wider">NASA</span>
          <span className="text-xs opacity-70">IGNITION 2026</span>
        </button>
      </div>

      {activeCountry === 'japan' ? (
        <>
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
            ) : activeView === 'health' ? (
              /* Health view - full width */
              <div className="flex-1 overflow-hidden bg-[#111827]">
                <HealthView />
              </div>
            ) : (
              /* Mars view - full width */
              <div className="flex-1 overflow-hidden bg-[#111827]">
                <MarsView />
              </div>
            )}
          </div>

          {/* Stats bar */}
          <StatsBar />
        </>
      ) : (
        <>
          {/* NASA header */}
          <div className="bg-[#0A0E1A] border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <h1 className="font-orbitron text-white text-sm font-bold tracking-wider">NASA IGNITION</h1>
                <p className="text-[#9CA3AF] text-xs">Moon Base Development Plan — Announced March 24, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.nasa.gov/ignition/" target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#60A5FA] hover:text-blue-300 transition-colors underline">
                nasa.gov/ignition ↗
              </a>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-pulse" />
                <span className="text-[#E53E3E] font-medium">ACTIVE PLAN</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <NASASimulatorView />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
