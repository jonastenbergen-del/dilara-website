'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Floating particles component - optimized for mobile
function FloatingParticles({ count = 30 }: { count?: number }) {
    const [isMobile, setIsMobile] = useState(false);
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        size: number;
        duration: number;
        delay: number;
        type: 'heart' | 'star' | 'circle';
        opacity: number;
    }>>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const mobileCount = isMobile ? Math.floor(count / 3) : count;
        const newParticles = Array.from({ length: mobileCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 12 + 4,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            type: (Math.random() > 0.5 ? 'heart' : Math.random() > 0.5 ? 'star' : 'circle') as 'heart' | 'star' | 'circle',
            opacity: Math.random() * 0.4 + 0.1,
        }));
        setParticles(newParticles);
    }, [count, isMobile]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [-20, -100, -20],
                        x: [0, Math.random() * 30 - 15, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                        opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {p.type === 'heart' && (
                        <span
                            className="text-primary-400"
                            style={{ fontSize: p.size, opacity: p.opacity }}
                        >
                            💕
                        </span>
                    )}
                    {p.type === 'star' && (
                        <span
                            className="text-gold-400"
                            style={{ fontSize: p.size, opacity: p.opacity }}
                        >
                            ✨
                        </span>
                    )}
                    {p.type === 'circle' && (
                        <div
                            className="rounded-full bg-primary-300"
                            style={{
                                width: p.size,
                                height: p.size,
                                opacity: p.opacity * 0.5,
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

// Countdown timer component
function RelationshipCountdown({ startDate }: { startDate: string }) {
    const { t } = useLanguage();
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTime = () => {
            const start = new Date(startDate);
            const now = new Date();
            const diff = now.getTime() - start.getTime();

            setTime({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [startDate]);

    const timeUnits = [
        { label: t('hero_countdown_days'), value: time.days },
        { label: t('hero_countdown_hours'), value: time.hours },
        { label: t('hero_countdown_minutes'), value: time.minutes },
        { label: t('hero_countdown_seconds'), value: time.seconds },
    ];

    return (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {timeUnits.map((unit, i) => (
                <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <div className="glass rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
                        <motion.span
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text font-display"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: time.seconds === 0 ? 0 : 1 }}
                        >
                            {String(unit.value).padStart(2, '0')}
                        </motion.span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        {unit.label}
                    </span>
                </motion.div>
            ))}
            <span className="hidden sm:block text-xl md:text-2xl text-primary-400">+</span>
            <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="glass rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 min-w-[40px] sm:min-w-[50px] md:min-w-[70px]">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-magenta-500 font-display">
                        ∞
                    </span>
                </div>
                <span className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    {t('hero_countdown_infinity')}
                </span>
            </motion.div>
        </div>
    );
}

// Typing animation for welcome text
function TypingText() {
    const { t } = useLanguage();
    const texts = t('hero_welcome_typing') as string[];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[currentTextIndex];
        const speed = 80;

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (currentCharIndex < currentText.length) {
                        setCurrentCharIndex((prev) => prev + 1);
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (currentCharIndex > 0) {
                        setCurrentCharIndex((prev) => prev - 1);
                    } else {
                        setIsDeleting(false);
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    }
                }
            },
            isDeleting ? speed / 2 : speed
        );

        return () => clearTimeout(timeout);
    }, [currentCharIndex, isDeleting, currentTextIndex, texts]);

    return (
        <span className="inline-block">
            {texts[currentTextIndex].substring(0, currentCharIndex)}
            <span className="animate-pulse">|</span>
        </span>
    );
}

// Heart beat button
function HeartButton({ onClick }: { onClick: () => void }) {
    const { t } = useLanguage();
    return (
        <motion.button
            onClick={onClick}
            className="group relative px-6 py-3 sm:px-8 sm:py-4 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-magenta-500 to-gold-500 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-magenta-600 to-gold-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white font-semibold text-sm sm:text-lg">
                {t('hero_cta')}
            </span>
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </motion.button>
    );
}

// Main Hero Section
export default function HeroSection() {
    const { t } = useLanguage();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePosition({
            x: (clientX / innerWidth - 0.5) * 20,
            y: (clientY / innerHeight - 0.5) * 20,
        });
    }, [isMobile]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToStory = () => {
        document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
            onMouseMove={handleMouseMove}
        >
            {/* Animated gradient orbs - smaller on mobile */}
            <motion.div
                className="absolute top-1/4 -left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(232, 93, 122, 0.2), transparent)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(142, 69, 133, 0.2), transparent)',
                }}
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(201, 169, 110, 0.1), transparent)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating particles */}
            <FloatingParticles count={isMobile ? 15 : 40} />

            {/* Parallax content container - reduced movement on mobile */}
            <motion.div
                className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
                animate={{
                    x: isMobile ? 0 : mousePosition.x * 0.5,
                    y: isMobile ? 0 : mousePosition.y * 0.5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                {/* Main heading with entrance animation */}
                <AnimatePresence>
                    {isVisible && (
                        <>
                            {/* Emoji decoration - smaller on mobile */}
                            <motion.div
                                className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-6"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.span
                                    className="text-2xl sm:text-3xl md:text-4xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    🌹
                                </motion.span>
                                <motion.span
                                    className="text-2xl sm:text-3xl md:text-4xl"
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                >
                                    💫
                                </motion.span>
                                <motion.span
                                    className="text-2xl sm:text-3xl md:text-4xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                >
                                    🌹
                                </motion.span>
                            </motion.div>

                            {/* Welcome typing text - smaller on mobile */}
                            <motion.h2
                                className="text-sm sm:text-base md:text-xl lg:text-2xl font-light text-neutral-600 dark:text-neutral-400 mb-2 sm:mb-4 px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <TypingText />
                            </motion.h2>

                            {/* Main title - responsive sizing */}
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 font-display"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <span className="gradient-text">Jonas</span>
                                <motion.span
                                    className="inline-block mx-2 sm:mx-4 text-primary-400 text-2xl sm:text-3xl md:text-4xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    &
                                </motion.span>
                                <span className="gradient-text">Dilara</span>
                            </motion.h1>

                            {/* Subtitle - responsive */}
                            <motion.p
                                className="text-xs sm:text-sm md:text-lg lg:text-xl font-light text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                {t('hero_subtitle')}
                            </motion.p>

                            {/* Countdown - responsive */}
                            <motion.div
                                className="mb-6 sm:mb-8 md:mb-10 px-2"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                <RelationshipCountdown startDate="2026-06-06T18:00:00" />
                            </motion.div>

                            {/* CTA Button - responsive */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="px-4"
                            >
                                <HeartButton onClick={scrollToStory} />
                            </motion.div>

                            {/* Scroll indicator */}
                            <motion.div
                                className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2, duration: 0.8 }}
                            >
                                <motion.div
                                    className="flex flex-col items-center gap-1 sm:gap-2 text-neutral-500 dark:text-neutral-400"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-[10px] sm:text-sm">{t('hero_scroll')}</span>
                                    <motion.div
                                        className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-neutral-400 dark:border-neutral-600 relative"
                                    >
                                        <motion.div
                                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 absolute left-1/2 -translate-x-1/2"
                                            animate={{
                                                top: ['4px', 'calc(100% - 8px)', '4px'],
                                                opacity: [1, 0.5, 1],
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-neutral-50 dark:from-[#0A0A1A] to-transparent" />
        </section>
    );
}