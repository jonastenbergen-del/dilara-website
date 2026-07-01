'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LockScreen({ onUnlocked }: { onUnlocked: () => void }) {
    const { language } = useLanguage();
    const [step, setStep] = useState<'lock' | 'code'>('lock');
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const codeRef = useRef('');
    const CORRECT_CODE = '614';

    const handleCodeChange = (num: string) => {
        if (code.length >= 3) return;

        const newCode = code + num;
        setCode(newCode);
        codeRef.current = newCode;

        if (newCode.length === 3) {
            if (newCode === CORRECT_CODE) {
                onUnlocked();
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setCode('');
                    codeRef.current = '';
                }, 500);
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #E85D7A, #8E4585, #D44562)',
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Floating Hearts Background - fewer on mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/20 text-2xl sm:text-4xl"
                        suppressHydrationWarning
                        initial={{
                            x: 50 + (i * 50),
                            y: 700,
                            rotate: 0,
                        }}
                        animate={{
                            y: -100,
                            rotate: Math.random() * 360,
                        }}
                        transition={{
                            duration: 8 + Math.random() * 12,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: 'easeInOut',
                        }}
                    >
                        💕
                    </motion.div>
                ))}
            </div>

            <div className="text-center relative z-10 px-4 sm:px-6 w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                    {step === 'lock' ? (
                        <motion.div
                            key="lock"
                            className="cursor-pointer"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            onClick={() => setStep('code')}
                        >
                            <motion.div
                                className="text-7xl sm:text-9xl mb-4 sm:mb-6 inline-block"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🔒
                            </motion.div>
                            <motion.p
                                className="text-white text-lg sm:text-xl font-display mb-2 px-4"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {language === 'tr' ? 'Açmak için tıkla' : 'Klicken zum Öffnen'}
                            </motion.p>
                            <motion.div
                                className="text-3xl sm:text-4xl mt-3 sm:mt-4"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                💕
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="code"
                            className="cursor-pointer"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <motion.div
                                className="text-6xl sm:text-7xl mb-4 sm:mb-6 mx-auto"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🔓
                            </motion.div>

                            <h2 className="text-white text-xl sm:text-2xl font-bold font-display mb-2 px-2">
                                {language === 'tr' ? 'Şifre Girin' : 'Passwort Eingeben'}
                            </h2>
                            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base px-2">
                                {language === 'tr' ? '3 haneli şifre' : '3-stelliges Passwort'}
                            </p>

                            <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 text-xl sm:text-2xl font-bold flex items-center justify-center transition-all ${code[i]
                                            ? 'bg-white border-white text-primary-600'
                                            : 'bg-white/20 border-white/50 text-white'
                                            } ${error ? 'border-red-400 bg-red-400/20' : ''}`}
                                        animate={error && i === 2 ? { x: [-5, 5, -5, 5, 0] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {code[i] ? '●' : ''}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-[280px] sm:max-w-none mx-auto px-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <motion.button
                                        key={num}
                                        className="w-[70px] sm:w-14 h-[70px] sm:h-14 rounded-full bg-white/20 text-white text-lg sm:text-xl font-bold flex items-center justify-center hover:bg-white/30 transition-colors mx-auto"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleCodeChange(num.toString())}
                                    >
                                        {num}
                                    </motion.button>
                                ))}
                                <div className="w-[70px] sm:w-14 h-[70px] sm:h-14 mx-auto" />
                                <motion.button
                                    className="w-[70px] sm:w-14 h-[70px] sm:h-14 rounded-full bg-white/20 text-white text-lg sm:text-xl font-bold flex items-center justify-center hover:bg-white/30 transition-colors mx-auto"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleCodeChange('0')}
                                >
                                    0
                                </motion.button>
                                <motion.button
                                    className="w-[70px] sm:w-14 h-[70px] sm:h-14 rounded-full bg-red-400/50 text-white text-base sm:text-lg font-bold flex items-center justify-center hover:bg-red-400/70 transition-colors mx-auto"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setCode('');
                                        codeRef.current = '';
                                        setError(false);
                                    }}
                                >
                                    ⌫
                                </motion.button>
                            </div>

                            <motion.button
                                className="text-white/60 hover:text-white text-xs sm:text-sm underline px-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setStep('lock');
                                    setCode('');
                                    codeRef.current = '';
                                    setError(false);
                                }}
                            >
                                {language === 'tr' ? 'Geri' : 'Zurück'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}