'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface HiddenSurprise {
    id: number;
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    emoji: string;
    color: string;
}

const hiddenSurprises: HiddenSurprise[] = [
    {
        id: 1,
        title_de: 'Geheimer Brief',
        title_tr: 'Gizli Mektup',
        description_de: 'Ein geheimes Liebesbrief, nur für dich.',
        description_tr: 'Sadece senin için gizli bir aşk mektubu.',
        emoji: '💌',
        color: 'from-pink-400 to-rose-500',
    },
    {
        id: 2,
        title_de: 'Gutschein für einen Kuss',
        title_tr: 'Öpücük kuponu',
        description_de: 'Ein unendlich gültiger Kuss-Gutschein.',
        description_tr: 'Süresiz geçerli bir öpücük kuponu.',
        emoji: '💋',
        color: 'from-red-400 to-pink-500',
    },
    {
        id: 3,
        title_de: 'Unsere Playlist',
        title_tr: 'Çalma listemiz',
        description_de: 'Die Songs, die unsere Geschichte begleiten.',
        description_tr: 'Hikayemizi eşlik eden şarkılar.',
        emoji: '🎵',
        color: 'from-purple-400 to-violet-500',
    },
    {
        id: 4,
        title_de: 'Zeitreise',
        title_tr: 'Zaman makinesi',
        description_de: 'Wenn ich zurückgehen und unseren ersten Chat nochmal erleben könnte...',
        description_tr: 'Geri gidip ilk mesajımızı tekrar yaşayabilsem...',
        emoji: '⏰',
        color: 'from-blue-400 to-cyan-500',
    },
    {
        id: 5,
        title_de: 'Liebes-Formel',
        title_tr: 'Aşk formülü',
        description_de: 'Jonas + Dilara = Unendlichkeit ∞',
        description_tr: 'Jonas + Dilara = Sonsuzluk ∞',
        emoji: '💕',
        color: 'from-amber-400 to-orange-500',
    },
    {
        id: 6,
        title_de: 'Blumenmeer',
        title_tr: 'Çiçek denizi',
        description_de: 'Für dich, alle Blumen der Welt.',
        description_tr: 'Sen için dünyanın tüm çiçekleri.',
        emoji: '🌹',
        color: 'from-green-400 to-emerald-500',
    },
];

function ConfettiExplosion() {
    return (
        <>
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 800 - 200,
                        scale: [0, 1, 0],
                        rotate: Math.random() * 720,
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        ease: 'easeOut',
                    }}
                >
                    {['🎉', '🎊', '✨', '💕', '🌟', '💖', '🎆'][Math.floor(Math.random() * 7)]}
                </motion.div>
            ))}
        </>
    );
}

function FallingHearts({ count = 20 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl text-red-400"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -50,
                        opacity: 0,
                    }}
                    animate={{
                        y: window.innerHeight + 50,
                        opacity: [0, 1, 0],
                        rotate: Math.random() * 360,
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'easeInOut',
                    }}
                >
                    💕
                </motion.div>
            ))}
        </>
    );
}

function SecretLetter() {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(false)}
        >
            <motion.div
                className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-amber-300"
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-dashed border-amber-300/50 rounded-2xl pointer-events-none" />

                <div className="relative z-10 text-center">
                    <motion.div
                        className="text-6xl mb-6"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        💌
                    </motion.div>

                    <h3 className="text-2xl font-bold font-display text-amber-900 dark:text-amber-300 mb-4">
                        {language === 'tr' ? 'Sana Mektup' : 'Liebesbrief'}
                    </h3>

                    <div className="text-left text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3 font-handwriting">
                        <p>
                            {language === 'tr'
                                ? 'Canım Dilara\'ya,'
                                : 'Mein liebes Dilara,'}
                        </p>
                        <p>
                            {language === 'tr'
                                ? 'Bu mektubu sana çünkü sen benim her şeyimsin.'
                                : 'Dieser Brief ist für dich, weil du meine alles bist.'}
                        </p>
                        <p>
                            {language === 'tr'
                                ? 'Seni seviyorum ve her gün daha çok seveceğim.'
                                : 'Ich liebe dich und werde dich jeden Tag mehr lieben.'}
                        </p>
                        <p className="text-right text-primary-500 font-bold">
                            {language === 'tr'
                                ? 'Sonsuz şekilde seni seven,'
                                : 'Dein unendlich Liebende,'}
                        </p>
                        <p className="text-right text-primary-500">
                            {language === 'tr' ? 'Jonas 💕' : 'Jonas 💕'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function EasterEggsSection() {
    const { language } = useLanguage();
    const [konamiIndex, setKonamiIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [secretClickCount, setSecretClickCount] = useState(0);
    const [showSecretLetter, setShowSecretLetter] = useState(false);
    const [magicMode, setMagicMode] = useState(false);
    const [showFallingHearts, setShowFallingHearts] = useState(false);
    const [foundCount, setFoundCount] = useState(0);
    const cursorPositions = useRef<number[]>([]);

    // Konami code listener
    useEffect(() => {
        const konamiCode = [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b',
            'a',
        ];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (konamiCode[konamiIndex] === e.key) {
                const newIndex = konamiIndex + 1;
                setKonamiIndex(newIndex);

                if (newIndex === konamiCode.length) {
                    setShowConfetti(true);
                    setFoundCount(prev => prev + 1);
                    setTimeout(() => setShowConfetti(false), 3000);
                    setKonamiIndex(0);
                }
            } else {
                setKonamiIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiIndex]);

    // Magic wand - fast cursor movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorPositions.current.push(e.clientX);
            if (cursorPositions.current.length > 5) {
                cursorPositions.current.shift();
            }

            if (cursorPositions.current.length === 5) {
                const times = cursorPositions.current;
                const timeDiff = times[4] - times[0];
                if (timeDiff < 500) {
                    setMagicMode(true);
                    setTimeout(() => setMagicMode(false), 10000);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random surprise button
    const handleRandomSurprise = useCallback(() => {
        const surprises = [
            () => setShowFallingHearts(true),
            () => setShowConfetti(true),
            () => setSecretClickCount(prev => prev + 7),
        ];
        const random = surprises[Math.floor(Math.random() * surprises.length)];
        random();
        setTimeout(() => setShowConfetti(false), 3000);
        setTimeout(() => setShowFallingHearts(false), 5000);
    }, []);

    useEffect(() => {
        if (secretClickCount >= 7) {
            setShowSecretLetter(true);
            setFoundCount(prev => prev + 1);
            setSecretClickCount(0);
        }
    }, [secretClickCount]);

    const loveFormula = language === 'tr'
        ? 'Jonas + Dilara = Sonsuzluk ∞'
        : 'Jonas + Dilara = Unendlichkeit ∞';

    return (
        <>
            <section
                id="easter-eggs"
                className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-indigo-50/20 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#15102A] dark:to-[#0A0A1A] relative overflow-hidden"
            >
                {/* Magic mode effect */}
                {magicMode && (
                    <div className="fixed inset-0 pointer-events-none z-[100]">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 via-blue-500/10 to-green-500/10 animate-pulse" />
                    </div>
                )}

                {/* Confetti */}
                <AnimatePresence>
                    {showConfetti && (
                        <div className="fixed inset-0 pointer-events-none z-[90]">
                            <ConfettiExplosion />
                        </div>
                    )}
                </AnimatePresence>

                {/* Falling Hearts */}
                <AnimatePresence>
                    {showFallingHearts && (
                        <div className="fixed inset-0 pointer-events-none z-[80]">
                            <FallingHearts />
                        </div>
                    )}
                </AnimatePresence>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false }}
                    >
                        <motion.div
                            className="inline-block mb-4 text-5xl"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            🥚
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                            {language === 'tr' ? 'Sürprizler ve Gizler' : 'Überraschungen & Easter Eggs'}
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                            {language === 'tr'
                                ? 'Birçok gizli sürpriz keşfetmek için hazır mısın?'
                                : 'Bist du bereit, viele versteckte Überraschungen zu entdecken?'}
                        </p>
                    </motion.div>

                    {/* Found counter */}
                    <div className="text-center mb-12">
                        <motion.div
                            className="inline-block glass rounded-2xl px-6 py-3"
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: false }}
                        >
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {language === 'tr' ? 'Bulunan Sürprizler:' : 'Entdeckte Überraschungen:'}
                            </p>
                            <p className="text-3xl font-bold gradient-text">{foundCount} / 8</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Konami Code */}
                        <motion.div
                            className="glass rounded-2xl p-6 shadow-soft-lg cursor-pointer"
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: false }}
                            onClick={() => {
                                setShowConfetti(true);
                                setFoundCount(prev => prev + 1);
                                setTimeout(() => setShowConfetti(false), 3000);
                            }}
                        >
                            <div className="text-4xl mb-4 text-center">🎮</div>
                            <h3 className="text-xl font-bold font-display gradient-text text-center mb-2">
                                {language === 'tr' ? 'Konami Kodu' : 'Konami-Code'}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                                {language === 'tr'
                                    ? '↑↑↓↓←→←→BA'
                                    : 'Probiere es aus!'}
                            </p>
                            <div className="mt-4 flex justify-center gap-1">
                                {['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'].map((key, i) => (
                                    <motion.span
                                        key={i}
                                        className="px-2 py-1 rounded bg-white/20 dark:bg-neutral-700/50 text-xs font-mono"
                                        animate={{
                                            scale: konamiIndex === i ? [1, 1.2, 1] : 1,
                                            backgroundColor: konamiIndex === i ? 'rgba(232, 93, 122, 0.3)' : undefined,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {key}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Secret Click Counter */}
                        <motion.div
                            className="glass rounded-2xl p-6 shadow-soft-lg cursor-pointer"
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: false }}
                            onClick={() => setSecretClickCount(prev => prev + 1)}
                        >
                            <div className="text-4xl mb-4 text-center">
                                <motion.span
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 0.2 }}
                                >
                                    💕
                                </motion.span>
                            </div>
                            <h3 className="text-xl font-bold font-display gradient-text text-center mb-2">
                                {language === 'tr' ? 'Gizli Kalp' : 'Geheimer Heart'}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-2">
                                {language === 'tr'
                                    ? 'Kalbe tıkla!'
                                    : 'Klicke auf das Herz!'}
                            </p>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-primary-500">
                                    {secretClickCount}
                                </span>
                                <span className="text-xs text-neutral-500 ml-2">
                                    / 7
                                </span>
                            </div>
                        </motion.div>

                        {/* Random Surprise */}
                        <motion.div
                            className="glass rounded-2xl p-6 shadow-soft-lg cursor-pointer"
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: false }}
                            onClick={handleRandomSurprise}
                        >
                            <div className="text-4xl mb-4 text-center">🎲</div>
                            <h3 className="text-xl font-bold font-display gradient-text text-center mb-2">
                                {language === 'tr' ? 'Sürpriz Kutusu' : 'Überraschungsbox'}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                                {language === 'tr'
                                    ? 'Tıkla ve sürprizi gör!'
                                    : 'Klicke und sieh die Überraschung!'}
                            </p>
                            <motion.div
                                className="mt-4 text-center text-3xl"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🎁
                            </motion.div>
                        </motion.div>

                        {/* Love Formula */}
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 glass rounded-2xl p-6 shadow-soft-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: false }}
                        >
                            <div className="text-4xl mb-4 text-center">🧮</div>
                            <h3 className="text-xl font-bold font-display gradient-text text-center mb-4">
                                {language === 'tr' ? 'Aşk Formülü' : 'Liebes-Formel'}
                            </h3>
                            <div className="text-center text-lg font-bold text-primary-500">
                                {loveFormula}
                            </div>
                        </motion.div>

                        {/* Hidden Surprises Grid */}
                        {hiddenSurprises.map((surprise, index) => (
                            <motion.div
                                key={surprise.id}
                                className="glass rounded-2xl p-6 shadow-soft-lg overflow-hidden relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                viewport={{ once: false }}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="text-4xl mb-4 text-center">{surprise.emoji}</div>
                                <h4 className="text-lg font-bold font-display gradient-text text-center mb-2">
                                    {language === 'tr' ? surprise.title_tr : surprise.title_de}
                                </h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                                    {language === 'tr' ? surprise.description_tr : surprise.description_de}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Konami hint */}
                    <div className="mt-16 text-center">
                        <p className="text-xs text-neutral-500 dark:text-neutral-600">
                            {language === 'tr'
                                ? 'İpucu: Klavyende 10 özel tuş var...'
                                : 'Tipp: Du hast 10 spezielle Tasten auf deiner Tastatur...'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Secret Letter Modal */}
            <AnimatePresence>
                {showSecretLetter && <SecretLetter />}
            </AnimatePresence>
        </>
    );
}