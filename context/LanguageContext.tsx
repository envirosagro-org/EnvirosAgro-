import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.knowledge': 'Knowledge Hub',
    'nav.ai_advisor': 'Strategic AI',
    'hero.title': 'Predictive Stability',
    'hero.subtitle': 'The first interdisciplinary network standardizing agricultural resilience.',
    'dashboard.title': 'Intelligence Dashboard',
    'dashboard.ai_vision': 'AI Future Vision Lab',
    'dashboard.strategic_prediction': 'Strategic Prediction',
  },
  es: {
    'nav.dashboard': 'Panel de Control',
    'nav.knowledge': 'Centro de Conocimiento',
    'nav.ai_advisor': 'IA Estratégica',
    'hero.title': 'Estabilidad Predictiva',
    'hero.subtitle': 'La primera red interdisciplinaria que estandariza la resiliencia agrícola.',
    'dashboard.title': 'Panel de Inteligencia',
    'dashboard.ai_vision': 'Laboratorio de Visión Futura IA',
    'dashboard.strategic_prediction': 'Predicción Estratégica',
  },
  fr: {
    'nav.dashboard': 'Tableau de Bord',
    'nav.knowledge': 'Centre de Connaissances',
    'nav.ai_advisor': 'IA Stratégique',
    'hero.title': 'Stabilité Prédictive',
    'hero.subtitle': 'Le premier réseau interdisciplinaire normalisant la résilience agricole.',
    'dashboard.title': 'Tableau de Bord de l\'Intelligence',
    'dashboard.ai_vision': 'Laboratoire de Vision Future IA',
    'dashboard.strategic_prediction': 'Prédiction Stratégique',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ea_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ea_language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
