import { useSimulatorStore } from '../store/simulatorStore';
import { EN } from '../i18n/en';

/** Returns translation helpers for the current UI language. */
export function useT() {
  const lang = useSimulatorStore(s => s.lang);
  /** Pick the right string: t('日本語', 'English') */
  const t = (ja: string, en: string): string => (lang === 'en' ? en : ja);
  return { t, lang, EN };
}
