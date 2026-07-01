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
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/20 text-4xl"
                        suppressHydrationWarning
                        initial={{
                            x: 100 + i * 60,
                            y: 950,
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

            <div className="text-center relative z-10 px-4">
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
                                className="text-9xl mb-6 inline-block"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🔒
                            </motion.div>
                            <motion.p
                                className="text-white text-xl font-display mb-2"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {language === 'tr' ? 'Açmak için tıkla' : 'Klicken zum Öffnen'}
                            </motion.p>
                            <motion.div
                                className="text-4xl mt-4"
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
                                className="text-7xl mb-6"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🔓
                            </motion.div>

                            <h2 className="text-white text-2xl font-bold font-display mb-2">
                                {language === 'tr' ? 'Şifre Girin' : 'Passwort Eingeben'}
                            </h2>
                            <p className="text-white/70 mb-8">
                                {language === 'tr' ? '3 haneli şifre' : '3-stelliges Passwort'}
                            </p>

                            <div className="flex justify-center gap-3 mb-6">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`w-12 h-12 rounded-xl border-2 text-2xl font-bold flex items-center justify-center transition-all ${code[i]
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

                            <div className="flex justify-center gap-2 mb-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <motion.button
                                        key={num}
                                        className="w-14 h-14 rounded-full bg-white/20 text-white text-xl font-bold flex items-center justify-center hover:bg-white/30 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleCodeChange(num.toString())}
                                    >
                                        {num}
                                    </motion.button>
                                ))}
                                <div className="w-14 h-14" />
                                <motion.button
                                    className="w-14 h-14 rounded-full bg-white/20 text-white text-xl font-bold flex items-center justify-center hover:bg-white/30 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleCodeChange('0')}
                                >
                                    0
                                </motion.button>
                                <motion.button
                                    className="w-14 h-14 rounded-full bg-red-400/50 text-white text-lg font-bold flex items-center justify-center hover:bg-red-400/70 transition-colors"
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
                                className="text-white/60 hover:text-white text-sm underline"
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