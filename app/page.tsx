'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import MemoriesSection from '@/components/sections/MemoriesSection';
import LoveCardsSection from '@/components/sections/LoveCardsSection';
import BucketListSection from '@/components/sections/BucketListSection';
import SurprisesSection from '@/components/sections/SurprisesSection';
import ChatAnalysisSection from '@/components/sections/ChatAnalysisSection';
import StarrySkySection from '@/components/sections/StarrySkySection';
import EasterEggsSection from '@/components/sections/EasterEggsSection';
import LockScreen from '@/components/ui/LockScreen';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlocked = () => {
    setIsLocked(false);
    setTimeout(() => {
      setIsUnlocked(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <main className="relative">
      {/* Lock Screen Overlay */}
      {isLocked && (
        <div className="fixed inset-0 z-[200]">
          <LockScreen onUnlocked={handleUnlocked} />
        </div>
      )}

      {/* Website Content */}
      <div className={`transition-opacity duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <HeroSection />
        <TimelineSection />
        <MemoriesSection />

        <LoveCardsSection />
        <BucketListSection />
        <SurprisesSection />
        <ChatAnalysisSection />
        <StarrySkySection />
        <EasterEggsSection />

        {/* Footer */}
        <footer className="py-8 text-center bg-neutral-100 dark:bg-[#0A0A1A] border-t border-neutral-200 dark:border-[#2A2A4A]">
          <p className="text-neutral-600 dark:text-neutral-400 font-display">
            {t('footer_made_with')} ❤️ {t('footer_for')} Dilara
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-2">
            {t('footer_forever')}
          </p>
        </footer>
      </div>
    </main>
  );
}