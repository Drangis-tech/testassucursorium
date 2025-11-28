import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type Language = 'lt' | 'en' | 'pl' | 'ru';

interface LanguageContextValue {
  language: Language;
  t: (ltText: string, enText: string, plText?: string, ruText?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const getLanguage = (): Language => {
    if (location.pathname.startsWith('/lt')) return 'lt';
    if (location.pathname.startsWith('/pl')) return 'pl';
    if (location.pathname.startsWith('/ru')) return 'ru';
    return 'en';
  };

  const language: Language = getLanguage();

  const t = (ltText: string, enText: string, plText?: string, ruText?: string) => {
    if (language === 'en') return enText;
    if (language === 'pl') return plText || enText || ltText;
    if (language === 'ru') return ruText || enText || ltText;
    return ltText;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

