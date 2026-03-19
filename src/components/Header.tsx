import { Rocket } from 'lucide-react';
import { useSimulatorStore } from '../store/simulatorStore';

export function Header() {
  const { activeView, setView } = useSimulatorStore();

  return (
    <header className="bg-[#0A0E1A] border-b border-white/10 px-4 py-3 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <Rocket className="text-blue-400" size={22} />
        <div>
          <h1 className="font-orbitron text-white text-sm font-bold leading-tight tracking-wider">
            LUNAR SOCIETY SIMULATOR
          </h1>
          <p className="text-[#9CA3AF] text-xs">JAXA国際宇宙探査シナリオ 2025</p>
        </div>
      </div>

      <nav className="flex gap-1">
        <button
          onClick={() => setView('base')}
          className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
            activeView === 'base'
              ? 'bg-blue-600 text-white'
              : 'text-[#9CA3AF] hover:text-white hover:bg-white/10'
          }`}
          aria-pressed={activeView === 'base'}
        >
          月面基地
        </button>
        <button
          onClick={() => setView('industry')}
          className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
            activeView === 'industry'
              ? 'bg-blue-600 text-white'
              : 'text-[#9CA3AF] hover:text-white hover:bg-white/10'
          }`}
          aria-pressed={activeView === 'industry'}
        >
          産業ビジョン
        </button>
      </nav>
    </header>
  );
}
