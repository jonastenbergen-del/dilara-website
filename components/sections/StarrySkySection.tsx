'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface StarMemory {
    id: number;
    x: number;
    y: number;
    size: number;
    date: string;
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    emoji: string;
    constellation: string | null;
}

const starMemories: StarMemory[] = [
    {
        id: 1,
        x: 20,
        y: 25,
        size: 5,
        date: '28. Okt 2025',
        title_de: 'Unser erster Chat 💬',
        title_tr: 'İlk Mesajımız 💬',
        description_de: 'Der Tag, an dem alles begann. Deine erste Nachricht über unsere Ameisen.',
        description_tr: 'Her şeyin başladığı gün. Karıncalar hakkında ilk mesajın.',
        emoji: '💬',
        constellation: 'first-chat',
    },
    {
        id: 2,
        x: 45,
        y: 30,
        size: 4,
        date: 'Okt 2025',
        title_de: 'Ameisen-Geschwätz 🐜',
        title_tr: 'Karınca Sohbetleri 🐜',
        description_de: 'Stundenlange Diskussionen über S4 Guard Ants und Ant-Typen.',
        description_tr: 'S4 Guard Antlar ve karınca tipleri hakkında saatlerce tartışmalar.',
        emoji: '🐜',
        constellation: 'first-chat',
    },
    {
        id: 3,
        x: 70,
        y: 20,
        size: 5,
        date: 'Nov 2025',
        title_de: 'Erster Video Call 📹',
        title_tr: 'İlk Video Görüşme 📹',
        description_de: 'Dein Gesicht zum ersten Mal live sehen – unvergesslich!',
        description_tr: 'Yüzünü ilk defa canlı görmek – unutulmaz!',
        emoji: '📹',
        constellation: 'first-call',
    },
    {
        id: 4,
        x: 30,
        y: 55,
        size: 6,
        date: 'Dez 2025',
        title_de: 'Erster Kuss 💋',
        title_tr: 'İlk Öpücük 💋',
        description_de: 'Ein magischer Moment, den ich nie vergessen werde.',
        description_tr: 'Asla unutmayacağım sihirli bir an.',
        emoji: '💋',
        constellation: 'first-kiss',
    },
    {
        id: 5,
        x: 60,
        y: 60,
        size: 5,
        date: 'Jan 2026',
        title_de: 'Seni seviyorum ❤️',
        title_tr: 'Seni seviyorum ❤️',
        description_de: 'Die drei schönsten Worte der Welt – von uns beiden.',
        description_tr: 'Dünyanın en güzel üç sözü – ikimiz tarafından.',
        emoji: '❤️',
        constellation: 'confession',
    },
    {
        id: 6,
        x: 80,
        y: 50,
        size: 4,
        date: 'Feb 2026',
        title_de: 'Together Forever 💕',
        title_tr: 'Sonsuza Kadar Birlikte 💕',
        description_de: 'Jeden Tag an deiner Seite – das ist mir alles wert.',
        description_tr: 'Her gün yanında – bu benim her şeyime değer.',
        emoji: '💕',
        constellation: 'confession',
    },
    {
        id: 7,
        x: 50,
        y: 75,
        size: 5,
        date: 'Mär 2026',
        title_de: 'Stimmnachrichten 🎤',
        title_tr: 'Sesli Mesajlar 🎤',
        description_de: 'Deine Stimme ist das Wärmste, was ich kenne.',
        description_tr: 'Sesin tanediğim en sıcak şey.',
        emoji: '🎤',
        constellation: 'voice',
    },
];

function ShootingStar() {
    return (
        <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ top: '0%', left: '0%' }}
            animate={{
                top: ['0%', '100%'],
                left: ['0%', '80%'],
                opacity: [1, 0],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
            }}
        >
            <motion.div
                className="absolute w-20 h-0.5 bg-gradient-to-l from-white to-transparent"
                style={{ right: '100%', top: '-2px' }}
            />
        </motion.div>
    );
}

function Star({
    memory,
    onClick,
}: {
    memory: StarMemory;
    onClick: (memory: StarMemory) => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: false });

    return (
        <motion.div
            ref={ref}
            className="absolute cursor-pointer group"
            style={{
                left: `${memory.x}%`,
                top: `${memory.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: memory.id * 0.1 }}
            whileHover={{ scale: 1.5, z: 100 }}
            onClick={() => onClick(memory)}
        >
            {/* Star glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    width: memory.size * 4,
                    height: memory.size * 4,
                    left: `-${memory.size}`,
                    top: `-${memory.size}`,
                    background: `radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)`,
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Star point */}
            <div
                className="relative rounded-full bg-white shadow-lg"
                style={{
                    width: memory.size,
                    height: memory.size,
                    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.5)',
                }}
            >
                {/* Cross spikes for star effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-full h-0.5 bg-white/60" />
                    <div className="absolute w-0.5 h-full bg-white/60" />
                </div>
            </div>
        </motion.div>
    );
}

function StarModal({
    memory,
    onClose,
}: {
    memory: StarMemory;
    onClose: () => void;
}) {
    const { language } = useLanguage();
    const title = language === 'tr' ? memory.title_tr : memory.title_de;
    const description = language === 'tr' ? memory.description_tr : memory.description_de;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
                initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.5, y: 100, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Stars background */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Close button */}
                    <motion.button
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                    >
                        ✕
                    </motion.button>

                    {/* Emoji */}
                    <motion.div
                        className="text-7xl text-center mb-6"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        {memory.emoji}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-display text-white text-center mb-2 gradient-text">
                        {title}
                    </h3>

                    {/* Date */}
                    <p className="text-center text-primary-300 text-sm mb-4">{memory.date}</p>

                    {/* Description */}
                    <motion.p
                        className="text-neutral-200 text-center leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {description}
                    </motion.p>

                    {/* Sparkle */}
                    <motion.div
                        className="text-center mt-6 text-3xl"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ✨
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function StarrySkySection() {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [selectedStar, setSelectedStar] = useState<StarMemory | null>(null);
    const [isNight, setIsNight] = useState(false);

    // Check if it's night time
    const checkNightTime = useCallback(() => {
        const hour = new Date().getHours();
        setIsNight(hour >= 18 || hour < 6);
    }, []);

    useEffect(() => {
        checkNightTime();
        const interval = setInterval(checkNightTime, 60000);
        return () => clearInterval(interval);
    }, [checkNightTime]);

    const sectionTitle = language === 'tr' ? 'Yıldız Gökyüzü' : 'Sternenhimmel';
    const sectionSubtitle = language === 'tr'
        ? 'Her yıldız bir anımız'
        : 'Jeder Stern ist eine Erinnerung';

    return (
        <section
            id="stars"
            className={`min-h-screen py-24 relative overflow-hidden ${isNight
                ? 'bg-gradient-to-b from-[#0A0A1A] via-[#0F0F2A] to-[#0A0A1A]'
                : 'bg-gradient-to-b from-neutral-50 via-primary-50/10 to-neutral-50'
                }`}
        >
            {/* Night mode stars background */}
            {isNight && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Milky way */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(150, 130, 200, 0.3), transparent)',
                        }}
                        animate={{
                            x: ['-10%', '10%'],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Random small stars */}
                    {Array.from({ length: 100 }).map((_, i) => (
                        <motion.div
                            key={`bg-star-${i}`}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {/* Shooting stars */}
                    <ShootingStar />
                    <ShootingStar />
                    <ShootingStar />
                </div>
            )}

            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
                    style={{
                        background: isNight
                            ? 'radial-gradient(circle, rgba(142, 69, 133, 0.15), transparent)'
                            : 'radial-gradient(circle, rgba(232, 93, 122, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: isNight
                            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.1), transparent)'
                            : 'radial-gradient(circle, rgba(201, 169, 110, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 text-5xl"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                    >
                        🌌
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {sectionTitle}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        {sectionSubtitle}
                    </p>
                    {isNight && (
                        <p className="text-sm text-primary-400 mt-2">
                            {language === 'tr' ? '🌙 Gece modu aktif' : '🌙 Nacht-Modus aktiv'}
                        </p>
                    )}
                </motion.div>

                {/* Star sky */}
                <div className="relative h-[500px] sm:h-[600px] glass rounded-3xl overflow-hidden shadow-2xl">
                    {/* Constellation lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {/* First chat constellation */}
                        <line
                            x1="20%" y1="25%"
                            x2="45%" y2="30%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        <line
                            x1="45%" y1="30%"
                            x2="70%" y2="20%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        {/* First call to kiss */}
                        <line
                            x1="70%" y1="20%"
                            x2="30%" y2="55%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        {/* Love constellation */}
                        <line
                            x1="30%" y1="55%"
                            x2="60%" y2="60%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        <line
                            x1="60%" y1="60%"
                            x2="50%" y2="75%"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                    </svg>

                    {/* Stars */}
                    {starMemories.map((memory) => (
                        <Star
                            key={memory.id}
                            memory={memory}
                            onClick={setSelectedStar}
                        />
                    ))}

                    {/* Hint text */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                        <p className="text-sm text-white/50 dark:text-neutral-500">
                            {language === 'tr' ? 'Bir yıldıza tıkla ✨' : 'Klicke auf einen Stern ✨'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Star detail modal */}
            <AnimatePresence>
                {selectedStar && (
                    <StarModal
                        memory={selectedStar}
                        onClose={() => setSelectedStar(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}