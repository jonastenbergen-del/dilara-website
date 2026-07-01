'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, TranslationKey } from '@/i18n/translations';

// Type for the translation function
type TranslateFunction = (key: TranslationKey) => string | string[];

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslateFunction;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('de');

    // Load language from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('dilara-language');
        if (saved === 'tr' || saved === 'de') {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('dilara-language', lang);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'de' ? 'tr' : 'de');
    };

    const t: TranslateFunction = (key) => {
        return getTranslation(language, key);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}