import { Rocket } from 'lucide-react';
import { useSimulatorStore } from '../store/simulatorStore';
import { useT } from '../hooks/useT';

export function Header() {
  const { activeView, setView, lang, setLang } = useSimulatorStore();
  const { t, EN } = useT();

  return (
    <header className="bg-[#0A0E1A] border-b border-white/10 px-4 py-3 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <Rocket className="text-blue-400" size={22} />
        <div>
          <h1 className="font-orbitron text-white text-sm font-bold leading-tight tracking-wider">
            LUNAR SOCIETY SIMULATOR
          </h1>
          <p className="text-[#9CA3AF] text-xs">
            {t('JAXA国際宇宙探査シナリオ 2025', EN.headerSubtitle)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Navigation */}
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
            {t('月面基地', EN.navBase)}
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
            {t('産業ビジョン', EN.navIndustry)}
          </button>
          <button
            onClick={() => setView('health')}
            className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
              activeView === 'health'
                ? 'bg-blue-600 text-white'
                : 'text-[#9CA3AF] hover:text-white hover:bg-white/10'
            }`}
            aria-pressed={activeView === 'health'}
          >
            {t('クルー健康管理', EN.navHealth)}
          </button>
          <button
            onClick={() => setView('mars')}
            className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
              activeView === 'mars'
                ? 'text-white'
                : 'text-[#9CA3AF] hover:text-white hover:bg-white/10'
            }`}
            style={activeView === 'mars' ? { backgroundColor: '#F97316' } : {}}
            aria-pressed={activeView === 'mars'}
          >
            {t('🔴 火星展望', EN.navMars)}
          </button>
        </nav>

        {/* Language toggle */}
        <div className="flex items-center rounded overflow-hidden border border-white/20">
          <button
            onClick={() => setLang('ja')}
            className={`px-2.5 py-1 text-[11px] font-medium transition-all ${
              lang === 'ja'
                ? 'bg-white text-black'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
            aria-pressed={lang === 'ja'}
          >
            JP
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 text-[11px] font-medium transition-all ${
              lang === 'en'
                ? 'bg-white text-black'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
