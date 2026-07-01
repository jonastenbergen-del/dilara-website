'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface BucketItem {
    id: number;
    category: 'travel' | 'goal' | 'wish';
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    completed: boolean;
    emoji: string;
}

const bucketListData: BucketItem[] = [
    {
        id: 1,
        category: 'travel',
        title_de: 'Gaziantep – zu ihr nach Hause',
        title_tr: 'Gaziantep – onun evine',
        description_de: 'Zu ihr nach Gaziantep reisen. Ihre Stadt, ihre Familie, ihre Welt entdecken.',
        description_tr: 'Onun Gaziantep\'ine seyahat etmek. Şehri, ailesi, dünyası keşfetmek.',
        completed: false,
        emoji: '✈️',
    },
    {
        id: 2,
        category: 'travel',
        title_de: 'Azoren – Natur Paradies',
        title_tr: 'Azorlar – doğa cenneti',
        description_de: 'Vulkane, Seen, Grün – zusammen in die Natur.',
        description_tr: 'Volkanlar, göller, yeşillik – doğada birlikte zaman.',
        completed: false,
        emoji: '🌋',
    },
    {
        id: 3,
        category: 'travel',
        title_de: 'Malediven – Strand Entspannung',
        title_tr: 'Maldivler – plaj rahatlığı',
        description_de: 'Blaues Wasser, weißer Sand, nur wir zwei.',
        description_tr: 'Mavi su, beyaz kum, sadece ikimiz.',
        completed: false,
        emoji: '🏝️',
    },
    {
        id: 4,
        category: 'goal',
        title_de: 'Zusammenleben in Deutschland',
        title_tr: 'Almanya\'da birlikte yaşamak',
        description_de: 'Eines Tages nicht mehr getrennt durch Kilometer – zusammen in Deutschland.',
        description_tr: 'Bir gün kilometreler tarafından ayrılmamak – Almanya\'da birlikte.',
        completed: false,
        emoji: '🇩🇪',
    },
    {
        id: 5,
        category: 'goal',
        title_de: 'Gemeinsames Haus',
        title_tr: 'Ortak ev',
        description_de: 'Mit Garten, Katzen und einem besonderen Zimmer für dich.',
        description_tr: 'Bahçeli, kedili ve senin için özel bir odalı ev.',
        completed: false,
        emoji: '🏡',
    },
    {
        id: 6,
        category: 'goal',
        title_de: 'Weltreise',
        title_tr: 'Dünya turu',
        description_de: '6 Monate, kein Ziel, einfach zusammen.',
        description_tr: '6 ay, hedef yok, sadece birlikte.',
        completed: false,
        emoji: '🌍',
    },
    {
        id: 7,
        category: 'goal',
        title_de: 'Die Welt entdecken',
        title_tr: 'Dünyayı keşfet',
        description_de: 'Jeden Kontinent, jedes Essen, jede Kultur.',
        description_tr: 'Her kıta, her yemek, her kültür.',
        completed: false,
        emoji: '🗺️',
    },
    {
        id: 8,
        category: 'wish',
        title_de: 'Garten mit Blumen',
        title_tr: 'Çiçekli bahçe',
        description_de: 'Für dich, für uns, für unsere Zukunft.',
        description_tr: 'Senin için, bizim için, geleceğimiz için.',
        completed: false,
        emoji: '🌹',
    },
    {
        id: 9,
        category: 'wish',
        title_de: 'Jeden Tag zusammen aufwachen',
        title_tr: 'Her gün birlikte uyanmak',
        description_de: 'Dein Schlafgesicht jeden Morgen sehen.',
        description_tr: 'Her sabah senin uyanık yüzünü görmek.',
        completed: false,
        emoji: '🌅',
    },
    {
        id: 10,
        category: 'wish',
        title_de: 'Sonsige Liebe und Glück',
        title_tr: 'Sonsuz aşk ve mutluluk',
        description_de: 'Das wichtigste Ziel von allen.',
        description_tr: 'Tüm hedeflerin en önemlisi.',
        completed: false,
        emoji: '💕',
    },
];

function BucketItemCard({ item, index, onToggle }: { item: BucketItem; index: number; onToggle: (id: number) => void }) {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: false });

    const title = language === 'tr' ? item.title_tr : item.title_de;
    const description = language === 'tr' ? item.description_tr : item.description_de;

    const categoryColors = {
        travel: 'from-blue-400 to-cyan-500',
        goal: 'from-purple-400 to-pink-500',
        wish: 'from-amber-400 to-orange-500',
    };

    const categoryLabels = {
        travel: language === 'tr' ? 'Yolculuk' : 'Reisen',
        goal: language === 'tr' ? 'Hedef' : 'Ziele',
        wish: language === 'tr' ? 'Dilek' : 'Wünsche',
    };

    return (
        <motion.div
            ref={ref}
            className={`glass rounded-2xl p-5 cursor-pointer shadow-soft-lg transition-all duration-300 ${item.completed ? 'opacity-70' : ''}`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(item.id)}
        >
            {/* Category badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[item.category]} text-white mb-3`}>
                {categoryLabels[item.category]}
            </div>

            {/* Emoji and title */}
            <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                    <h3 className={`text-lg font-bold font-display ${item.completed ? 'line-through opacity-60' : 'gradient-text'}`}>
                        {title}
                    </h3>
                </div>
                {item.completed && (
                    <motion.span
                        className="text-green-500 text-xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        ✓
                    </motion.span>
                )}
            </div>

            {/* Description */}
            <p className={`text-sm ${item.completed ? 'line-through opacity-60' : 'text-neutral-600 dark:text-neutral-400'}`}>
                {description}
            </p>

            {/* Progress indicator */}
            {!item.completed && (
                <motion.div
                    className="mt-3 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-400 to-magenta-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '0%' }}
                        whileHover={{ width: '30%' }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}

export default function BucketListSection() {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [items, setItems] = useState(bucketListData);

    const handleToggle = (id: number) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const completedCount = items.filter(i => i.completed).length;
    const totalCount = items.length;
    const progress = Math.round((completedCount / totalCount) * 100);

    const progressText = t('future_progress');

    return (
        <section
            id="future"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-purple-50/20 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#1A1025] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-40 left-1/4 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(142, 69, 133, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-40 right-1/4 w-72 h-72 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(201, 169, 110, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        🌟
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {t('future_title')}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
                        {t('future_subtitle')}
                    </p>

                    {/* Progress bar */}
                    <motion.div
                        className="max-w-md mx-auto glass rounded-2xl p-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {progressText}
                            </span>
                            <span className="text-sm font-bold gradient-text">
                                {completedCount} / {totalCount}
                            </span>
                        </div>
                        <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary-400 via-magenta-500 to-gold-500"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                        </div>
                        <p className="text-xs text-neutral-500 mt-2 text-center">
                            {progress}% {language === 'tr' ? 'tamamlandı' : 'erfüllt'}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Bucket items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {items.map((item, index) => (
                        <BucketItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>

                {/* Add new item placeholder */}
                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        className="px-8 py-4 rounded-full glass text-neutral-600 dark:text-neutral-400 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        + {t('future_add_item')}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}