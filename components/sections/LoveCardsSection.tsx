'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import AdminPanel from '@/components/admin/AdminPanel';

interface LoveReason {
    id: number;
    text_de: string;
    text_tr: string;
    emoji: string;
    color: string;
}

const loveReasons: LoveReason[] = [
    {
        id: 1,
        text_de: "Dein Lächeln, das meine ganzen Tage erhellen kann",
        text_tr: "Gülüşün, tüm günlerimi aydınlatabilen",
        emoji: "😊",
        color: "from-pink-400 to-rose-500",
    },
    {
        id: 2,
        text_de: "Die Art, wie du über Dinge sprichst, die dich begeistern",
        text_tr: "Tutkuyla konuştuğu şeyler hakkında konuşma tarzın",
        emoji: "✨",
        color: "from-purple-400 to-violet-500",
    },
    {
        id: 3,
        text_de: "Deine Stärke, die mich jeden Tag inspiriert",
        text_tr: "Her gün beni ilham veren gücün",
        emoji: "💪",
        color: "from-blue-400 to-indigo-500",
    },
    {
        id: 4,
        text_de: "Die Wärme deiner Umarmung, selbst durch die Distanz",
        text_tr: "Uzaklığa rağmen kucaklamasının sıcaklığı",
        emoji: "🤗",
        color: "from-amber-400 to-orange-500",
    },
    {
        id: 5,
        text_de: "Deine Geduld mit mir und meiner manchmal chaotischen Art",
        text_tr: "Bazen kaotik tarzımla ilgili sabrın",
        emoji: "🙏",
        color: "from-emerald-400 to-green-500",
    },
    {
        id: 6,
        text_de: "Die Art, wie du mir immer das gute Gefühl gibst",
        text_tr: "Her zaman bana iyi hissettirme şeklin",
        emoji: "💕",
        color: "from-red-400 to-pink-500",
    },
    {
        id: 7,
        text_de: "Deinen Sinn für Humor, der selbst schlechte Tage rettet",
        text_tr: "Kötü günleri bile kurtaran mizah hissine",
        emoji: "😂",
        color: "from-yellow-400 to-amber-500",
    },
    {
        id: 8,
        text_de: "Die Träume, die wir gemeinsam träumen",
        text_tr: "Birlikte kurduğumuz hayaller",
        emoji: "🌟",
        color: "from-cyan-400 to-blue-500",
    },
    {
        id: 9,
        text_de: "Deine Stimme in den Stimmnachrichten",
        text_tr: "Sesli mesajlardaki sesin",
        emoji: "🎤",
        color: "from-fuchsia-400 to-purple-500",
    },
    {
        id: 10,
        text_de: "Wie du meine beste Freundin bist",
        text_tr: "Benim en iyi arkadaşım olman",
        emoji: "👑",
        color: "from-violet-400 to-indigo-500",
    },
    {
        id: 11,
        text_de: "Unsere gemeinsamen Lacher in den Video Calls",
        text_tr: "Video görüşmelerdeki birlikte kahkahalarımız",
        emoji: "😄",
        color: "from-sky-400 to-cyan-500",
    },
    {
        id: 12,
        text_de: "Seni seviyorum – die schönsten Worte der Welt",
        text_tr: "Seni seviyorum – dünyanın en güzel sözleri",
        emoji: "💋",
        color: "from-rose-400 to-red-500",
    },
    {
        id: 13,
        text_de: "Paris – unsere erste gemeinsame Reise",
        text_tr: "Paris – ilk birlikte yolculuğumuz",
        emoji: "🗼",
        color: "from-indigo-400 to-blue-500",
    },
    {
        id: 14,
        text_de: "Die Antennen unserer Ameisen 🐜",
        text_tr: "Karıncalarımızın antenleri 🐜",
        emoji: "🐜",
        color: "from-lime-400 to-green-500",
    },
    {
        id: 15,
        text_de: "Dass du immer für mich da bist",
        text_tr: "Her zaman benim için orada olman",
        emoji: "💝",
        color: "from-pink-400 to-fuchsia-500",
    },
    {
        id: 16,
        text_de: "Deine Geduld, wenn ich etwasRepeatere",
        text_tr: "Bir şeyi tekrarladığımda sabrın",
        emoji: "🎧",
        color: "from-teal-400 to-cyan-500",
    },
    {
        id: 17,
        text_de: "Wie du mich auch in schlechten Tagenupportst",
        text_tr: "Kötü günlerde bile beni desteklemen",
        emoji: "🌈",
        color: "from-orange-400 to-amber-500",
    },
    {
        id: 18,
        text_de: "Die Zukunft, die wir gemeinsam planen",
        text_tr: "Birlikte planladığımız gelecek",
        emoji: "🗺️",
        color: "from-blue-400 to-purple-500",
    },
    {
        id: 19,
        text_de: "Deine Nachrichten, die meinen Tag besser machen",
        text_tr: "Günümü güzelleştiren mesajların",
        emoji: "💌",
        color: "from-red-400 to-pink-500",
    },
    {
        id: 20,
        text_de: "Du bist einfach perfekt, so wie du bist",
        text_tr: "Sen olduğu gibi mükemmel",
        emoji: "💎",
        color: "from-gold-400 to-amber-500",
    },
];

function LoveCard({ reason, index, onClick }: { reason: LoveReason; index: number; onClick: () => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: false });
    const { language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const text = language === 'tr' ? reason.text_tr : reason.text_de;

    return (
        <motion.div
            ref={ref}
            className="perspective-1000 cursor-pointer"
            initial={{ opacity: 0, y: 50, rotateY: 90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
            }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="w-full h-48 rounded-2xl overflow-hidden shadow-soft-lg"
                animate={isHovered ? { rotateY: 180 } : { rotateY: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                }}
            >
                {/* Front of card */}
                <div className={`w-full h-full bg-gradient-to-br ${reason.color} rounded-2xl flex flex-col items-center justify-center p-4`}>
                    <span className="text-5xl mb-2">{reason.emoji}</span>
                    <span className="text-white text-xs font-medium opacity-80">#</span>
                    <span className="text-white text-2xl font-bold">{String(reason.id).padStart(3, '0')}</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

function LoveCardModal({ reason, onClose }: { reason: LoveReason; onClose: () => void }) {
    const { language } = useLanguage();
    const text = language === 'tr' ? reason.text_tr : reason.text_de;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.5, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: 90 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Card with gradient */}
                <motion.div
                    className={`w-full h-56 bg-gradient-to-br ${reason.color} rounded-2xl flex flex-col items-center justify-center mb-6 shadow-xl`}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <span className="text-7xl mb-3">{reason.emoji}</span>
                    <span className="text-white text-lg font-bold opacity-90">#{String(reason.id).padStart(3, '0')}</span>
                </motion.div>

                {/* Reason text */}
                <motion.p
                    className="text-xl text-center text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {text}
                </motion.p>

                {/* Heart animation */}
                <motion.div
                    className="text-center mt-4"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <span className="text-4xl">💕</span>
                </motion.div>

                {/* Close button */}
                <motion.button
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                >
                    {language === 'tr' ? 'Kapat' : 'Schließen'}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default function LoveCardsSection() {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [selectedCard, setSelectedCard] = useState<LoveReason | null>(null);
    const [visibleCount, setVisibleCount] = useState(12);
    const [loveReasonsState, setLoveReasons] = useState<LoveReason[]>(loveReasons);
    const [adminOpen, setAdminOpen] = useState(false);

    const handleSaveCard = (newCard: any) => {
        const card: LoveReason = {
            id: newCard.id,
            text_de: newCard.text_de || newCard.title_de,
            text_tr: newCard.text_tr || newCard.title_tr,
            emoji: newCard.emoji,
            color: 'from-pink-400 to-rose-500',
        };
        setLoveReasons(prev => [...prev, card]);
    };

    const handleDeleteCard = (id: number) => {
        if (confirm(language === 'tr' ? 'Emin misiniz?' : 'Sind Sie sicher?')) {
            setLoveReasons(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <section
            id="love"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-pink-50/30 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#1A0A1A] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(232, 93, 122, 0.1), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(142, 69, 133, 0.1), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Floating hearts */}
                <AnimatePresence>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-primary-400/20 text-3xl"
                            suppressHydrationWarning
                            initial={{
                                x: Math.random() * 1400,
                                y: 900 + 50,
                                rotate: 0,
                                opacity: 0,
                            }}
                            animate={{
                                y: -100,
                                rotate: Math.random() * 360,
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                delay: Math.random() * 10,
                                ease: 'easeInOut',
                            }}
                        >
                            💕
                        </motion.div>
                    ))}
                </AnimatePresence>
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
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        💕
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {t('love_title')}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-4">
                        {t('love_subtitle')}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        {t('love_card_flip_hint')}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {loveReasonsState.slice(0, visibleCount).map((reason, index) => (
                        <LoveCard
                            key={reason.id}
                            reason={reason}
                            index={index}
                            onClick={() => setSelectedCard(reason)}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < loveReasonsState.length && (
                    <div className="text-center mt-12">
                        <motion.button
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold text-lg shadow-soft-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount(prev => Math.min(prev + 12, loveReasonsState.length))}
                        >
                            {language === 'tr' ? 'Daha fazla göster' : 'Mehr anzeigen'}
                        </motion.button>
                    </div>
                )}
            </div>

            {/* Admin Button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-400 to-magenta-500 text-white shadow-glow flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAdminOpen(true)}
            >
                ⚙️
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <LoveCardModal
                        reason={selectedCard}
                        onClose={() => setSelectedCard(null)}
                    />
                )}
            </AnimatePresence>

            {/* Admin Panel Modal */}
            <AnimatePresence>
                {adminOpen && (
                    <AdminPanel
                        isOpen={adminOpen}
                        onClose={() => setAdminOpen(false)}
                        mode="lovecards"
                        onSave={handleSaveCard}
                        onDelete={handleDeleteCard}
                        items={loveReasonsState}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
