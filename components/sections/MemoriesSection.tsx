'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import AdminPanel from '@/components/admin/AdminPanel';

interface Memory {
    id: number;
    image: string;
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    date: string;
    emoji: string;
}

const memories: Memory[] = [
    {
        id: 1,
        image: '/memories/photo1.jpg',
        title_de: 'Unser erster Chat',
        title_tr: 'İlk Mesajımız',
        description_de: '28. Oktober 2025 – Der Tag, an dem alles begann. Unsere erste Nachricht.',
        description_tr: '28 Ekim 2025 – Her şeyin başladığı gün. İlk mesajımız.',
        date: '28. Okt 2025',
        emoji: '💬',
    },
    {
        id: 2,
        image: '/memories/ants1.jpg',
        title_de: 'Endlos chatten 🐜💕',
        title_tr: 'Bitmeyen sohbet 🐜💕',
        description_de: 'Mai 2026 – Monatelange Stunden des Chattens über Ameisen, Spiele und den Alltag.',
        description_tr: 'Mayıs 2026 – Aylarca karıncalar, oyunlar ve günlük yaşam hakkında saatlerce sohbet.',
        date: 'Mai 2026',
        emoji: '🐜',
    },
    {
        id: 3,
        image: '/memories/firstkiss.jpg',
        title_de: 'Erster Kuss 💋',
        title_tr: 'İlk Öpücük 💋',
        description_de: 'Mai 2026 – Ein magischer Moment, an dem die Zeit stehen blieb.',
        description_tr: 'Mayıs 2026 – Zamanın donduğu sihirli an.',
        date: 'Mai 2026',
        emoji: '💋',
    },
    {
        id: 4,
        image: '/memories/videocall.jpg',
        title_de: 'Erster Video Call 📹',
        title_tr: 'İlk Video Görüşme 📹',
        description_de: 'Juni 2026 – Dein Gesicht zum ersten Mal live sehen. Unvergesslich!',
        description_tr: 'Haziran 2026 – Yüzünü ilk kez canlı görmek. Unutulmaz!',
        date: 'Juni 2026',
        emoji: '📹',
    },
    {
        id: 5,
        image: '/memories/voice.jpg',
        title_de: 'Stimmnachrichten 🎤',
        title_tr: 'Sesli Mesajlar 🎤',
        description_de: 'Die wärmsten Nachrichten kommen durch die Stimme. Deine sind die schönsten.',
        description_tr: 'En sıcak mesajlar sesle gelir. Sendeki en güzelleri.',
        date: '2025/2026',
        emoji: '🎤',
    },
    {
        id: 6,
        image: '/memories/important.jpg',
        title_de: 'Unser wichtiger Tag 🌟',
        title_tr: 'Önemli Günümüz 🌟',
        description_de: '06. Juni 2026 – Ein Datum, das für immer in unsere Erinnerung bleibt.',
        description_tr: '06 Haziran 2026 – Her zaman hafızamıza kazınacak bir tarih.',
        date: '06. Juni 2026',
        emoji: '🌟',
    },
];

function MemoryCard({
    memory,
    index,
    onClick,
}: {
    memory: Memory;
    index: number;
    onClick: () => void;
}) {
    const { language } = useLanguage();
    const title = language === 'tr' ? memory.title_tr : memory.title_de;
    const description = language === 'tr' ? memory.description_tr : memory.description_de;

    const rotations = [-3, 2, -5, 4, -2, 3];
    const rotation = rotations[index % rotations.length];

    const floatingDelays = [0, 0.5, 1, 1.5, 2, 2.5];

    return (
        <motion.div
            className="cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
            whileHover={{
                y: -15,
                rotate: 0,
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 p-4 pb-16 rounded-2xl shadow-soft-lg overflow-hidden"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease',
                }}
                whileHover={{
                    rotate: 0,
                    transition: { duration: 0.3 }
                }}
            >
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 3,
                        delay: floatingDelays[index % floatingDelays.length],
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-primary-100 to-magenta-100 dark:from-primary-900/30 dark:to-magenta-900/30 rounded-xl flex items-center justify-center mb-4">
                        <motion.span
                            className="text-6xl"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {memory.emoji}
                        </motion.span>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">{title}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{memory.date}</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function MemoryModal({
    memory,
    onClose,
}: {
    memory: Memory;
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
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-neutral-200 dark:border-neutral-700"
                initial={{ scale: 0.8, y: 50, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.8, y: 50, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                <motion.div
                    className="w-full h-56 bg-gradient-to-br from-primary-200 to-magenta-200 dark:from-primary-800/40 dark:to-magenta-800/40 rounded-2xl flex items-center justify-center text-7xl mb-6"
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {memory.emoji}
                </motion.div>

                <h3 className="text-2xl font-bold font-display gradient-text mb-3">{title}</h3>
                <p className="text-sm text-primary-500 font-medium mb-4">{memory.date}</p>

                <motion.p
                    className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {description}
                </motion.p>

                <motion.button
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold shadow-lg"
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

export default function MemoriesSection() {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [memoriesState, setMemories] = useState<Memory[]>(memories);
    const [adminOpen, setAdminOpen] = useState(false);

    const handleSaveMemory = (newMemory: any) => {
        const memory: Memory = {
            id: newMemory.id,
            image: '/memories/photo1.jpg',
            title_de: newMemory.title_de,
            title_tr: newMemory.title_tr,
            description_de: newMemory.description_de || '',
            description_tr: newMemory.description_tr || '',
            date: newMemory.date || '',
            emoji: newMemory.emoji,
        };
        setMemories(prev => [...prev, memory]);
    };

    const handleDeleteMemory = (id: number) => {
        if (confirm(language === 'tr' ? 'Emin misiniz?' : 'Sind Sie sicher?')) {
            setMemories(prev => prev.filter(m => m.id !== id));
        }
    };

    return (
        <section
            id="memories"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-gold-50/20 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#0F0F25] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(201, 169, 110, 0.1), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(232, 93, 122, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 text-5xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        📸
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {t('memories_title')}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        {t('memories_subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                    {memoriesState.map((memory, index) => (
                        <MemoryCard
                            key={memory.id}
                            memory={memory}
                            index={index}
                            onClick={() => setSelectedMemory(memory)}
                        />
                    ))}
                </div>
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

            <AnimatePresence>
                {selectedMemory && (
                    <MemoryModal
                        memory={selectedMemory}
                        onClose={() => setSelectedMemory(null)}
                    />
                )}
            </AnimatePresence>

            {/* Admin Panel Modal */}
            <AnimatePresence>
                {adminOpen && (
                    <AdminPanel
                        isOpen={adminOpen}
                        onClose={() => setAdminOpen(false)}
                        mode="memories"
                        onSave={handleSaveMemory}
                        onDelete={handleDeleteMemory}
                        items={memoriesState}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
